import { Text } from "@rneui/base";
import { FAB, Input, Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Alert, View, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { app2 } from "../firebaseConfig";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import WeightDiagram from "./WeightDiagram";

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
            // tarkista tuleeko dataa, muuten pidä tyhjä taulukko
            // muuten diagrammi ei toimi
            if (d) {
                const keys = Object.keys(d);
                const weightWithKeys = Object.values(d).map((obj, index) => {
                return {...obj, key: keys[index]}
            });
            setWeightData(weightWithKeys);
            } else {
                setWeightData([]);
            }
        })
    }, []);

    // tallenna paino tietokantaan
    const saveWeight = () => {

        if (data.weight) {
            push(ref(database, 'weight/'), data);
        } else {
            Alert.alert('Error', 'Error adding weight. Please make sure you are trying to input only numerical values or that the input field is not empty.');
        }
    }

    // poista yksi paino 
   const deleteWeight = (key) => {
        remove(ref(database, `weight/${key}`));
   }   
   
    // tyhjennä koko taulukko    
   const deleteAllWeight = () => {
        remove(ref(database, `weight/`));
   }



    return (
        <ScrollView  style={{ margin: 15 }}>
            
            <Text>Track your weight progression here. </Text>
            
            <Input 
                placeholder="Enter today's weight"
                value={data.weight}
                leftIcon={
                    <Ionicons name='scale-outline' />
                }
                onChangeText={ (number) => setData({...data, weight: parseFloat(number)}) }
            />

            <FAB 
                color="#012839"
                size="small"
                title="Save"
                onPress={ () => saveWeight() }
            />
            

            <View style={{margin: 15, alignItems: 'center'}}>
                {weightData.length > 0 ? (
                    <WeightDiagram weightData={weightData} />
                ) : (
                    <Text>No data</Text>
                )}
            </View>

           

            <Text style={{marginBottom: 15}}>Your saved weight data:</Text>
            
            {weightData.map((item, index) => (
                <View style={{ marginBottom: 35 }} key={index}>
                <Text>{item.date}</Text>
                <Text>{item.weight} kg</Text>
                <View style={{flexDirection: 'row'}}>
                    <Button 
                        title='Delete'
                        color='red'
                        size="sm"
                        onPress={() => deleteWeight(item.key)}
                        buttonStyle={{ alignSelf: 'flex-start', marginTop: 10, borderRadius: 20, width: '55%' }}
                    />
                </View>
            </View>
            ))}

            {weightData.length > 0 && (
                <Button 
                    title='Delete all weight data'
                    color="red"
                    buttonStyle={{ marginTop: 10, borderRadius: 20, width: '50%', alignSelf: 'center'}}
                    onPress={() => deleteAllWeight()}
                />
            )}
        </ScrollView>
    )
}