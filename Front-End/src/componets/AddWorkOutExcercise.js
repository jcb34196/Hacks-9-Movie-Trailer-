import React, { useState } from 'react';

import Card from './Card';
import Button from './Button';
import '../css/AddWorkout_form.css';
import DatalistInput from 'react-datalist-input';
import '../css/DataList.css'

const AddWorkoutExcercise = props => {

    //const [currExcercise, setCurrExcercise] = useState([{name: '', sets: 1, reps: 1}])
    //const [currExcercise, setCurrExcercise] = useState(props.currExcercise)

    const[enteredExercise,setEnteredExercise] = useState("")
    const[enteredSets,setEnteredSets] = useState(1)
    const[enteredReps,setEnteredReps] = useState(1)

    
    
    const addExcerciseHandler = event => {
      event.preventDefault();


      console.log(props.currWorkout)

      
      const currExcercise = [{name: enteredExercise, sets: enteredSets, reps: enteredReps}]
      
    
      if (enteredExercise !== "") {
        props.addExcercise((routines) => routines.concat(currExcercise));

        setEnteredExercise("")
        setEnteredSets(1)
        setEnteredReps(1)

        alert("Excercise added.")

        
      } else {
        alert("Excercise not added to the routine. Make sure excercise is valid.")
      }
      
      console.log(props.currWorkout)
    
    }
      return (
        <Card className="input">
          <form onSubmit ={addExcerciseHandler}>
            <label>Exercise</label>
            <DatalistInput
            onSelect={(e) => setEnteredExercise(e.value)}
            items= {props.excerciseList.map((item) => ({id: item.id, value: item.title}))}
        />
            <label>Number of sets</label>
            <input
              id="sets"
              type="number"
              value = {enteredSets}
              onChange = {(e)=> setEnteredSets(e.target.value)}
              min = "1"
            />
            <label>Number of reps</label>
            <input
              id="reps"
              type="number"
              value = {enteredReps}
              onChange = {(e)=> setEnteredReps(e.target.value)}
              min ="1"
            />
            
            <Button type="submit">Add Excercise to Routine</Button>
          </form>
        </Card>
      );
    };
    
    export default AddWorkoutExcercise;
    