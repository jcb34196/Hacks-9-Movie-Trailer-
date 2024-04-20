import React from 'react';
import SignUpForm from './SignUpForm';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useState } from 'react';
import { useEffect } from 'react';

function SignUp (props) {

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem("auth-token"));
    }, []);


    var finalSignUp = <div><h1>You are already logged in as {props.user.name}</h1><Link to="../"><Button>Back to Home</Button></Link></div>

    if (!token) {
        finalSignUp = <div><h1>Gym Buddy Sign Up</h1><SignUpForm userList={props.userList} setUser={props.setUser} users={props.userList} currUser={props.user} setRoutines={props.setRoutines} setLogged={props.setLogged} setUserList={props.setUserList}></SignUpForm>
    <center><Link to="../"><Button className="home">Back to Home</Button></Link></center>
    </div>
    }

    return (
       finalSignUp
    );
}

export default SignUp;