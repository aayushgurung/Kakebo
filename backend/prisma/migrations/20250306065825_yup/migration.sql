/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FixedCostItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GoalAndIntention` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_user_id_fkey";

-- DropForeignKey
ALTER TABLE "FixedCostItem" DROP CONSTRAINT "FixedCostItem_category_id_fkey";

-- DropForeignKey
ALTER TABLE "FixedCostItem" DROP CONSTRAINT "FixedCostItem_income_id_fkey";

-- DropForeignKey
ALTER TABLE "FixedCostItem" DROP CONSTRAINT "FixedCostItem_user_id_fkey";

-- DropForeignKey
ALTER TABLE "GoalAndIntention" DROP CONSTRAINT "GoalAndIntention_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "FixedCostItem";

-- DropTable
DROP TABLE "GoalAndIntention";

-- DropTable
DROP TABLE "Income";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_del_flg" TEXT NOT NULL DEFAULT 'N',
    "is_active_flg" TEXT NOT NULL DEFAULT 'Y',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "is_active_flg" TEXT NOT NULL DEFAULT 'N',

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "type" TEXT,
    "is_recurring_flg" TEXT NOT NULL DEFAULT 'N',

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fixedCostItem" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_cost" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "income_id" INTEGER NOT NULL,

    CONSTRAINT "fixedCostItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goalAndIntention" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goal_type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "additional_info" JSONB,
    "is_achieved_flg" TEXT NOT NULL DEFAULT 'N',

    CONSTRAINT "goalAndIntention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "income" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "income" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "is_del_flg" TEXT NOT NULL DEFAULT 'N',

    CONSTRAINT "income_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixedCostItem" ADD CONSTRAINT "fixedCostItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixedCostItem" ADD CONSTRAINT "fixedCostItem_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixedCostItem" ADD CONSTRAINT "fixedCostItem_income_id_fkey" FOREIGN KEY ("income_id") REFERENCES "income"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goalAndIntention" ADD CONSTRAINT "goalAndIntention_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
