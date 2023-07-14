import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import MainMenu from './MainMenu';
import NewCalc from './NewCalc';
import PreviousCalc from './PreviousCalc';
import FAQ from './FAQ';
import Login from './Login';
import Registration from './Registration';
import Scenario1 from './Scenario1';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="MainMenu" component={MainMenu} options={{ headerShown: false }} />
            <Stack.Screen name="NewCalc" component={NewCalc} options={{ title: 'Create a new calculation' }} />
            <Stack.Screen name="PreviousCalc" component={PreviousCalc} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="Registration" component={Registration} options = {{title: 'Register for an account'}}/>
            <Stack.Screen name="Scenario1" component={Scenario1} />
            {/* Add other screens in your navigation stack here */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
