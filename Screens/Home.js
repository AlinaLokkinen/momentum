import { ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { Text } from "@rneui/base";

export default function Home() {

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
        const randomIndex = Math.round(Math.random());
        // console.log(randomIndex);
        return greetings[randomIndex];
    }

    return (
            <View>
                <ImageBackground 
                    source={require('../assets/bg.png')} 
                    style={styles.backGroundImage}>

                {hours < 12 ? (<Text h3 h3Style={{ color: 'white'}}>Good morning!</Text>) : <Text h3 h3Style={{ color: 'white'}}>{getRandomGreeting()}</Text>}
               


                

                </ImageBackground>
            </View>
    );

}

const styles = StyleSheet.create({
    backGroundImage: {
        width: ScreenWidth, 
        height: ScreenHeight,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

