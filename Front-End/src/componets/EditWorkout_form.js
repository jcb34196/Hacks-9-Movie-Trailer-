import React, { useState } from 'react';

import Card from './Card';
import Button from './Button';
import '../css/EditWorkout_form.css';

const EditWorkout_form = props => {
    const[enteredExercise,setEnteredExercise] = useState('')
    const[enteredSets,setEnteredSets] = useState('')
    const[enteredReps,setEnteredReps] = useState('')
    
    const addUserHandler = event => {
      event.preventDefault();
    
      const newEditWorkout ={
        id: Math.random().toString,
        exercise: enteredExercise,
        sets: enteredReps,
        reps: enteredReps

      };
      setEnteredExercise('');
      setEnteredSets('');
      setEnteredReps('');

      props.onAddEditWorkout(newEditWorkout);
    
    }
      return (
        <Card className="input">
          <form onSubmit ={addUserHandler}>

            <label>Exercise</label>
            <input
              id="exercise"
              type="text"
              value ={enteredExercise}
              onChange = {(e)=>{setEnteredExercise(e.target.value)}}
            />
            <label>Number of sets</label>
            <input
              id="sets"
              type="number"
              value = {enteredSets}
              onChange = {(e)=> {setEnteredSets(e.target.value)}}
            />
            <label>Number of reps</label>
            <input
              id="reps"
              type="number"
              value = {enteredReps}
              onChange = {(e)=> {setEnteredReps(e.target.value)}}
            />
            
            <Button type="submit">Confirm Edit</Button>
          </form>
        </Card>
      );
    };
    
    export default EditWorkout_form;
    