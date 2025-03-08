import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  Easing
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { widthPercentage, heightPercentage, fontPercentage } from "../assets/styles/FigmaScreen";


type RecommendationFlowScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecommendationFlow"
>;

interface Props {
  navigation: RecommendationFlowScreenNavigationProp;
}
const questions = [
  {
    id: 1,
    question: "어서오세요!\n(닉네임)님을 위한 오늘의 칵테일을 준비할게요. 먼저, 어떤 맛을 좋아하세요?",
    options: ["달콤한 맛", "새콤한 맛", "쌉싸름한 맛", "묵직한 맛"],
  },
  {
    id: 2,
    question: "좋아요!\n어떤 종류의 단맛이 끌리시나요?",
    options: ["부드럽고 크리미한 단 맛", "진한 캐러멜 같은 단 맛", "가볍고 상큼한 단 맛"],
  },
  {
    id: 3,
    question: "마지막으로,\n오늘 어느 정도 도수가 괜찮으세요?",
    options: ["가볍게 마시고 싶어요", "적당히 취하고 싶어요", "높은 도수가 좋아요"],
  },
];

const RecommendationFlowScreen: React.FC<Props> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [allAnswered, setAllAnswered] = useState(false);

  const slideUpValues = useRef(questions.map(() => new Animated.Value(0))).current;
  
  const fadeInValues = useRef(questions.map(() => new Animated.Value(0))).current;
  useEffect(() => {
    setAllAnswered(Object.keys(selectedAnswers).length === questions.length);
  }, [selectedAnswers]);

  const fadeInStatusRef = useRef<boolean[]>(questions.map(() => false));
  const fadeInCompletedRef = useRef<boolean[]>(questions.map(() => false));
  const typingBubbleOpacity = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (currentStep === -1) {
        console.log("🎬 '...' 페이드인 시작");
        typingBubbleOpacity.setValue(1); // 초기화
        Animated.sequence([
            Animated.timing(typingBubbleOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.delay(2000), // 2초 동안 유지
            Animated.timing(typingBubbleOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            console.log("✅ '...' 페이드인 완료, 첫번째 질문 표시");
            setCurrentStep(0);
        });
    }
}, [currentStep]);
  
useEffect(() => {
    if (currentStep >= 0 && currentStep < questions.length) {
        console.log(`🎬 페이드인 시작: Step ${currentStep}, 상태 배열: ${fadeInCompletedRef.current}`);
        
        const isStepAlreadyFaded = fadeInCompletedRef.current[currentStep];
        console.log(`🔍 Step ${currentStep} 페이드인 상태 (Ref): ${isStepAlreadyFaded}`);

        if (isStepAlreadyFaded) {
            console.log(`⏭ 페이드인 이미 완료된 Step ${currentStep}, 초기화 방지`);
            return;
        }

        let currentValue = 0;
        fadeInValues[currentStep].addListener(({ value }) => {
            currentValue = value;
            console.log(`🔍 Animated Value 리스너: Step ${currentStep}, Value: ${currentValue}`);
        });

        if (currentValue !== 1) {
            fadeInValues[currentStep].setValue(0);
            console.log(`🚨 Step ${currentStep} Animated Value 초기화: ${currentValue}`);
        } else {
            console.log(`✅ Step ${currentStep} Animated Value 초기화 방지: ${currentValue}`);
        }

        Animated.timing(fadeInValues[currentStep], {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            console.log(`✅ 페이드인 완료: Step ${currentStep}`);
            
            fadeInCompletedRef.current[currentStep] = true;
            console.log(`🆕 업데이트된 상태 배열 (Ref): ${fadeInCompletedRef.current}`);
        });
    }
    console.log("🧾 최종 페이드인 상태 배열: ", fadeInCompletedRef.current);
}, [currentStep]);









const handleOptionSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({
        ...prev,
        [currentStep]: answer,
    }));

    if (currentStep < questions.length - 1) {
        console.log(`🚀 슬라이드 업 애니메이션 시작: Step ${currentStep}`);
        
        // 슬라이드 업 애니메이션 실행
        Animated.timing(slideUpValues[currentStep], {
            toValue: -3,
            duration: 1000,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start(() => {
            console.log(`✅ 슬라이드 업 애니메이션 완료: Step ${currentStep}`);
            // 애니메이션이 완료된 후에만 Step을 증가시킴
            setCurrentStep((prevStep) => prevStep + 1);
        });
    } else {
        setAllAnswered(true);
    }
};


  const handleGoBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} disabled={currentStep === 0}>
            <Image source={require("../assets/drawable/left-chevron.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
            <Image source={require("../assets/drawable/home.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>


      <View style={styles.centralContainer}>

      {currentStep === -1 && (
            <Animated.View
                style={[
                    styles.questionContainer,
                    {
                        opacity: typingBubbleOpacity,
                        transform: [
                            {
                                translateY: slideUpValues[0].interpolate({
                                    inputRange: [-3, -1, 1],
                                    outputRange: [0, -0.1, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <View style={styles.questionWrapper}>
                    <Image
                        source={require("../assets/drawable/thumnail.png")}
                        style={styles.profileImage}
                    />
                    <View style={styles.typingBubble}>
                        <Image
                            source={require("../assets/drawable/chatfield.png")}
                            style={styles.chatFieldImage}
                        />
                    </View>
                </View>
            </Animated.View>
        )}

        {questions.map((item, index) => (
          <Animated.View
            key={index}
            style={[
              styles.questionContainer,
              {
                opacity: fadeInStatusRef.current[index] ? 1 : fadeInValues[index],
                transform: [
                  {
                    translateY: slideUpValues[index].interpolate({
                      inputRange: [-3, -1, 1],
                      outputRange: [-heightPercentage(406) * (currentStep + 1 - index), // 화면 위로 밀려나는 위치
                        0, // 중앙에 위치
                        heightPercentage(406) * (index - currentStep),      // 화면 아래로 밀려나는 위치
                        ],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.questionWrapper}>
              <Image
                source={require("../assets/drawable/thumnail.png")}
                style={styles.profileImage}
              />
              <View style={styles.bubble}>
                <Text style={styles.question}>{item.question}</Text>
              </View>
            </View>

            <View style={styles.optionContainer}>
              {item.options.map((option, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.option,
                    selectedAnswers[index] === option ? styles.selectedOption : {},
                  ]}
                  onPress={() => currentStep === index && handleOptionSelect(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedAnswers[index] === option ? styles.selectedOptionText : {},
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        ))}

        {allAnswered && (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => navigation.navigate("LoadingScreen")}
          >
            <Text style={styles.confirmButtonText}>나만의 칵테일 추천 받기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RecommendationFlowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: widthPercentage(15),
    marginTop: heightPercentage(50),
  },
  icon: {
    width: widthPercentage(28),
    height: widthPercentage(28),
  },
  centralContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    // paddingVertical: heightPercentage(20),
    // backgroundColor: "rgba(255,0,0,0.1)",
  },
  questionContainer: {
    position: 'absolute',
    // alignItems: "center",
    marginBottom: heightPercentage(50),
    alignItems: "flex-start",
    left: widthPercentage(15),
  },
  questionWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: heightPercentage(20),
  },
  profileImage: {
    width: widthPercentage(48),
    height: widthPercentage(48),
    borderRadius: widthPercentage(24),
    marginRight: widthPercentage(12),
  },
  bubble: {
    backgroundColor: "#F3EFE6",
    paddingVertical: heightPercentage(10),
    paddingHorizontal: widthPercentage(15),
    borderRadius: 15,
    maxWidth: widthPercentage(267),
    width: widthPercentage(267),
    flexShrink: 1,
    
  },
  question: {
    fontSize: fontPercentage(14),
    fontWeight: "500",
    color: "#2D2D2D",
    lineHeight: fontPercentage(24),
  },
  optionContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  option: {
    backgroundColor: "#F3EFE6",
    paddingVertical: heightPercentage(10),
    paddingHorizontal: widthPercentage(20),
    borderRadius: 10,
    alignItems: "center",
    marginVertical: heightPercentage(5),
  },
  selectedOption: {
    backgroundColor: "#21103C",
  },
  optionText: {
    fontSize: fontPercentage(14),
    color: "#7D7A6F",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  confirmButton: {
    backgroundColor: "#21103C",
    paddingVertical: heightPercentage(12),
    paddingHorizontal: widthPercentage(50),
    borderRadius: 10,
    position: 'absolute',
    bottom: heightPercentage(44), // Figma에서 제공된 하단 여백을 적용
    alignSelf: 'center',
    width: widthPercentage(343), // Figma의 버튼 너비 343px 적용
    height: heightPercentage(48), // Figma의 버튼 높이 48px 적용
},
  confirmButtonText: {
    fontSize: fontPercentage(16),
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  typingBubble: {
    backgroundColor: "#F3EFE6",
    paddingVertical: heightPercentage(10),
    paddingHorizontal: widthPercentage(15),
    borderRadius: 15,
    maxWidth: widthPercentage(267),
    flexShrink: 1,
    marginLeft: widthPercentage(12),
},
  chatFieldImage: {
    width: widthPercentage(60),
    height: widthPercentage(52),
    resizeMode: "contain",
  },
});
