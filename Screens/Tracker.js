import { Text } from "@rneui/base";
import { FAB, Input, Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { app2 } from "../firebaseConfig";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { LineChart } from "react-native-chart-kit";
import { FlatList } from "react-native-gesture-handler";

const database = getDatabase(app2);

export default function Tracker() {

    const dateToday = new Date().toLocaleDateString();

    const [data, setData] = useState({
        weight: 0.0,
        date: dateToday
    });

    const [weightData, setWeightData] = useState([]);

    useEffect(() => {
        const itemsRef = ref(database, 'weight/');
        onValue(itemsRef, (snapshot) => {
            const d = snapshot.val();
            if (d) {
                setWeightData(Object.values(d));
            } else {
                setWeightData([]);
            }
        })
    }, []);


    const saveWeight = () => {
        if (data.weight) {
            push(ref(database, 'weight/'), data);
        } else {
            Alert.alert('Error', 'Please input weight');
        }
    }

//    const deleteWeight = (key) => {
//         remove(ref(database, `weight/${key}`));
//    }    

    return (

        <View>

            <Text>Track your weight progression here. </Text>

            <Input 
                placeholder="Enter today's weight"
                leftIcon={
                    <Ionicons name='scale-outline' />
                }
                onChangeText={(number) => setData({...data, weight: parseFloat(number)})}
            />

            <FAB 
                color="#782E8A"
                size="small"
                title="Save"
                onPress={() => saveWeight()}
            />

            

            <FlatList 
                data={weightData}
                renderItem={({item}) => 
                    <View style={{margin: 15}}>
                        <Text>{item.id}</Text>
                        <Text>{item.date}</Text>
                        <Text>{item.weight}</Text>
                        <Button onPress={() => deleteWeight(item.key)}>Delete</Button>
                    </View>
                }
            />

        </View>

    )
    
}