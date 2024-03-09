import React, { useState, useEffect } from "react";
import "./App.css";
//bootstrap
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

//firestore imports
import { useFirebase } from "./context/Firebase.jsx";

function App() {
  //total task array
  const [tasks, setTasks] = useState([]);
  //new task
  const [newTask, setNewTask] = useState({ task: "", complete: false });
  // to sort tasks
  const [sortOption, setSortOption] = useState("complete");

  //firebase veriables
  const firebase = useFirebase();

  //to store and get tasks from firestore
  useEffect(() => {
    const firebaseTasks = [];
    firebase.getTasksFromFirebase(sortOption).then((res) => {
      res.docs.map((task) => {
        firebaseTasks.push(task.data());
      });
      setTasks(firebaseTasks);
    });
    console.log("useEffect");
  }, [firebase, sortOption]);

  // to change sortOption
  const changeSortOption = (newSortOption) => {
    setSortOption(newSortOption);
  };

  //function to add, delete, update newTask to "task array"
  const addTask = (task) => {
    if (task.task == "") return alert("Please Enter a Task");
    firebase.storeTasksToFirebase(task);
    setTasks([...tasks, task]);
    setNewTask({ task: "", complete: false });
  };
  const deleteTask = (index) => {
    firebase.deleteTasksFromFirebase(tasks[index]);
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  const updateTask = (index) => {
    firebase.UpdateTasksInFirebase(tasks[index]);
    const newTasks = [...tasks];
    newTasks.splice(index, 1, {
      ...newTasks[index],
      complete: !newTasks[index].complete,
    });
    setTasks(newTasks);
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
      <Dropdown className='m-2 '>
        <Dropdown.Toggle
          variant='warning'
          id='dropdown-basic'>
          Sort Tasks By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => changeSortOption("task")}>
            Name
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeSortOption("time")}>
            Time
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeSortOption("complete")}>
            Complete/ Pending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
