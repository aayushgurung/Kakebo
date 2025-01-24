import Tile from "../components/Tile";
import {
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  PiggyBank,
  Receipt,
} from "lucide-react";
("use client");

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
const chartData = [
  { month: "January", income: 186, expense: 80 },
  { month: "February", income: 305, expense: 200 },
  { month: "March", income: 237, expense: 120 },
  { month: "April", income: 73, expense: 190 },
  { month: "May", income: 209, expense: 130 },
  { month: "June", income: 214, expense: 140 },
];

const chartConfig = {
  income: {
    label: "Income ($)",
    color: "var(--blue-400)",
  },
  expense: {
    label: "Expense ($)",
    color: "var(--accent-400)",
  },
} satisfies ChartConfig;

const fixedCostItems = [
  {
    date: "2025-01-01",
    itemName: "Internet",
    amount: "$250.00",
  },
  {
    date: "2025-01-02",
    itemName: "Garbage",
    amount: "$150.00",
  },
  {
    date: "2025-01-03",
    itemName: "Rent",
    amount: "$350.00",
  },
  {
    date: "2025-01-04",
    itemName: "Vitamins",
    amount: "$450.00",
  },
  {
    date: "2025-01-05",
    itemName: "Electricity",
    amount: "$550.00",
  },
  {
    date: "2025-01-06",
    itemName: "Pending",
    amount: "$200.00",
  },
  {
    date: "2025-01-07",
    itemName: "Unpaid",
    amount: "$300.00",
  },
];

const transactionHistory = [
  {
    category: "Food",
    date: "2025-01-12",
    itemName: "Groceries",
    amount: "$150.00",
  },
  {
    category: "Transport",
    date: "2025-01-13",
    itemName: "Gas",
    amount: "$40.00",
  },
  {
    category: "Utilities",
    date: "2025-01-14",
    itemName: "Electric Bill",
    amount: "$100.00",
  },
  {
    category: "Entertainment",
    date: "2025-01-15",
    itemName: "Movie Tickets",
    amount: "$30.00",
  },
  {
    category: "Healthcare",
    date: "2025-01-16",
    itemName: "Doctor Visit",
    amount: "$200.00",
  },
  {
    category: "Shopping",
    date: "2025-01-17",
    itemName: "Clothes",
    amount: "$120.00",
  },
  {
    category: "Education",
    date: "2025-01-18",
    itemName: "Books",
    amount: "$80.00",
  },
  {
    category: "Food",
    date: "2025-01-19",
    itemName: "Dinner",
    amount: "$70.00",
  },
  {
    category: "Subscriptions",
    date: "2025-01-20",
    itemName: "Streaming Service",
    amount: "$15.00",
  },
  {
    category: "Transport",
    date: "2025-01-21",
    itemName: "Bus Pass",
    amount: "$50.00",
  },
];

const Home = () => {
  return (
    <>
      <div className="flex gap-6 flex-col">
        <div className="flex text-base">
          <div className="text-black80">
            Welcome to Kakebo Finance Management.
          </div>
        </div>
        {/* Section 1 */}
        <div className="flex gap-6 lg:flex-row flex-col">
          <Tile amount={50000} title="INCOME" icon={CircleDollarSign} />
          <Tile amount={3000} title="EXPENSE" icon={Receipt} />
          <Tile amount={2000} title="SAVING GOAL" icon={PiggyBank} />
          <Tile amount={7000} title="REMAINING BUDGET" icon={CreditCard} />
        </div>
        {/* Section 2 */}
        <div className="flex gap-6 lg:flex-row flex-col">
          <Tile className="lg:w-3/5 w-full">
            <Card className="shadow-none drop-shadow-none">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-black100">
                  Expenses Vs Income
                </CardTitle>
                <CardDescription className="text-black80">
                  January - June 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ChartContainer
                  config={chartConfig}
                  className="max-h-[230px] min-h-[200px] w-full"
                >
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar
                      dataKey="income"
                      fill="var(--color-income)"
                      radius={4}
                      height={1}
                    />
                    <Bar
                      dataKey="expense"
                      fill="var(--color-expense)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col p-0 items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Expenses decreased by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" color="#53dd5a" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Comparing monthly income and expenses for the last 6 months{" "}
                </div>
              </CardFooter>
            </Card>
          </Tile>
          <Tile className="lg:w-2/5 w-full"></Tile>
        </div>
        {/* Section 3 */}
        <div className="flex gap-6 lg:flex-row flex-col">
          <Tile className="lg:w-2/5 w-full">
            <div className="text-black100 text-xl font-semibold">
              Fixed Costs
            </div>
            <div>
              <ScrollArea className="max-h-72 h-72">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fixedCostItems.map((item) => (
                      <TableRow key={item.date}>
                        <TableCell className="font-medium">
                          {item.date}
                        </TableCell>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell className="text-right">
                          {item.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </Tile>
          <Tile className="lg:w-3/5 w-full">
            <div className="text-black100 text-xl font-semibold flex items-center justify-between">
              <p>Transaction History </p>
              <Button
                variant={"ghost"}
                className="text-blue700 hover:bg-accent50 hover:text-blue700"
              >
                See All
                <ChevronRight />
              </Button>
            </div>
            <div>
              <ScrollArea className="max-h-72 h-72">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionHistory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.category}
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell className="text-right">
                          {item.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </Tile>
        </div>
      </div>
    </>
  );
};

export default Home;
