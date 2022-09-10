import React from "react";
import { useState } from "react";
import axios from 'axios'

function Login(){
const [name, setName] = useState('');
const [password, setPassword] = useState('');

const handleNameChange = (value) =>{
    setName(value);
}
const handlePasswordChange = (value) =>{
    setPassword(value);
}
const handleLogin = () =>{
    const data = {
        UserName: name,
        Password: password
    }
const url = 'http://localhost:5108/api/web/v1/auth'

axios.post(url,data).then((result) =>{
    console.log(result.data);
}).catch((error) => {
    console.log(error);
})

}

    return(
        <>        
        <div>Login</div>
        <label>User Name</label>
        <input type="text" id='txtName' placeholder="Enter Name" onChange={(e) => handleNameChange(e.target.value)}/> <br/>
        <label>Password</label>
        <input type="text" id='txtPassword' placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)}/> <br/>
        <button onClick={handleLogin}>Login</button>
        </>
    )
}

export default Login
