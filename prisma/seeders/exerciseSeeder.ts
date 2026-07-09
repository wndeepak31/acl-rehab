import { PrismaClient } from '@prisma/client'

export async function seedExercises(prisma: PrismaClient) {
  const exercises = [
    {
      name: "Stationary Bike",
      equipment: "Bike",
      targetMuscles: "Quadriceps, Hamstrings, Calves",
      difficulty: "Beginner",
      phase: "Strength Building",
      progression: "Increase resistance by 1 level",
      regression: "Decrease resistance or time",
      painWarning: "If anterior knee pain > 3, reduce resistance",
      commonErrors: "Seat too low causing excess flexion",
      breathing: "Steady rhythmic breathing"
    },
    {
      name: "Leg Press",
      equipment: "Leg Press Machine",
      targetMuscles: "Quadriceps, Glutes",
      difficulty: "Intermediate",
      phase: "Strength Building",
      progression: "Increase weight 5%",
      regression: "Decrease weight or limit ROM to 90 degrees",
      painWarning: "Patellofemoral pain > 4, stop.",
      commonErrors: "Knees caving inwards (valgus)",
      breathing: "Exhale on push"
    },
    {
      name: "Squat",
      equipment: "Bodyweight / Dumbbells",
      targetMuscles: "Quadriceps, Glutes, Core",
      difficulty: "Intermediate",
      phase: "Strength Building",
      progression: "Add weight (Goblet)",
      regression: "Box squat",
      painWarning: "Pinch in front of knee -> limit depth",
      commonErrors: "Weight shifting to non-operative leg",
      breathing: "Inhale down, exhale up"
    },
    {
      name: "Step Up",
      equipment: "Plyo Box",
      targetMuscles: "Quadriceps, Glutes",
      difficulty: "Intermediate",
      phase: "Strength Building",
      progression: "Higher box or add weight",
      regression: "Lower box",
      painWarning: "Pain on step down -> control descent better",
      commonErrors: "Pushing off with bottom foot",
      breathing: "Exhale on step up"
    },
    {
      name: "Calf Raise",
      equipment: "Bodyweight",
      targetMuscles: "Gastrocnemius, Soleus",
      difficulty: "Beginner",
      phase: "Strength Building",
      progression: "Single leg calf raise",
      regression: "Seated calf raise",
      painWarning: "Achilles pain -> reduce ROM",
      commonErrors: "Bouncing at the bottom",
      breathing: "Exhale on way up"
    },
    {
      name: "Terminal Knee Extension",
      equipment: "Resistance Band",
      targetMuscles: "VMO (Quadriceps)",
      difficulty: "Beginner",
      phase: "Strength Building",
      progression: "Thicker band",
      regression: "Thinner band",
      painWarning: "None",
      commonErrors: "Using hip instead of knee",
      breathing: "Exhale on extension"
    },
    {
      name: "Single Leg Balance",
      equipment: "None / Airex Pad",
      targetMuscles: "Ankle stabilizers, Glute Medius",
      difficulty: "Beginner",
      phase: "Strength Building",
      progression: "Close eyes or stand on uneven surface",
      regression: "Hold on to wall",
      painWarning: "None",
      commonErrors: "Hip dropping on opposite side",
      breathing: "Steady breathing"
    },
    {
      name: "Romanian Deadlift",
      equipment: "Dumbbells / Kettlebell",
      targetMuscles: "Hamstrings, Glutes, Lower Back",
      difficulty: "Intermediate",
      phase: "Strength Building",
      progression: "Single leg RDL",
      regression: "Bodyweight hinges",
      painWarning: "Lower back pain -> check form",
      commonErrors: "Rounding back, bending knees too much",
      breathing: "Exhale on standing"
    },
    {
      name: "Ham Curl",
      equipment: "Hamstring Curl Machine / Physioball",
      targetMuscles: "Hamstrings",
      difficulty: "Intermediate",
      phase: "Strength Building",
      progression: "Increase weight",
      regression: "Prone bodyweight curl",
      painWarning: "Posterior knee pain -> reduce weight",
      commonErrors: "Arching lower back",
      breathing: "Exhale on curl"
    },
    {
      name: "Bridge",
      equipment: "Bodyweight",
      targetMuscles: "Glutes, Hamstrings",
      difficulty: "Beginner",
      phase: "Strength Building",
      progression: "Single leg bridge",
      regression: "Decrease ROM",
      painWarning: "Lower back pain -> engage core",
      commonErrors: "Hyper-extending back",
      breathing: "Exhale on lift"
    },
    {
      name: "Hip Abduction",
      equipment: "Resistance Band",
      targetMuscles: "Glute Medius",
      difficulty: "Beginner",
      phase: "Strength Building",
      progression: "Thicker band",
      regression: "Side lying without band",
      painWarning: "None",
      commonErrors: "Rolling hips back",
      breathing: "Exhale on abduction"
    },
    {
      name: "Band Walk",
      equipment: "Resistance Band",
      targetMuscles: "Glute Medius, Core",
      difficulty: "Intermediate",
      phase: "Strength Building",
      progression: "Band around toes",
      regression: "Band above knees",
      painWarning: "None",
      commonErrors: "Dragging feet",
      breathing: "Steady breathing"
    },
    {
      name: "Stretching",
      equipment: "Mat",
      targetMuscles: "Full Body",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "Longer hold times",
      regression: "Shorter hold times",
      painWarning: "Do not push past mild discomfort",
      commonErrors: "Bouncing",
      breathing: "Deep, slow breathing"
    },
    {
      name: "Mobility",
      equipment: "Foam Roller",
      targetMuscles: "Fascia",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "Firmer roller",
      regression: "Softer roller",
      painWarning: "Avoid direct pressure on joints/wounds",
      commonErrors: "Rolling too fast",
      breathing: "Steady"
    },
    {
      name: "Walking",
      equipment: "Treadmill",
      targetMuscles: "Full Body",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "Incline",
      regression: "Slower pace",
      painWarning: "Limping -> reduce speed",
      commonErrors: "Uneven gait",
      breathing: "Steady"
    }
  ]

  for (const ex of exercises) {
    await prisma.exerciseLibrary.create({ data: ex })
  }
  
  console.log("Seeded exercises")
}
