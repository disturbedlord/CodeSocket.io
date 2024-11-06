import { saveEditorValue } from "../constants";

const editorState = {
  value: "",
};

export default function editorReducer(state = editorState, action) {
  switch (action.type) {
    case saveEditorValue:
      return { ...state, value: action.value };
    default:
      return state;
  }
}
