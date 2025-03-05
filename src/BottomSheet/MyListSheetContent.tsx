import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyListSheetContent = () => {
  return (
    <View>
      <Text style={styles.title}>나의 리스트</Text>
      <Text style={styles.description}>내가 저장한 바 리스트를 확인할 수 있습니다.</Text>
    </View>
  );
};

export default MyListSheetContent;

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
