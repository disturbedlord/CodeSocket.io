import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import { isLogin } from "../services/actions/Action";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  showLogin: () => dispatch(isLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
