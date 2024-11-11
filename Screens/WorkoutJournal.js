import { Text } from "@rneui/base"
import { FAB, Input, Button } from "@rneui/themed";
import { useState, useEffect } from "react";
import { Alert, View, FlatList } from "react-native";
import { app2 } from "../firebaseConfig";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
// import confirm

const database = getDatabase(app2);

export default function WorkoutJournal() {

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pressedLogNew, setPressedLogNew] = useState(false);

    const [workout, setWorkout] = useState({
        date: new Date().toLocaleDateString(),
        name: '',
        duration: '',
        comments: ''
    });

    const [workoutData, setWorkoutData] = useState([]);

    
    useEffect(() => {
        const workoutRef = ref(database, 'workouts/');
        onValue(workoutRef, (snapshot) => {
            const d = snapshot.val();
            const keys = Object.keys(d);
            const workoutsWithKeys = Object.values(d).map((obj, i) => {
                return {...obj, key: keys[i]}
            });

            setWorkoutData(workoutsWithKeys);
        })
    }, []);



    const saveWorkout = () => {
        setDate(new Date());

        if (workout.name && workout.duration) {
            push(ref(database, 'workouts/'), workout);
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


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);
        setDate(selectedDate);
        setWorkout({...workout, date: currentDate.toLocaleDateString()});
      };



    const cancel = () => {
        setPressedLogNew(false);
        setWorkout({
            date: new Date().toLocaleDateString(),
            name: '',
            duration: '',
            comments: ''
        });
    }



    const deleteWorkout = (key) => {
        remove(ref(database, `workouts/${key}`));
    }

    return (
        <View>

            {/* Default view */}
            {/* ****************************************************** */}
            {!pressedLogNew && (
                <View style={{margin: 15}}>
                    <Text>Add your completed exercise here.</Text>
                    <FAB 
                        title='Add new workout'
                        style={{marginTop: 15}}
                        size="small"
                        color="#464E12"
                        onPress={() => {
                            setPressedLogNew(true);
                        }}
                    />

                    {/* <FAB 
                        title='Delete all workouts'
                        style={{marginTop: 15}}
                        size="small"
                        color="#464E12"
                        onPress={() => deleteWorkouts() }
                    /> */}
            {/* ****************************************************** */}

                </View>
            )}
            



            {/* Add new workout */}
            {/* ****************************************************** */}

            {pressedLogNew ? (

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
                        onChangeText={(text) => setWorkout({...workout, name: text})}
                     />

                     <Input 
                        placeholder="Duration"
                        onChangeText={(text) => setWorkout({...workout, duration: text})}
                     />

                    <Input 
                        placeholder="How did your workout go?"
                        onChangeText={(text) => setWorkout({...workout, comments: text})}
                     />

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
                {/* ****************************************************** */}

                </View>




                ) : (
                    


                <View style={{margin: 15, alignItems: 'center'}}>
                    {/* List of workouts */}
                    {/* ****************************************************** */}
                    <Text>Your completed workouts:</Text>
                    <FlatList 
                    
                        data={workoutData}
                        keyExtractor={(item, index) => index.toString()} 
                        renderItem={({item}) => 
                            <View style={{marginTop: 15}}> 
                                <Text>{item.date}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text>{item.name} </Text>
                                    <Text>{item.duration} </Text>
                                    <Text>{item.comments} </Text>
                                    
                                </View>
                                <Button 
                                        title='Delete'
                                        type='clear'
                                        size="sm"
                                        onPress={() => deleteWorkout(item.key)}
                                />
                            </View>
                        }
                    />
                    {/* ****************************************************** */}

                </View>

                )}
           
                
        </View>
    )
} 