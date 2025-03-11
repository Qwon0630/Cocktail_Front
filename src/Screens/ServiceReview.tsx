import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ServiceReview = () => {
  return (
    <View style={styles.container}>
      <Text>서비스리뷰 화면</Text>
    </View>
  );
};

export default ServiceReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
