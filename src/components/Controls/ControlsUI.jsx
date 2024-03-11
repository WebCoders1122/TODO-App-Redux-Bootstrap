//bootstrap
import { Button } from "react-bootstrap";
//firebase context
import { useFirebase } from "../../context/Firebase";

export const ControlsUI = ({
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

      <div className='actions d-flex gap-2 justify-content-center my-2'>
        <Button
          variant='warning'
          onClick={() => changeSortOption("task")}>
          Sort by Name
        </Button>

        <Button
          variant='warning'
          onClick={() => changeSortOption("time")}>
          Sort By Time
        </Button>
        <Button
          variant='success'
          onClick={() => handleTaskStatus(true)}>
          Completed Tasks
        </Button>
        <Button
          variant='danger'
          onClick={() => handleTaskStatus(false)}>
          Pending Tasks
        </Button>
      </div>
    </>
  );
};
