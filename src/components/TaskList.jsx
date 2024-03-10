import React from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { useFirebase } from "../context/Firebase";

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  const firebase = useFirebase();
  return (
    <ListGroup>
      {tasks.map((task, index) => {
        return (
          <ListGroup.Item
            variant={task.complete ? "success" : ""}
            key={index}
            onClick={() => updateTask(index, tasks, firebase)}
            onDoubleClick={() => deleteTask(index, tasks, firebase)}>
            {task.task}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
