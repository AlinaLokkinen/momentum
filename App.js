import { createDrawerNavigator } from '@react-navigation/drawer';
import { theme } from './Theme';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './Screens/Home';
import Exercises from './Screens/Exercises';
import WorkoutJournal from './Screens/WorkoutJournal';
import Calendar from './Screens/Calendar';
import Tracker from './Screens/Tracker';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();



export default function App() {


  return (
    
      <NavigationContainer theme={theme}>
        <Drawer.Navigator 
        screenOptions={({route}) => ({
          drawerIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Momentum') {
              iconName = 'home-outline';
            } else if (route.name === 'Exercises') {
              iconName = 'barbell-outline';
            } else if (route.name === 'Workout Journal') {
              iconName = 'book-outline';
            } else if (route.name === 'Calendar') {
              iconName = 'calendar-outline';
            } else if (route.name === 'Tracker') {
              iconName = 'scale-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}>
          
          <Drawer.Screen name='Momentum' component={Home} />
          <Drawer.Screen name='Exercises' component={Exercises} />
          <Drawer.Screen name='Workout Journal' component={WorkoutJournal} />
          <Drawer.Screen name='Calendar' component={Calendar} />
          <Drawer.Screen name='Tracker' component={Tracker} />
          
        </Drawer.Navigator>
      </NavigationContainer>

  );
}

