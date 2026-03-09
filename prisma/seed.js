const { PrismaClient, PaymentMethod, Status } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: { name: "Edie Wilson", phone: "3055551001" },
    }),
    prisma.customer.create({
      data: { name: "Carlos Ramirez", phone: "3055551002" },
    }),
    prisma.customer.create({
      data: { name: "Ana Martinez", phone: "3055551003" },
    }),
    prisma.customer.create({
      data: { name: "Luis Gonzalez", phone: "3055551004" },
    }),
    prisma.customer.create({
      data: { name: "James Thomas", phone: "3055551005" },
    }),
  ]);

  const layaways = [];

  layaways.push(
    await prisma.layaway.create({
      data: {
        item: "14K Gold Cuban Chain",
        description: "14K yellow gold 6mm Cuban link chain",
        value: 1200,
        downPayment: 300,
        outstandingDebt: 900,
        status: Status.OPEN,
        packageCode: "PKG-1001",
        setReminder: true,
        customerId: customers[0].id,
      },
    }),
  );

  layaways.push(
    await prisma.layaway.create({
      data: {
        item: "Diamond Engagement Ring",
        description: "1.0 carat round diamond engagement ring",
        value: 3500,
        downPayment: 800,
        outstandingDebt: 2700,
        status: Status.OPEN,
        packageCode: "PKG-1002",
        setReminder: true,
        customerId: customers[1].id,
      },
    }),
  );

  layaways.push(
    await prisma.layaway.create({
      data: {
        item: "Gold Hoop Earrings",
        description: "14K gold large hoop earrings",
        value: 450,
        downPayment: 100,
        outstandingDebt: 350,
        status: Status.OPEN,
        packageCode: "PKG-1003",
        setReminder: false,
        customerId: customers[2].id,
      },
    }),
  );

  layaways.push(
    await prisma.layaway.create({
      data: {
        item: "Gold Name Necklace",
        description: "Custom 14K gold name necklace",
        value: 650,
        downPayment: 200,
        outstandingDebt: 450,
        status: Status.OPEN,
        packageCode: "PKG-1004",
        setReminder: true,
        customerId: customers[3].id,
      },
    }),
  );

  layaways.push(
    await prisma.layaway.create({
      data: {
        item: "Diamond Tennis Bracelet",
        description: "2.5 carat diamond tennis bracelet",
        value: 2800,
        downPayment: 600,
        outstandingDebt: 2200,
        status: Status.OPEN,
        packageCode: "PKG-1005",
        setReminder: true,
        customerId: customers[4].id,
      },
    }),
  );

  layaways.push(
    await prisma.layaway.create({
      data: {
        item: "Gold Figaro Chain",
        description: "10K gold Figaro chain",
        value: 900,
        downPayment: 200,
        outstandingDebt: 700,
        status: Status.OPEN,
        packageCode: "PKG-1006",
        setReminder: false,
        customerId: customers[0].id,
      },
    }),
  );

  layaways.push(
    await prisma.layaway.create({
      data: {
        item: "Diamond Stud Earrings",
        description: "0.75 carat diamond stud earrings",
        value: 1500,
        downPayment: 300,
        outstandingDebt: 1200,
        status: Status.OPEN,
        packageCode: "PKG-1007",
        setReminder: true,
        customerId: customers[2].id,
      },
    }),
  );

  layaways.push(
    await prisma.layaway.create({
      data: {
        item: "Gold Rope Bracelet",
        description: "14K gold rope bracelet",
        value: 700,
        downPayment: 150,
        outstandingDebt: 550,
        status: Status.OPEN,
        packageCode: "PKG-1008",
        setReminder: false,
        customerId: customers[3].id,
      },
    }),
  );

  // Payments
  await prisma.payment.createMany({
    data: [
      {
        amount: 150,
        paymentMethod: PaymentMethod.CASH,
        layawayId: layaways[0].id,
        customerId: customers[0].id,
      },
      {
        amount: 200,
        paymentMethod: PaymentMethod.CARD,
        layawayId: layaways[1].id,
        customerId: customers[1].id,
      },
      {
        amount: 100,
        paymentMethod: PaymentMethod.CASH,
        layawayId: layaways[2].id,
        customerId: customers[2].id,
      },
      {
        amount: 75,
        paymentMethod: PaymentMethod.CARD,
        layawayId: layaways[3].id,
        customerId: customers[3].id,
      },
      {
        amount: 250,
        paymentMethod: PaymentMethod.CASH,
        layawayId: layaways[4].id,
        customerId: customers[4].id,
      },
      {
        amount: 100,
        paymentMethod: PaymentMethod.CASH,
        layawayId: layaways[5].id,
        customerId: customers[0].id,
      },
    ],
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
