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
function App({
  currentPage,
  sortOption,
  taskStatus,
  search,
  filter,
  pageSize,
  dispatch,
}) {
  //for pagination
  const [firstDoc, setFirstDoc] = useState(null); // this is 1st visible document
  const [lastDoc, setLastDoc] = useState(null); // this is last visible document

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
        dispatch({ type: "SET_LIST", payload: firebaseTasks });
      });
  }, [sortOption, filter, search, taskStatus, currentPage]);

  return (
    <div className='App m-2'>
      <Controls />
      <TaskList />
      <Navigation />
    </div>
  );
}

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
    pageSize: state.pageSize,
    currentPage: state.currentPage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
