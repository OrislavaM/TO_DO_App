import "./App.css";

import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import TodoProfile from "./Pages/TodoProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/todo_profile" element={<TodoProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
