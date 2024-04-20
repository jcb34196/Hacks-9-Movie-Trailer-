import React from 'react';
import Header from './Header';
import Routine from './Routine';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../css/History.css'
import { useState } from 'react';
import { useEffect } from 'react';

function History (props) {

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem("auth-token"));
    }, []);

    //console.log(props.user.workouts)

    var finalWorkouts = <div><Header></Header><br/><br/><center><Link to="../history/create-routine"><Button className="adds">Add Workout</Button></Link></center></div>
    

    if (props.user) {
        if (props.user.workouts) {
            finalWorkouts = <div><Header></Header>{props.user.workouts.map((workout) => 
                (<Routine id={workout.id} name={workout.title} date={workout.date} excercises={workout.excercises} item={workout} onAddRoutine={props.onAddRoutine} listRoutines={props.user.workouts} editID={props.editID}></Routine>))}
                <br/>
                <br/>
                <center><Link to="../history/create-routine"><Button className="adds">Add Workout</Button></Link></center>
                </div>
        }
    }

    if (!token) {
        finalWorkouts = <div><Header></Header><div className="not-logged">Login or register to access workout history.</div>
        <div className="two-buttons"><Link to='/signup'><Button className="register">Sign Up</Button></Link>
        <Link to='/login'><Button className="getlogged">Log In</Button></Link></div>
    </div>
    }
    return (
        finalWorkouts
    )
}

export default History;

