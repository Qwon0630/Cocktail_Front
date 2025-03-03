import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import Icon from "react-native-vector-icons/Ionicons";

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
    question: "어떤 맛을 좋아하시나요?",
    options: ["달콤한 맛", "새콤한 맛", "쌉싸름한 맛", "묵직한 맛"],
  },
  {
    id: 2,
    question: "어떤 종류의 단맛이 끌리시나요?",
    options: ["부드럽고 크리미한 단 맛", "진한 캐러멜 같은 단 맛", "가볍고 상큼한 단 맛"],
  },
  {
    id: 3,
    question: "오늘 어느 정도 도수가 괜찮으세요?",
    options: ["가볍게 마시고 싶어요", "적당히 취하고 싶어요", "높은 도수가 좋아요"],
  },
];

const RecommendationFlowScreen: React.FC<Props> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [allAnswered, setAllAnswered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const questionOpacity = useRef(new Animated.Value(1)).current;
  const optionsOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setAllAnswered(Object.keys(selectedAnswers).length === questions.length);
  }, [selectedAnswers]);

  useEffect(() => {
    setShowOptions(false);
    questionOpacity.setValue(0);
    optionsOpacity.setValue(0);

    Animated.timing(questionOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setShowOptions(true);
        Animated.timing(optionsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 500);
    });
  }, [currentStep, questionOpacity, optionsOpacity]);

  const handleOptionSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentStep]: answer,
    }));
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
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
          <Icon name="arrow-back" size={28} color={currentStep === 0 ? "#ccc" : "#000"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
          <Icon name="home" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {questions.slice(0, currentStep + 1).map((item, index) => (
          <View key={index} style={styles.questionContainer}>
            <Animated.Text
              style={[styles.question, index === currentStep ? { opacity: questionOpacity } : {}]}
            >
              {item.question}
            </Animated.Text>

            <Animated.View style={{ opacity: index === currentStep ? optionsOpacity : 1 }}>
              {item.options.map((option, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.option,
                    selectedAnswers[index] === option ? styles.selectedOption : {},
                  ]}
                  onPress={() => index === currentStep && handleOptionSelect(option)}
                  disabled={index !== currentStep}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>
        ))}

        {allAnswered && (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => navigation.navigate("LoadingScreen")}
          >
            <Text style={styles.confirmButtonText}>나만의 칵테일 확인해보기</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default RecommendationFlowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  questionContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  option: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: "#aaa",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  confirmButton: {
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});