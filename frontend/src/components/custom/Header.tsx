import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    navigate("/auth/sign-in");
  };
  return (
    <>
      <Toaster />
      <div className="p-3 px-5 justify-between flex shadow-md ">
        <div className="flex items-center gap-x-2 hover:cursor-pointer">
          <img src="/logo.svg" width={35} height={35} alt="logo" />
          <h1 className="font-openSans font-semibold text-2xl">Resume Buddy</h1>
        </div>
        {!isSignedIn ? (
          <Link to={"/auth/sign-in"}>
            <Button className="bg-blue-800 hover:bg-blue-900">
              Get Started
            </Button>
          </Link>
        ) : (
          <Button
            className="bg-blue-800 hover:bg-blue-900"
            onClick={() => LogOut()}
          >
            Logout
          </Button>
        )}
      </div>
    </>
  );
};

export default Header;
