import { useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Input, FAB, Text, LinearProgress, Image, Button, Dialog } from "@rneui/themed";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, ScrollView } from "react-native-gesture-handler";


export default function Exercises() {

    const [keyword, setKeyword] = useState('');
    const [exercises, setExercises] = useState([]);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const setSearchUrl = () => {
        setLoading(true);
        let url = '';
        if (value && keyword) {
            if (value == 1) {
                url = targetMuscleUrl;
            } else if (value == 2) {
                url = equipmentUrl;
            } else if (value == 3) {
                url = exerciseUrl;
            }
        } else if (!value && !keyword) {
            Alert.alert('Please choose a search criteria and enter a valid keyword.');
        } else if (!value) {
            Alert.alert('Please choose a search criteria.');
        } else if (!keyword) {
            Alert.alert('Please enter a valid keyword.');
        }
        
        getExercises(url);
    } 

    const data = [
        {label: 'Target Muscle', value: 1},
        {label: 'Equipment', value: 2},
        {label: 'Exercise name', value: 3},
        ];

    const targetMuscleUrl = 'https://exercisedb.p.rapidapi.com/exercises/target/' + keyword + '?offset=0&limit=10';
    const exerciseUrl = 'https://exercisedb.p.rapidapi.com/exercises/name/' + keyword + '?offset=0&limit=10';
    const equipmentUrl = 'https://exercisedb.p.rapidapi.com/exercises/equipment/' + keyword + '?limit=10&offset=0';

    const getExercises = (url) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'c4ddc20ae7msha38d9e3c269bd10p132fe2jsn9a7fd42242a8',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        })
        .then(response => {
            if (!response.ok)
                throw new Error('Error fetching: ' + response.statusText);

            return response.json()
        })
        .then(data =>  setExercises(data))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }

    const showInstructions = () => {
        setVisible(true);
    }

    const closeDialog = () => {
        setVisible(false);
    }

    return (
        <View>

            <Text style={{margin: 15}}>Search for exercises by muscle group, equipment type or exercise name.</Text>

            <Dropdown 
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                labelField="label"
                valueField="value"
                maxHeight={300}
                placeholder="Select search criteria"
                value={value}
                onChange={item => {
                    setValue(item.value);

                }}
            />

            <Input 
                placeholder="Enter keyword"
                value={keyword}
                onChangeText={text => setKeyword(text)}
                leftIcon={
                    <Ionicons name='search-outline' /> 
                }
            />

                <FAB
                    style={{ width: "80%", margin: 20 }}
                    color="#464E12"
                    size="small"
                    title="Search"
                    onPress={() => {
                        setSearchUrl();
                    }}
                /> 

                <View style={{alignItems: 'center'}}>
                    {loading && <ActivityIndicator size='small' color='purple' />}
                        
                    { exercises.length > 0 ? (
                        <View>
                            <FlatList 
                            
                                data={exercises}
                                renderItem={({item}) => (
                                    <View style={styles.flatlistitem}>
                                        <Text h4 style={{marginBottom: 15}}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                                        <Image 
                                            style={styles.gif}
                                            source={{uri: item.gifUrl}}
                                            PlaceholderContent={ <ActivityIndicator size='small' color='purple' />}
                                        />

                                        <FAB 
                                            title='See instructions'
                                            style={{marginTop: 15}}
                                            size="small"
                                            color="#464E12"
                                            onPress={() => showInstructions()}
                                            />

                                        <Dialog 
                                            isVisible={visible}
                                            onBackdropPress={closeDialog}>
                                                <Dialog.Title title={item.name.charAt(0).toUpperCase() + item.name.slice(1)} />
                                                {item.instructions.map((instruction, index) => (
                                                    <Text key={index} style={{margin: 5}}>{instruction}</Text>
                                                ))}
                                                <Text style={{marginTop: 15, fontWeight: 'bold'}}>Close the instruction by pressing outside of this box.</Text>
                                        </Dialog>
                                    </View>
                                )}
                            />
                        </View> 
                    ) : (
                        <Text>No exercises to show.</Text>
                    )}

                </View>

            </View>

               

                


    )
    
}

const styles = StyleSheet.create({
    dropdown: {
        margin: 15,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },  
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    flatlistitem: {
        margin: 45,
    },
    gif: {
        width: '90%',
        aspectRatio: 1,
    },
    text: {

    }
    
})