import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import theme from "../assets/styles/theme";

// RootStack 타입 정의 (SearchScreen 및 ResultScreen 혹은 이전 화면 전환용)
type RootStackParamList = {
  SearchScreen: undefined;
  ResultScreen: undefined;
};

type SearchScreenProps = StackScreenProps<RootStackParamList, "SearchScreen">;

const recommendedKeywords = ["추천 검색어1", "추천 검색어2", "추천 검색어3", "추천 검색어4"];
const recentSearches = ["검색어 1", "검색어 2"];

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  // 검색어 항목 터치 시 원하는 동작 구현 (예: ResultScreen 전환)
  const handlePress = () => {
    navigation.navigate("ResultScreen");
  };

  return (

    <View style={styles.container}>
      {/* 시스템 영역, 색상 및 아이콘 표시 변경 */}
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />

      {/* 상단 헤더 영역: 뒤로가기 아이콘과 검색 입력창을 같은 줄에 배치 */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={20} color="#007BFF" />
        </TouchableOpacity>
        <TextInput
          style={[styles.searchInput, {backgroundColor : "#F3EFE6"}]}
          
          placeholder="가게 또는 메뉴 명을 입력해주세요."
          placeholderTextColor="#B9B6AD"
        />
      </View>

      {/* 스크롤 영역: 추천 검색어와 최근 검색어 목록 */}
      <ScrollView contentContainerStyle={[styles.scrollContent, {backgroundColor :theme.background}]}>
        <Text style={styles.sectionTitle}>추천 검색어</Text>
        {recommendedKeywords.map((keyword, index) => (
          <TouchableOpacity
            key={index}
            style={styles.keywordButton}
            onPress={handlePress}
          >
            <Text style={styles.keywordText}>{keyword}</Text>
          </TouchableOpacity>
        ))}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>최근 검색어</Text>
        {recentSearches.map((search, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recentItem}
            onPress={handlePress}
          >
            <Text style={styles.recentText}>{search}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  // 상단 헤더 영역: 뒤로가기 아이콘과 검색 입력창을 한 줄에 배치
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },
  backButton: {
    marginRight: 10,
  },
  searchInput: {
    flex : 1,
    height : 48,
    borderRadius : 8,
    paddingTop : 10,
    paddingRight : 12,
    paddingBottom : 10,
    marginBottom : 28,
    paddingLeft : 12
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  keywordButton: {
    height: 40,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  keywordText: {
    fontSize: 14,
    color: "#333",
  },
  recentItem: {
    height: 40,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  recentText: {
    fontSize: 14,
    color: "#555",
  },
});
