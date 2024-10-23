import Editor, { useMonaco } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import socketService from "../services/UIServices/socketServices";

// const MEditor = (props1) => {
//   console.warn(props1);
//   const [roomCode, setRoomCode] = useState("ROOM");
//   const [editorData, setEditorData] = useState("");
//   const editorRef = useRef(null);
//   const monaco = useMonaco();

//   const OnCodeChange = (roomCode1) => {
//     console.log("EE : ", editorData);
//     socketService.sendMessage("code-change", [
//       roomCode1,
//       editorRef.current.getValue(),
//     ]);
//   };

//   let socket = useRef(null);
//   socket.current = socketService.getSocketConnection();

//   useEffect(() => {
//     if (monaco) {
//       console.log("here is the monaco instance:", monaco);
//       monaco.editor;
//     }
//     if (props1.user) {
//       setRoomCode(props1.user.roomCode);
//     }
//   }, [props1]);

//   return (
//     <div>
//       <div>{roomCode}</div>
//       <Editor
//         height={"90vh"}
//         defaultLanguage="javascript"
//         defaultValue={roomCode}
//         theme="vs-dark"
//         onMount={(editor) => {
//           editorRef.current = editor;
//           console.log("ON MOUNT EDITOR", editor, props1);
//           editorRef.current.onDidType((e) => console.log(e, props1));
//         }}
//         onChange={(e, x, y) => console.log("ONCHANGE : ", e, x, y)}
//       />
//     </div>
//   );
// };

class MEditor extends React.Component {
  constructor(props) {
    super(props);

    this.editorRef = React.createRef(null);
    this.socket = React.createRef(null);
  }

  componentDidMount() {
    socketService.connectTopic("code-change", (msg) => {
      console.log("CODEUPDATE12 : ", msg, this.socket);
      if (msg.sender !== this.socket.current.id) {
        const currentPosition = this.editorRef.current.getPosition();
        this.editorRef.current.setValue(msg.message);
        this.editorRef.current.setPosition(currentPosition);
      }
    });
  }

  componentDidUpdate() {
    // socketService.connectTopic("code-update", (e) => {
    //   console.log("CODEUPDATE1 : ", e);
    //   this.editorRef.current.setValue(e);
    // });
  }

  onEditorDidMount = (editor) => {
    this.editorRef.current = editor;
    this.socket.current = socketService.getSocketConnection();
    console.log(this.editorRef.current);
    editor.onKeyUp((e) => {
      console.log(editor.getValue(), this.props);
      console.log("KEYUP");
      socketService.sendMessage("code-change", [
        this.props.user.roomCode,
        this.editorRef.current.getValue(),
      ]);
    });
  };

  render() {
    return (
      <div>
        <Editor
          height={"90vh"}
          defaultLanguage="javascript"
          defaultValue={"Hi"}
          theme="vs-dark"
          onMount={this.onEditorDidMount}
        />
      </div>
    );
  }
}

// const MEditor = (props) => {
//   return
// }
export default MEditor;
