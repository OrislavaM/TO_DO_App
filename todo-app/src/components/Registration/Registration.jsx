import React from "react";
import { useState } from "react";
import axios from 'axios'

function Registration(){
const [name, setName] = useState('');
const [password, setPassword] = useState('');

const handleNameChange = (value) =>{
    setName(value);
}
const handlePasswordChange = (value) =>{
    setPassword(value);
}
const handleSave = () =>{
    const data = {
        userName: name,
        password: password
    }
const url = 'http://localhost:5108/api/web/v1/auth/register';

axios.post(url,data).then((result) =>{
    alert (result.data);
}).catch((error) => {
    alert (error);
})

}

    return(
        <>        
        <div>Registration</div>
        <label>User Name</label>
        <input type="text" id='txtName' placeholder="User Name" onChange={(e) => handleNameChange(e.target.value)}/> <br/>
        <label>Password</label>
        <input type="text" id='txtPassword' placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)}/> <br/>
        <button onClick={() => handleSave()}>Register</button>
        </>
    )
}

export default Registration