import { PrismaClient } from '@prisma/client'

export async function seedWorkouts(prisma: PrismaClient) {
  // Fetch exercises to map their IDs
  const exercises = await prisma.exerciseLibrary.findMany();
  const exMap = new Map(exercises.map(e => [e.name, e.id]));

  const getEx = (name: string) => {
    const id = exMap.get(name);
    if (!id) throw new Error(`Exercise ${name} not found`);
    return id;
  };

  const templates = [
    {
      name: "Strength A",
      description: "Primary leg strength session",
      exercises: [
        { name: "Stationary Bike", sets: 1, reps: "10 min", order: 1 },
        { name: "Leg Press", sets: 4, reps: "8-10", order: 2 },
        { name: "Squat", sets: 3, reps: "10-12", order: 3 },
        { name: "Step Up", sets: 3, reps: "10 per leg", order: 4 },
        { name: "Terminal Knee Extension", sets: 3, reps: "15", order: 5 },
        { name: "Calf Raise", sets: 3, reps: "15", order: 6 },
        { name: "Single Leg Balance", sets: 3, reps: "45 sec", order: 7 }
      ]
    },
    {
      name: "Strength B",
      description: "Secondary leg strength (Posterior Chain focus)",
      exercises: [
        { name: "Stationary Bike", sets: 1, reps: "10 min", order: 1 },
        { name: "Romanian Deadlift", sets: 4, reps: "8-10", order: 2 },
        { name: "Ham Curl", sets: 3, reps: "10-12", order: 3 },
        { name: "Bridge", sets: 3, reps: "15", order: 4 },
        { name: "Hip Abduction", sets: 3, reps: "15", order: 5 },
        { name: "Band Walk", sets: 3, reps: "10 steps ea", order: 6 },
        { name: "Calf Raise", sets: 3, reps: "15", order: 7 }
      ]
    },
    {
      name: "Recovery",
      description: "Active recovery and mobility",
      exercises: [
        { name: "Stationary Bike", sets: 1, reps: "20 min", order: 1 },
        { name: "Walking", sets: 1, reps: "15 min", order: 2 },
        { name: "Mobility", sets: 1, reps: "10 min", order: 3 },
        { name: "Stretching", sets: 1, reps: "10 min", order: 4 }
      ]
    },
    {
      name: "Athletic Control",
      description: "Dynamic control and stability",
      exercises: [
        { name: "Stationary Bike", sets: 1, reps: "10 min", order: 1 },
        { name: "Single Leg Balance", sets: 3, reps: "60 sec", order: 2 },
        { name: "Step Up", sets: 3, reps: "10 per leg", order: 3 },
        { name: "Squat", sets: 3, reps: "15 (bodyweight)", order: 4 },
        { name: "Band Walk", sets: 3, reps: "15 steps ea", order: 5 }
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

  console.log("Seeded workouts");
}
