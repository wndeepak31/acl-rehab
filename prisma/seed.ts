import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { seedExercises } from './seeders/exerciseSeeder'
import { seedWorkouts } from './seeders/workoutSeeder'
import { seedProtocol } from './seeders/protocol'

// Setup Prisma with Pg adapter since neon requires it for Prisma 7
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Starting DB Seed...")

  // Clean DB
  await prisma.workoutLog.deleteMany()
  await prisma.workoutExercise.deleteMany()
  await prisma.day.deleteMany()
  await prisma.week.deleteMany()
  await prisma.phase.deleteMany()
  await prisma.userProtocol.deleteMany()
  await prisma.protocol.deleteMany()
  await prisma.workoutTemplate.deleteMany()
  await prisma.weightProgression.deleteMany()
  await prisma.exerciseLibrary.deleteMany()
  await prisma.athleteProfile.deleteMany()
  await prisma.user.deleteMany()

  // 1. Seed Exercises
  await seedExercises(prisma)

  // 2. Seed Workouts
  await seedWorkouts(prisma)

  // 3. Seed Protocol, Phases, Weeks, Days
  const protocol = await seedProtocol(prisma)

  // 4. Create dummy user
  const user = await prisma.user.create({
    data: {
      email: "athlete@example.com",
      name: "John Doe",
      role: "ATHLETE",
      athleteProfile: {
        create: {
          surgeryDate: new Date("2026-04-22T00:00:00Z"), // 78 days before July 9
          surgeryType: "ACL Reconstruction + Meniscus Repair",
          age: 24,
          height: 180,
          weight: 75,
          sport: "Cricket",
          level: "Professional",
          dominantLeg: "Right",
          surgeon: "Dr. Smith",
          hospital: "Elite Sports Institute"
        }
      },
      protocols: {
        create: {
          protocolId: protocol.id,
          startDate: new Date("2026-04-22T00:00:00Z")
        }
      }
    }
  })

  // 5. Seed Initial Weight Progressions
  const legPress = await prisma.exerciseLibrary.findFirst({ where: { name: "Leg Press" } })
  if (legPress) {
    await prisma.weightProgression.create({
      data: {
        userId: user.id,
        exerciseId: legPress.id,
        currentWeight: 40,
        targetWeight: 44,
        increasePercentage: 0.10, // 10% next week
        lastSuccessfulWeight: 40
      }
    })
  }

  console.log("DB Seed Completed Successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
