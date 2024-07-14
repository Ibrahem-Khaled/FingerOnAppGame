import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectGame from './App/SelectGame';
import SimpleGameScreen from './App/Game';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="selectGame" component={SelectGame} />
        <Stack.Screen name="game" component={SimpleGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;