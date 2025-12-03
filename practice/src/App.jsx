import { useState } from "react";
import "./App.css";

import Switch from "./Components/Switch";
import Router from "./router/Router";

function App() {
  const [layoutState, setLayoutState] = useState("H");
  console.log("from app");
  return (
    <div className="app">
      <div className="layout-switch">
        <Switch
          className="layout-switch"
          layoutState={layoutState}
          setLayoutState={setLayoutState}
        />
      </div>
      <Router layoutState />
    </div>
  );
}

export default App;

// calculator application using React for the frontend and Python (Flask or Django) for the backend.
//  The app should allow the user to input:
// Operand 1 (first number)
// Operand 2 (second number)
// Operator (+, -, *, /)
// Once the user enters the two operands and selects an operator,
//  the app should send a request to the Python backend, which performs the calculation and returns the result.
//  The result should be displayed in the third field on the frontend.
