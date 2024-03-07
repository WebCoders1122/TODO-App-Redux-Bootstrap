import React from "react";
import "./App.css";
//bootstrap
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  //total task array
  const [tasks, setTasks] = useState(["sample Task", "sample Task 2"]);
  //new task
  const [newTask, setNewTask] = useState("");

  //function to add newTask to "task array"
  const addTask = (task) => {
    if (task == "") return alert("Please Enter a Task");
    const newTasks = [...tasks];
    newTasks.push(task);
    setTasks(newTasks);
    setNewTask("");
  };

  //funtion to delete task from "task array"
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className='App m-2'>
      <input
        className='form-control'
        type='text'
        name='task'
        value={newTask}
        placeholder='Enter New Task Here'
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className='btn btn-success w-100'
        onClick={() => addTask(newTask)}>
        Add Task
      </button>
      <ListGroup>
        {tasks.map((task, index) => {
          return (
            <ListGroup.Item
              key={index}
              onClick={() => deleteTask(index)}>
              {task}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default App;
