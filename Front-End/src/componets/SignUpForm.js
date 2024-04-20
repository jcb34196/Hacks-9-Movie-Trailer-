import React, { useState } from 'react';

import Card from './Card';
import Button from './Button';
import '../css/SignUp_form.css';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';

import UserContext from '../context/UserContext';

const SignUpForm = props => {
    const[enteredEmailAddress,setEnteredEmailAddress] = useState('')
    const[enteredUsername,setEnteredUsername] = useState('')
    const[enteredPassword,setEnteredPassword] = useState('')
    const [reenteredPassword, setReenteredPassword] = useState('')

    const [error, setError] = useState("")

    const [loading, setLoading] = useState(false)

    const { setUserData } = useContext(UserContext)

    const navigate = useNavigate()
    
    async function addUserHandler( event) {
      event.preventDefault();
      setLoading(true)
      
      try{

          const newUser ={
            id: Date.now(),
            email: enteredEmailAddress,
            password: enteredPassword,
            confirmPassword: reenteredPassword,
            name: enteredUsername,
            date: Date(),
            workouts: [],
          };

          await axios.post("http://localhost:4000/api/users/signup", newUser)

          

          var emailExist = false

          for (let i = 0; i < props.userList.length; i++) {
            if (props.userList[i].email === enteredEmailAddress) {
              emailExist = true
              break
            }
          }


          

      
              props.setUserList(props.userList.concat([newUser]))
              alert("New user successfully created")
              setEnteredEmailAddress('');
              setEnteredUsername('');
              setEnteredPassword('');
              setReenteredPassword('');
              navigate("../login")
          
        
  }
    catch (err) {
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
            <label>Username</label>
            <input
              id="username"
              type="text"
              value = {enteredUsername}
              onChange = {(e)=> {setEnteredUsername(e.target.value)}}
            />
            <label>Password</label>
            <input
              id="password"
              type="password"
              value ={enteredPassword}
              onChange = {(e)=>{setEnteredPassword(e.target.value)}}
            />
            <label>Reenter Password</label>
            <input
              id="repassword"
              type="password"
              value ={reenteredPassword}
              onChange = {(e)=>{setReenteredPassword(e.target.value)}}
            />
            <Button type="submit" className="signup">Sign Up</Button>
          </form>
        </Card>
      );
    };
    
    export default SignUpForm;
    