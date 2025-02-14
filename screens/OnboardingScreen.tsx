import React, {useRef, useState} from "react";
import { View, Text, Image, StyleSheet, Animated, Dimensions, FlatList } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { StackScreenProps } from "@react-navigation/stack";
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
      duration: 300, // 0.3초 동안 애니메이션 적용
      useNativeDriver: false,
    }).start();
  };
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, i) => {
          const scale = animatedValue.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [1, 1.5, 1], // 현재 슬라이드의 크기를 키움
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  transform: [{ scale }],
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
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <Image source={item.image} style={styles.image} />

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
    dotStyle={{ display: "none" }} // 기본 인디케이터 숨김
    activeDotStyle={{ display: "none" }} // 기본 활성화 인디케이터 숨김
    onSlideChange={onSlideChange}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  image: {
    width: 180,
    height: 343,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom : 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom : 30
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // 이미지 아래 여백 추가
  },
  dot: {
    width: 7,
    height: 9,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "black", // 활성화된 페이지 색상
    width: 20, // 크기를 더 크게 설정
    height: 9,
  },
  inactiveDot: {
    backgroundColor: "gray", // 비활성화된 페이지 색상
  },
});

export default OnboardingScreen;
