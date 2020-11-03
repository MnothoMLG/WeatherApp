import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Favourites from '../screens/Favourites'
import Home from '../screens/Home'
import * as Strings from '../constants/Strings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === Strings.navHome) {
              iconName = focused ? Strings.homeIconActive : Strings.homeIcon ;
            } else if (route.name === Strings.navFavourites) {
              iconName = focused ? Strings.favIconActive : Strings.favIcon;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name={Strings.navHome}  component={Home} />
        <Tab.Screen name={Strings.navFavourites} component={Favourites} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


