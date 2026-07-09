import { PrismaClient } from '@prisma/client'
import { seedPhasesAndWeeks } from './phaseSeeder'

export async function seedProtocol(prisma: PrismaClient) {
  const protocol = await prisma.protocol.create({
    data: {
      name: "ACL Reconstruction + Meniscus Repair + LEAT",
      description: "Professional elite sports rehabilitation protocol designed for cricketers returning to sport post multi-ligament surgery."
    }
  });

  await seedPhasesAndWeeks(prisma, protocol.id);

  console.log("Seeded protocol: ACL Reconstruction + Meniscus Repair + LEAT");
  
  return protocol;
}
