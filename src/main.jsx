import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import "./index.css";
import { FirebaseProvider } from "./context/Firebase";
import Todo from "../src/components/Todo/Todo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseProvider>
        <Todo />
      </FirebaseProvider>
    </Provider>
  </React.StrictMode>
);
