import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/Login";
import MapsScreen from "./screens/Maps";
import RecommendationIntroScreen from "./screens/RecommendationIntroScreen"; 
import RecommendationFlowScreen from "./screens/RecommendationFlowScreen";
import LoadingScreen from "./screens/LoadingScreen";
import ResultScreen from "./screens/ResultScreen";
import CocktailBookScreen from "./screens/CocktailBookScreen";

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Maps: undefined;
  RecommendationFlow: undefined;
  RecommendationIntro: undefined;
  LoadingScreen: undefined;
  ResultScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingDone");
        setIsFirstLaunch(value === null);
      } catch (error) {
        console.error("AsyncStorage error: ", error);
      }
    };

    checkOnboarding();

    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Maps" component={MapsScreen} />
        <Stack.Screen name="RecommendationIntro" component={RecommendationIntroScreen} />
        <Stack.Screen name="RecommendationFlow" component={RecommendationFlowScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="CocktailBookScreen" component={CocktailBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
