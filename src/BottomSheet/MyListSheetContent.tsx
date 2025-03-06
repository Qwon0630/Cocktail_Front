import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyListSheetContent = ({ selectedRegions }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 리스트</Text>
      <Text style={styles.description}>내가 저장한 바 리스트를 확인할 수 있습니다.</Text>
      <Text style={styles.regionText}>
        선택된 지역: {selectedRegions.length > 0 ? selectedRegions.join(", ") : "없음"}
      </Text>
    </View>
  );
};

export default MyListSheetContent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D2D2D",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#7D7A6F",
  },
  regionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
});
