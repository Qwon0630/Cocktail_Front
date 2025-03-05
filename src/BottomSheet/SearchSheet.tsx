import React, { useRef, useMemo,useState  } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import MyListSheet from "../BottomSheet/MyListSheetContent";
import RegionSheet from "../BottomSheet/RegionSheetContent";

import theme from "../assets/styles/theme";
import { widthPercentage, heightPercentage, fontPercentage } from "../assets/styles/FigmaScreen";

type myBarList = {
  listId: number;
  title: string;
  barAdress: string;
  image: any;
  hashtageList: string[];
};

const myBars: myBarList[] = [
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
const nearBars: myBarList[] = [
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

const SearchSheet = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const [activeSheet, setActiveSheet] = useState<"search" | "myList" | "region">("search");
  const handleSheetChange = (sheetType: "search" | "myList" | "region") => {
  setActiveSheet((prev) => (prev === sheetType ? "search" : sheetType));
};
  const snapPoints = useMemo(() => ["10%", "50%", "90%"], []);
  const [showMyBars, setShowMyBars] = useState(true);
  const sections = [
    {
      title: "나의 칵테일 바",
      data: showMyBars ? myBars : [],
      toggle: true,
    },
    {
      title: "근처 칵테일 바",
      data: nearBars,
    },
  ];


  const renderBarItem = ({ item, index, section }: { item: myBarList; index: number; section: any }) => (
    <>
      <TouchableOpacity style={styles.itemContainer}>
        
        <Image style={styles.itemImage} source={item.image} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDistance}>{item.barAdress}</Text>
          <Text style={{ color: "#B9B6AD", fontSize: fontPercentage(12) }}>인기메뉴</Text>
          <View style={styles.hashtagContainer}>
            {item.hashtageList.map((tag, idx) => (
              <Text key={idx} style={styles.hashtag}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
  
      {section.title === "나의 칵테일 바" && index === section.data.length - 1 && (
        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setShowMyBars(!showMyBars)}
        >
          <Text style={styles.toggleText}>{showMyBars ? "접기" : "더보기"}</Text>
        </TouchableOpacity>
      )}
    </>
  );
  
  const renderSectionHeader = ({ section }: any) => (
    <View style={styles.myListContainer}>
      <Text style={styles.text}>{section.title}</Text>
      <View style={styles.barLine} />
    </View>
  );
  

  return (
    <>
      {activeSheet === "search" && (
        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          backgroundStyle={{ backgroundColor: theme.background }}
        >
          <View style={styles.sheetHeader}>
            {/* 상단 네비게이션 설정 */}
            <TouchableOpacity
              style={[styles.listButton, { marginRight: widthPercentage(12) }]}
              onPress={() => handleSheetChange("myList")}
            >
              <Text style={styles.listText}>나의 리스트</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.listButton} onPress={() => handleSheetChange("region")}>
              <Text style={styles.listText}>지역</Text>
            </TouchableOpacity>
          </View>

          <BottomSheetSectionList
            sections={sections}
            keyExtractor={(item) => item.listId.toString()}
            renderItem={renderBarItem}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
            ListFooterComponent={() =>
              showMyBars && (
                <TouchableOpacity style={styles.toggleButton} onPress={() => setShowMyBars(false)}>
                  <Text style={styles.toggleText}>접기</Text>
                </TouchableOpacity>
              )
            }
          />
        </BottomSheet>
      )}

      {activeSheet === "myList" && <MyListSheet />}
      {activeSheet === "region" && <RegionSheet />}
    </>
  );
};

const styles = StyleSheet.create({
  myListContainer :{
  marginTop : heightPercentage(24),
  marginLeft : widthPercentage(16),
  flexDirection : "row",
  alignItems : "center",
  },
  text: {
    fontSize: fontPercentage(18),
    fontWeight: '700',
    color: '#2D2D2D',

    marginRight : widthPercentage(12),
   
  },
  barLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E4DFD8',
    
  },
  sheetHeader: {
    backgroundColor: "#FFFCF3",
    paddingHorizontal: widthPercentage(16),
    paddingVertical: heightPercentage(8),
    flexDirection: "row",
  },
  listButton :{
    borderRadius : 20,
    backgroundColor : "#F3EFE6",
    alignSelf: "flex-start",
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthPercentage(12),
  }
  ,
  sheetTitle: {
    fontSize: fontPercentage(16),
    fontWeight: "bold",
  },
  itemContainer: {
    width: widthPercentage(375),
    height: heightPercentage(156),
    marginTop: heightPercentage(16),
    marginLeft: widthPercentage(16),
    backgroundColor: theme.background,
    flexDirection: "row",
  },
  textContainer: {
    marginLeft: widthPercentage(12),
    width: widthPercentage(168),
    height: heightPercentage(48),
  },
  itemImage: {
    width: widthPercentage(126),
    height: heightPercentage(156),
  },
  hashtagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: heightPercentage(8),
    width: widthPercentage(197),
    height: heightPercentage(50),
    maxHeight: heightPercentage(52),
  },
  hashtag: {
    backgroundColor: "#F3EFE6",
    color: "#7D7A6F",
    paddingVertical: heightPercentage(4),
    paddingHorizontal: widthPercentage(8),
    borderRadius: widthPercentage(4),
    fontSize: fontPercentage(12),
    textAlign: "center",
    marginBottom: heightPercentage(4),
  },
  listText :{
    color : "#7D7A6F",
    fontSize : fontPercentage(14),
    textAlign: "center",
  },
  itemTitle: {
    fontSize: fontPercentage(18),
    fontWeight: "bold",
    marginBottom: heightPercentage(4),
  },
  itemDistance: {
    fontSize: fontPercentage(14),
    color: "#7D7A6F",
  },
   toggleButton: {
    alignSelf: "center",
    marginVertical: heightPercentage(16),
    paddingVertical: heightPercentage(8),
    paddingHorizontal: widthPercentage(24),
    borderWidth: 1,
    borderColor: "#D1C9BA",
    borderRadius: widthPercentage(8),
  },
  toggleText: {
    fontSize: fontPercentage(14),
    color: "#7D7A6F",
  },
});

export default SearchSheet;