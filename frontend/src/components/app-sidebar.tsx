import {
  Book,
  BriefcaseBusiness,
  Grip,
  MonitorCheck,
  UserPen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useFormStore from "@/store/store";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Personal Details",
    index: 1,
    icon: UserPen,
  },
  // {
  //   title: "Summary",
  //   index: 2,
  //   icon: ReceiptText,
  // },
  {
    title: "Experience",
    index: 3,
    icon: BriefcaseBusiness,
  },
  {
    title: "Education",
    index: 4,
    icon: Book,
  },
  {
    title: "Skills",
    index: 5,
    icon: Grip,
  },
  {
    title: "Projects",
    index: 6,
    icon: MonitorCheck,
  },
];

export function AppSidebar() {
  const updateState = useFormStore((state) => state.updateState);
  const [active, setActive] = useState(1);
  const changeFormType = (index: number) => {
    updateState(index);
    setActive(index);
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-4">
            <div className="flex items-center gap-x-2 hover:cursor-pointer p-4 ">
              <img src="/logo.svg" width={30} height={30} alt="logo" />
              <h1 className="font-openSans font-semibold text-xl">
                Resume Buddy
              </h1>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-10">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      `text-lg flex p-3 mt-4 cursor-pointer hover:scale-105 transition-all hover:font-semibold ${
                        active == item.index
                          ? "bg-white text-customDarkBlue"
                          : ""
                      }`
                    )}
                  >
                    <div onClick={() => changeFormType(item.index)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
