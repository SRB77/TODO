/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
const App = () => {
  //* React variable means State to store current Value and List of todos
  const [content, setContent] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [check,setCheck] = useState(false);
  
  useEffect(()=>{
    const storedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
    setTaskList(storedTasks);
  },[])

  
  useEffect(()=>{
    localStorage.setItem("taskList", JSON.stringify(taskList));
  },[taskList])

  //* handling CheckBox functions . 
  const handleCheck = ()=>{
    if(check){
      setCheck(false)
    }else{
      setCheck(true)
    } 
  }

  //* Function for handling the Click of ADD btn .
  const handleClick = () => {
    if (content.trim() === "") return;
    else {
      let newTask = {content:content,id:Date.now(),isCompleted:check};
      setTaskList([...taskList, newTask]);
      setContent("");
    }
  };

//* Function for handling the keyPress of ADD btn .
  const keyHandle = (event) => {
    if (event.key == "Enter") {
      if (content.trim() === "") return;
      else {
        let newTask = { content: content, id: Date.now(), isCompleted: check };
        setTaskList([...taskList, newTask]);
        setContent("");
      }
    }
  };

  //* Function for handling the Delete button .
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
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
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
                {todoList.content}
                <div className="extra-on-list">
                  <input type="checkbox" className="checkBox" onChange={handleCheck} />
                  <button onClick={() => delButton(index)}>Delete</button>
                </div>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
