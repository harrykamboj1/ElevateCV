import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { ScaleLoader } from "react-spinners";
import useAuth from "./hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";

const RootLayout = () => {
  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r bg-white">
        <ScaleLoader
          color={"#072354"}
          height={60}
          width={10}
          radius={6}
          margin={4}
        />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <Header />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};

export default RootLayout;