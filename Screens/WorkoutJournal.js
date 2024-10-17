import { Text } from "@rneui/base"
import { useState } from "react";
import { View } from "react-native";

export default function WorkoutJournal() {

    const [workout, setWorkout] = useState([]);
    const [exercise, setExercise] = useState('');

    return (
        <View>
            <Text>Add your completed exercise here.</Text>

            

        </View>
    )
}