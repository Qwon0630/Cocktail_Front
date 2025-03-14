import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { widthPercentage, heightPercentage, fontPercentage } from "../assets/styles/FigmaScreen";

const categories = ["음식", "칵테일", "와인/샴페인", "맥주/하이볼", "위스키/보드카", "논알콜", "기타"];


const BarDetailSheetContent = ({ selectedBar, setCurrentView, bottomSheetRef }) => {

  return (
    <BottomSheet ref={bottomSheetRef} index={2} snapPoints={["25%", "50%", "100%"]}>
      <ScrollView style={styles.container}>
        {/* 🔙 뒤로 가기 버튼 */}
        <TouchableOpacity onPress={() => setCurrentView("list")} style={styles.backButton}>
          <Text style={styles.backText}>← 목록으로</Text>
        </TouchableOpacity>

        {/* 바 상세 정보 */}
        <View style={styles.header}>
          <Text style={styles.TitleText}>{selectedBar?.title}</Text>
          
          <Image source={require("../assets/drawable/favorite.png")} style={styles.favoriteIcon} />
        </View>
        <Text style={styles.distanceText}>{selectedBar?.barAdress}</Text>

        {/* 가게 이미지 슬라이드 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <Image source={require("../assets/drawable/detailimg1.png")} style={[styles.imgSize, { marginRight: widthPercentage(12) }]} />
          <Image source={require("../assets/drawable/detailimg2.png")} style={styles.imgSize} />
        </ScrollView>

        {/* 가게 정보 리스트 */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Image source={require("../assets/icons/location.png")} style={styles.icon} />
            <Text style={styles.infoText}>서울 중구 만리재로 201 1층 (우)04508</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Text style={styles.copyText}>복사</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 메뉴 탭 */}
        <Text style={[styles.TitleText, { paddingTop: heightPercentage(24), paddingLeft: widthPercentage(16) }]}>메뉴</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.tab}>
                <Text style={styles.tabText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </BottomSheet>
  );
};

export default BarDetailSheetContent;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFCF3" },
  backButton: { padding: 16, alignSelf: "flex-start" },
  backText: { fontSize: 16, color: "#007AFF" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  TitleText: { fontWeight: "700", fontSize: 18 },
  favoriteIcon: { width: 24, height: 24 },
  distanceText: { fontSize: 14, color: "#B9B6AD", paddingLeft: 16 },
  scrollContainer: { paddingHorizontal: 12 },
  imgSize: { width: 178, height: 200, borderRadius: 10, resizeMode: "cover" },
  infoContainer: { padding: 16 },
  infoItem: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  icon: { width: 20, height: 20, marginRight: 8 },
  infoText: { fontSize: 14, color: "#3E3E3E" },
  copyButton: { marginLeft: "auto", backgroundColor: "#F0F0F0", padding: 8, borderRadius: 6 },
  copyText: { fontSize: 12, color: "#A0A0A0" },
  tabsContainer: { flexDirection: "row", paddingHorizontal: 14, paddingTop: 16 },
  tab: { alignItems: "center", paddingHorizontal: 12 },
  tabText: { fontSize: 14, color: "#B9B6AD", fontWeight: "500", paddingBottom: 6 },
});
