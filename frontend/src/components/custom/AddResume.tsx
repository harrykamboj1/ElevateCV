import { Loader2, PlusCircle } from "lucide-react";
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
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { apiUrl, FailFlag } from "@/lib/constants";
import { useNavigate } from "react-router-dom";

interface AddResumeProps {
  email: string;
}

const AddResume: React.FC<AddResumeProps> = ({ email }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${apiUrl}/resume/create`,
        { email, title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (response.data.errorCode == FailFlag) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <>
      <Toaster />
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
                  onChange={(e) => setTitle(e.target.value)}
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
            <Button
              onClick={() => onSubmit()}
              disabled={!title}
              className="bg-blue-900 hover:bg-customDarkBlue"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddResume;
