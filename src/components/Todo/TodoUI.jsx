import React, { useState, useEffect } from "react";
import "./App.css";
//firestore imports
import { useFirebase } from "../../context/Firebase.jsx";
//components
import Controls from "../Controls/Controls.jsx";
import TaskList from "../TaskList/TaskList.jsx";
import Navigation from "../Nav/Nav.jsx";
//constants
import { pageSize } from "../../constants.js";

export function TodoUI({
  currentPage,
  sortOption,
  taskStatus,
  search,
  filter,
  firstDoc,
  lastDoc,
  dispatch,
}) {
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
        dispatch({ type: "SET_FIRST", payload: allDocuments[0] });
        dispatch({
          type: "SET_LAST",
          payload: allDocuments[allDocuments.length - 1],
        });
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
