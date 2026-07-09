"use server";

import { prisma } from "@/lib/db";

export async function submitDailyWorkout(
  userEmail: string,
  logs: {
    pain: number;
    swelling: string; // NONE, MILD, MOD, SEV
    rom: string;
    completedExercises: string[]; // array of exerciseIds
    totalExercises: number;
  }
) {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) throw new Error("User not found");

  // 1. Save Daily Logs
  await prisma.painLog.create({
    data: { userId: user.id, level: logs.pain }
  });

  await prisma.swellingLog.create({
    data: { userId: user.id, severity: logs.swelling }
  });

  // Calculate completion %
  const completionPercentage = (logs.completedExercises.length / logs.totalExercises) * 100;

  // 2. Progression Engine Logic
  const allWeights = await prisma.weightProgression.findMany({
    where: { userId: user.id, exerciseId: { in: logs.completedExercises } }
  });

  for (const weightStatus of allWeights) {
    let newTarget = weightStatus.targetWeight;
    let newCurrent = weightStatus.currentWeight;

    if (logs.pain > 4) {
      // Regress load
      newTarget = weightStatus.currentWeight * 0.8; // -20%
      newCurrent = newTarget;
    } else if (logs.pain <= 2 && logs.swelling === 'NONE' && completionPercentage >= 90) {
      // Progress load
      newTarget = weightStatus.currentWeight * (1 + weightStatus.increasePercentage);
      newCurrent = newTarget;
    } else {
      // Maintain load
      newTarget = weightStatus.currentWeight;
      newCurrent = newTarget;
    }

    await prisma.weightProgression.update({
      where: { id: weightStatus.id },
      data: {
        targetWeight: newTarget,
        currentWeight: newCurrent,
        lastSuccessfulWeight: weightStatus.currentWeight
      }
    });
  }

  // 3. Mark workout as completed for the day in the DB
  for (const exId of logs.completedExercises) {
    await prisma.workoutLog.create({
      data: {
        userId: user.id,
        exerciseId: exId,
        completed: true,
      }
    });
  }

  return {
    success: true,
    message: "Workout logged and progression engine evaluated.",
    painWarning: logs.pain > 4,
    swellingWarning: logs.swelling !== 'NONE'
  };
}
