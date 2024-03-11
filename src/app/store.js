import { createStore } from "@reduxjs/toolkit";
import { pageSize } from "../constants";

const initialState = {
  tasks: [],
  newTask: { task: "", complete: false },
  sortOption: "time",
  fitler: 1,
  taskStatus: false,
  search: "",
  currentPage: 1,
  firstDoc: null,
  lastDoc: null,
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST":
      return { ...state, tasks: action.payload };
      break;
    case "ADD":
      return { ...state, tasks: [...state.tasks, action.payload] };
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
      if (state.tasks.length == pageSize) {
        return { ...state, currentPage: state.currentPage + 1, filter: 4 };
      } else {
        return state;
      }
      break;
    case "PREV":
      if (state.currentPage > 1) {
        return { ...state, currentPage: state.currentPage - 1, filter: 5 };
      } else {
        return state;
      }
      break;
    case "SET_FIRST":
      return { ...state, firstDoc: action.payload };
      break;
    case "SET_LAST":
      return { ...state, lastDoc: action.payload };
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
