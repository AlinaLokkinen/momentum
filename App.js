import { createDrawerNavigator } from '@react-navigation/drawer';
import { theme } from './Theme';

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
        <Drawer.Navigator>

          <Drawer.Screen name='Home' component={Home} />
          <Drawer.Screen name='Exercises' component={Exercises} />
          <Drawer.Screen name='Workout Journal' component={WorkoutJournal} />
          <Drawer.Screen name='Calendar' component={Calendar} />
          <Drawer.Screen name='Tracker' component={Tracker} />
          
        </Drawer.Navigator>
      </NavigationContainer>

  );
}

