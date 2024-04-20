import React from 'react';
import Header from './Header';
import AddWorkoutForm from './AddWorkoutForm';
import { useState } from 'react';
import { useEffect } from 'react';

function CreateRoutine (props) {

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem("auth-token"));
    }, []);


    var finalCreateForm = <div>
    <Header>
    </Header>
    <AddWorkoutForm onAddRoutine={props.onAddRoutine} excerciseList={props.excerciseList} listRoutines={props.listRoutines} user={props.user}></AddWorkoutForm>
    </div>

    if (!token) {
        finalCreateForm = <div><Header>
        </Header>
        <b><center>You are not an authenticated user and thus do not have access to this form.</center></b>
        </div>
    }
    return (
       finalCreateForm 
    )
}

export default CreateRoutine;