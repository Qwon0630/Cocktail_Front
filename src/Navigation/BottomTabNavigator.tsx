import React, { useState } from "react";
import { Image, TouchableOpacity, View, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../BottomTab/Maps";
import CocktailBookScreen from "../BottomTab/CocktailBookScreen";
import RecommendationsScreen from "../BottomTab/RecommendationIntroScreen";
import MyPageScreen from "../BottomTab/MyPageScreen";
import theme from "../assets/styles/theme";
import {
  widthPercentage,
  heightPercentage,
  getResponsiveHeight,
} from "../assets/styles/FigmaScreen";
import LoginBottomSheet from "../BottomSheet/LoginBottomSheetProps";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isTokenExpired } from "../tokenRequest/Token";

const Tab = createBottomTabNavigator();

const getTabImage = (screenName: string, focused: boolean) => {
  switch (screenName) {
    case "지도":
      return focused
        ? require("../assets/drawable/map_tab_active.png")
        : require("../assets/drawable/map_tab_inactive.png");
    case "칵테일 백과":
      return focused
        ? require("../assets/drawable/book_tab_active.png")
        : require("../assets/drawable/book_tab_inactive.png");
    case "맞춤 추천":
      return require("../assets/drawable/recommend_tab_inactive.png"); // 추천은 단일 이미지
    case "마이페이지":
      return focused
        ? require("../assets/drawable/mypage_tab_active.png")
        : require("../assets/drawable/mypage_tab_inactive.png");
    default:
      return null;
  }
};

const CustomTabBarButton = ({ screenName, focused, onPress, onLoginTrigger }) => {
  const navigation = useNavigation();

  const handlePress = async () => {
    if (screenName === "맞춤 추천") {
      const token = await AsyncStorage.getItem("accessToken");
      const expired = token ? await isTokenExpired() : true;
      if (!token || expired) {
        onLoginTrigger();
        return;
      }
    }
    navigation.navigate("BottomTabNavigator", { screen: screenName });
  };

  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      activeOpacity={1}
      onPress={handlePress}
    >
      <Image
        source={getTabImage(screenName, focused)}
        style={{
          width: widthPercentage(52),  // Hug 기준 최대값으로 통일
          height: heightPercentage(41),
          resizeMode: "contain",
        }}
      />
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const [isLoginSheetVisible, setLoginSheetVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderTabButton = (routeName: string) => {
    return ({ accessibilityState }) => (
      <CustomTabBarButton
        screenName={routeName}
        focused={accessibilityState.selected}
        onLoginTrigger={() => setLoginSheetVisible(true)}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="지도"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: getResponsiveHeight(90, 90, 90, 100, 100, 100),
            backgroundColor: theme.background,
          },
        }}
      >
        <Tab.Screen
          name="지도"
          component={MapScreen}
          options={{ tabBarButton: renderTabButton("지도") }}
        />
        <Tab.Screen
          name="칵테일 백과"
          component={CocktailBookScreen}
          options={{ tabBarButton: renderTabButton("칵테일 백과") }}
        />
        <Tab.Screen
          name="맞춤 추천"
          component={RecommendationsScreen}
          options={{ tabBarButton: renderTabButton("맞춤 추천") }}
        />
        <Tab.Screen
          name="마이페이지"
          component={MyPageScreen}
          options={{ tabBarButton: renderTabButton("마이페이지") }}
        />
      </Tab.Navigator>

      <LoginBottomSheet
        isVisible={isLoginSheetVisible}
        onClose={() => setLoginSheetVisible(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setLoginSheetVisible(false);
          navigation.navigate("맞춤 추천" as never);
        }}
        navigation={navigation}
      />

      {/* <SafeAreaView edges={["bottom"]} style={{ backgroundColor: theme.background }} /> */}
    </View>
  );
};

export default BottomTabNavigator;
