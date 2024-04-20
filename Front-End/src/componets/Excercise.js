import React from "react";
import '../css/Excercise.css'
import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


function Excercise (props) {

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem("auth-token"));
    }, []);

    const editLink = "../excercises/edit-excercise"
    
    const editIDHandler = (event) => {

        const innerIDHandler = () => {
            props.editID(props.id)
        }

        innerIDHandler();
    }

    const deleteIdHandler = async (event) => {
        function notItem (item) {
            return item !== props.item
        }

        let deleteRoute = "http://localhost:4000/api/excercises/" + String(props.id)
        await axios.delete(deleteRoute)
        props.onAddExcercise((newList) => newList.filter(notItem))
    }



    var finalExcercise =  
    <div className="full-excercise">
    <div className="body-part"><h2>Body Part</h2><div className="innerFormat">{props.body}</div></div>
    <div className="equipment"><h2>Equipment</h2><div className="innerFormat">{props.equipment}</div></div>
    <div className="excercise"><h2>Excercise</h2><div className="innerFormat">{props.excercise}</div></div>
    <div className="image"><h2>Image</h2><img src={props.image} alt={props.excercise}></img></div>
    <div className="actions">
                <Link to={editLink} onClick={editIDHandler}><Button className="edit-button">Edit</Button></Link>
                <Button className="delete-button" onClick={deleteIdHandler}>Delete</Button>
            </div>
    </div>

    if (!token) {
        finalExcercise = <div className="full-excercise">
        <div className="body-part"><h2>Body Part</h2><div className="innerFormat">{props.body}</div></div>
        <div className="equipment"><h2>Equipment</h2><div className="innerFormat">{props.equipment}</div></div>
        <div className="excercise"><h2>Excercise</h2><div className="innerFormat">{props.excercise}</div></div>
        <div className="image"><h2>Image</h2><img src={props.image} alt={props.excercise}></img></div>
        <div className="actions"><center>Login or Register to Edit</center></div>
        </div>
    }
    
    return (
        finalExcercise
    )
}


export default Excercise;