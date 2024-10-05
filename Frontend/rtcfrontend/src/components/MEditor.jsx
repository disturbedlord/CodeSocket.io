import Editor from "@monaco-editor/react";

const MEditor = () => {
  return (
    <div>
      <Editor
        height={"90vh"}
        defaultLanguage="javascript"
        defaultValue="// Write your code here ..."
        theme="vs-dark"
      />
    </div>
  );
};

export default MEditor;
