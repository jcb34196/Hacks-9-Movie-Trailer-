import React from 'react';
import Header from './Header';
import '../css/ExcerciseList.css'
import Excercise from './Excercise';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';

function ExcerciseList (props) {

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem("auth-token"));
    }, []);


    console.log(props.excercises)

    
    




    var finalExcerciseList = <div>
        <Header></Header>
        <h1>Excercises</h1>
        {props.excercises.map((excercise) => 
            (<div>
            <Excercise body={excercise.bodyPart} equipment={excercise.equipment} excercise={excercise.title} image={excercise.image} logged={props.logged} onAddExcercise={props.onAddExcercise} id={excercise._id} editID={props.editID} item={excercise}></Excercise>
            </div>))}
        <Link to="../excercises/create-excercise"><Button className="add">Add New Excercise</Button></Link>
    </div>

    if (!token) {
        finalExcerciseList = <div>
        <Header></Header>
        <h1>Excercises</h1>
        {props.excercises.map((excercise) => 
            (<div>
            <Excercise body={excercise.bodyPart} equipment={excercise.equipment} excercise={excercise.title} image={excercise.image} logged={props.logged} onAddExcercise={props.onAddExcercise} id={excercise._id} editID={props.editID} item={excercise}></Excercise>
            </div>))}
        <div className="not-logged">Login or register to modify list of excercises.</div>
        <div className="two-buttons"><Link to='/signup'><Button className="register">Sign Up</Button></Link>
        <Link to='/login'><Button className="getlogged">Log In</Button></Link></div>
    </div>
    }

    return (
        finalExcerciseList
    )
}

export default ExcerciseList;