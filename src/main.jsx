import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { FirebaseProvider } from "./context/Firebase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </FirebaseProvider>
  </React.StrictMode>
);
