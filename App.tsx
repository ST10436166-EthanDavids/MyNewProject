import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './homescreen';
import AddMenuScreen from './Screens/AddMenuScreen';
import FilterMenuScreen from './Screens/FilterMenuScreen';
import { MenuItem } from '../types';  // Import the MenuItem type

// Define the types for navigation
type RootStackParamList = {
  Home: undefined;
  AddMenu: undefined;
  FilterMenu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const removeMenuItem = (index: number) => {
    setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          children={(props) => (
            <HomeScreen
              {...props} // Spread the props
              menuItems={menuItems} // Pass menuItems
              setMenuItems={setMenuItems} // Pass setMenuItems
              removeMenuItem={removeMenuItem} // Pass removeMenuItem
            />
          )}
        />
        <Stack.Screen name="AddMenu">
          {(props) => (
            <AddMenuScreen
              {...props} // Spread the props
              menuItems={menuItems} // Pass menuItems
              setMenuItems={setMenuItems} // Pass setMenuItems
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="FilterMenu">
          {(props) => (
            <FilterMenuScreen
              {...props} // Spread the props
              menuItems={menuItems} // Pass menuItems
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
