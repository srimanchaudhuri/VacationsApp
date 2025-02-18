import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const packages = [
  {
    name: "Sikkim Holiday Package",
    destination: "Sikkim",
    description: "Spend your time in the hills and valleys of Sikkim, a 5-day holiday package.",
    price: 4000,
    days: 5,
    isAvailable: true,
    bookedTill: new Date('2025-12-31'),
    maxStrength: 20,
  },
  {
    name: "Manali Holiday Package",
    destination: "Manali",
    description: "Escape to the snow-capped mountains of Manali, a 6-day holiday package.",
    price: 8000,
    days: 6,
    isAvailable: true,
    bookedTill: new Date('2025-11-30'),
    maxStrength: 15,
  },
  {
    name: "Kerala Backwaters",
    destination: "Kerala",
    description: "Relax on the serene backwaters of Kerala, a 4-day holiday package.",
    price: 6000,
    days: 4,
    isAvailable: true,
    bookedTill: new Date('2025-10-20'),
    maxStrength: 25,
  },
  {
    name: "Goa Beach Getaway",
    destination: "Goa",
    description: "Unwind on the sandy beaches of Goa, a 5-day holiday package.",
    price: 7000,
    days: 5,
    isAvailable: true,
    bookedTill: new Date('2025-09-15'),
    maxStrength: 30,
  },
  {
    name: "Shimla Adventure",
    destination: "Shimla",
    description: "Experience the thrill of adventure sports in Shimla, a 3-day holiday package.",
    price: 5500,
    days: 3,
    isAvailable: true,
    bookedTill: new Date('2025-08-10'),
    maxStrength: 10,
  },
  {
    name: "Rajasthan Desert Safari",
    destination: "Rajasthan",
    description: "Explore the golden sands of Rajasthan, a 4-day holiday package.",
    price: 7500,
    days: 4,
    isAvailable: true,
    bookedTill: new Date('2025-07-05'),
    maxStrength: 20,
  }
];

async function main() {
  console.log('Start seeding ...');

  for (const pkg of packages) {
    const packageData = await prisma.packages.create({
      data: {
        ...pkg,
        userId: 2, // Associate with the created user
      },
    });
    console.log(`Created package with id: ${packageData.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
