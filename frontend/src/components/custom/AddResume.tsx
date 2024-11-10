import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <div
        className="border p-10 py-24 items-center flex justify-center shadow-md hover:cursor-pointer bg-gray-100 rounded-lg h-60 hover:scale-105 hover:shadow-lg transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <PlusCircle className="text-gray-800" />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-openSans text-customDarkBlue font-bold">
              Create a New Resume
            </DialogTitle>
            <DialogDescription>
              <div className="my-4">
                <p className="text-gray-400 font-openSans  text-sm">
                  Write a Title for your resume
                </p>
                <Input
                  className="mt-2 text-customDarkBlue font-openSans"
                  placeholder="Eg. SDE Resume"
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setOpenDialog(false)}
              className="bg-gray-400 outline-double hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button className="bg-blue-900 hover:bg-customDarkBlue">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddResume;
