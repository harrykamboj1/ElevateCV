import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl, SuccessFlag } from "@/lib/constants";
import { Toaster } from "../ui/toaster";

const AccountDropDown = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    navigate("/auth/sign-in");
  };

  const DeleteAccountAction = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios
        .post(
          `${apiUrl}/auth/delete`,
          { email: user!.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.errorCode === SuccessFlag) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        });
    } catch (e) {
      console.log("Error while deleting the resume :: " + e);
      toast.error("Something went wrong");
    } finally {
      setAlertOpen(false);
      setOpen(false);
    }
  };

  const handleOpenChange = () => {
    console.log(open);
    setOpen(!open);
  };

  if (isLoading || user == null) {
    return <div></div>;
  }

  return (
    <>
      <Toaster />
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="bg-neutral-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-dmSans text-white font-bold">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-red-600 font-dmSans  font-semibold text-md">
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-600  rounded-md flex items-center px-8  hover:bg-neutral-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="flex items-center  rounded-md px-8 text-md font-dmSans py-2.5 border-2 border-red-600 bg-red-600 hover:bg-red-700"
              onClick={async () => {
                await DeleteAccountAction();
                setAlertOpen(false);
                navigate("/");
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex gap-4">
        <DropdownMenu open={open} onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center bg-transparent cursor-pointer gap-2">
              <Avatar>
                <AvatarFallback className="bg-customDarkGrey border-2 border-neutral-600 font-dmSans text-white">
                  {user!.name.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              {open ? (
                <IoIosArrowUp className="text-white" />
              ) : (
                <IoIosArrowDown className="text-white" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 bg-customDarkGrey text-white hover:bg-black">
            <DropdownMenuItem onClick={() => LogOut()}>
              <BiLogOut className="mr-2 h-5 w-5" />
              Sign Out
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setAlertOpen(true);
              }}
            >
              <MdDeleteForever className="mr-2 h-5 w-5" /> Delete Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default AccountDropDown;
