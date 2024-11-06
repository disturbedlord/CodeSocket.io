import { saveEditorValue } from "../constants";

export const saveEditorAction = (data) => {
  return {
    type: saveEditorValue,
    value: data,
  };
};
