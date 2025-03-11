import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OneOnOne = () => {
  return (
    <View style={styles.container}>
      <Text>1:1 문의하기 화면</Text>
    </View>
  );
};

export default OneOnOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
