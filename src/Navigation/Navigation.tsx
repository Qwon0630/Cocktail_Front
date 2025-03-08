// Navigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../Screens/OnboardingScreen";
import LoginScreen from "../Screens/Login";
import Maps from "../BottomTab/Maps";
import SearchScreen from "../Screens/SearchScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import RegionSelectScreen from "../Screens/RegionSelectScreen";
import CreateNewListScreen from "../Screens/CreateNewListScreen";
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Maps: { searchCompleted?: boolean; setSelectedRegions?: string[] };
  SearchScreen: undefined;
  RegionSelectScreen : undefined;
  BottomTabNavigator : undefined;
  CreateNewListScreen : undefined;
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
        <Stack.Screen name="RegionSelectScreen" component={RegionSelectScreen}/>
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        <Stack.Screen name="CreateNewListScreen" component={CreateNewListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
