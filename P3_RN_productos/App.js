import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchPage from './components/SearchPage';
import Producto from './components/Producto';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SearchPage} />
        <Stack.Screen name="Product" component={Producto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
