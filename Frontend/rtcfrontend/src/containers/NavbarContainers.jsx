import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import {
  loginSuccessAction,
  logoutUserAction,
  setLoggedInUserDetailsAction,
} from "../services/actions/Action";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  setLoggedInUserDetails: (userData) => {
    dispatch(loginSuccessAction());
    dispatch(setLoggedInUserDetailsAction(userData));
  },
  LogoutUser: () => dispatch(logoutUserAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
