
import { Toaster } from "react-hot-toast";
import AccountDropDown from "./AccountDropDown";
import { Wrapper } from "./Wrapper";

const Header = () => {

  return (
    <>
      <Toaster />
      <Wrapper>
        <div
          id="header"
          className="static top-0 z-50 mt-2  w-full px- justify-between flex shadow-md bg-backgroundColor"
        >
          <a href="/" className="flex items-center gap-x-4 hover:cursor-pointer">
            <h1 className="text-2xl font-semibold font-dmSans text-white  leading-none mb-4 mt-3">
              100x Resume Buddy
            </h1>
          </a>

          <AccountDropDown />
        </div>
      </Wrapper>
    </>
  );
};

export default Header;
