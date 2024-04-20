import React from 'react';
import Header from './Header';
import EditExerciseForm from './EditExerciseForm';
import { useState } from 'react';
import { useEffect } from 'react';


function EditExcercise (props) {

    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem("auth-token"));
    }, []);


    var finalEditForm = <div><Header>
                        </Header>
                        <EditExerciseForm id={props.id} onAddEditExercise={props.onAddEditExercise}></EditExerciseForm></div>

        

    if (!token) {
        finalEditForm = <div><Header>
        </Header>
        <b><center>You are not an authenticated user and thus do not have access to this form.</center></b>
        </div>
    }

    return (
        finalEditForm
    )
}

export default EditExcercise;