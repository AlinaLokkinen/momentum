import { Text } from "@rneui/base"
import { FAB, Input, Button } from "@rneui/themed";
import { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import { app2 } from "../firebaseConfig";
import { getDatabase, ref, push, onValue, remove, update } from "firebase/database";
import DateTimePicker from '@react-native-community/datetimepicker';
import WorkoutCalendar from "./WorkoutCalendar";
import { ScrollView } from "react-native-gesture-handler";

const database = getDatabase(app2);

export default function WorkoutJournal() {

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pressedLogNew, setPressedLogNew] = useState(false);
    const [workoutData, setWorkoutData] = useState([]);
  
    const [workoutToEdit, setWorkoutToEdit] = useState(null);

    const [workout, setWorkout] = useState({
        date: new Date().toLocaleDateString(),
        name: '',
        duration: '',
        comments: ''
    });

    

    useEffect(() => {
        const workoutRef = ref(database, 'workouts/');
        onValue(workoutRef, (snapshot) => {
            const d = snapshot.val();
            // jos data löytyy, asetetaan se taulukkoon, muuten tyhjä taulukko
            if (d) {
                const keys = Object.keys(d);
                const workoutsWithKeys = Object.values(d).map((obj, i) => {
                return {...obj, key: keys[i]}
            });

            setWorkoutData(workoutsWithKeys);
            } else {
                setWorkoutData([]);
            }
        })
    }, []);

    useEffect(() => {
        if (workoutToEdit) {
            setWorkout(workoutToEdit);
            console.log(workoutToEdit);
        }
    }, [workoutToEdit]);


    const saveWorkout = () => {
        // asettaa päivämääräksi kuluvan päivän
        setDate(new Date());
        // jos tarpeeksi dataa, viedään tietokantaan
        if (workout.name && workout.duration) {
            if (workoutToEdit) {
                saveUpdatedWorkout();
            } else {
                push(ref(database, 'workouts/'), workout); 
            }
            
            setPressedLogNew(false);
            setWorkout({
                date: new Date().toLocaleDateString(),
                name: '',
                duration: '',
                comments: ''
            });
        } else {
            Alert.alert('Error', 'Please input workout name and duration');
        }
    }

    // muokatun treenin tallennus
    const saveUpdatedWorkout = () => {
        if (workout.name && workout.duration) {
            // tallennetaan workouts/key perusteella tieto
            const workoutRef = ref(database, `workouts/${workoutToEdit.key}`);
            update(workoutRef, workout)
                .then(() => {
                    setWorkoutToEdit(null); // Poistetaan muokkaustila
                    setPressedLogNew(false); // Palataan perusnäkymään
                    setWorkout({
                        date: new Date().toLocaleDateString(),
                        name: '',
                        duration: '',
                        comments: ''
                    }); // Tyhjennetään lomake
                })
                // jos virhe, kerrotaan käyttäjälle
                .catch((error) => {
                    Alert.alert("Error", "Failed to update workout. Try again.");
                    console.error(error);
                });
        } else {
            Alert.alert("Error", "Please fill in workout name and duration.");
        }
    }

    // päivämäärävalitsimen päivän vaihtaminen
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);
        setDate(selectedDate);
        setWorkout({...workout, date: currentDate.toLocaleDateString()});
      };

    // peruu uuden treenin lisäämisen
    const cancel = () => {
        setPressedLogNew(false);
        setWorkout({
            date: new Date().toLocaleDateString(),
            name: '',
            duration: '',
            comments: ''
        });
    }

    // poistaa yhden treenin
    const deleteWorkout = (key) => {
        remove(ref(database, `workouts/${key}`));
    }

    // tyhjentää koko treenitaulun
    const deleteAllWorkouts = () => {
        remove(ref(database, `workouts/`));
    }

    const editWorkout = (workout) => {
        setWorkoutToEdit(workout);
        setPressedLogNew(true);
    }

    return (
        <ScrollView  style={{ margin: 15 }}>

            {/* Perusnäkymä */}
            {/* ****************************************************** */}
            
            {!pressedLogNew && (
                <View style={{margin: 15}}>
                    <FAB 
                        title='Add new workout'
                        style={{marginTop: 15}}
                        size="small"
                        color="#464E12"
                        onPress={() => {
                            setPressedLogNew(true);
                        }}
                    />
                <View style={{margin: 15, alignItems: 'center'}}>
                    {workoutData.length > 0 ? (
                        <WorkoutCalendar 
                            workoutData={workoutData}
                        />
                    ) : (
                        <Text>No workouts to show</Text>
                    )}
                </View>

            {/* ****************************************************** */}
            {/* ****************************************************** */}
            {/* Treenilistaus */}

            {/* flatlist ja scrollview yhdessä ei hyvä yhdistelmä, joten käytetään map */}
                {workoutData.map((item, index) => (
                    <View style={{ marginBottom: 35 }} key={index}>
                        <Text>{item.date}</Text>
                            <Text>Workout name: {item.name} </Text>
                            <Text>Workout duration: {item.duration} </Text>
                            <Text>Comments: {item.comments} </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Button 
                                title='Edit'
                                color='#464E12'
                                size="sm"
                                onPress={() => editWorkout(item)}
                                buttonStyle={{  marginTop: 10, borderRadius: 20, width: '55%' }}
                            />
                            <Button 
                                title='Delete'
                                color='red'
                                size="sm"
                                onPress={() => deleteWorkout(item.key)}
                                buttonStyle={{ marginTop: 10, borderRadius: 20, width: '55%' }}
                            />     
                        </View>
                    </View>
                    ))}

                    {workoutData.length > 0 && !pressedLogNew && (
                        <Button 
                            title='Delete all workouts'
                            color="red"
                            buttonStyle={{ marginBottom: 20, borderRadius: 20, width: '50%', alignSelf: 'center'}}
                            onPress={() => deleteAllWorkouts()}
                        />
                    )}
                </View>
                )}
            
            {/* ****************************************************** */}
            {/* ****************************************************** */}
            {/* Uuden treenin lisäys jos "Add new workout" painettu */}

            {pressedLogNew && (
                <View style={{margin: 15}}>
                    <Text style={{fontSize: 17}}>Add new workout</Text>
                    <Text style={{ marginTop: 15, fontSize: 17}}>Workout date: {date.toLocaleDateString()}</Text>
                    <FAB 
                        title='Change Date'
                        style={{marginTop: 15}}
                        size="small"
                        color="#464E12"
                        onPress={() => setShowDatePicker(true)}
                    />
                     <Input 
                        placeholder="Type of workout (eg. gym, running)"
                        value={workout.name}
                        onChangeText={(text) => setWorkout({...workout, name: text})}
                     />
                     <Input 
                        placeholder="Duration"
                        value={workout.duration}
                        onChangeText={(text) => setWorkout({...workout, duration: text})}
                     />
                    <Input 
                        placeholder="How did your workout go?"
                        value={workout.comments}
                        onChangeText={(text) => setWorkout({...workout, comments: text})}
                     />


                    {/* Näytetään päivämäärävalitsin jos "Change date" painettu */}
                    {showDatePicker && (
                        <DateTimePicker 
                            value={date}
                            mode={'date'}
                            onChange={onChange}
                         />
                    )}
        
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
                        <FAB 
                            title='Save workout'
                            style={{marginRight: 15}}
                            size="small"
                            color="#464E12"
                            onPress={() => saveWorkout()}
                        />
                        <FAB 
                            title='Cancel'
                            size="small"
                            color="#464E12"
                            onPress={() => cancel()}
                        />
                    </View>
                </View>
                )}

            {/* ****************************************************** */}
            {/* ****************************************************** */}
                {/* The end */}
        </ScrollView>
    )
} 