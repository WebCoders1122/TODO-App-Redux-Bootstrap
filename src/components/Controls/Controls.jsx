import React, { useState } from "react";
import { connect } from "react-redux";
//pagesize
import { pageSize } from "../../constants";
import { ControlsUI } from "./ControlsUI";

// to add new task
const addTask = (task, dispatch, tasks, firebase) => {
  if (task.task == "") return alert("Please Enter a Task");
  firebase.storeTasksToFirebase(task);
  if (tasks.length < pageSize) {
    dispatch({ type: "ADD", payload: task });
  } else {
    alert("Task added in the last Page");
  }
  dispatch({ type: "SET_TASK", payload: { task: "", complete: false } });
};

// to masortOptionp dispatch and state to props
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    addTask: (task, tasks, firebase) => {
      addTask(task, dispatch, tasks, firebase);
    },
    changeSortOption: (newSortOption) => {
      dispatch({ type: "SORT", payload: newSortOption });
    },
    handleTaskStatus: (TaskStatus) => {
      dispatch({ type: "STATUS_SEARCH", payload: TaskStatus });
    },
    handleSearch: (search, sortOption) => {
      if (search == "") {
        dispatch({ type: "SORT", payload: sortOption });
      } else {
        dispatch({ type: "SEARCH", payload: search });
      }
    },
  };
};
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    newTask: state.newTask,
    sortOption: state.sortOption,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlsUI);
