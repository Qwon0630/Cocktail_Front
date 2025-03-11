import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TermsOfUse = () => {
  return (
    <View style={styles.container}>
      <Text>이용약관 화면</Text>
    </View>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
