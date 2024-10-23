import { connect } from "react-redux";
import { resetUserStoreAction } from "../services/actions/userActions";
import Home from "../components/Home";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  resetUserStore: () => dispatch(resetUserStoreAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
