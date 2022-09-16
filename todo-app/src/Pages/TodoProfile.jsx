import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../img/Header-TodoSVG.svg";
import AddTask from "../components/Todo/AddTask.jsx";
import TodoList from "../components/Todo/TodoList.jsx";
import UpdateTask from "../components/Todo/UpdateTask.jsx";
import "../styles/TodoProfile.css";

const fakeTodos = [
  {
    id: "1",
    userId: "12",
    title: "Learn JavaScript",
    description: "JavaScript",
    createdAt: "2022-09-12T20:53:08.970Z",
    updatedAt: "2022-09-12T20:53:08.970Z",
  },
  {
    id: "2",
    userId: "34",
    title: "Learn React",
    description: "React",
    createdAt: "2022-09-12T20:53:08.970Z",
    updatedAt: "2022-09-12T20:53:08.970Z",
  },
  {
    id: "3",
    userId: "1234",
    title: "Learn Angular",
    description: "Angular",
    createdAt: "2022-09-12T20:53:08.970Z",
    updatedAt: "2022-09-12T20:53:08.970Z",
  },
];

function TodoProfile() {
  const navigate = useNavigate();

  // Task-List State
  const [toDo, setToDo] = useState(fakeTodos);

  // Temporary State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add task
  const addTask = () => {
    if (newTask) {
      let num = fakeTodos.length + 1;
      setToDo([...toDo, { id: num, title: newTask }]);
      setNewTask("");
    }
  };

  // Delete Task
  const deleteTask = (id) => {
    setToDo(toDo.filter((fakeTodos) => fakeTodos.id !== id));
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
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter(
      (fakeTodos) => fakeTodos.id !== updateData.id
    );
    setToDo([...removeOldRecord, updateData]);
    setUpdateData("");
  };
  //! _________________________________________________________
  // TODO LOCAL STORAGE
  useEffect(() => {
    const userToken = localStorage.getItem("todo_token");
    if (!userToken) {
      navigate("/");
    }
  }, [navigate]);

  // TODO API LOGIC
  useEffect(() => {
    const getTodos = async () => {
      const userToken = localStorage.getItem("todo_token");

      const config = {
        headers: { Bearer: userToken },
      };
      const result = await axios.get(
        process.env.REACT_APP_API_URL + "/todos",
        config
      );
      console.log(result);
    };
    getTodos();
  }, []);
  //! _________________________________________________________

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
        <a href="/" class="link-secondary">
          LOG OUT
        </a>
      </div>
    </div>
  );
}

export default TodoProfile;
