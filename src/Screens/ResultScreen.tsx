import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types"; // Stack 타입 정의

type NavigationProps = StackNavigationProp<RootStackParamList, "ResultScreen">;

const ResultScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>[닉네임]님을 위한 칵테일이 준비되었습니다!</Text>
      <View style={styles.cocktailImage} />
      <Text style={styles.cocktailName}>칵테일 이름</Text>
      <Text style={styles.cocktailDescription}>칵테일 설명이고 맛있습니다</Text>

      {/* 버튼 및 추가 텍스트 */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>해당 메뉴가 있는 가게 찾기</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            style={styles.smallButton}
            onPress={() => navigation.navigate("RecommendationFlow")}
            >
          <Text style={styles.buttonText}>다시 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => navigation.navigate("Maps")} // '홈으로' 클릭 시 Maps.tsx로 이동
        >
          <Text style={styles.buttonText}>홈으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  cocktailImage: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  cocktailName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  cocktailDescription: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  smallButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});