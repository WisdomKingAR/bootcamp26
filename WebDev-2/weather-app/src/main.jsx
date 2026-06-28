import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//Find the div with id=root inside index.html and render the App component inside it. 
// The App component is wrapped with StrictMode to help identify potential problems in the application.
