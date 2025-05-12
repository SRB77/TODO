/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
const App = () => {
  //* React variable means State to store current Value and List of todos
  const [content, setContent] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
    setTaskList(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  //* Function for handling the Click of ADD btn .
  const handleClick = () => {
    if (content.trim() === "") return;
    else {
      let newTask = { content: content, id: Date.now(), isCompleted: false };
      setTaskList([...taskList, newTask]);
      setContent("");
    }
  };

  //* Function for handling the keyPress of ADD btn .
  const keyHandle = (event) => {
    if (event.key == "Enter") {
      if (content.trim() === "") return;
      else {
        let newTask = { content: content, id: Date.now(), isCompleted: false };
        setTaskList([...taskList, newTask]);
        setContent("");
      }
    }
  };

  //* Function for handling the Delete button .
  const delButton = (todoId) => {
    const updateAftDel = taskList.filter((todos,index) => todos.id !== todoId);
    setTaskList(updateAftDel);
  };

  //* Handle toglle of complete / incomplete
  const handleToggle = (todoId)=>{
    const updatedList = taskList.map((todos)=>{
      if(todoId === todos.id){
        return { ...todos, isCompleted: !todos.isCompleted};
      }
      return todos;
    })
    setTaskList(updatedList);
  }



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
          {taskList.map((todoList) => {
            return (
              <li key={todoList.id}>
                <span className={todoList.isCompleted ? "completed" : ""}>
                  {todoList.content}
                </span>
                <div className="extra-on-list">
                  <input
                    type="checkbox"
                    className="checkBox"
                    onChange={() => handleToggle(todoList.id)}
                    checked={todoList.isCompleted}
                  />
                  <button onClick={() => delButton(todoList.id)}>Delete</button>
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
