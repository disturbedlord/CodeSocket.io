import { connect } from "react-redux";
import MEditor from "../components/MEditor";
import { getRoomCodeAction } from "../services/actions/userActions";
import { saveEditorAction } from "../services/actions/editorActions";

const mapStateToProps = (state) => ({
  user: state.user,
  editor: state.editor,
});

const mapDispatchToProps = (dispatch) => ({
  getRoomCode: () => dispatch(getRoomCodeAction()),
  saveEditorText: (value) => dispatch(saveEditorAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MEditor);
