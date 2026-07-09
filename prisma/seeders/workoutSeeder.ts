import { PrismaClient } from '@prisma/client'

export async function seedWorkouts(prisma: PrismaClient) {
  const exercises = await prisma.exerciseLibrary.findMany();
  const exMap = new Map(exercises.map(e => [e.name, e.id]));

  const getEx = (name: string) => {
    const id = exMap.get(name);
    if (!id) throw new Error(`Exercise ${name} not found`);
    return id;
  };

  const templates = [
    {
      name: "Day 1 (Monday) - Strength A (Quad)",
      description: "Increase load only if next-day knee is calm",
      exercises: [
        { name: "Leg Press", sets: 4, reps: "12", order: 1 },
        { name: "Box Squat", sets: 4, reps: "10", order: 2 },
        { name: "Step-Up", sets: 3, reps: "12", order: 3 },
        { name: "Terminal Knee Extension", sets: 3, reps: "20", order: 4 },
        { name: "Standing Calf Raise", sets: 4, reps: "20", order: 5 },
        { name: "Bike", sets: 1, reps: "10-15 min", order: 6 },
        { name: "Single-leg balance", sets: 5, reps: "30 sec", order: 7 },
        { name: "Stretch", sets: 1, reps: "10 min", order: 8 }
      ]
    },
    {
      name: "Day 2 (Tuesday) - Recovery",
      description: "No heavy leg training",
      exercises: [
        { name: "Mobility", sets: 1, reps: "20 min", order: 1 },
        { name: "Heel Slides", sets: 1, reps: "10", order: 2 },
        { name: "Hamstring + Calf Stretch", sets: 2, reps: "30 sec", order: 3 },
        { name: "Core (Plank, Side Plank)", sets: 3, reps: "45 sec", order: 4 },
        { name: "Bike", sets: 1, reps: "25-30 min", order: 5 }
      ]
    },
    {
      name: "Day 3 (Wednesday) - Strength B (Posterior)",
      description: "Focus on control",
      exercises: [
        { name: "Romanian Deadlift", sets: 4, reps: "10", order: 1 },
        { name: "Hamstring Curl", sets: 4, reps: "12", order: 2 },
        { name: "Glute Bridge", sets: 4, reps: "15", order: 3 },
        { name: "Band Walk", sets: 3, reps: "20 steps", order: 4 },
        { name: "Hip Abduction", sets: 3, reps: "15", order: 5 },
        { name: "Bike", sets: 1, reps: "10 min", order: 6 },
        { name: "Single-leg balance", sets: 3, reps: "30 sec", order: 7 },
        { name: "Stretch", sets: 1, reps: "10 min", order: 8 }
      ]
    },
    {
      name: "Day 4 (Thursday) - Recovery",
      description: "Active recovery only",
      exercises: [
        { name: "Mobility + Walking", sets: 1, reps: "20 min", order: 1 },
        { name: "Bike", sets: 1, reps: "30 min", order: 2 },
        { name: "Core + Balance", sets: 1, reps: "15 min", order: 3 },
        { name: "Walk", sets: 1, reps: "20 min", order: 4 }
      ]
    },
    {
      name: "Day 5 (Friday) - Strength A Progression",
      description: "Increase only 5-10% if criteria met",
      exercises: [
        { name: "Leg Press", sets: 4, reps: "12", order: 1 },
        { name: "Box Squat", sets: 4, reps: "10", order: 2 },
        { name: "Step-Up", sets: 3, reps: "12", order: 3 },
        { name: "Terminal Knee Extension", sets: 3, reps: "20", order: 4 },
        { name: "Standing Calf Raise", sets: 4, reps: "20", order: 5 },
        { name: "Bike", sets: 1, reps: "10 min", order: 6 },
        { name: "Single-leg balance", sets: 5, reps: "30 sec", order: 7 },
        { name: "Stretch", sets: 1, reps: "10 min", order: 8 }
      ]
    },
    {
      name: "Day 6 (Saturday) - Athletic Control",
      description: "Quality over quantity",
      exercises: [
        { name: "Step-downs", sets: 3, reps: "10", order: 1 },
        { name: "Mini Squats", sets: 3, reps: "12", order: 2 },
        { name: "Hip Strength", sets: 3, reps: "15", order: 3 },
        { name: "Bike", sets: 1, reps: "15 min", order: 4 },
        { name: "Single-leg control", sets: 3, reps: "30 sec", order: 5 },
        { name: "Stretch", sets: 1, reps: "10 min", order: 6 }
      ]
    },
    {
      name: "Day 7 (Sunday) - Recovery",
      description: "Prepare for next week. Complete Rest.",
      exercises: [
        { name: "Walking + Full Body Stretch", sets: 1, reps: "30-40 min walk", order: 1 },
        { name: "Mobility", sets: 1, reps: "15 min", order: 2 },
        { name: "Complete Rest", sets: 1, reps: "All Day", order: 3 }
      ]
    }
  ];

  for (const template of templates) {
    const t = await prisma.workoutTemplate.create({
      data: {
        name: template.name,
        description: template.description
      }
    });

    for (const ex of template.exercises) {
      await prisma.workoutExercise.create({
        data: {
          workoutTemplateId: t.id,
          exerciseId: getEx(ex.name),
          sets: ex.sets,
          reps: ex.reps,
          order: ex.order
        }
      });
    }
  }

  console.log("Seeded workouts exactly matching Phase 3 Excel Sheet");
}
