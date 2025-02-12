import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

type OnboardingScreenProps = StackScreenProps<RootStackParamList, "Onboarding">;

interface SlideItem {
  key: string;
  title: string;
  text: string;
  image: any;
}

const slides: SlideItem[] = [
  {
    key: "1",
    title: "Welcome!",
    text: "이 앱에서 제공하는 주요 기능을 소개할게요.",
    image: require("../assets/onboarding1.jpg"),
  },
  {
    key: "2",
    title: "편리한 기능",
    text: "당신을 위한 스마트한 기능을 제공합니다.",
    image: require("../assets/onboarding2.jpg"),
  },
  {
    key: "3",
    title: "시작해볼까요?",
    text: "지금 바로 경험해보세요!",
    image: require("../assets/onboarding3.jpg"),
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("onboardingDone", "true");
    navigation.replace("Login");
  };

  const renderItem = ({ item }: { item: SlideItem }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={finishOnboarding}
      showSkipButton={true}
      onSkip={finishOnboarding}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default OnboardingScreen;
