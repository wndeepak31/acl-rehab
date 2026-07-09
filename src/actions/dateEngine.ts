"use server";

import { prisma } from "@/lib/db";
import { differenceInDays, getISODay } from "date-fns";

export async function calculateAthleteDateStatus(userEmail: string) {
  // 1. Fetch User and Protocol
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: { athleteProfile: true, protocols: true }
  });

  if (!user || !user.athleteProfile) throw new Error("Athlete profile not found");
  
  const protocolRecord = user.protocols[0];
  if (!protocolRecord) throw new Error("No active protocol");

  // 2. Date Math
  const today = new Date();
  const surgeryDate = user.athleteProfile.surgeryDate;
  
  // Calculate exact days
  const daysSinceSurgery = differenceInDays(today, surgeryDate);
  
  // Calculate week (1-indexed based on days, Week 1 is days 0-6)
  const weekNumber = Math.floor(daysSinceSurgery / 7) + 1;
  
  // Day of week (1=Monday...7=Sunday) using date-fns getISODay
  const dayOfWeek = getISODay(today);

  // 3. Find Phase
  const phase = await prisma.phase.findFirst({
    where: {
      protocolId: protocolRecord.protocolId,
      startWeek: { lte: weekNumber },
      endWeek: { gte: weekNumber }
    }
  });

  return {
    daysSinceSurgery,
    weekNumber,
    dayOfWeek,
    phaseName: phase?.name || "Unknown Phase",
    protocolId: protocolRecord.protocolId,
    userId: user.id
  };
}
