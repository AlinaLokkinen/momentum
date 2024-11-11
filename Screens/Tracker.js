import { Text } from "@rneui/base";
import { FAB, Input, Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { app2 } from "../firebaseConfig";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { FlatList } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";

const database = getDatabase(app2);

export default function Tracker() {

    const dateToday = new Date().toLocaleDateString();

    const [data, setData] = useState({
        weight: 0.0,
        date: dateToday
    });

    const [weightData, setWeightData] = useState([]);

    useEffect(() => {
        const weightRef = ref(database, 'weight/');
        onValue(weightRef, (snapshot) => {
            const d = snapshot.val();
            const keys = Object.keys(d);
            const weightWithKeys = Object.values(d).map((obj, index) => {
                return {...obj, key: keys[index]}
            });
            setWeightData(weightWithKeys);
        })
    }, []);


    const saveWeight = () => {
        if (data.weight) {
            push(ref(database, 'weight/'), data);
        } else {
            Alert.alert('Error', 'Please input weight');
        }
    }

   const deleteWeight = (key) => {
        remove(ref(database, `weight/${key}`));
   }    

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
                color="#464E12"
                size="small"
                title="Save"
                onPress={() => saveWeight()}
            />

            <View style={{margin: 15, alignItems: 'center'}}>
                <LineChart 
                    weightData={weightData}
                />
            </View>
            

            <View style={{margin: 15, alignItems: 'center'}}>
                <FlatList 
                    data={weightData}
                    renderItem={({item}) => 
                        <View style={{margin: 15}}>
                            <Text>{item.date}</Text>
                            <Text>{item.weight} kg</Text>
                            <Button 
                                title='Delete'
                                type='clear'
                                size="sm"
                                onPress={() => deleteWeight(item.key)}>Delete</Button>
                        </View>
                    }
                />
            </View>

        </View>

    )
    
}