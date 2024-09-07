import { useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TrigLib from "./utils/trigLib";

function App() {
  useEffect(() => {
    console.log(TrigLib.sin(90));
  }, []);

  async function fetchData() {
    fetch("https://api.example.com"); // This will throw an ESLint error due to a missing `await`
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <Todo name="Todo 1"></Todo>
    </>
  );
}

export default App;
