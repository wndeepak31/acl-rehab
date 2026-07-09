import { PrismaClient } from '@prisma/client'

export async function seedPhasesAndWeeks(prisma: PrismaClient, protocolId: string) {
  // Fetch workout templates to map them to days
  const templates = await prisma.workoutTemplate.findMany();
  const tmplMap = new Map(templates.map(t => [t.name, t.id]));

  const getTmpl = (name: string) => {
    const id = tmplMap.get(name);
    if (!id) throw new Error(`Template ${name} not found`);
    return id;
  };

  const dayMapping = [
    { dayOfWeek: 1, tmpl: "Day 1 (Monday) - Strength A (Quad)" },
    { dayOfWeek: 2, tmpl: "Day 2 (Tuesday) - Recovery" },
    { dayOfWeek: 3, tmpl: "Day 3 (Wednesday) - Strength B (Posterior)" },
    { dayOfWeek: 4, tmpl: "Day 4 (Thursday) - Recovery" },
    { dayOfWeek: 5, tmpl: "Day 5 (Friday) - Strength A Progression" },
    { dayOfWeek: 6, tmpl: "Day 6 (Saturday) - Athletic Control" },
    { dayOfWeek: 7, tmpl: "Day 7 (Sunday) - Recovery" }
  ];

  const phases = [
    { name: "Protection & Early ROM", start: 1, end: 6 },
    { name: "ROM & Early Strength", start: 7, end: 10 },
    { name: "Strength Building", start: 11, end: 14 },
    { name: "Strength + Jogging", start: 15, end: 18 },
    { name: "Running Progression", start: 19, end: 22 },
    { name: "Jump Training", start: 23, end: 26 },
    { name: "Sprint & Agility", start: 27, end: 30 },
    { name: "Sports Specific (Cricket)", start: 31, end: 36 },
    { name: "Return to Sport", start: 37, end: 52 }
  ];

  for (let i = 0; i < phases.length; i++) {
    const phaseData = phases[i];
    const phase = await prisma.phase.create({
      data: {
        protocolId,
        name: phaseData.name,
        order: i + 1,
        startWeek: phaseData.start,
        endWeek: phaseData.end
      }
    });

    for (let w = phaseData.start; w <= phaseData.end; w++) {
      const week = await prisma.week.create({
        data: {
          phaseId: phase.id,
          weekNum: w
        }
      });

      for (const day of dayMapping) {
        await prisma.day.create({
          data: {
            weekId: week.id,
            dayOfWeek: day.dayOfWeek,
            workoutTemplateId: getTmpl(day.tmpl)
          }
        });
      }
    }
  }

  console.log("Seeded phases, weeks, and days mapped to templates");
}
