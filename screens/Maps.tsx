import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  Onboarding: undefined;
  Maps: undefined;
};

type MapsScreenProps = StackScreenProps<RootStackParamList, "Maps">;

const MapsScreen: React.FC<MapsScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> 메인화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MapsScreen;
