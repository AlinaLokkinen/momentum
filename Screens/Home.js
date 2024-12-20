import { ImageBackground, View } from "react-native";
import { StyleSheet } from "react-native";
import {  ScreenHeight, ScreenWidth } from "@rneui/base";
import { Text, FAB } from "@rneui/base";

// react navigation
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
                    style={styles.backGroundImage}
                >

                {hours < 12 ? 
                    (   <View style={{justifyContent: 'center', marginBottom: 175}}>
                            <Text h3 h3Style={{ marginBottom: 15}}>Good morning!</Text>
                            <FAB
                                style={{ width: "38%" }}
                                color="#012839"
                                size="small"
                                title="Add new workout"
                                onPress={() => navigation.navigate('Workout Journal')}
                            />
                        </View>
                    ) : (   
                        <View style={{alignContent: 'center', marginBottom: 175}}>
                            <Text h3 h3Style={{ marginBottom: 15}}>{getRandomGreeting()}</Text>
                            <FAB
                                style={{ width: "38%" }}
                                color="#012839"
                                size="small"
                                title="Add new workout"
                                onPress={() => navigation.navigate('Workout Journal')}
                            />
                        </View>
                    )}
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

