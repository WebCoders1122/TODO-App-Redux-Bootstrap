import React, { useState } from "react";
import { connect } from "react-redux";
//bootstrap
import { Dropdown } from "react-bootstrap";
//firebase context
import { useFirebase } from "../context/Firebase";

const pageSize = 8;

const Controls = ({
  tasks,
  newTask,
  addTask,
  dispatch,
  sortOption,
  changeSortOption,
  handleTaskStatus,
  handleSearch,
  search,
}) => {
  //firebase
  const firebase = useFirebase();
  return (
    <>
      <input
        className='form-control my-2'
        type='text'
        name='task'
        value={newTask.task}
        placeholder='Enter New Task Here'
        onChange={(e) =>
          dispatch({
            type: "SET_TASK",
            payload: { ...newTask, [e.target.name]: e.target.value },
          })
        }
      />
      <button
        className='btn btn-success w-100'
        onClick={() => addTask(newTask, tasks, firebase)}>
        Add Task
      </button>
      <Dropdown className='my-2 '>
        <Dropdown.Toggle
          variant='warning'
          id='dropdown-basic'>
          Sort Tasks By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => changeSortOption("task")}>
            Sort by Name
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeSortOption("time")}>
            Sort By Time
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleTaskStatus(true)}>
            Completed Tasks
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleTaskStatus(false)}>
            Pending Tasks
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className='search my-2'>
        <input
          className='form-control'
          type='text'
          name='search'
          value={search}
          placeholder='Search Task Here'
          onChange={(e) => handleSearch(e.target.value, sortOption)}
        />
      </div>
    </>
  );
};
// to add new task
const addTask = (task, dispatch, tasks, firebase) => {
  if (task.task == "") return alert("Please Enter a Task");
  firebase.storeTasksToFirebase(task);
  if (tasks.length < pageSize) {
    dispatch({ type: "SET_LIST", payload: [...tasks, task] });
  } else {
    alert("Task added in the last Page");
  }
  dispatch({ type: "SET_TASK", payload: { task: "", complete: false } });
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

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
