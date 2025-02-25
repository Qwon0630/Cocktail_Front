// Navigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../Screens/OnboardingScreen";
import LoginScreen from "../Screens/Login";
import MapsScreen from "../Screens/Maps";
import SearchScreen from "../Screens/SearchScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Maps: undefined;
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Maps" component={MapsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
