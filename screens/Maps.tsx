import React, { forwardRef, useRef, useMemo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import 'react-native-get-random-values';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const GOOGLE_PLACES_API_KEY = "AIzaSyDeWHr3QIavBa4RGYwZly8h0sNTfLmQ";

const CustomMapView = forwardRef<MapView, React.ComponentProps<typeof MapView>>((props, ref) => (
  <MapView ref={ref as React.Ref<MapView>} {...props} />
));

// Root stack 타입 정의
type RootStackParamList = {
  MapsTab: undefined;
  SearchScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

  // BottomSheet 관련 설정
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // 예시 데이터 (근처 칵테일 바 목록)
  const dummyBars = [
    { id: "1", name: "칵테일 바 명", distance: "100m" },
    { id: "2", name: "칵테일 바 명2", distance: "200m" },
    { id: "3", name: "칵테일 바 명3", distance: "300m" },
  ];

  const renderBarItem = ({ item }: { item: typeof dummyBars[0] }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemDistance}>{item.distance}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 검색 스타일 버튼 */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("SearchScreen" as never)}
      >
        <Text style={styles.searchButtonText}>검색</Text>
      </TouchableOpacity>

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

      {/* 드래그 가능한 BottomSheet: 지도 화면에서만 표시 */}
      <BottomSheet
        ref={sheetRef}
        index={0} // 초기 스냅 포인트: 25%
        snapPoints={snapPoints}
        enablePanDownToClose={false}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>근처 칵테일 바</Text>
        </View>
        <BottomSheetFlatList
          data={dummyBars}
          keyExtractor={(item) => item.id}
          renderItem={renderBarItem}
          contentContainerStyle={styles.sheetContent}
        />
      </BottomSheet>
    </View>
  );
};

const CocktailBookScreen = () => (
  <View style={styles.screen}>
    <FontAwesome name="book" size={24} color="black" />
  </View>
);
const RecommendationsScreen = () => (
  <View style={styles.screen}>
    <FontAwesome name="star" size={24} color="black" />
  </View>
);
const MyPageScreen = () => (
  <View style={styles.screen}>
    <FontAwesome name="user" size={24} color="black" />
  </View>
);

// Tab Navigator: 지도, 칵테일 백과, 맞춤 추천, 마이페이지
const MapsTabNavigator = () => {
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
      <Tab.Screen name="맞춤 추천" component={RecommendationsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="마이페이지" component={MyPageScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const MapsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MapsTab"
        component={MapsTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchButton: {
    position: "absolute",
    top: 60,
    width: "90%",
    alignSelf: "center",
    height: 40,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 10,
    zIndex: 2,
  },
  searchButtonText: { fontSize: 16, color: "#999" },
  sheetHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sheetTitle: { fontSize: 16, fontWeight: "bold" },
  sheetContent: { paddingHorizontal: 16, paddingVertical: 8 },
  itemContainer: {
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 6,
    padding: 10,
    elevation: 2,
  },
  itemTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 4 },
  itemDistance: { fontSize: 12, color: "#666" },
});

export default MapsScreen;
