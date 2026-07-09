"use server";

import { prisma } from "@/lib/db";
import { calculateAthleteDateStatus } from "./dateEngine";

export async function fetchTodayWorkout(userEmail: string) {
  const status = await calculateAthleteDateStatus(userEmail);

  // Find the exact Week and Day
  const week = await prisma.week.findFirst({
    where: {
      phase: { protocolId: status.protocolId },
      weekNum: status.weekNumber
    },
    include: {
      days: {
        where: { dayOfWeek: status.dayOfWeek },
        include: {
          workoutTemplate: {
            include: {
              exercises: {
                include: {
                  exercise: true
                },
                orderBy: { order: 'asc' }
              }
            }
          }
        }
      }
    }
  });

  if (!week || week.days.length === 0 || !week.days[0].workoutTemplate) {
    return { status, template: null, exercises: [] };
  }

  const template = week.days[0].workoutTemplate;

  // Enhance with WeightEngine data
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  
  const exercisesWithWeight = await Promise.all(
    template.exercises.map(async (workoutEx) => {
      let weightData = null;
      if (user) {
        weightData = await prisma.weightProgression.findUnique({
          where: {
            userId_exerciseId: {
              userId: user.id,
              exerciseId: workoutEx.exerciseId
            }
          }
        });
      }
      
      return {
        ...workoutEx,
        weightProgression: weightData
      };
    })
  );

  return {
    status,
    template,
    exercises: exercisesWithWeight
  };
}
