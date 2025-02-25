import React, { forwardRef, useRef, useMemo } from "react";
import { View, StyleSheet, Text, TouchableOpacity,Image,ImageSourcePropType } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import 'react-native-get-random-values';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import theme from "../assets/styles/theme";
import BottomSheetBackground from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackground";

const GOOGLE_PLACES_API_KEY = "AIzaSyDeWHr3QIavBa4RGYwZly8h0sNTfLmQ";

const CustomMapView = forwardRef<MapView, React.ComponentProps<typeof MapView>>((props, ref) => (
  <MapView ref={ref as React.Ref<MapView>} {...props} />
));

// Root stack 타입 정의
type RootStackParamList = {
  MapsTab: undefined;
  SearchScreen: undefined;
};
type myBarList = {
  listId : Number,
  title : String, 
  barAdress : String,
  image : ImageSourcePropType,
  hashtageList : String[],
}
const bars: myBarList[] = [
  {
    listId : 1,
    title: "Label",
    barAdress: "거리",
    image: require("../assets/drawable/barExample.png"),
    hashtageList: ["#칵테일 명", "#칵테일 명", "#다른 주류 명","#안주 명"]
  },
  {
    listId : 2,
    title: "Label",
    barAdress: "거리",
    image: require("../assets/drawable/barExample.png"),
    hashtageList: ["#칵테일 명", "#칵테일 명", "#다른 주류 명","#안주 명"]
  },
  
];


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

  // BottomSheet 관련 설정
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);


  const renderBarItem = ({ item }: { item: myBarList }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image style= {styles.itemImage} source= {item.image}/>
        <View style={styles.textContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDistance}>{item.barAdress}</Text>
      <Text style={{color:"#B9B6AD", fontSize : 12}}>인기메뉴</Text>
      <View style={styles.hashtagContainer}>
        {item.hashtageList.map((tag, idx) => (
          <Text key={idx} style={styles.hashtag}>{tag}</Text>
        ))}
      </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 검색 스타일 버튼 */}
      <TouchableOpacity
        style={[styles.searchButton]}
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
        backgroundStyle={{ backgroundColor: theme.background }}
      >
        <View style={styles.sheetHeader}>
        
        </View>
        <BottomSheetFlatList
          data={bars} 
          keyExtractor={(item) => item.listId.toString()} 
          renderItem={renderBarItem}
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
    backgroundColor: theme.background,
    justifyContent: "center",
    paddingHorizontal: 10,
    zIndex: 2,
  },
  searchButtonText: { fontSize: 16, color: "#999" },
  sheetHeader: {
    backgroundColor: "#FFFCF3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    
  },
  sheetTitle: { fontSize: 16, fontWeight: "bold" },

  itemContainer: {
    width : 375,
    height : 156,
    marginTop : 16,
    marginLeft : 16,
    backgroundColor: theme.background,
    flexDirection : "row",
    
  },
  textContainer: {
    marginLeft : 12,
    width : 168,
    height : 48,
    gap : 8
  },
  itemImage : {
    width : 126,
    height : 156
  },
  hashtagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    width: 197,       
    height: 50,       
    maxHeight: 52,    
    gap: 6,           
  },
  hashtag: {
    backgroundColor: "#F3EFE6",
    color : "#7D7A6F",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize : 12,
    textAlign: "center",
    marginBottom: 4,
  },
  itemTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  itemDistance: { fontSize: 14, color: "#7D7A6F" },
});

export default MapsScreen;
