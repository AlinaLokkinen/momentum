import { ImageBackground, View } from "react-native";
import { StyleSheet } from "react-native";
import {  ScreenHeight, ScreenWidth } from "@rneui/base";
import { Text, FAB } from "@rneui/base";

export default function Home({ navigation }) {

    const date = new Date();
    const hours = date.getHours();

    const getRandomGreeting = () => {
        const greetings = [
            "Hello!",
            "Hi there!",
            "Hey!",
            "Greetings!",
            "How's it going?",
            "Nice to see you!",
            "What's up?",
            "How are you?",
            "Howdy!",
            "Welcome!",
            "Great to have you here!",
          ];
        const randomIndex = Math.round(Math.random() * 10);
        return greetings[randomIndex];
    }

    return (
            <View>
                <ImageBackground 
                    source={require('../assets/bg.png')} 
                    style={styles.backGroundImage}>

                {hours < 12 ? 
                    (   <View style={styles.container}>
                            <Text h3 h3Style={{ color: 'white'}}>Good morning!</Text>
                        </View>
                    ) : (   
                        <View style={styles.container}>
                            <Text h3 h3Style={{ color: 'white'}}>{getRandomGreeting()}</Text>
                        </View>
                    )}
               
                <FAB
                    style={{ width: "80%", margin: 20 }}
                    color="#464E12"
                    size="small"
                    title="Add new workout"
                    onPress={() => navigation.navigate('Workout Journal')}
                />
                </ImageBackground>
            </View>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    backGroundImage: {
        width: ScreenWidth, 
        height: ScreenHeight,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    }
})

