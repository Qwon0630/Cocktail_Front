import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RecommendationFlowScreen from "../screens/RecommendationFlowScreen";
import LoadingScreen from "../screens/LoadingScreen";
import ResultScreen from "../screens/ResultScreen";

export type RootStackParamList = {
  RecommendationFlow: undefined;
  LoadingScreen: undefined;
  ResultScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RecommendationStack = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecommendationFlow" component={RecommendationFlowScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RecommendationStack;
