import React from "react";
import { View, StyleSheet } from "react-native";
import CustomMapView from "../Components/CustomMapView";

const Maps = () => {
  return (
    <View style={styles.container}>
      <CustomMapView
        initialRegion={{
          latitude: 37.5665,
          longitude: 126.9780,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Maps;
