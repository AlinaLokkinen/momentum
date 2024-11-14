import { Text } from "@rneui/base";
import { FAB, Input, Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Alert, View, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { app2 } from "../firebaseConfig";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { FlatList } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";
import WeightDiagram from "./WeightDiagram";

const database = getDatabase(app2);

export default function Tracker() {

    const dateToday = new Date().toLocaleDateString();

    const [data, setData] = useState({
        weight: 0.0,
        date: dateToday
    });

    const [weightData, setWeightData] = useState([]);

    const [keys, setKeys] = useState([]);

    useEffect(() => {
        const weightRef = ref(database, 'weight/');
        onValue(weightRef, (snapshot) => {
            const d = snapshot.val();
            if (d) {
                const keys = Object.keys(d);
                setKeys(keys);
            const weightWithKeys = Object.values(d).map((obj, index) => {
                return {...obj, key: keys[index]}
            });
            setWeightData(weightWithKeys);
            } else {
                setWeightData([]);
            }
        })
    }, []);


    const saveWeight = () => {
        if (data.weight) {
            push(ref(database, 'weight/'), data);
        } else {
            Alert.alert('Error', 'Error adding weight. Please make sure you are trying to input only numerical values or that the input field is not empty.');
        }
    }

   const deleteWeight = (key) => {
        remove(ref(database, `weight/${key}`));
   }   
   
   const deleteAllWeight = () => {
        remove(ref(database, `weight/`));
   }

    return (

        <ScrollView  style={{ margin: 15 }}>

            <Text>Track your weight progression here. </Text>

            <Input 
                placeholder="Enter today's weight"
                leftIcon={
                    <Ionicons name='scale-outline' />
                }
                onChangeText={(number) => {
                    if (number === NaN) {
                        Alert.alert('Please input a valid number');
                    } else {
                        setData({...data, weight: parseFloat(number)});
                    }
                }}
            />

            <FAB 
                color="#464E12"
                size="small"
                title="Save"
                onPress={() => saveWeight()}
            />

            <View style={{margin: 15, alignItems: 'center'}}>
                {weightData.length > 0 ? (
                    <WeightDiagram weightData={weightData} />
                ) : (
                    <Text>No data</Text>
                )}
            </View>

            <View>
            <Text style={{marginBottom: 15}}>Your saved weight data:</Text>
            

            {weightData.map((item, index) => (
                <View style={{ marginBottom: 35 }}>
                <Text>{item.date}</Text>
                <Text>{item.weight} kg</Text>
                <Button 
                    title='Delete'
                    color='red'
                    size="sm"
                    onPress={() => deleteWeight(item.key)}
                    buttonStyle={{ alignSelf: 'flex-start', marginTop: 10, borderRadius: 20, width: '15%' }}
                />
            </View>
            ))}

            {weightData.length > 0 ? (
                <Button 
                    title='Delete all weight data'
                    color="red"
                    buttonStyle={{ marginTop: 10, borderRadius: 20, width: '50%', alignSelf: 'center'}}
                    onPress={() => deleteAllWeight()}
                />
            ) : ( <View></View>) }
            </View>

        </ScrollView>

    )
    
}