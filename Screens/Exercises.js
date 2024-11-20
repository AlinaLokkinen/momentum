import { useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Input, FAB, Text, Image } from "@rneui/themed";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from "react-native-gesture-handler";

export default function Exercises() {

    const [keyword, setKeyword] = useState('');
    const [exercises, setExercises] = useState([]);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);

    // määritetään url käyttäjän valinnan perusteella
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

    // dropdownin vaihtoehdot
    const data = [
        {label: 'Target Muscle', value: 1},
        {label: 'Equipment', value: 2},
        {label: 'Exercise name', value: 3},
        ];

    // urlit
    const targetMuscleUrl = 'https://exercisedb.p.rapidapi.com/exercises/target/' + keyword + '?offset=0&limit=10';
    const exerciseUrl = 'https://exercisedb.p.rapidapi.com/exercises/name/' + keyword + '?offset=0&limit=10';
    const equipmentUrl = 'https://exercisedb.p.rapidapi.com/exercises/equipment/' + keyword + '?limit=10&offset=0';

    // treeniliikkeiden haku
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

    return (
        <ScrollView>
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
                onChange={ item => setValue(item.value) }
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
                color="#012839"
                size="small"
                title="Search"
                onPress={ () => setSearchUrl() }
            /> 

            <View style={{alignItems: 'center'}}>
                {loading && <ActivityIndicator size='small' color='purple' />}
                        
                { exercises.length > 0 ? (
                    <View>
                        {exercises.map((item, index) => (
                            <View style={styles.listitem}  key={index}>
                            <Text h4 style={{marginBottom: 15}}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                            <Image 
                                style={styles.gif}
                                source={{uri: item.gifUrl}}
                                resizeMode={'cover'}
                                PlaceholderContent={ <ActivityIndicator size='small' color='purple' />}
                            />
                            <Text style={{ marginTop: 20 }}>
                                {item.instructions.map((text, i) => (
                                    <Text key={i}>{text}{'\n'}{'\n'}</Text>
                                ))}
                            </Text>
                            </View>
                        ))}
                    </View> 
                ) : (
                    <Text>No exercises to show.</Text>
                )}
            </View>
        </ScrollView>
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
    listitem: {
        margin: 45,
    },
    gif: {
        width: '90%',
        aspectRatio: 1,
    },
})