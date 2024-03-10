import { createStore } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST":
      return { ...state, tasks: action.payload };
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
