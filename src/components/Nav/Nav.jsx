import { connect } from "react-redux";
import { NavigationUI } from "./NavUI";

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    nextPage: () => {
      dispatch({ type: "NEXT" });
    },
    previousPage: () => {
      dispatch({ type: "PREV" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationUI);
