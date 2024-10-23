import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import {
  joinRoomAction,
  loginSuccessAction,
  logoutUserAction,
  setLoggedInUserDetailsAction,
} from "../services/actions/userActions";

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
  setLoggedInUserDetails: (userData) => {
    dispatch(loginSuccessAction());
    dispatch(setLoggedInUserDetailsAction(userData));
  },
  LogoutUser: () => dispatch(logoutUserAction()),
  joinRoom: (data) => dispatch(joinRoomAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
