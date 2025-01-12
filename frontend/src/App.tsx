import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";
import { ScaleLoader } from "react-spinners";
import Header from "./components/custom/Header";

function App() {
  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r bg-backgroundColor">
        <ScaleLoader
          color={"#2563eb"}
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
      <Header />
      <Outlet />
    </>
  );
}

export default App;
