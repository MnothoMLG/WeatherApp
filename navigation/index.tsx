import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LandingPage from '../screens/LocalStorage/LandingPage'
import Screen2 from '../screens/LocalStorage/Screen2'
import Screen3 from '../screens/LocalStorage/Screen3'
import Webviewer from '../screens/Webviewer'
import Wiki from '../screens/Wiki'
import AllScreens from '../screens'


const Stack = createStackNavigator();

function RNApp() {
    return (
      <NavigationContainer independent={true} >
        <Stack.Navigator  initialRouteName="AllScreens">
            <Stack.Screen name="AllScreens" component={AllScreens} />
            <Stack.Screen name="LocalStorage" component={LandingPage} />
            <Stack.Screen name="Screen2" component={Screen2} />
            <Stack.Screen name="Screen3" component={Screen3} />
            <Stack.Screen name="Wiki" component={Wiki} />
            <Stack.Screen name="Webviewer" component={Webviewer} />
        </Stack.Navigator>
     </NavigationContainer>
    );
  }
    
  export default (RNApp)