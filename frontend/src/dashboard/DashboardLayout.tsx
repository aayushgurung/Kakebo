import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar"; // Assuming AppSidebar is defined elsewhere.
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = () => {
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
              <Button className="bg-prim10 hover:bg-second30 gap-2 px-[14px] py-[10px] text-base rounded-full">
                Add <Plus />
              </Button>
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
