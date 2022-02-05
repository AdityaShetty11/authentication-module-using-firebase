import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';


import {auth} from './firebase-config';

function App() {

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  });

  const handleChangeRegisterEmail = (ele) =>{
    setRegisterEmail(ele.target.value);
  };

  const handleChangeRegisterPassword = (ele) =>{
    setRegisterPassword(ele.target.value);
  };

  const handleChangeLoginEmail = (ele) =>{
    setLoginEmail(ele.target.value)
  };

  const handleChangeLoginPassword = (ele) =>{
    setLoginPassword(ele.target.value)
  };

  const registerFunc = async () =>{
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log("Registration successful!!!",user);
    }catch(err){
      console.log("Error!!",err);
    }
  };

  const loginFunc = async()=>{
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log("Successfully logged in")
    }catch (err){
      console.log("Error!!", err);
    }
  };

  const logoutFunc = async () =>{
    signOut(auth);
  };

  return (
    <div className="App">
      <div>
        <h3>Registration</h3>
        <input placeholder="Enter email to register" onChange={handleChangeRegisterEmail}/>
        <input placeholder="Create password" onChange={handleChangeRegisterPassword}/>
        <button onClick={registerFunc}>Register</button>
      </div>
      <div>
        <h3>Login</h3>
        <input placeholder="Enter email" onChange={handleChangeLoginEmail}/>
        <input placeholder="Enter passoword" onChange={handleChangeLoginPassword}/>
        <button onClick={loginFunc}>Login</button>
      </div>
      <div>
      {user?.email}
      </div>
      <div>
      <button onClick={logoutFunc}>Logout</button>
      </div>
    </div>
  );
}

export default App;
