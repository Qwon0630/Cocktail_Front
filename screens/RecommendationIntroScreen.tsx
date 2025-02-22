import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import Icon from "react-native-vector-icons/Ionicons";

type RecommendationIntroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecommendationIntro"
>;

interface Props {
  navigation: RecommendationIntroScreenNavigationProp;
}

const RecommendationIntroScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* 설명 텍스트 */}
      <Text style={styles.description}>
        오늘, 당신의 기분과 취향을 알려주세요. {"\n"}
        완벽한 한 잔을 준비할게요.
      </Text>

      {/* 선택지 (이미지로 표현 가능) */}
      <View style={styles.imagePlaceholder} />

      {/* 버튼 */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate("RecommendationFlow")}
      >
        <Text style={styles.confirmButtonText}>나를 위한 칵테일 찾아보기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendationIntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#888",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  confirmButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
