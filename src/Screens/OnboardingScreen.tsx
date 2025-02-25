import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, Animated, Dimensions, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { StackScreenProps } from "@react-navigation/stack";
import { widthPercentage, heightPercentage, fontPercentage } from "../assets/styles/FigmaScreen";
import theme from "../assets/styles/theme";
type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

const { width } = Dimensions.get("window");

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
    title: "칵테일 바 용 지도",
    text: "지역별 칵테일 바와 메뉴를 한번에 확인하여 내가 원하는 분위기와 메뉴를 찾을 수 있어요",
    image: require("../assets/drawable/onboarding1.png"),
  },
  {
    key: "2",
    title: "편리한 기능",
    text: "당신을 위한 스마트한 기능을 제공합니다.",
    image: require("../assets/drawable/onboarding2.jpg"),
  },
  {
    key: "3",
    title: "시작해볼까요?",
    text: "지금 바로 경험해보세요!",
    image: require("../assets/drawable/onboarding3.jpg"),
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const finishOnboarding = async () => {
    navigation.replace("Login");
  };

  const onSlideChange = (index: number) => {
    setActiveIndex(index);
    Animated.timing(animatedValue, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
        {slides.map((_, i) => {
          const scaleAnim = animatedValue.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  transform: [{ scale: scaleAnim }],
                  backgroundColor: activeIndex === i ? "black" : "gray",
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: SlideItem; index: number }) => (
    <View style={[styles.slide, {backgroundColor : theme.background}]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      
      {renderPagination()}
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={finishOnboarding}
      showSkipButton={true}
      onSkip={finishOnboarding}
      dotStyle={{ display: "none" }}
      activeDotStyle={{ display: "none" }}
      onSlideChange={onSlideChange}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: widthPercentage(20),
  },
  image: {
    width: widthPercentage(375),
    height: heightPercentage(399.74),
    marginTop: heightPercentage(50),
  },
  title: {
    fontSize: fontPercentage(20),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: heightPercentage(47),
  },
  text: {
    color : "#7D7A6F",
    fontSize: fontPercentage(16),
    textAlign: "center",
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(30),
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentage(20),
  },
  dot: {
    width: widthPercentage(7),
    height: heightPercentage(9),
    borderRadius: fontPercentage(5),
    marginHorizontal: widthPercentage(5),
  },
  activeDot: {
    backgroundColor: "black",
    width: widthPercentage(20),
    height: heightPercentage(9),
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
});

export default OnboardingScreen;
