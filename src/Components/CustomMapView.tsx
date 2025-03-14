import React, { useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

interface CustomMapViewProps {
  initialRegion: any;
  setCurrentView: (view: string) => void; // 🔹 부모에서 관리할 `setCurrentView` 추가
}

const CustomMapView: React.FC<CustomMapViewProps> = ({ initialRegion, setCurrentView }) => {
  const mapRef = useRef<MapView>(null);
  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={initialRegion}
    >
      <Marker
        coordinate={{ latitude: 37.5665, longitude: 126.9780 }}
        title="가게 이름"
        description="여기에 가게 설명 입력"
        onPress={() =>setCurrentView("pinClick")}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 },
});

export default CustomMapView;
