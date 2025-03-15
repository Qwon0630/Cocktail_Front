import React, { useMemo, useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import theme from "../assets/styles/theme";
import SearchSheetContent from "../BottomSheet/SearchSheetContent";
import MyListSheetContent from "../BottomSheet/MyListSheetContent";
import BarDetailSheetContent from "../BottomSheet/BarDetailSheetContent";
import { widthPercentage, heightPercentage, fontPercentage } from "../assets/styles/FigmaScreen";
import { useNavigation } from "@react-navigation/native"; 


const myBars = [
  {
    listId: 1,
    title: "Label",
    barAdress: "거리",
    image: require("../assets/drawable/barExample.png"),
    hashtageList: ["#칵테일명", "#칵테일명", "#다른주류명", "#안주명"],
  },
  {
    listId: 2,
    title: "Label",
    barAdress: "거리",
    image: require("../assets/drawable/barExample.png"),
    hashtageList: ["#칵테일명", "#칵테일명", "#다른주류명", "#안주명"],
  },
];

const nearBars = [
  {
    listId: 1,
    title: "Label",
    barAdress: "거리",
    image: require("../assets/drawable/barExample.png"),
    hashtageList: ["#칵테일명", "#칵테일명", "#다른주류명", "#안주명"],
  },
];

const BaseBottomSheet = () => {
  
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "30%", "76%"], []); // 바텀시트 크기 데이터터
  const [showMyBars, setShowMyBars] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"search" | "myList" | "region">("search");
  const [currentView, setCurrentView] = useState("list"); // 리스트 및 상세정보 변경 데이터터
  const [selectedBar, setSelectedBar] = useState(null); //칵테일바 가게 클릭 데이터

  // sections 데이터 변경
  const sections = useMemo(() => {
    if (selectedTab === "myList") {
      return [{ title: "나의 칵테일 바", data: myBars }];
    } else if (selectedTab === "region") {
      return [{ title: "근처 칵테일 바", data: nearBars }];
    }
    return [
      { title: "나의 칵테일 바", data: myBars },
      { title: "근처 칵테일 바", data: nearBars },
    ];
  }, [selectedTab]);

  // 버튼 클릭 시 같은 버튼이면 기본 화면('search')으로 변경
  const handleTabPress = (tab: "myList" | "region") => {
    setSelectedTab((prev) => (prev === tab ? "search" : tab));
  
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: theme.background }}
    >
      {/* 네비게이션 버튼 */}
      {currentView === "list" && (
        <View style={styles.sheetHeader}>
          <TouchableOpacity
            style={[styles.listButton, selectedTab === "myList" && styles.activeButton]}
            onPress={() => handleTabPress("myList")}
          >
            <Text style={[styles.listText, selectedTab === "myList" && styles.activeText]}>
              나의 리스트
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.listButton, selectedTab === "region" && styles.activeButton]}
            onPress={() => navigation.navigate("RegionSelectScreen")}
          >
            <Text style={[styles.listText, selectedTab === "region" && styles.activeText]}>
              지역
            </Text>
          </TouchableOpacity>
        </View>
      )}

{selectedTab === "myList" ? (
  <MyListSheetContent />
) : currentView === "list" ? (
  <SearchSheetContent
    bottomSheetRef={bottomSheetRef}
    sections={sections}
    showMyBars={showMyBars}
    setShowMyBars={setShowMyBars}
    setCurrentView={setCurrentView}
    setSelectedBar={setSelectedBar}
    selectedTab={selectedTab} 
    currentView={currentView}  
  />
) : selectedBar ? (
  <BarDetailSheetContent
    selectedBar={selectedBar}
    setCurrentView={setCurrentView}
    bottomSheetRef={bottomSheetRef}
  />
) : (
  <Text style={{ textAlign: "center", padding: 20 }}>🚨 상세 정보를 표시할 바가 없습니다.</Text>
)}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetHeader: {
    backgroundColor: "#FFFCF3",
    paddingHorizontal: widthPercentage(16),
    paddingVertical: heightPercentage(8),
    flexDirection: "row",
  },
  listButton: {
    borderRadius: 20,
    backgroundColor: "#F3EFE6",
    alignSelf: "flex-start",
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthPercentage(12),
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: "#21103C",
  },
  listText: {
    color: "#7D7A6F",
    fontSize: fontPercentage(14),
    textAlign: "center",
  },
  activeText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default BaseBottomSheet;
