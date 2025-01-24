import { Home, Calendar, Search, Settings, Wallet } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
const items = [
  { title: "Home", url: "/dashboard/home", icon: Home },
  { title: "Budget", url: "/dashboard/budget", icon: Wallet },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
  { title: "Search", url: "/dashboard/search", icon: Search },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="text-lg py-5 text-second30 flex items-center">
              {" "}
              <Wallet className="mr-2" size={16} />{" "}
              <p className="font-bold">KAKEBO</p>
            </div>
          </SidebarGroupLabel>
          {/* <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={item.url === location.pathname}
                >
                  <NavLink to={item.url} className={}>
                    <item.icon />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu> */}
          <SidebarMenu className="px-12 gap-2">
            {items.map((item) => {
              const isActive = item.url === location.pathname;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-2 p-2 rounded-md ${
                        isActive
                          ? " text-second30"
                          : "hover:bg-blue40 text-black80"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          isActive ? "text-second30" : "text-black80"
                        }`}
                      />
                      <span className="font-semibold text-base ">
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
