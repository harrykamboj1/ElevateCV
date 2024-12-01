import React, { useState } from "react";
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
import { useExperienceFormStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type TextEditorProps = {
  index: number;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onTextEditorChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
const PROMPT =
  "position title: {positionTitle} , Depends on position title and my skills i.e {skills} give me 4-5 bullet points for my experience in resume (Please do not add experince level and No JSON array), give me result in HTML format and give only one result and donot include html tag just give <ul> tags";
const TextEditor: React.FC<TextEditorProps> = ({
  index,
  openDialog,
  setOpenDialog,
  onTextEditorChange,
}) => {
  const { experiences } = useExperienceFormStore();
  const [value, setValue] = useState(`<ul>
      <li>Led the front-end development of a new React.js application, resulting in a 25% increase in user conversion rates.</li>
      <li>Developed and maintained backend services using Node.js and Express.js, ensuring high availability and performance.</li>
      <li>Implemented a new authentication system, improving security and user experience.</li>
      <li>Collaborated with designers and backend developers to deliver a high-quality, user-friendly product.</li>
    </ul>`);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState("");

  const onSubmit = async () => {
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

      await aiChatSession.sendMessage(prompt).then((response) => {
        console.log(response.response.text());
        setValue(response.response.text());
      });
      toast.success("Response fetch Successfully");
      setLoading(false);
      setOpenDialog(false);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
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
        <Editor value={value} onChange={(e) => onChange(e)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-openSans text-customDarkBlue font-bold">
              Generate Summary Based On Your Skills
            </DialogTitle>
            <DialogDescription>
              <div className="my-4">
                <p className="text-gray-400 font-openSans  text-sm">
                  Mention your skills below
                </p>
                <Input
                  className="mt-2 text-customDarkBlue font-openSans focus:border-2 focus-visible:ring-transparent border-customDarkBlue"
                  placeholder="Eg. React.js, Next.js, Spring Boot"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setOpenDialog(false)}
              className="bg-gray-700 outline-double hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSubmit()}
              disabled={!skills}
              className="bg-blue-900 hover:bg-customDarkBlue"
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
