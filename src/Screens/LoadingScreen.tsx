import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoadingScreen"
>;

interface Props {
  navigation: LoadingScreenNavigationProp;
}

const LoadingScreen: React.FC<Props> = ({ navigation }) => {
  const [loadingDots, setLoadingDots] = useState(".");

  useEffect(() => {
    // 3초 후 결과 화면으로 이동
    const timeout = setTimeout(() => {
      navigation.navigate("ResultScreen");
    }, 3000);

    // 0.5초마다 "..." 애니메이션 효과
    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 400);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>
        지금 바텐더가 당신을 위한 칵테일을 만들고 있어요{loadingDots}
      </Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { fontSize: 18, fontWeight: "bold" },
});