import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SingUp() {
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const navigate = useNavigate()
    
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (auth) {
             navigate("/")
            }
    }, [])

    async function collectionData() {
        console.log(name, email, password);
        let result = await fetch("http://localhost:3000/register",{
            method: 'post',
            body : JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/")
    }
    
  return (
   <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={collectionData} className="appButton" type="button">Sign Up</button>
        </div>
  )
}

export default SingUp;