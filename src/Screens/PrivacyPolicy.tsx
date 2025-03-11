import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <Text>개인정보처리방침 화면</Text>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
