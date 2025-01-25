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

const DashboardLayout = () => {
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleOutsideClick = () => {
    setIsAlertOpen(true);
  };

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
                        <CardHeader>
                          <CardTitle>Income</CardTitle>
                          <CardDescription>
                            Add your Income here.
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
                                    <SelectItem value="salary">
                                      Salary
                                    </SelectItem>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="bonus">Bonus</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="description">Description</Label>
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
                                    <SelectItem value="extra">Extra</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="description">Description</Label>
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
