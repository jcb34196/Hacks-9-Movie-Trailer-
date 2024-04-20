import React, { useState } from 'react';

import Card from './Card';
import Button from './Button';
import '../css/Login_form.css';


import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';

import axios from 'axios';

import UserContext from '../context/UserContext';


const LoginForm = props => {
    const[enteredEmailAddress,setEnteredEmailAddress] = useState('')
    const[enteredPassword,setEnteredPassword] = useState('')

    const [error, setError] = useState();

    const [loading, setLoading] = useState(false);

    const { setUserData } = useContext(UserContext);

    const navigate = useNavigate()
    
    async function addUserHandler (event) {
      event.preventDefault();
      setLoading(true)
      
      try {
        let foundEmail = false
        let matchPassword = false

       const loginUser = {
        email: enteredEmailAddress,
        password: enteredPassword
       }

       const loginRes = await axios.post("http://localhost:4000/api/users/login", loginUser)
       setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
       });

       localStorage.setItem("auth-token", loginRes.data.token)

        setEnteredEmailAddress('');
        setEnteredPassword('');

          
        navigate('../')
        
      } catch (err) {
        setLoading(false)
        err.response.data.msg && setError(err.response.data.msg);
        console.log(err)
        alert(error)
      }

      

      
    
    }

  
      return (
        <Card className="input">
          <form onSubmit ={addUserHandler}>
            <label>Email Address</label>
            <input
              id="emailaddress"
              type="text"
              value = {enteredEmailAddress}
              onChange = {(e)=> {setEnteredEmailAddress(e.target.value)}}
            />
            <label>Password</label>
            <input
              id="password"
              type="password"
              value ={enteredPassword}
              onChange = {(e)=>{setEnteredPassword(e.target.value)}}
            />
            <Button type="submit" className="logup">Login</Button>
          </form>
        </Card>
      );
    };
    
    export default LoginForm;
    