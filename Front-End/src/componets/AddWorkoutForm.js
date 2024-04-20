import React, { useState } from 'react';

import Card from './Card';
import Button from './Button';
import '../css/AddWorkout_form.css';
import AddWorkoutExcercise from './AddWorkOutExcercise';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';

const AddWorkoutForm = props => {
     const [arrayForCount, increment] = useState([])

     const [workoutName, setWorkOutName] = useState('')

     const { setUserData } = useContext(UserContext)

     const userData = useContext(UserContext)


      const submitHandler = async (event) => {
        
        
        let isFull = true 

        try {
        for (let i = 0; i < arrayForCount.length; i++) {
          if (arrayForCount[i].name === undefined) {
            isFull = false
            break
          }
        }

        if (workoutName === undefined) {
          isFull = false;
        }

        if (isFull === false) {
          alert("Workout not added. Be sure all excercises and name are valid.")
        } else {
          const allExcercises = arrayForCount.map((item) => item)
          const testDate = new Date(Date.now())

          console.log(props.user.workouts.concat([{id: Date.now(), 
            title: workoutName,
            date: String((testDate.getMonth() + 1)) + "/" + String((testDate.getDate())) + "/" + String(testDate.getFullYear()),
            excercises: allExcercises
          }]))

          let newWorkouts = props.user.workouts.concat([{id: Date.now(), 
            title: workoutName,
            date: String((testDate.getMonth() + 1)) + "/" + String((testDate.getDate())) + "/" + String(testDate.getFullYear()),
            excercises: allExcercises
          }])

          setUserData({
            token: userData.userData.token,
            user: {id: props.user.id,
              email: props.user.email,
              name: props.user.name,
              date: props.user.date,
              workouts: newWorkouts
        }
      })

          let reqLink = "http://localhost:4000/api/users/routines/" + String(props.user.id)
          console.log(userData.userData.user)
          console.log(reqLink)
          await axios.put(reqLink, { workouts: newWorkouts })

          increment([])
          setWorkOutName('')
          alert("Workout added.")
          //console.log(props.listRoutines)
        }
      } catch (err) {
        console.log(err)
        alert("Something went wrong. Please try again.")
      }
      }

    
     var finalForm = <div>
      <Card className="input"><form><label>Workout Name</label><input id="workout-name" type="text" value={workoutName} onChange={(e) => setWorkOutName(e.target.value)}></input></form></Card>
      <AddWorkoutExcercise excerciseList={props.excerciseList} addExcercise={increment} currWorkout={arrayForCount}></AddWorkoutExcercise>
      <Button onClick={submitHandler}>Submit New Workout</Button>
      </div>


     return (
      finalForm
     )
    };
    
    export default AddWorkoutForm;
    