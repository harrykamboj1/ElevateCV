// import { Button } from "../ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";
import AccountDropDown from "./AccountDropDown";

const Header = () => {
  // const { isSignedIn } = useAuth();
  // const navigate = useNavigate();
  // const LogOut = () => {
  //   localStorage.removeItem("token");
  //   toast.success("Logout Successfully");
  //   navigate("/auth/sign-in");
  // };
  return (
    <>
      <Toaster />
      <div className="static w-full p-3 px-5 justify-between flex shadow-md bg-[#0d0d0d]">
        <a href="/" className="flex items-center gap-x-4 hover:cursor-pointer">
          <img src="/tufLogo.png" width={35} height={35} alt="logo" />
          <h1 className="text-2xl font-semibold font-dmSans text-white  leading-none mb-4 mt-3">
            Resume Builder
          </h1>
        </a>
        {/* {!isSignedIn ? (
          <Link to={"/auth/sign-in"}>
            <Button className="flex items-center  font-dmSans font-semibold rounded-lg px-10 py-2.5 border-2 border-red-600 bg-red-600 hover:bg-red-700">
              Get Started
            </Button>
          </Link>
        ) : (
          <Button
            className="flex items-center  font-dmSans font-semibold rounded-lg px-10 py-2.5 border-2 border-red-600 bg-red-600 hover:bg-red-700"
            onClick={() => LogOut()}
          >
            Logout
          </Button>
        )} */}
        <AccountDropDown />
      </div>
    </>
  );
};

export default Header;
