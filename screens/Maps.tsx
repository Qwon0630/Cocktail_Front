import React, {forwardRef, useRef} from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';

const GOOGLE_PLACES_API_KEY = "AIzaSyDeVQ2wHr3QIavBa4RGYwZly8h0sNTfLmQ"; 

const CustomMapView = forwardRef<MapView, React.ComponentProps<typeof MapView>>((props, ref) => (
  <MapView ref={ref as React.Ref<MapView>} {...props} />
));

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);

  return (
    <View style={styles.container}>

      {/* 검색창 */}
      <GooglePlacesAutocomplete
        placeholder="검색"
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {
            const { lat, lng } = details.geometry.location;
            mapRef.current?.animateToRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            });
          }
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "ko",
        }}
        styles={{
          container: {
            position: "absolute",
            top: 60,
            width: "90%",
            alignSelf: "center",
            zIndex: 1,
          },
          textInput: {
            height: 40,
            borderRadius: 5,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
          },
        }}
      />

      {/* 지도 */}
      <CustomMapView
        ref={mapRef} 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.5665,
          longitude: 126.9780,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* 마커 */}
        <Marker
          coordinate={{ latitude: 37.5665, longitude: 126.9780 }}
          title="가게 이름"
          description="여기에 가게 설명 입력"
        />
      </CustomMapView>
    </View>
  );
};


const CocktailBookScreen = () => <View style={styles.screen}><FontAwesome name="book" size={24} color="black" /></View>;
const RecommendationsScreen = () => <View style={styles.screen}><FontAwesome name="star" size={24} color="black" /></View>;
const MyPageScreen = () => <View style={styles.screen}><FontAwesome name="user" size={24} color="black" /></View>;

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
      <Tab.Screen name="지도" component={MapScreen} options={{headerShown: false}}/>
      <Tab.Screen name="칵테일 백과" component={CocktailBookScreen} options={{headerShown: false}}/>
      <Tab.Screen name="맞춤 추천" component={RecommendationsScreen} options={{headerShown: false}}/>
      <Tab.Screen name="마이페이지" component={MyPageScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default MapsScreen;
