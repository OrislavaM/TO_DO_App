import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const fakeTodos = [
  {
    id: "1",
    userId: "string",
    title: "string",
    description: "string",
    createdAt: "2022-09-12T20:53:08.970Z",
    updatedAt: "2022-09-12T20:53:08.970Z",
  },
  {
    id: "string",
    userId: "string",
    title: "string",
    description: "string",
    createdAt: "2022-09-12T20:53:08.970Z",
    updatedAt: "2022-09-12T20:53:08.970Z",
  },
  {
    id: "string",
    userId: "string",
    title: "string",
    description: "string",
    createdAt: "2022-09-12T20:53:08.970Z",
    updatedAt: "2022-09-12T20:53:08.970Z",
  },
];

function TodoProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("todo_token");
    if (!userToken) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const getTodos = async () => {
      const config = {
        headers: { "Access-Control-Allow-Origin": "*" },
      };
      const result = await axios.get(
        "http://localhost:5108/api/web/v1/todos",
        config
      );
      console.log(result);
    };
    getTodos();
  }, []);

  return <div>Hello User! This is your Todo-List</div>;
}

export default TodoProfile;
