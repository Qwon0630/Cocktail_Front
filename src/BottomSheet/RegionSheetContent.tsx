import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegionSheetContent = () => {
  return (
    <View>
      <Text style={styles.title}>지역</Text>
      <Text style={styles.description}>선택한 지역의 바 리스트를 확인할 수 있습니다.</Text>
    </View>
  );
};

export default RegionSheetContent;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#7D7A6F',
  },
});
