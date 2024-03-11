import { createStore } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  newTask: { task: "", complete: false },
  sortOption: "time",
  fitler: 1,
  taskStatus: false,
  search: "",
  pageSize: 8,
  currentPage: 1,
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST":
      return { ...state, tasks: action.payload };
      break;
    case "ADD":
      return { ...state, tasks: [...tasks, action.payload], newTask };
      break;
    case "SET_TASK":
      return { ...state, newTask: action.payload };
      break;
    case "SORT":
      return { ...state, sortOption: action.payload, filter: 1 };
      break;
    case "SEARCH":
      return { ...state, search: action.payload, filter: 2 };
      break;
    case "STATUS_SEARCH":
      return { ...state, taskStatus: action.payload, filter: 3 };
      break;
    case "NEXT":
      if (state.tasks.length == state.pageSize) {
        return { ...state, currentPage: state.currentPage + 1, filter: 4 };
      }
      break;
    case "PREV":
      if (state.currentPage > 1) {
        return { ...state, currentPage: state.currentPage - 1, filter: 5 };
      }
      break;
    default:
      return state;
      break;
  }
};

export default createStore(todoReducer);

// import { configureStore } from "@reduxjs/toolkit";
// // import counterReducer from "../features/counter/counterSlice";
// import todoReducer from "../features/Todo/todoSlice";

// export const store = configureStore({
//   reducer: {
//     todo: todoReducer,
//   },
// });
