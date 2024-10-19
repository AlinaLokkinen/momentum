import { Text } from "@rneui/base"
import { FAB, Input } from "@rneui/themed";
import { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import { app2 } from "../firebaseConfig";
import { getDatabase, ref, push, onValue } from "firebase/database";
import Ionicons from '@expo/vector-icons/Ionicons';

const database = getDatabase(app2);

export default function WorkoutJournal() {

    const [workout, setWorkout] = useState([{
        mood: '',
        duration: '',
        comment: ''
    }]);

    // const [exercise, setExercise] = useState('');
    // const [exerciseList, setExerciseList] = useState([]);

    const [workoutMood, setWorkoutMood] = useState('');
    const [workoutDuration, setWorkoutDuration] = useState('');
    const [workoutComment, setWorkoutComment] = useState('');

    const [workoutData, setWorkoutData] = useState([]);

    useEffect(() => {
        const workoutRef = ref(database, 'workouts/');
        onValue(workoutRef, (snapshot) => {
            const d = snapshot.val();
            if (d) {
                setWorkoutData(Object.values(d));
            } else {
                setWorkoutData([]);
            }
        })
    }, []);

    const saveWorkout = () => {
        setWorkout({...workout, mood: workoutMood, duration: workoutDuration, comment: workoutComment});

        if (workout.mood && workout.duration && workout.comment) {
            push(ref(database, 'workouts/'), workout);
        } else {
            Alert.alert('Error', 'Please input the duration and mood of your exercise.');
        }
    }

    return (
        <View>
            <Text>Add your completed exercise here.</Text>

            <Input 
                placeholder="Duration"
                leftIcon={
                    <Ionicons name='timer-outline' />
                }
                onChangeText={(text) => setWorkoutDuration(text)}
            />

            <Input 
                placeholder="Mood"
                leftIcon={
                    <Ionicons name='thumbs-up-outline'
                     />
                }
                onChangeText={(text) => setWorkoutMood(text)}
            />

            <Input 
                placeholder="How did your workout go?"
                leftIcon={
                    <Ionicons name='chatbox-outline' />
                }
                onChangeText={(text) => setWorkoutComment(text)}
            />

            <FAB 
                color="#782E8A"
                size="small"
                title="Save workout"
                onPress={() => saveWorkout()}
            />

        </View>
    )
} 