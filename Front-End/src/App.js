import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './componets/ProfilePage';
import History from './componets/History';
import ExcerciseList from './componets/ExcerciseList';
import Login from './componets/Login';
import SignUp from './componets/SignUp';
import CreateRoutine from './componets/CreateRoutine';
import EditRoutine from './componets/EditRoutine';
import { useState } from 'react';
import { useEffect } from 'react';
import CreateExcercise from './componets/CreateExcercise';
import EditExcercise from './componets/EditExcercise';
import axios from 'axios';
import UserContext from './context/UserContext';

function App() {

  const testDate = new Date(Date.now())
  const testDateTwo = String((testDate.getMonth() + 1)) + "/" + String((testDate.getDate())) + "/" + String(testDate.getFullYear())
  
  var testWorkouts = [{id: 0,
                        title: "Test Workout",
                      date: testDateTwo,
                    excercises: [{name: "Bicep Curls",
                                  sets: 2,
                                  reps: 10}, 
                                  {name: "Bench Press",
                                    sets: 1,
                                    reps: 25},
                                  {name: "Pushups",
                                    sets: 6,
                                    reps: 5}]},
                        {id: 1,
                          title: "Another Test Workout",
                        date: testDateTwo,
                      excercises: [{name: "Pushups",
                                    sets: 10,
                                    reps: 10},
                                    {name: "Bench Press",
                                      sets: 2,
                                      reps: 15}]},
                        {id: 2,
                          title: "Yet Another Test Workout",
                        date: testDateTwo,
                      excercises: [{name: "Bicep Curls",
                                    sets: 3,
                                  reps: 20}]}]

          var bestWorkouts = [{id: 0,
            title: "Test Workout",
          date: testDateTwo,
        excercises: [{name: "Bicep Curls",
                      sets: 2,
                      reps: 10}, 
                      {name: "Bench Press",
                        sets: 1,
                        reps: 25}]}]


  const [logged, setLogged] = useState(true); //State to keep track of whether user is logged in. This will later be replaced with proper authentication. 
  const [users, setUsers] = useState([{id: Date.now() - 10,
                                        email: "anniedison90@gmail.com",
                                      password: "sfjgjgtltjgu789fh",
                                    name: "Annie Edison",
                                  date: Date(),
                                workouts: testWorkouts},
                                {id: Date.now() - 80,
                                email: "coolabedfilms@gmail.com",
                              password: "tthysshf$35^hg8",
                            name: "Abed Nadir",
                          date: Date(),
                        workouts: bestWorkouts}]) //State to keep track of all the registerd users. This will be properly modified to work with MongoDB later. 

    const [currUser, setCurrUser] = useState(users[0]) //State to keep track of user currently logged in. This will be properly modified to work with MongoDB later. 
    
    const [excercises, setExcercises] = useState([{id: Date.now() + 100,
                                                  title: "Pushups",
                                                  bodyPart: "Triceps, Chest",
                                                  equipment: "Bodyweight",
                                                  image: "https://www.athletico.com/wp-content/uploads/2020/04/stay-home-fitness-challenge-featured.jpg"},
                                                  {id: Date.now() - 9000,
                                                    title: "Bicep Curls",
                                                    bodyPart: "Biceps",
                                                    equipment: "Barbells",
                                                    image: "https://experiencelife.lifetime.life/wp-content/uploads/2021/02/Bicep-Curls.jpg"},
                                                  {id: Date.now() + 800,
                                                    title: "Bench Press",
                                                    bodyPart: "Chest",
                                                    equipment: "Barbell, Bench",
                                                    image: "https://blog.nasm.org/hubfs/bench-press-elbow-pain.jpg"}])

    const [editExcerciseId, setEditExcerciseID] = useState(0); //Keeps track of the excercise item to be edited.
    const [editRoutineID, setEditRoutineID] = useState(0);

    const [routines, setRoutines] = useState(currUser.workouts)
    


    const [userData, setUserData] = useState({
        token: undefined,
        user: {id: null, email: null, name: null, date: null, workouts: [] },
    })

    useEffect(()=> {
      const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "")
          token = "";
        }

        const tokenResponse = await axios.post(
          "http://localhost:4000/api/users/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }
        );
        
        if (tokenResponse.data) {
          const userRes = await axios.get("http://localhost:4000/api/users", {
            headers: { "x-auth-token": token },
          });

          setUserData({
            token,
            user: userRes.data,
          });
        }
      };
      checkLoggedIn();
    }, []);

    const [excerciseData, setExcerciseData] = useState([])

    useEffect(()=> {
      let freshExcerciseData = []

      const getExcerciseData = async () => {
        
        
        let rawExcerciseData = axios.get("http://localhost:4000/api/excercises").
        then(res => {
          console.log(res.data)
          /*
          const newItem = {
            id: res.data._id,
            title: res.data.title,
            bodyPart: res.data.bodyPart,
            equipment: res.data.equipment,
            image: res.data.image
          };
          */

          for (var item in res.data) {
            freshExcerciseData.push(res.data[item])
          }
          
        })
        
        

        /*
        let rawExcerciseData = await axios.get("http://localhost:4000/api/excercises")
        let tempData = JSON.parse(rawExcerciseData)

        for (var i in tempData) {
          freshExcerciseData.push(tempData[i])
        }
        */

      }

      getExcerciseData();

      setExcerciseData(freshExcerciseData)
      console.log(excerciseData)
    }, []) 


  return (
    <UserContext.Provider value={{ userData, setUserData }}>
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ProfilePage logged={logged} setLogged={setLogged} user={userData.user} logOutUser={setCurrUser}/>} />
          <Route exact path='/history' element={<History user={userData.user} logged={logged} onAddRoutine={setRoutines} editID={setEditRoutineID} />} />
          <Route exact path='/excercises' element={<ExcerciseList excercises={excerciseData} logged={logged} onAddExcercise={setExcerciseData} editID={setEditExcerciseID}/>} />
          <Route exact path='/login' element={<Login logged={logged} userList={users} user={currUser} setUser={setCurrUser} setRoutines={setRoutines} setLogged={setLogged}/>} />
          <Route exact path='/signup' element={<SignUp logged={logged} userList={users} user={currUser} setUser={setCurrUser} setRoutines={setRoutines} setLogged={setLogged} setUserList={setUsers}/>} />
          <Route exact path='/history/create-routine' element={<CreateRoutine onAddRoutine={setRoutines} logged={logged} excerciseList={excerciseData} listRoutines={routines} user={userData.user}/>} />
          <Route exact path='/history/edit-routine' element={<EditRoutine/>} />
          <Route exact path='excercises/create-excercise' element={<CreateExcercise onAddExcercise={setExcerciseData} logged={logged}/>} />
          <Route exact path='excercises/edit-excercise' element={<EditExcercise onAddEditExercise={setExcerciseData} logged={logged} id={editExcerciseId} excerciseList={excerciseData}/>} />
        </Routes>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
