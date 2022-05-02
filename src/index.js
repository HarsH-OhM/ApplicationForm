import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form/Form";

function App() {
  return (
    <>
      <Form />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
