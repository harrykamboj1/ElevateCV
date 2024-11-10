import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";
import { ScaleLoader } from "react-spinners";

function App() {
  const { isLoading, isSignedIn, user } = useAuth();

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
      <Outlet />
    </>
  );
}

export default App;
