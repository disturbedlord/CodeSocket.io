import Editor from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "../app.css";
import SocketService from "../services/UIServices/socketServices";
import { isNull } from "./Common/Utility";

class MEditor extends React.Component {
  constructor(props) {
    super(props);

    this.editorRef = React.createRef(null);
    this.socket = React.createRef(null);
  }

  createCustomCursorPerUser = (client, idx) => {
    console.log("::::", client);
    const { position, id } = client;
    return {
      range: new monaco.Range(
        position.lineNumber,
        position.column - 1,
        position.lineNumber,
        position.column
      ),
      options: {
        inlineClassName: `CursorDecoration${idx}`,

        hoverMessage: { value: `${id}` },
      },
    };
  };

  componentDidMount() {
    console.warn("Loader Initialized");
  }

  componentDidUpdate() {
    SocketService.connectTopic("code-change", (msg) => {
      console.log("CODEUPDATE12 : ", msg, this.socket, this.editorRef);
      if (msg.sender !== this.socket.current.id) {
        const lastPosition = this.editorRef.current.getPosition();
        // console.log("CC", currentPosition);
        this.editorRef.current.setValue(msg.message);
        //this.editorRef.current.setPosition(lastPosition);

        let idx = 1;
        let decorationCollection = [];

        var sortedClient = Object.keys(msg.roomDetails).sort(
          (a, b) => msg.roomDetails[a].order - msg.roomDetails[b].order
        );
        for (var client of sortedClient) {
          decorationCollection.push(
            this.createCustomCursorPerUser(msg.roomDetails[client], idx++)
          );
        }

        // for (var client in msg.roomDetails) {
        //   console.log("::CLIENT::", client);
        //   decorationCollection.push(
        //     this.createCustomCursorPerUser(
        //       msg.roomDetails[client].position,
        //       idx
        //     )
        //   );
        //   idx++;
        // }
        console.log(decorationCollection);
        this.editorRef.current.createDecorationsCollection(
          decorationCollection
        );
      }
    });
  }

  onEditorDidMount = (editor) => {
    this.editorRef.current = editor;
    this.socket.current = SocketService.getSocketConnection();
    console.log(this.editorRef.current);
    editor.onKeyUp((e) => {
      console.log(editor.getValue(), this.props);
      console.log("KEYUP");
      SocketService.sendMessage("code-change", {
        roomCode: this.props.user.roomCode,
        changeText: this.editorRef.current.getValue(),
        cursorPosition: this.editorRef.current.getPosition(),
      });
      this.props.saveEditorText(editor.getValue());
    });
    // editor.onMouseDown((e) => this.editorref.current.)
  };

  render() {
    return (
      <div>
        <Editor
          key={"unique"}
          height={"90vh"}
          defaultLanguage="javascript"
          defaultValue={
            isNull(this.props.editor.value)
              ? `// the hello world program\nconsole.log('Welcome to codeSocket.io 🔥🔥');`
              : this.props.editor.value
          }
          theme="vs-dark"
          onMount={this.onEditorDidMount}
          options={{
            wordWrap: "on",
          }}
        />
      </div>
    );
  }
}

// const MEditor = (props) => {
//   return
// }
export default MEditor;
