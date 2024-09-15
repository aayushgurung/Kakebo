import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "hashed_password", // Ensure you hash the password appropriately
      salt: "some_salt",
    },
  });

  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      name: "Utilities",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Groceries",
    },
  });

  // Create Budget Period
  const budgetPeriod1 = await prisma.budgetPeriod.create({
    data: {
      user_id: user1.id,
      period_type: "monthly",
      start_date: new Date("2024-09-01"),
      end_date: new Date("2024-09-30"),
      disposal_amount: 500.0,
    },
  });

  // Create WeekMonthTrackings
  await prisma.weekMonthTracking.create({
    data: {
      budget_id: budgetPeriod1.id,
      week_number: 1,
      month_name: "September",
      year: 2024,
    },
  });

  // Create MonthlySummary
  const monthlySummary1 = await prisma.monthlySummary.create({
    data: {
      user_id: user1.id,
      date: new Date("2024-09-01"),
      income: 1000.0,
      total_expenses: 200.0,
      total_savings: 800.0,
      disposable: 500.0,
      description: "September Summary",
    },
  });

  // Create PermanentCostItems
  await prisma.permanentCostItem.create({
    data: {
      user_id: user1.id,
      category_id: category1.id,
      item_name: "Electric Bill",
      item_cost: 75.0,
      monthly_summary_id: monthlySummary1.id, // Use the correct MonthlySummary ID
    },
  });

  // Create Transactions
  await prisma.transaction.create({
    data: {
      user_id: user1.id,
      amount: 100.0,
      description: "Salary",
      type: "income",
    },
  });

  // Create GoalsAndIntentions
  await prisma.goalAndIntention.create({
    data: {
      user_id: user1.id,
      goal_type: "Save Money",
      amount: 200.0,
      description: "Save for vacation",
    },
  });

  // Create DailySpendings
  await prisma.dailySpending.create({
    data: {
      user_id: user1.id,
      date: new Date("2024-09-15"),
      day_of_week: "Sunday",
      category_id: category2.id,
      amount: 50.0,
      description: "Grocery Shopping",
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
