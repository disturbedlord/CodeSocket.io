import { connect } from "react-redux";
import MEditor from "../components/MEditor";
import { getRoomCodeAction } from "../services/actions/userActions";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getRoomCode: () => dispatch(getRoomCodeAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MEditor);
