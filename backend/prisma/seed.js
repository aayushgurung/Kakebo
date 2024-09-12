// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      name: "John Doe",
      username: "JohnDoe123",
      password: "123456789",
      createdAt: new Date(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane.smith@example.com",
      name: "Jane Smith",
      username: "JaneSmith12",
      password: "123456789",
      createdAt: new Date(),
    },
  });

  // Create some categories
  const essentialCategory = await prisma.category.create({
    data: {
      name: "Rent",
      type: "Essential",
    },
  });

  const entertainmentCategory = await prisma.category.create({
    data: {
      name: "Movies",
      type: "Entertainment",
    },
  });

  // Create permanent cost items
  await prisma.permanentCostItem.create({
    data: {
      userId: user1.id,
      itemName: "Internet",
      itemCost: 50.0,
      month: "September",
      year: 2024,
    },
  });

  // Create budgets
  await prisma.budget.create({
    data: {
      userId: user1.id,
      month: "September",
      year: 2024,
      totalIncome: 3000.0,
      fixedCosts: 500.0,
      savingGoal: 200.0,
      availableFunds: 2300.0,
    },
  });

  // Create weekly budgets
  await prisma.weeklyBudget.create({
    data: {
      userId: user1.id,
      weekNumber: 1,
      month: "September",
      year: 2024,
      disposalAmount: 500.0,
    },
  });

  // Create weekly transactions
  await prisma.weeklyTransaction.create({
    data: {
      userId: user1.id,
      categoryId: essentialCategory.id,
      amount: 150.0,
      date: new Date("2024-09-01T00:00:00Z"),
      weekNumber: 1,
      month: "September",
      year: 2024,
      description: "Grocery shopping.",
    },
  });

  // Create goals and intentions
  await prisma.goalAndIntention.create({
    data: {
      userId: user1.id,
      month: "September",
      year: 2024,
      goalType: "Savings",
      amount: 300.0,
      description: "Save money for emergency fund.",
    },
  });

  // Create questions and answers
  const question1 = await prisma.question.create({
    data: {
      questionText: "On what items of expenses are you planning to save?",
    },
  });

  await prisma.answer.create({
    data: {
      goalId: 1, // Assuming goal_id is 1 for the created goal
      questionId: question1.id,
      answerText: "I plan to save on dining out and entertainment.",
    },
  });

  // Create monthly summary
  await prisma.monthlySummary.create({
    data: {
      userId: user1.id,
      month: "September",
      year: 2024,
      income: 3000.0,
      totalExpenses: 500.0,
      totalSavings: 300.0,
      disposable: 2300.0,
      fixedCosts: 50.0, // Total from permanent_cost_items
    },
  });

  // Create daily spending
  await prisma.dailySpending.create({
    data: {
      userId: user1.id,
      date: new Date("2024-09-01"),
      dayOfWeek: "Sunday",
      category: "Essentials",
      amount: 75.0,
      description: "Bought groceries.",
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
