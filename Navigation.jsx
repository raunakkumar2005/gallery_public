import React from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import { useIsFocused } from '@react-navigation/native';
import FamilyScreen from './screens/FamilyScreen';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import FullScreenImageScreen from './screens/FullScreenImageScreen';



const FullScreenImageStack = () => {

  return (

    <Stack.Navigator>
      <Stack.Screen name="FullScreenImageStack" component={FullScreenImageScreen} options={{
        headerShown: false
      }} />
    </Stack.Navigator>

  );
};


const App = () => {

  // console.log(colors);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Friends') {
              iconName = 'users';
            } else if (route.name === 'Family') {
              iconName = 'heart';
            }

            // You can use color directly to match active/inactive color
            return <FontAwesome name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#007AFF',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Family" component={FamilyScreen} />
        <Tab.Screen name="FullScreenImage" component={FullScreenImageStack} options={{ tabBarButton: () => null, headerShown: false, tabBarVisible: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
