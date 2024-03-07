import React, { useState } from "react";
import "./App.css";
//bootstrap
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//local storage library
import localforage from "localforage";
import { useEffect } from "react";

function App() {
  //total task array
  const [tasks, setTasks] = useState([{ task: "", complete: false }]);
  //new task
  const [newTask, setNewTask] = useState({ task: "", complete: false });

  //to store and get tasks from local storage
  useEffect(() => {
    localforage.getItem("tasks-112#13ds3", (err, tasks) => {
      tasks ? setTasks(tasks) : console.log(err);
    });
  }, []);

  const storeTasks = (Tasks) => {
    setTasks(Tasks);
    localforage.setItem("tasks-112#13ds3", Tasks, (err) => {
      console.log(err);
    });
  };

  //function to add, delete, update newTask to "task array"
  const addTask = (task) => {
    if (task.task == "") return alert("Please Enter a Task");
    const newTasks = [...tasks];
    newTasks.push(task);
    storeTasks(newTasks);
    setNewTask({ task: "", complete: false });
  };
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    storeTasks(newTasks);
  };
  const updateTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1, {
      task: newTasks[index].task,
      complete: !newTasks[index].complete,
    });
    storeTasks(newTasks);
  };
  return (
    <div className='App m-2'>
      <input
        className='form-control'
        type='text'
        name='task'
        value={newTask.task}
        placeholder='Enter New Task Here'
        onChange={(e) =>
          setNewTask({ ...newTask, [e.target.name]: e.target.value })
        }
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
              variant={task.complete ? "success" : ""}
              key={index}
              onClick={() => updateTask(index)}
              onDoubleClick={() => deleteTask(index)}>
              {task.task}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default App;
