import { connect } from "react-redux";
import { TodoUI } from "./TodoUI";

//redux
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    sortOption: state.sortOption,
    taskStatus: state.taskStatus,
    search: state.search,
    filter: state.filter,
    currentPage: state.currentPage,
    firstDoc: state.firstDoc,
    lastDoc: state.lastDoc,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoUI);
