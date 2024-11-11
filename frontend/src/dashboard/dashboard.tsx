import AddResume from "@/components/custom/AddResume";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const Dashboard = () => {
  const { user, isSignedIn, isLoading } = useAuth();

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
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="font-openSans text-customDarkBlue font-bold text-xl">
        My Resume
      </h1>
      <p className="font-openSans text-gray-500 text-sm">
        Build your brand-new resume in as little as 3 minutes.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-3 mt-10">
        <AddResume email={user!.email} />
      </div>
    </div>
  );
};

export default Dashboard;
