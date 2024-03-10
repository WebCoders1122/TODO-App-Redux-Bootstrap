import React from "react";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <ListGroup>
      {tasks.map((task, index) => {
        return (
          <ListGroup.Item
            variant={task.complete ? "success" : ""}
            key={index}
            onClick={() => updateTask(index)}
            onDoubleClick={() => deleteTask(index)}>
            {task.task}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

const mapStateToProps = (state) => {
  return { tasks: state.tasks };
};

export default connect(mapStateToProps)(TaskList);
