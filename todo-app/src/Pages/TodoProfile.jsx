import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../img/Header-TodoSVG.svg";
import AddTask from "../components/Todo/AddTask.jsx";
import TodoList from "../components/Todo/TodoList.jsx";
import UpdateTask from "../components/Todo/UpdateTask.jsx";
import "../styles/TodoProfile.css";

function TodoProfile() {
  const navigate = useNavigate();

  // Task-List State
  const [toDo, setToDo] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("todo_token");
    if (!userToken) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const getTodos = async () => {
      const userToken = localStorage.getItem("todo_token");

      const config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const result = await axios.get(
        process.env.REACT_APP_API_URL + "/todos",
        config
      );
      setToDo(result.data);
    };
    getTodos();
  }, []);

  // Add task
  const addTask = async () => {
    if (newTask) {
      let num = toDo.length + 1;
      const userToken = localStorage.getItem("todo_token");
      const userId = localStorage.getItem("todo_userId");

      const config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const newTodo = {
        id: "" + num,
        userId: userId,
        title: newTask,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await axios.post(
        process.env.REACT_APP_API_URL + "/todos",
        newTodo,
        config
      );
      if (result.status === 200) {
        setToDo([...toDo, result.data]);
        setNewTask("");
      }
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    const userToken = localStorage.getItem("todo_token");
    // console.log(id);
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    const result = await axios.delete(
      process.env.REACT_APP_API_URL + `/todos/${id}`,
      config
    );
    if (result.status === 200) {
      setToDo(toDo.filter((toDo) => toDo.id !== id));
    }
  };

  // Change task for update
  const changeTask = (e) => {
    setUpdateData({
      ...updateData,
      title: e.target.value,
    });
  };

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Update task
  const updateTask = async () => {
    // console.log(updateData);
    const userToken = localStorage.getItem("todo_token");

    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };
    const newTodo = {
      ...updateData,
      updatedAt: new Date(),
    };

    const result = await axios.put(
      process.env.REACT_APP_API_URL + `/todos/${updateData.id}`,
      newTodo,
      config
    );
    if (result.status === 200) {
      let removeOldRecord = [...toDo].filter(
        (result) => result.id !== updateData.id
      );
      setToDo([...removeOldRecord, updateData]);
      setUpdateData("");
    }
  };

  // Log out function
  const userLogout = () =>{
    localStorage.setItem(
      "todo_token",
      '',
    );
    localStorage.setItem(
      "todo_userId",
      '',
    );
    navigate('/')
}

  return (
    <div className="container">
      <img src={Header} alt="TODO APP" className="header" />

      {updateData && updateData ? (
        <UpdateTask
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTask newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      )}

      <br />
      {toDo && toDo.length ? "" : "No Tasks..."}
      <TodoList
        toDo={toDo}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
      <div className="link">
        <p onClick={userLogout} className="link-secondary">
          LOG OUT
        </p>
      </div>
    </div>
  );
}

export default TodoProfile;
