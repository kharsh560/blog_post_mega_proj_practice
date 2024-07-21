import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      {/* NOTE: In the TINY-MCE RTE editor; it was compelling me/the admin to add api keys. See this issue:- */}
      {/* my api keys {8nm03ok1hrybuha04rprdszsnk7mkhghzm8pyziucah8ih0x} */}
      {/* Error ehich I was getting: 
      "A valid API key is required to continue using TinyMCE.
      Please alert the admin to check the current API key. 
      Click here to learn more-> [https://www.tiny.cloud/docs/tinymce/latest/invalid-api-key/?utm_campaign=no_api_key_learn_more&utm_source=tiny&utm_medium=referral] "
      What would happen without it? -> Starting in early 2024, all editors on our cloud platform will be required to have a valid API key. Without a valid API key, your editor 
      will transition to read-only mode, limiting your ability to make changes.  */}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="8nm03ok1hrybuha04rprdszsnk7mkhghzm8pyziucah8ih0x"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
