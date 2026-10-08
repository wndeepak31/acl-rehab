// src/lib/progression-engine.ts

export type ReadinessStatus = 'GREEN' | 'YELLOW' | 'RED';

export interface ReadinessEvaluation {
  status: ReadinessStatus;
  score: number; // 0-100
  reasons: string[];
}

export interface Phase {
  id: string;
  name: string;
  description: string;
  expectedDurationWeeks: [number, number];
  entryCriteria: string[];
  exitCriteria: string[];
}

export const REHAB_PHASES: Phase[] = [
  {
    id: 'PHASE_1',
    name: 'Protection / Early Recovery',
    description: 'Control swelling, restore terminal extension, early quad activation.',
    expectedDurationWeeks: [0, 4],
    entryCriteria: ['Post-surgery'],
    exitCriteria: ['Zero extension lag', '100° flexion', 'Minimal swelling'],
  },
  {
    id: 'PHASE_2',
    name: 'ROM + Neuromuscular Control',
    description: 'Full ROM, normal gait, basic strength foundation.',
    expectedDurationWeeks: [4, 8],
    entryCriteria: ['Zero extension lag', '100° flexion', 'Minimal swelling'],
    exitCriteria: ['Full ROM equal to opposite side', 'Normal gait without crutches', 'LSI > 60%'],
  },
  {
    id: 'PHASE_3',
    name: 'Strength Development',
    description: 'Progressive load, unilateral strength, intro to light plyos.',
    expectedDurationWeeks: [8, 16],
    entryCriteria: ['Full ROM', 'Normal gait', 'LSI > 60%'],
    exitCriteria: ['LSI > 80%', '1.5x BW Leg Press', 'Pain-free running fundamentals'],
  },
  {
    id: 'PHASE_4',
    name: 'Advanced Strength + Single-Leg Control',
    description: 'Heavy strength, change of direction intro.',
    expectedDurationWeeks: [16, 24],
    entryCriteria: ['LSI > 80%', 'Pain-free running fundamentals'],
    exitCriteria: ['LSI > 90%', 'Hop tests LSI > 90%'],
  }
];

export interface ExerciseTrack {
  id: string;
  name: string;
  category: 'QUAD' | 'HAMSTRING' | 'GLUTE' | 'CALF' | 'CONTROL' | 'UPPER_BODY' | 'CORE';
  levels: {
    level: number;
    name: string;
    sets: number;
    reps: string;
    targetRPE: number;
    progressionCriteria: string;
    regressionCriteria: string;
  }[];
}

export const EXERCISE_TRACKS: ExerciseTrack[] = [
  {
    id: 'SQUAT_TRACK',
    name: 'Squat Progression',
    category: 'QUAD',
    levels: [
      { level: 1, name: 'Assisted Mini Squat', sets: 3, reps: '10-15', targetRPE: 4, progressionCriteria: '3x15 RPE < 5, no pain', regressionCriteria: 'Pain > 3' },
      { level: 2, name: 'Bodyweight Squat', sets: 3, reps: '12', targetRPE: 5, progressionCriteria: '3x12 RPE < 6, good depth', regressionCriteria: 'Knee valgus or pain' },
      { level: 3, name: 'Goblet Squat', sets: 4, reps: '8-10', targetRPE: 7, progressionCriteria: '4x10 with 15kg RPE < 7', regressionCriteria: 'Loss of depth, pain' },
      { level: 4, name: 'Barbell Back Squat', sets: 4, reps: '6-8', targetRPE: 8, progressionCriteria: '4x8 at 1x BW', regressionCriteria: 'Form breakdown' },
    ]
  },
  {
    id: 'UNILATERAL_QUAD_TRACK',
    name: 'Single Leg Control',
    category: 'QUAD',
    levels: [
      { level: 1, name: 'Assisted Step-Up', sets: 3, reps: '10', targetRPE: 5, progressionCriteria: 'No hand support needed', regressionCriteria: 'Pelvic drop' },
      { level: 2, name: 'Box Step-Up', sets: 3, reps: '10', targetRPE: 6, progressionCriteria: 'Controlled eccentric phase', regressionCriteria: 'Dropping down uncontrollably' },
      { level: 3, name: 'Split Squat', sets: 3, reps: '8-10', targetRPE: 7, progressionCriteria: 'Add dumbbells', regressionCriteria: 'Loss of balance' },
      { level: 4, name: 'Bulgarian Split Squat', sets: 4, reps: '8', targetRPE: 8, progressionCriteria: '1/2 BW total load', regressionCriteria: 'Knee valgus' },
    ]
  },
  {
    id: 'HAMSTRING_TRACK',
    name: 'Hamstring Progression',
    category: 'HAMSTRING',
    levels: [
      { level: 1, name: 'Isometric Heel Digs', sets: 5, reps: '30s', targetRPE: 4, progressionCriteria: 'No pain', regressionCriteria: 'Pain in graft site' },
      { level: 2, name: 'Double Leg Glute Bridge', sets: 3, reps: '15', targetRPE: 5, progressionCriteria: '3x15 easy', regressionCriteria: 'Hamstring cramp' },
      { level: 3, name: 'Single Leg Glute Bridge', sets: 3, reps: '12', targetRPE: 6, progressionCriteria: '3x12 good control', regressionCriteria: 'Hip drop' },
      { level: 4, name: 'Romanian Deadlift (RDL)', sets: 4, reps: '8-10', targetRPE: 7, progressionCriteria: 'Increase load', regressionCriteria: 'Back pain' },
    ]
  },
  {
    id: 'UPPER_BODY_PUSH',
    name: 'Upper Body Push (Chest/Triceps)',
    category: 'UPPER_BODY',
    levels: [
      { level: 1, name: 'Seated Chest Press', sets: 3, reps: '10-12', targetRPE: 6, progressionCriteria: 'RPE < 7', regressionCriteria: 'Shoulder pain' },
      { level: 2, name: 'Dumbbell Bench Press', sets: 4, reps: '8-10', targetRPE: 7, progressionCriteria: 'Increase weight', regressionCriteria: 'Core instability' },
      { level: 3, name: 'Barbell Bench Press', sets: 4, reps: '6-8', targetRPE: 8, progressionCriteria: 'Increase weight', regressionCriteria: 'Form breakdown' },
    ]
  },
  {
    id: 'UPPER_BODY_PULL',
    name: 'Upper Body Pull (Back/Biceps)',
    category: 'UPPER_BODY',
    levels: [
      { level: 1, name: 'Seated Cable Row', sets: 3, reps: '12', targetRPE: 6, progressionCriteria: 'RPE < 7', regressionCriteria: 'Lower back strain' },
      { level: 2, name: 'Lat Pulldown', sets: 4, reps: '10', targetRPE: 7, progressionCriteria: 'Increase weight', regressionCriteria: 'Poor posture' },
      { level: 3, name: 'Pull-ups / Weighted Rows', sets: 4, reps: '8', targetRPE: 8, progressionCriteria: 'Add load', regressionCriteria: 'Loss of ROM' },
    ]
  }
];

export function evaluateReadiness(logs: { pain: number; swelling: 'NONE'|'MILD'|'MODERATE'|'SEVERE'; sleep: 'POOR'|'OK'|'GOOD' }): ReadinessEvaluation {
  let score = 100;
  const reasons: string[] = [];
  let status: ReadinessStatus = 'GREEN';

  if (logs.pain > 4) {
    score -= 40;
    reasons.push('Pain level is elevated (>4/10).');
    status = 'RED';
  } else if (logs.pain > 2) {
    score -= 15;
    reasons.push('Mild pain present.');
    status = status === 'RED' ? 'RED' : 'YELLOW';
  }

  if (logs.swelling === 'SEVERE') {
    score -= 50;
    reasons.push('Severe swelling reported.');
    status = 'RED';
  } else if (logs.swelling === 'MODERATE') {
    score -= 25;
    reasons.push('Moderate swelling reported.');
    status = 'YELLOW';
  }

  if (logs.sleep === 'POOR') {
    score -= 10;
    reasons.push('Poor sleep may impact recovery.');
  }

  return { status, score: Math.max(0, score), reasons };
}

// Simulates the progression engine providing the "Today" view based on a hypothetical Day 78 state.
export function generateTodaySession() {
  // Hardcoded current state for the dashboard demonstration of Day 78 logic
  return {
    phase: REHAB_PHASES[2], // Phase 3
    readiness: evaluateReadiness({ pain: 2, swelling: 'MILD', sleep: 'GOOD' }),
    sessionGoal: 'Build unilateral lower-limb strength and controlled eccentrics',
    estimatedDuration: 55,
    blocks: [
      {
        name: 'Warm-up',
        duration: '10 min',
        exercises: [
          { name: 'Stationary Bike', sets: 1, reps: '10 mins', load: 'Light', targetRPE: 3, rationale: 'Increase blood flow and joint lubrication' }
        ]
      },
      {
        name: 'Strength Block',
        duration: '30 min',
        exercises: [
          { name: 'Goblet Squat', sets: 4, reps: '8-10', load: '15kg', targetRPE: 7, rationale: 'Bilateral strength foundation', progressionTarget: 'Progressing from bodyweight squats' },
          { name: 'Split Squat', sets: 3, reps: '8 per leg', load: '2x 10kg DB', targetRPE: 7, rationale: 'Unilateral quad and glute strength', progressionTarget: 'New exercise introduced to challenge unilateral control' },
          { name: 'Romanian Deadlift (RDL)', sets: 3, reps: '10', load: '40kg', targetRPE: 6, rationale: 'Posterior chain loading', progressionTarget: 'Progressed load from last week' }
        ]
      },
      {
        name: 'Upper Body Maintenance',
        duration: '15 min',
        exercises: [
          { name: 'Dumbbell Bench Press', sets: 4, reps: '8-10', load: '2x 20kg', targetRPE: 7, rationale: 'Maintain upper body push strength while leg recovers', progressionTarget: 'Maintain' },
          { name: 'Seated Cable Row', sets: 3, reps: '12', load: '45kg', targetRPE: 6, rationale: 'Maintain posterior chain / upper body pull', progressionTarget: 'Maintain' }
        ]
      },
      {
        name: 'Control / Stability',
        duration: '10 min',
        exercises: [
          { name: 'Single Leg Balance on Airex', sets: 3, reps: '45s', load: 'Bodyweight', targetRPE: 5, rationale: 'Proprioception and ankle stability', progressionTarget: 'Maintain' },
          { name: 'Monster Walks', sets: 3, reps: '15m', load: 'Heavy Band', targetRPE: 6, rationale: 'Glute medius activation', progressionTarget: 'Increased band resistance' }
        ]
      }
    ]
  };
}

// Mocking some trends for the dashboard charts
export const MOCK_TRENDS = {
  strengthLSI: [
    { week: 'Wk 7', lsi: 52 },
    { week: 'Wk 8', lsi: 58 },
    { week: 'Wk 9', lsi: 61 },
    { week: 'Wk 10', lsi: 65 },
    { week: 'Wk 11', lsi: 68 }, // Current
  ],
  rom: [
    { week: 'Wk 7', flexion: 105 },
    { week: 'Wk 8', flexion: 112 },
    { week: 'Wk 9', flexion: 120 },
    { week: 'Wk 10', flexion: 125 },
    { week: 'Wk 11', flexion: 130 },
  ]
};

export function calculateReturnToSport() {
  return [
    { category: 'Strength', score: 68, status: 'Warning', explanation: 'Quadriceps LSI is below 80% minimum threshold.' },
    { category: 'Power', score: 42, status: 'Locked', explanation: 'Plyometrics not yet introduced (Phase 3).' },
    { category: 'Control', score: 75, status: 'Good', explanation: 'Single leg balance is adequate for current phase.' },
    { category: 'Running', score: 0, status: 'Locked', explanation: 'Requires Strength LSI > 80% and clearance.' },
    { category: 'Agility', score: 0, status: 'Locked', explanation: 'Requires running phase clearance.' }
  ];
}

export function generateWeeklySchedule() {
  return [
    {
      day: 'Monday',
      type: 'Lower Body Strength A',
      focus: 'Quad / Anterior Dominant',
      blocks: [
        {
          name: 'Warm-up & Aerobic', duration: '15 min',
          exercises: [{ name: 'Stationary Bike', sets: 1, reps: '15 mins', load: 'Zone 2', targetRPE: 4, rationale: 'Synovial fluid flush and aerobic base', progressionTarget: 'Maintain' }]
        },
        {
          name: 'Motor Control & Activation', duration: '15 min',
          exercises: [
            { name: 'Banded Terminal Knee Extensions (TKE)', sets: 3, reps: '15 per leg', load: 'Medium Band', targetRPE: 5, rationale: 'VMO activation and terminal extension re-education for a normal gait', progressionTarget: 'Increase band tension' },
            { name: 'Forward Box Step-Ups', sets: 3, reps: '10 per leg', load: 'Bodyweight', targetRPE: 6, rationale: 'VMO activation and single-leg pelvic stability', progressionTarget: 'Add light dumbbells' }
          ]
        },
        {
          name: 'Main Strength', duration: '30 min',
          exercises: [
            { name: 'Goblet Squat', sets: 3, reps: '8-10', load: '15kg DB', targetRPE: 7, rationale: 'Bilateral strength foundation. Done first as free weights require core stability.', progressionTarget: 'Progress to Barbell next week' },
            { name: 'Single-Leg Leg Press', sets: 4, reps: '10 per leg', load: '30kg', targetRPE: 7, rationale: 'Unilateral quad strength. Limited to 90° to protect meniscus.', progressionTarget: 'Progress load' }
          ]
        },
        {
          name: 'Tendon Capacity', duration: '10 min',
          exercises: [
            { name: 'Isometric Leg Extensions', sets: 3, reps: '45 sec hold', load: '20kg (at 60°)', targetRPE: 7, rationale: 'Build quad tendon capacity without causing harvest-site shear', progressionTarget: 'Increase hold time to 60s' }
          ]
        }
      ]
    },
    {
      day: 'Tuesday',
      type: 'Upper Body Push & Aerobic',
      focus: 'Chest / Shoulders / Triceps',
      blocks: [
        {
          name: 'Aerobic Base', duration: '25 min',
          exercises: [{ name: 'Stationary Bike or Elliptical', sets: 1, reps: '25 mins', load: 'Zone 2-3', targetRPE: 5, rationale: 'Cardiovascular efficiency without knee impact', progressionTarget: 'Increase duration by 5 mins next week' }]
        },
        {
          name: 'Push Hypertrophy', duration: '40 min',
          exercises: [
            { name: 'Decline Bench Press', sets: 3, reps: '10', load: '60kg', targetRPE: 7, rationale: 'Lower chest focus and sternal drive', progressionTarget: 'Progress load' },
            { name: 'Flat Dumbbell Bench Press', sets: 3, reps: '8-10', load: '2x 20kg', targetRPE: 7, rationale: 'Mid-chest horizontal push strength', progressionTarget: 'Maintain' },
            { name: 'Incline Dumbbell Bench Press', sets: 3, reps: '10', load: '2x 15kg', targetRPE: 7, rationale: 'Upper chest and anterior deltoid focus', progressionTarget: 'Maintain' },
            { name: 'Seated Overhead DB Press', sets: 3, reps: '10', load: '2x 15kg', targetRPE: 7, rationale: 'Vertical push strength for shoulders', progressionTarget: 'Maintain' },
            { name: 'Dumbbell Lateral Raises', sets: 3, reps: '15', load: '2x 8kg', targetRPE: 8, rationale: 'Medial deltoid isolation for shoulder width', progressionTarget: 'Maintain' },
            { name: 'Dumbbell Front Raises', sets: 3, reps: '12', load: '2x 8kg', targetRPE: 7, rationale: 'Anterior deltoid exhaustion', progressionTarget: 'Maintain' },
            { name: 'Tricep Rope Pushdowns', sets: 3, reps: '15', load: '15kg', targetRPE: 6, rationale: 'Tricep isolation', progressionTarget: 'Maintain' }
          ]
        }
      ]
    },
    {
      day: 'Wednesday',
      type: 'Active Recovery',
      focus: 'CNS Recovery & Motor Control',
      blocks: [
        {
          name: 'Aerobic Flush', duration: '20 min',
          exercises: [
            { name: 'Stationary Bike or Pool Walking', sets: 1, reps: '20 mins', load: 'Very Light (Zone 1)', targetRPE: 3, rationale: 'Flush metabolic waste from Tuesday and promote blood flow to the healing graft without tissue breakdown', progressionTarget: 'Maintain' }
          ]
        },
        {
          name: 'Core + Balance', duration: '20 min',
          exercises: [
            { name: 'Single Leg Balance on Airex', sets: 3, reps: '45s', load: 'Bodyweight', targetRPE: 4, rationale: 'Proprioception and ankle stability', progressionTarget: 'Close eyes or add ball toss' },
            { name: 'Bird-Dogs', sets: 3, reps: '12 per side', load: 'Bodyweight', targetRPE: 5, rationale: 'Core stability and cross-body coordination', progressionTarget: 'Add resistance band' },
            { name: 'Swiss Ball Planks', sets: 3, reps: '45s', load: 'Bodyweight', targetRPE: 6, rationale: 'Dynamic core stabilization', progressionTarget: 'Stir-the-pot circles' }
          ]
        },
        {
          name: 'Mobility & Joint Health', duration: '15 min',
          exercises: [
            { name: '90/90 Hip Rotations', sets: 2, reps: '10 per side', load: 'Bodyweight', targetRPE: 3, rationale: 'Internal/External hip rotation to prevent knee valgus', progressionTarget: 'Maintain' },
            { name: 'Couch Stretch', sets: 2, reps: '60s per leg', load: 'Bodyweight', targetRPE: 4, rationale: 'Open up the hip flexors and quads after Monday\'s heavy loading', progressionTarget: 'Maintain' }
          ]
        }
      ]
    },
    {
      day: 'Thursday',
      type: 'Lower Body Strength B',
      focus: 'Posterior Chain Dominant',
      blocks: [
        {
          name: 'Warm-up & Aerobic', duration: '15 min',
          exercises: [
            { name: 'Incline Treadmill Walk', sets: 1, reps: '10 mins', load: '10% Incline', targetRPE: 4, rationale: 'Posterior chain activation and cardio', progressionTarget: 'Maintain' },
            { name: 'Reverse Treadmill Walking', sets: 1, reps: '5 mins', load: 'Low speed, high incline', targetRPE: 5, rationale: 'Terminal knee extension, VMO blood flow, and patellar tendon health', progressionTarget: 'Add resistance band or use a sled' }
          ]
        },
        {
          name: 'Main Strength', duration: '30 min',
          exercises: [
            { name: 'Romanian Deadlift (RDL)', sets: 4, reps: '8', load: '50kg', targetRPE: 7, rationale: 'Hamstring & Glute loading (ACL synergists)', progressionTarget: 'Progress load' },
            { name: 'Single-Leg Hip Thrust', sets: 3, reps: '10 per leg', load: 'Bodyweight', targetRPE: 6, rationale: 'Glute Max isolation without knee shear', progressionTarget: 'Add DB to hips' }
          ]
        },
        {
          name: 'Isolation & Capacity', duration: '20 min',
          exercises: [
            { name: 'Prone Hamstring Curl', sets: 3, reps: '10', load: '25kg', targetRPE: 6, rationale: 'Slow eccentrics for tissue capacity', progressionTarget: 'Maintain' },
            { name: 'Seated Hip Adductor Machine (Inner Thigh)', sets: 3, reps: '15', load: '30kg', targetRPE: 7, rationale: 'Adductor strength for medial knee stability', progressionTarget: 'Progress load' },
            { name: 'Seated Hip Abductor Machine (Outer Glute)', sets: 3, reps: '15', load: '30kg', targetRPE: 7, rationale: 'Glute medius/minimus isolation for pelvic control', progressionTarget: 'Progress load' },
            { name: 'Standing Calf Raises', sets: 4, reps: '15', load: '20kg DBs', targetRPE: 7, rationale: 'Ankle strength for future plyometrics', progressionTarget: 'Maintain' },
            { name: 'Tibialis Raises (Tib Raises)', sets: 3, reps: '20', load: 'Bodyweight (Lean against wall)', targetRPE: 6, rationale: 'Crucial for decelerating the foot and absorbing force when you return to running', progressionTarget: 'Move feet further from wall to increase load' }
          ]
        }
      ]
    },
    {
      day: 'Friday',
      type: 'Upper Body Pull & Core',
      focus: 'Back / Biceps / Trunk Stability',
      blocks: [
        {
          name: 'Pull Hypertrophy (Back)', duration: '25 min',
          exercises: [
            { name: 'Pull-ups or Lat Pulldown', sets: 4, reps: '8-10', load: 'Bodyweight / Heavy', targetRPE: 8, rationale: 'Vertical pull for latissimus dorsi width', progressionTarget: 'Add weight if > 10 reps' },
            { name: 'Chest-Supported Dumbbell Row', sets: 3, reps: '10', load: '2x 20kg', targetRPE: 7, rationale: 'Heavy horizontal pull (Supported to save lower back for Saturday)', progressionTarget: 'Progress load' },
            { name: 'Seated Cable Row', sets: 3, reps: '12', load: '45kg', targetRPE: 7, rationale: 'Isolated horizontal pull for mid-back and rhomboids', progressionTarget: 'Maintain' }
          ]
        },
        {
          name: 'Bicep Isolation', duration: '10 min',
          exercises: [
            { name: 'Dumbbell Bicep Curls', sets: 3, reps: '12', load: '2x 12.5kg', targetRPE: 7, rationale: 'Biceps brachii isolation', progressionTarget: 'Maintain' },
            { name: 'Hammer Curls', sets: 3, reps: '15', load: '2x 10kg', targetRPE: 7, rationale: 'Brachialis and forearm development', progressionTarget: 'Maintain' }
          ]
        },
        {
          name: 'Core Stability', duration: '15 min',
          exercises: [
            { name: 'Deadbugs', sets: 3, reps: '20', load: 'Bodyweight', targetRPE: 5, rationale: 'Anti-extension core control', progressionTarget: 'Maintain' },
            { name: 'Side Planks', sets: 3, reps: '30s per side', load: 'Bodyweight', targetRPE: 6, rationale: 'Lateral trunk stability for running mechanics', progressionTarget: 'Maintain' }
          ]
        }
      ]
    },
    {
      day: 'Saturday',
      type: 'Athletic Integration',
      focus: 'Full Body Movement Patterns',
      blocks: [
        {
          name: 'Athletic Coordination & Conditioning', duration: '30 min',
          exercises: [
            { name: 'Agility Ladder Drills (Linear Only)', sets: 4, reps: '2 mins', load: 'Bodyweight', targetRPE: 6, rationale: 'Foot speed and neuromuscular coordination. Straight lines only, no cutting.', progressionTarget: 'Increase foot speed' },
            { name: 'Sled Push', sets: 5, reps: '20m', load: 'Heavy', targetRPE: 8, rationale: 'Deceleration and force transfer', progressionTarget: 'Add 10kg next week' }
          ]
        },
        {
          name: 'Abdominals & Core', duration: '15 min',
          exercises: [
            { name: 'Hanging Knee Raises', sets: 3, reps: '15', load: 'Bodyweight', targetRPE: 7, rationale: 'Lower rectus abdominis focus and grip strength', progressionTarget: 'Straight leg raises' },
            { name: 'Cable Woodchoppers (or Russian Twists)', sets: 3, reps: '12 per side', load: 'Moderate Cable Weight', targetRPE: 7, rationale: 'Oblique isolation and rotational strength', progressionTarget: 'Progress load' },
            { name: 'Weighted Planks', sets: 3, reps: '60s', load: 'Bodyweight / 10kg plate', targetRPE: 8, rationale: 'Standard elbow plank with a weight plate on your back.', progressionTarget: 'Maintain' }
          ]
        }
      ]
    },
    {
      day: 'Sunday',
      type: 'Complete Rest',
      focus: 'Recovery',
      blocks: []
    }
  ];
}
