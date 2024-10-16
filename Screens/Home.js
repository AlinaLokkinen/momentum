import { Text, View } from "react-native";


export default function Home() {

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
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

            {hours < 12 ? (<Text>Good morning!</Text>) : <Text>{getRandomGreeting()}</Text>}

        </View>
    );

}