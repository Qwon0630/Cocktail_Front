import React, { useEffect, useRef, useState } from "react";
import { Linking, View, StyleSheet, Alert, Platform, PermissionsAndroid } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import "react-native-get-random-values";
import RecommendationIntroScreen from "./RecommendationIntroScreen";

const GOOGLE_PLACES_API_KEY = "AIzaSyC0JEHhyV_duAla3PxCbQECtpxG17u1LnI"; // 여기에 Google Places API Key 입력

const CustomMapView = React.forwardRef<MapView, React.ComponentProps<typeof MapView>>(
  (props, ref) => <MapView ref={ref as React.Ref<MapView>} {...props} />
);

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [markerPosition, setMarkerPosition] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  // 위치 권한 요청
  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log("iOS 위치 권한 상태:", result);
      if(result !== RESULTS.GRANTED){
        showLocationPermissionAlert();
        return false;
      }
      return true;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        showLocationPermissionAlert();
        return false;
      }
      return true;
    }
  };

  // 위치 권한 요청 실패 시 설정 화면으로 이동하는 경고창
const showLocationPermissionAlert = () => {
  Alert.alert(
    "위치 권한 필요",
    "현재 위치를 가져오려면 위치 권한을 활성화해야 합니다.\n설정에서 권한을 허용해주세요.",
    [
      { text: "취소", style: "cancel" },
      { text: "설정으로 이동", onPress: () => Linking.openSettings() },
    ]
  );
};

  // 현재 위치 가져오기
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("위치 권한 필요", "현재 위치를 가져오려면 위치 권한이 필요합니다.");
      setLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };

        setMarkerPosition(newRegion);
        mapRef.current?.animateToRegion(newRegion);
        setLoading(false);
      },
      (error) => {
        Alert.alert("위치 가져오기 실패", error.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="검색"
        fetchDetails={true}
        debounce={200}
        listViewDisplayed="auto"
        minLength={2}
        onPress={(data, details = null) => {
          if (details) {
            const { lat, lng } = details.geometry.location;
            const newRegion = {
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            };

            setMarkerPosition(newRegion);
            mapRef.current?.animateToRegion(newRegion);
          }
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "ko",
          components: "country:KR",
        }}
        styles={{
          container: { position: "absolute", top: 80, width: "90%", alignSelf: "center", zIndex: 1 },
          textInput: { height: 40, borderRadius: 5, paddingHorizontal: 10, backgroundColor: "#fff" },
          listView: { backgroundColor: "#fff", position: "absolute", top: 130, width: "90%", alignSelf: "center", zIndex: 2 },
        }}
      />

      <CustomMapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.5665, // 기본 서울 좌표
          longitude: 126.9780,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        region={markerPosition || undefined} // 현재 위치가 있으면 적용
      >
        {markerPosition && (
          <Marker coordinate={markerPosition} title="현재 위치" description="현재 위치입니다." />
        )}
      </CustomMapView>
    </View>
  );
};

const CocktailBookScreen = () => (
  <View style={styles.screen}>
    <FontAwesome name="book" size={24} color="black" />
  </View>
);
const MyPageScreen = () => (
  <View style={styles.screen}>
    <FontAwesome name="user" size={24} color="black" />
  </View>
);

const Tab = createBottomTabNavigator();

const MapsScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "지도") iconName = "map";
          else if (route.name === "칵테일 백과") iconName = "book";
          else if (route.name === "맞춤 추천") iconName = "star";
          else if (route.name === "마이페이지") iconName = "user";
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="지도" component={MapScreen} options={{ headerShown: false }} />
      <Tab.Screen name="칵테일 백과" component={CocktailBookScreen} options={{ headerShown: false }} />
      <Tab.Screen name="맞춤 추천" component={RecommendationIntroScreen} options={{ headerShown: false }} />
      <Tab.Screen name="마이페이지" component={MyPageScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default MapsScreen;
