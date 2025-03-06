import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar"; // Assuming AppSidebar is defined elsewhere.
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { setDate, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required",
  }),
  amount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 1, {
      message: "Amount must be a number greater than 1.",
    }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(500, { message: "Description must not exceed 500 characters." })
    .optional(),
  category: z.string({
    required_error: "Please select a Category.",
  }),
});

const DashboardLayout = () => {
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleOutsideClick = () => {
    setIsAlertOpen(true);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // Sending a POST request using fetch
      const response = await fetch("http://localhost:3000/api/add-income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Handle success, e.g., show success toast
      toast({
        title: "Data Submitted Successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      // Handle error, e.g., show error toast
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex h-screen bg-back60">
      <SidebarProvider>
        {/* Sidebar */}
        <AppSidebar /> {/* ShadCN Sidebar */}
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className=" py-4 flex justify-between items-center gap-4 pe-12 ps-4 border-b">
            <div className="font-semibold text-black-100 flex flex-row items-center">
              <SidebarTrigger />
              Dashboard
            </div>
            <div className="flex gap-4">
              <Dialog
                open={isMainDialogOpen}
                onOpenChange={setIsMainDialogOpen}
                
              >
                <DialogTrigger asChild>
                  <Button className="bg-prim10 hover:bg-second30 gap-2 px-[14px] py-[10px] text-base rounded-full">
                    Add <Plus />
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="sm:max-w-[800px] lg:max-w-[800px]"
                  onInteractOutside={(event) => {
                    event.preventDefault();
                    handleOutsideClick();
                  }}
                  setIsAlertOpen={setIsAlertOpen}
                  setIsMainDialogOpen={setIsMainDialogOpen}
                >
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                      
                    >
                      <Tabs defaultValue="income">
                        <TabsList className="grid w-full grid-cols-2 gap-2">
                          <TabsTrigger
                            className="data-[state=active]:bg-transparent data-[state=active]:border-blue-500 border-2 data-[state=active]:text-second30 data-[state=active]:shadow-md"
                            value="income"
                          >
                            Income
                          </TabsTrigger>
                          <TabsTrigger
                            className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:border-orange-500 border-2 data-[state=active]:shadow-md"
                            value="expense"
                          >
                            Expense
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="income">
                          <Card>
                            <CardHeader className="px-6 py-4">
                              <CardTitle className="text-body-md">
                                Income
                              </CardTitle>
                              <CardDescription>
                                Add your Income here.
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="grid grid-cols-2 gap-4">
                                {/* <Label htmlFor="date">Date</Label> */}
                                <FormField
                                  control={form.control}
                                  name="dob"
                                  render={({ field }) => (
                                    <FormItem>
                                      <div className="space-y-1 flex flex-col gap-2 justify-between">
                                        <FormLabel>Date</FormLabel>
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <FormControl>
                                              <Button
                                                variant={"outline"}
                                                className={cn(
                                                  "justify-start text-left font-normal",
                                                  !field.value &&
                                                    "text-muted-foreground"
                                                )}
                                              >
                                                <CalendarIcon />
                                                {field.value ? (
                                                  format(field.value, "PPP")
                                                ) : (
                                                  <span>Pick a date</span>
                                                )}
                                              </Button>
                                            </FormControl>
                                          </DialogTrigger>
                                          <DialogContent
                                            className="sm:max-w-fit justify-center"
                                            overlayClass="bg-transparent"
                                          >
                                            <DialogHeader>
                                              <DialogDescription>
                                                Pick a Date
                                              </DialogDescription>
                                            </DialogHeader>
                                            <Calendar
                                              mode="single"
                                              selected={field.value}
                                              onSelect={field.onChange}
                                              initialFocus
                                              className="bg-white rounded-md border "
                                            />
                                          </DialogContent>
                                        </Dialog>
                                        <FormDescription>
                                          This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                      </div>
                                    </FormItem>
                                  )}
                                />
                                {/* </div> */}
                                <FormField
                                  control={form.control}
                                  name="amount"
                                  render={({ field }) => (
                                    <FormItem>
                                      <div className="space-y-1">
                                        <Label htmlFor="amount">Amount</Label>
                                        <FormControl>
                                          <Input
                                            id="amount"
                                            placeholder="eg. 45"
                                            {...field}
                                          />
                                        </FormControl>
                                      </div>
                                      <FormDescription>
                                        This is your public display name.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="category"
                                  render={({ field }) => (
                                    <FormItem>
                                      <div className="space-y-1">
                                        <Label htmlFor="category">
                                          Category
                                        </Label>
                                        <FormControl>
                                          <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                          >
                                            <SelectTrigger className="w-full">
                                              <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectGroup>
                                                <SelectLabel>
                                                  Category
                                                </SelectLabel>
                                                <SelectItem value="salary">
                                                  Salary
                                                </SelectItem>
                                                <SelectItem value="cash">
                                                  Cash
                                                </SelectItem>
                                                <SelectItem value="bonus">
                                                  Bonus
                                                </SelectItem>
                                              </SelectGroup>
                                            </SelectContent>
                                          </Select>
                                        </FormControl>
                                      </div>
                                      <FormDescription>
                                        This is your public display name.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <div className="space-y-1">
                                        <Label htmlFor="description">
                                          Amount
                                        </Label>
                                        <FormControl>
                                          <Input
                                            id="description"
                                            placeholder="descriptlion"
                                            {...field}
                                          />
                                        </FormControl>
                                      </div>
                                      <FormDescription>
                                        This is your public display name.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </CardContent>

                            <CardFooter className="pb-0">
                              <Button
                                className="bg-prim10 hover:bg-accent400"
                                type="submit"
                              >
                                Save changes
                              </Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                        <TabsContent value="expense">
                          <Card>
                            <CardHeader>
                              <CardTitle>Expense</CardTitle>
                              <CardDescription>
                                Add your Expense here.
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1 flex flex-col gap-2 justify-between">
                                  <Label htmlFor="date">Date</Label>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "justify-start text-left font-normal",
                                          !date && "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon />
                                        {date ? (
                                          format(date, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent
                                      className="sm:max-w-fit justify-center"
                                      overlayClass="bg-transparent"
                                    >
                                      <DialogHeader>
                                        <DialogDescription>
                                          Pick a Date
                                        </DialogDescription>
                                      </DialogHeader>
                                      <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        className="bg-white rounded-md border "
                                      />
                                    </DialogContent>
                                  </Dialog>
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="amount">Amount</Label>
                                  <Input id="amount" placeholder="eg. 45" />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="category">Category</Label>
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="essential">
                                          Essential
                                        </SelectItem>
                                        <SelectItem value="optional">
                                          Optional
                                        </SelectItem>
                                        <SelectItem value="leisure">
                                          Leisure
                                        </SelectItem>
                                        <SelectItem value="extra">
                                          Extra
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="description">
                                    Description
                                  </Label>
                                  <Input
                                    id="description"
                                    placeholder="Enter description"
                                  />
                                </div>
                              </div>
                            </CardContent>

                            <CardFooter className="pb-0">
                              <Button>Save changes</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                      </Tabs>
                      {/* <FormDescription>
                              Your date of birth is used to calculate your age.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Outside Click Detected</AlertDialogTitle>
                    <AlertDialogDescription>
                      You clicked outside the main dialog. Do you want to
                      continue?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => {
                        setIsAlertOpen(false); // Close the alert dialog
                        setIsMainDialogOpen(true); // Close the main dialog (optional)
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setIsAlertOpen(false); // Close the alert dialog
                        setIsMainDialogOpen(false); // Close the main dialog (optional)
                      }}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Dynamic Content */}
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
