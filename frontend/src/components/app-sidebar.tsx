import {
  Book,
  BriefcaseBusiness,
  Grip,
  ReceiptText,
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

// Menu items.
const items = [
  {
    title: "Personal Details",
    index: 1,
    icon: UserPen,
  },
  {
    title: "Summary",
    index: 2,
    icon: ReceiptText,
  },
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
];

export function AppSidebar() {
  const updateState = useFormStore((state) => state.updateState);
  const changeFormType = (index: number) => {
    updateState(index);
  };
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl my-4 flex  justify-start p-3 cursor-pointer">
            Resume Details
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-10   ">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-lg flex p-3 mt-4 cursor-pointer"
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
