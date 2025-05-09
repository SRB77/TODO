/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import "./App.css";
const App = () => {
  //* React variable means State to store current Value and List of todos
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  //* Function for handling the Click of ADD btn . 
  const handleClick = ()=>{
    if(task.trim() === "") return;
    else setTaskList([...taskList , task]);
    setTask("")
  }

  return (
    <div className="main">
      <div className="todo">
        <div className="input_area">
          <input
            type="text"
            placeholder="ENTER YOUR TASK HERE"
            className="input_box"
            value={task}
            onChange={(e)=>{
              setTask(e.target.value)
            }}
          />
          <button className="addBtn" onClick={handleClick}>ADD</button>
        </div>
        <div className="tasks_area">
            {
              taskList.map((todoList,index)=>{
                return(
                  <li key={index}>{todoList} <button>Delete</button></li>
                )
              })
            }
        </div>
      </div>
    </div>
  );
};

export default App;
