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

type TextEditorProps = {
  onTextEditorChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextEditor: React.FC<TextEditorProps> = ({ onTextEditorChange }) => {
  const [value, setValue] = useState("");

  function onChange(e) {
    setValue(e.target.value);
    onTextEditorChange(e);
  }

  return (
    <div>
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
    </div>
  );
};

export default TextEditor;
