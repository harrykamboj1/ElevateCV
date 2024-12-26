import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import { aiChatSession } from "../../../service/generativeAi";
import { useExperienceFormStore, useResumeState } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { apiUrl } from "@/lib/constants";

type TextEditorProps = {
  saveValue: string;
  index: number;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onTextEditorChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
const PROMPT =
  "position title: {positionTitle} , Depends on position title and my skills i.e {skills} give me 4-5 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML format and give only one result and remove html tags, just give <ul> tags";
const TextEditor: React.FC<TextEditorProps> = ({
  saveValue,
  index,
  openDialog,
  setOpenDialog,
  onTextEditorChange,
}) => {
  // console.log(index);
  const { experiences, updateExperience } = useExperienceFormStore();
  const updateResumeExp = useResumeState((state) => state.updateExperience);

  const [value, setValue] = useState(`<ul>
      
    </ul>`);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState("");

  useEffect(() => {
    setValue(saveValue);
  }, [saveValue]);
  const onSubmit = async (index: number) => {
    try {
      setLoading(true);
      if (experiences[index].position == "") {
        toast.error("Please mention Position");
        setLoading(false);
        return;
      }
      if (skills == "") {
        toast.error("Please mention Skills");
        setLoading(false);
        return;
      }

      const prompt = PROMPT.replace(
        "{positionTitle}",
        experiences[index].position
      ).replace("{skills}", skills);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("UnAuthorized");
        return;
      }

      await axios
        .get(`${apiUrl}/auth/aiCountCheck`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          if (response.data.errorCode === "1") {
            await aiChatSession.sendMessage(prompt).then((result) => {
              const newEntries = experiences.slice();
              newEntries[index]["responsibilities"] = result.response.text();
              updateExperience(newEntries[index].id, newEntries[index]);
              updateResumeExp(newEntries[index].id, newEntries[index]);
            });
            toast.success("Response fetch Successfully");
          } else {
            toast.error(response.data.message);
          }
        });
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  function onChange(e) {
    setValue(e.target.value);
    onTextEditorChange(e);
  }

  return (
    <div>
      <Toaster />
      <EditorProvider>
        <Editor
          className="border-zinc-500 bg-neutral-950 font-dmSans text-white text-md"
          value={value}
          onChange={(e) => onChange(e)}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <Dialog open={openDialog}>
        <DialogContent className="bg-neutral-900">
          <DialogHeader>
            <DialogTitle className="text-2xl font-dmSans text-white font-bold">
              Generate Summary Based On Your Skills
            </DialogTitle>
            <DialogDescription>
              <div className="my-4">
                <p className="text-red-600 font-dmSans  font-semibold text-md">
                  Mention your skills below
                </p>
                <Input
                  className="mt-2 bg-neutral-950 text-white text-lg font-dmSans"
                  placeholder="Eg. React.js, Next.js, Spring Boot"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setOpenDialog(false)}
              className="bg-neutral-600  rounded-md flex items-center px-8  hover:bg-neutral-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSubmit(index)}
              disabled={!skills}
              className="flex items-center  rounded-md px-8 text-md font-dmSans py-2.5 border-2 border-red-600 bg-red-600 hover:bg-red-700"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Generate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TextEditor;
