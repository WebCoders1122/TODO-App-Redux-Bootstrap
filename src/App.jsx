import React, { useState, useEffect } from "react";
import "./App.css";
//firestore imports
import { useFirebase } from "./context/Firebase.jsx";
//components
import Controls from "./components/Controls.jsx";
import TaskList from "./components/TaskList.jsx";
import Navigation from "./components/Nav.jsx";

//redux
import store from "./app/store.js";
import { connect } from "react-redux";

//redux
function App({ tasks }) {
  // const tasks = store.getState().tasks;
  const setTasks = (task) => {
    store.dispatch({ type: "SET_LIST", payload: task });
  };
  //total task array
  //new task
  const [newTask, setNewTask] = useState({ task: "", complete: false });
  // to sort tasks
  const [sortOption, setSortOption] = useState("time");
  // search
  const [search, setSearch] = useState("");
  const [taskStatus, setTaskStatus] = useState(false);
  // to check which search query will be executed in firebase.getTasksFromFirebase()
  const [filter, setFilter] = useState(1);
  //for pagination
  const [firstDoc, setFirstDoc] = useState(null); // this is 1st visible document
  const [lastDoc, setLastDoc] = useState(null); // this is last visible document
  const [currentPage, setCurrentPage] = useState(1); //to trigger useEffect on page change
  const [pageSize, setPageSize] = useState(8);

  //firebase veriables
  const firebase = useFirebase();

  //to store and get tasks from firestore
  useEffect(() => {
    const firebaseTasks = [];
    const allDocuments = []; // these are all documents fetched for current page without extracting data
    firebase
      .getTasksFromFirebase(
        sortOption,
        search,
        filter,
        taskStatus,
        lastDoc,
        firstDoc,
        pageSize
      )
      .then((res) => {
        res.docs.map((task) => {
          firebaseTasks.push(task.data());
          allDocuments.push(task);
        });
        setFirstDoc(allDocuments[0]);
        setLastDoc(allDocuments[allDocuments.length - 1]);
        setTasks(firebaseTasks);
      });
  }, [sortOption, filter, search, taskStatus, currentPage]);

  // to change sortOption
  const changeSortOption = (newSortOption) => {
    setSortOption(newSortOption);
    setFilter(1);
  };
  // handle search
  const handleSearch = (search) => {
    if (search == "") {
      setSearch("");
      return setFilter(1);
    } else {
      setSearch(search);
      setFilter(2);
    }
  };
  // handle task Status ie. completed or un completed
  const handleTaskStatus = (newStatus) => {
    setFilter(3);
    setTaskStatus(newStatus);
  };

  //function to add, delete, update newTask to "task array"
  const addTask = (task) => {
    if (task.task == "") return alert("Please Enter a Task");
    firebase.storeTasksToFirebase(task);
    if (tasks.length < pageSize) {
      setTasks([...tasks, task]);
    } else {
      alert("Task added in the last Page");
    }
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

  //for pagination
  const previousPage = () => {
    setFilter(5);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    setFilter(4);
    if (tasks.length == pageSize) {
      setCurrentPage(currentPage + 1);
    }
  };

  // props of all compenets
  const controlProps = {
    newTask,
    setNewTask,
    addTask,
    changeSortOption,
    handleTaskStatus,
    handleSearch,
    search,
  };
  const NavigationProps = { previousPage, nextPage, currentPage };
  return (
    <div className='App m-2'>
      <Controls {...controlProps} />
      <TaskList />
      <Navigation {...NavigationProps} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { tasks: state.tasks };
};

export default connect(mapStateToProps)(App);
