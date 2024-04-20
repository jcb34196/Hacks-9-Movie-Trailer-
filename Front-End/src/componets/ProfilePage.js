import React, { useContext } from 'react';
import Card from './Card';
import Button from './Button';
import Header from './Header';
import '../css/ProfilePage.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


function ProfilePage (props) {

    const [token, setToken] = useState();

    const { setUserData } = useContext(UserContext)

    useEffect(() => {
        setToken(localStorage.getItem("auth-token"));
    }, []);

    const navigate = useNavigate()

    console.log(props.routines)

    //Handler for whenever the user decides to logout.
    
    const logOutHandler = (event) => {
        props.setLogged(false);
        props.logOutUser({})
        
        setUserData({
            token: undefined,
            user: null
        });


        localStorage.clear();
        
        navigate("../login");
    }
    



    var finalProfilePage =  
    <div>
        <Header></Header>
        <Card className="profile"><h1>Profile</h1>
        <div className="notlogged">You are not logged in. Click below to either login or signup.</div>
        <br></br>
        <center>
        <Link to='/signup'><Button className="register">Sign Up</Button></Link>
        <Link to='/login'><Button className="getlogged">Log In</Button></Link>
        </center>
        </Card></div>

    if (token) {
        finalProfilePage = <div>
    <Header></Header>
    <Card className="profile"><h1>Profile</h1>
    <div className="line">
    <h6>Name:</h6> {props.user.name}</div>
    <div className="line"><h6>Email:</h6> {props.user.email}</div>
    <div className="line"><h6>Date Joined:</h6> {props.user.date}   </div>
    <div className="line">
    <h6>Workouts Created:</h6> {props.user.workouts ? props.user.workouts.length : 0}</div>
    <br/>
    <br></br>
    <center><Button className="logout" onClick={logOutHandler}>Log Out</Button></center>
    </Card>;
    </div>
        
    }

    return (
      finalProfilePage
    );
}

export default ProfilePage;