import { PrismaClient } from '@prisma/client'

export async function seedExercises(prisma: PrismaClient) {
  const exercises = [
    {
      name: "Bike",
      equipment: "Stationary Bike",
      targetMuscles: "Quadriceps, Hamstrings, Calves",
      difficulty: "Beginner",
      phase: "Cardio",
      progression: "Increase resistance",
      regression: "Decrease resistance",
      painWarning: "If anterior knee pain > 3, reduce resistance",
      commonErrors: "Seat too low",
      breathing: "Steady rhythmic breathing"
    },
    {
      name: "Leg Press",
      equipment: "Leg Press Machine",
      targetMuscles: "Quadriceps, Glutes",
      difficulty: "Intermediate",
      phase: "Strength",
      progression: "Increase weight 5%",
      regression: "Decrease weight or limit ROM",
      painWarning: "Patellofemoral pain > 4, stop.",
      commonErrors: "Knees caving inwards",
      breathing: "Exhale on push"
    },
    {
      name: "Box Squat",
      equipment: "Box, Bodyweight/Dumbbells",
      targetMuscles: "Quadriceps, Glutes",
      difficulty: "Intermediate",
      phase: "Strength",
      progression: "Lower box or add weight",
      regression: "Higher box",
      painWarning: "Pinch in front of knee -> limit depth",
      commonErrors: "Dropping onto box rather than sitting",
      breathing: "Inhale down, exhale up"
    },
    {
      name: "Step-Up",
      equipment: "Plyo Box",
      targetMuscles: "Quadriceps, Glutes",
      difficulty: "Intermediate",
      phase: "Strength",
      progression: "Higher box or add weight",
      regression: "Lower box",
      painWarning: "Pain on step down -> control descent better",
      commonErrors: "Pushing off with bottom foot",
      breathing: "Exhale on step up"
    },
    {
      name: "Terminal Knee Extension",
      equipment: "Resistance Band",
      targetMuscles: "VMO",
      difficulty: "Beginner",
      phase: "Strength",
      progression: "Thicker band",
      regression: "Thinner band",
      painWarning: "None",
      commonErrors: "Using hip instead of knee",
      breathing: "Exhale on extension"
    },
    {
      name: "Standing Calf Raise",
      equipment: "Bodyweight",
      targetMuscles: "Gastrocnemius, Soleus",
      difficulty: "Beginner",
      phase: "Strength",
      progression: "Single leg calf raise",
      regression: "Seated calf raise",
      painWarning: "Achilles pain -> reduce ROM",
      commonErrors: "Bouncing at the bottom",
      breathing: "Exhale on way up"
    },
    {
      name: "Single-leg balance",
      equipment: "None / Airex Pad",
      targetMuscles: "Ankle stabilizers, Glute Medius",
      difficulty: "Beginner",
      phase: "Balance",
      progression: "Close eyes or stand on uneven surface",
      regression: "Hold on to wall",
      painWarning: "None",
      commonErrors: "Hip dropping on opposite side",
      breathing: "Steady breathing"
    },
    {
      name: "Stretch",
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
      equipment: "Mat",
      targetMuscles: "Joints",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "Larger ROM",
      regression: "Smaller ROM",
      painWarning: "Do not push past mild discomfort",
      commonErrors: "Moving too fast",
      breathing: "Steady breathing"
    },
    {
      name: "Heel Slides",
      equipment: "Mat",
      targetMuscles: "Hamstrings, Knee Flexion",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "Use towel to pull further",
      regression: "Lesser ROM",
      painWarning: "Posterior pain -> reduce flexion",
      commonErrors: "Hip hiking",
      breathing: "Exhale on pull"
    },
    {
      name: "Hamstring + Calf Stretch",
      equipment: "Towel/Band",
      targetMuscles: "Hamstrings, Calves",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "Hold longer",
      regression: "Bend knee slightly",
      painWarning: "Nerve tension -> back off",
      commonErrors: "Rounding back",
      breathing: "Relaxed breathing"
    },
    {
      name: "Core (Plank, Side Plank)",
      equipment: "Mat",
      targetMuscles: "Core, Obliques",
      difficulty: "Intermediate",
      phase: "Core",
      progression: "Lift one leg/arm",
      regression: "From knees",
      painWarning: "Lower back pain -> drop to knees",
      commonErrors: "Hips sagging",
      breathing: "Steady, do not hold breath"
    },
    {
      name: "Romanian Deadlift",
      equipment: "Dumbbells / Kettlebell",
      targetMuscles: "Hamstrings, Glutes",
      difficulty: "Intermediate",
      phase: "Strength",
      progression: "Single leg RDL",
      regression: "Bodyweight hinges",
      painWarning: "Lower back pain -> check form",
      commonErrors: "Rounding back, bending knees too much",
      breathing: "Exhale on standing"
    },
    {
      name: "Hamstring Curl",
      equipment: "Machine / Physioball",
      targetMuscles: "Hamstrings",
      difficulty: "Intermediate",
      phase: "Strength",
      progression: "Increase weight",
      regression: "Prone bodyweight curl",
      painWarning: "Posterior knee pain -> reduce weight",
      commonErrors: "Arching lower back",
      breathing: "Exhale on curl"
    },
    {
      name: "Glute Bridge",
      equipment: "Bodyweight",
      targetMuscles: "Glutes, Hamstrings",
      difficulty: "Beginner",
      phase: "Strength",
      progression: "Single leg bridge",
      regression: "Decrease ROM",
      painWarning: "Lower back pain -> engage core",
      commonErrors: "Hyper-extending back",
      breathing: "Exhale on lift"
    },
    {
      name: "Band Walk",
      equipment: "Resistance Band",
      targetMuscles: "Glute Medius",
      difficulty: "Intermediate",
      phase: "Strength",
      progression: "Band around toes",
      regression: "Band above knees",
      painWarning: "None",
      commonErrors: "Dragging feet",
      breathing: "Steady breathing"
    },
    {
      name: "Hip Abduction",
      equipment: "Resistance Band",
      targetMuscles: "Glute Medius",
      difficulty: "Beginner",
      phase: "Strength",
      progression: "Thicker band",
      regression: "Side lying without band",
      painWarning: "None",
      commonErrors: "Rolling hips back",
      breathing: "Exhale on abduction"
    },
    {
      name: "Mobility + Walking",
      equipment: "None",
      targetMuscles: "Full Body",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "Increase speed/duration",
      regression: "Decrease speed",
      painWarning: "Limping -> stop",
      commonErrors: "Uneven gait",
      breathing: "Steady"
    },
    {
      name: "Walk",
      equipment: "None",
      targetMuscles: "Full Body",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "Increase speed",
      regression: "Decrease speed",
      painWarning: "Limping -> stop",
      commonErrors: "Uneven gait",
      breathing: "Steady"
    },
    {
      name: "Core + Balance",
      equipment: "Mat",
      targetMuscles: "Core, Stabilizers",
      difficulty: "Intermediate",
      phase: "Core",
      progression: "Unstable surface",
      regression: "Stable surface",
      painWarning: "None",
      commonErrors: "Holding breath",
      breathing: "Steady"
    },
    {
      name: "Step-downs",
      equipment: "Step",
      targetMuscles: "Quadriceps (Eccentric)",
      difficulty: "Advanced",
      phase: "Strength",
      progression: "Higher step",
      regression: "Lower step",
      painWarning: "Anterior pain -> lower step",
      commonErrors: "Hip drop, knee valgus",
      breathing: "Inhale down, exhale up"
    },
    {
      name: "Mini Squats",
      equipment: "Bodyweight",
      targetMuscles: "Quadriceps",
      difficulty: "Beginner",
      phase: "Strength",
      progression: "Go deeper",
      regression: "Hold on to support",
      painWarning: "Pain -> limit depth",
      commonErrors: "Knees over toes excessively",
      breathing: "Inhale down, exhale up"
    },
    {
      name: "Hip Strength",
      equipment: "Bodyweight/Bands",
      targetMuscles: "Glutes, Hip Flexors",
      difficulty: "Intermediate",
      phase: "Strength",
      progression: "More resistance",
      regression: "Less resistance",
      painWarning: "Pinching -> alter angle",
      commonErrors: "Compensating with lower back",
      breathing: "Exhale on exertion"
    },
    {
      name: "Single-leg control",
      equipment: "None",
      targetMuscles: "Stabilizers",
      difficulty: "Intermediate",
      phase: "Balance",
      progression: "Dynamic movements",
      regression: "Static hold",
      painWarning: "None",
      commonErrors: "Loss of arch in foot",
      breathing: "Steady"
    },
    {
      name: "Walking + Full Body Stretch",
      equipment: "None",
      targetMuscles: "Full Body",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "N/A",
      regression: "N/A",
      painWarning: "None",
      commonErrors: "None",
      breathing: "Deep breathing"
    },
    {
      name: "Complete Rest",
      equipment: "Couch",
      targetMuscles: "Mind & Body",
      difficulty: "Beginner",
      phase: "Recovery",
      progression: "Sleep more",
      regression: "N/A",
      painWarning: "N/A",
      commonErrors: "Thinking about rehab",
      breathing: "Relaxed"
    }
  ]

  for (const ex of exercises) {
    // upsert to avoid duplicates if re-running
    const existing = await prisma.exerciseLibrary.findFirst({ where: { name: ex.name } });
    if (!existing) {
      await prisma.exerciseLibrary.create({ data: ex })
    }
  }
  
  console.log("Seeded exercises")
}
