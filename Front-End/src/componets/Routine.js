import React from "react";
import '../css/Routine.css'
import Button from "./Button";
import { Link } from "react-router-dom";
import Card from "./Card";
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';

function Routine (props) {

    const { setUserData } = useContext(UserContext)

    const userData = useContext(UserContext)

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

        const newWorkouts = userData.userData.user.workouts.filter(notItem)

        setUserData({
            token: userData.userData.token,
            user: {id: userData.userData.user.id,
              email: userData.userData.user.email,
              name: userData.userData.user.name,
              date: userData.userData.user.date,
              workouts: newWorkouts
        }
      })

        let reqLink = "http://localhost:4000/api/users/routines/" + String(userData.userData.user.id)
        console.log(userData.userData.user)
        console.log(reqLink)
        await axios.put(reqLink, { workouts: newWorkouts })

        //console.log(props.listRoutines)
    }



    return (
        <Card className="routine"><h1>{props.item.title} - Created {props.item.date}</h1>
        <h2>Excercises</h2>
        <ul>
            
            {props.item.excercises.map((excercise) => 
                (<li>{excercise.name}<div className="reps">{excercise.sets} 
                {excercise.sets === 1 ? " set" : " sets"}, {excercise.reps}
                {excercise.reps === 1 ? " rep" : " reps"}</div></li>)
            )}
                
        </ul>
        <div><center>
        {/*<Link to="../history/edit-routine" onClick={editIDHandler}><Button className="modify">Modify</Button></Link></div>*/}
        <Button className="del" onClick={deleteIdHandler}>Delete</Button>
        </center></div>
        </Card>
    )
}

export default Routine;
