/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
const App = () => {
  //* React variable means State to store current Value and List of todos
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [check,setCheck] = useState(false);
  
  useEffect(()=>{
    const storedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
    setTaskList(storedTasks);
  },[])

  
  useEffect(()=>{
    localStorage.setItem("taskList",JSON.stringify(taskList));
  },[taskList])

  //* handling CheckBox functions . 

  const handleCheck = ()=>{
    if(check){
      setCheck(false)
      console.log(`If Chcek :${check}`);
    }else{
      setCheck(true)
      console.log(`Else check : ${check}`);
    } 
  }

  //* Function for handling the Click of ADD btn .
  const handleClick = (event) => {
    if (task.trim() === "") return;
    else setTaskList([...taskList, task]);
    setTask("");
  };

  //* Function for handling the keyPress of ADD btn .
  const keyHandle = (event) => {
    if (event.key == "Enter") {
      if (task.trim() === "") return;
      else setTaskList([...taskList, task]);
      setTask("");
    }
  };

  //* Function for handling the keyPress of ADD btn .
  const delButton = (indexDel) => {
    const updateAftDel = taskList.filter((_, index) => index !== indexDel);
    setTaskList(updateAftDel);
  };

  return (
    <div className="main">
      <div className="todo">
        <div className="input_area">
          <input
            type="text"
            placeholder="ENTER YOUR TASK HERE"
            className="input_box"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            onKeyDown={keyHandle}
          />
          <button className="addBtn" onClick={handleClick}>
            ADD
          </button>
        </div>
        <div className="tasks_area">
          {taskList.map((todoList, index) => {
            return (
              <li key={index}>
                {todoList}
                <input type="checkbox" className="checkBox" onClick={handleCheck}/>
                <button onClick={() => delButton(index)}>Delete</button>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
