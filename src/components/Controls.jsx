import React from "react";
import { Dropdown } from "react-bootstrap";

const Controls = ({
  newTask,
  setNewTask,
  addTask,
  changeSortOption,
  handleTaskStatus,
  handleSearch,
  search,
}) => {
  return (
    <>
      <input
        className='form-control my-2'
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
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </>
  );
};

export default Controls;
