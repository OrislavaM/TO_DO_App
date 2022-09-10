import './App.css';

import Login from './Pages/Login';
import Registration from './Pages/Registration';
import TodoProfile from './Pages/TodoProfile';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Routes>
              <Route exact path="/"
                  element = {<Registration />}/>
              <Route exact path="/login"
                  element = {<Login />}/>
              <Route exact path="/todo_profile"
                  element = {<TodoProfile />}/>

              {/* <Route exact path="/register">
                  <Registration />
              </Route>
              <Route path="/login">
                  <Login />
              </Route>
              <Route path="/todo_profile">
                  <TodoProfile />
              </Route> */}
              </Routes>
      </BrowserRouter>
  );
}

export default App;
