import React from "react";
import { connect } from "react-redux";
import { TaskListUI } from "./TaskListUI";

const deleteTask = (index, tasks, firebase, dispatch) => {
  firebase.deleteTasksFromFirebase(tasks[index]);
  const newTasks = [...tasks];
  newTasks.splice(index, 1);
  dispatch({ type: "SET_LIST", payload: newTasks });
};
const updateTask = (index, tasks, firebase, dispatch) => {
  firebase.UpdateTasksInFirebase(tasks[index]);
  const newTasks = [...tasks];
  newTasks.splice(index, 1, {
    ...newTasks[index],
    complete: !newTasks[index].complete,
  });
  dispatch({ type: "SET_LIST", payload: newTasks });
};

const mapStateToProps = (state) => {
  return { tasks: state.tasks };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (index, tasks, firebase) => {
      updateTask(index, tasks, firebase, dispatch);
    },
    deleteTask: (index, tasks, firebase) => {
      deleteTask(index, tasks, firebase, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListUI);
