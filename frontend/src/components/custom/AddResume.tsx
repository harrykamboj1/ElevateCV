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
import { useResumeState } from "@/store/store";

interface AddResumeProps {
  email: string;
}

const AddResume: React.FC<AddResumeProps> = ({ email }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const personal = useResumeState((state) => state.personal);
  const education = useResumeState((state) => state.education);
  const experience = useResumeState((state) => state.experience);
  const skills = useResumeState((state) => state.skills);
  const projects = useResumeState((state) => state.projects);
  const sectionOrder = useResumeState((state) => state.sectionOrder);

  const onSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${apiUrl}/resume/create`,
        {
          email,
          title,
          personal,
          education,
          skills,
          experience,
          projects,
          sectionOrder,
        },
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
        navigate(`/dashboard/resume/edit/${response.data.resume.resumeId}`);
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Toaster />

      <div
        className="flex-col space-y-3 rounded border relative flex aspect-[1/1.4142]  cursor-pointer items-center justify-center bg-[#171725] p-0 hover:scale-105 transition-all shadow-md hover:shadow-xl "
        onClick={() => setOpenDialog(true)}
      >
        <PlusCircle className="text-white text-lg" />
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="bg-customDarkBlue">
          <DialogHeader>
            <DialogTitle className="text-2xl font-dmSans text-white font-bold">
              Create a New Resume
            </DialogTitle>
            <DialogDescription>
              <div className="my-4">
                <p className="text-blue-600 font-dmSans  font-semibold text-md">
                  Write a Title for your resume
                </p>
                <Input
                  className="mt-2 bg-backgroundColor text-white text-lg font-dmSans"
                  placeholder="Eg. SDE Resume"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setOpenDialog(false)}
              className="bg-neutral-700  rounded-md flex items-center px-8  hover:bg-neutral-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSubmit()}
              disabled={!title}
              className="flex items-center  rounded-md px-8 text-md font-dmSans py-2.5 border-2 border-blue-600 bg-blue-600 hover:bg-blue-700"
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
