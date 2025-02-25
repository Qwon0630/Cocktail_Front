import React from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  FlatList, 
  ScrollView, 
  Dimensions, 
  SafeAreaView 
} from "react-native";

const { width } = Dimensions.get("window");

const categories = [
  { title: "우아한 클래식", description: "격식을 갖춘 품격있는 칵테일" },
  { title: "은은한 무드", description: "조용한 밤을 위한 부드러운 칵테일" },
  { title: "청량한 여름", description: "태양 아래 시원하게 즐기는 칵테일" },
  { title: "강렬한 한 잔", description: "깊고 묵직한 분위기를 가진 칵테일" },
  { title: "부담 없는 시작", description: "칵테일 입문자를 위한 가벼운 선택" },
];

const cocktails = [
  { id: "1", name: "칵테일 명", image: require("../assets/cocktail.jpg") },
  { id: "2", name: "칵테일 명", image: require("../assets/cocktail.jpg") },
  { id: "3", name: "칵테일 명", image: require("../assets/cocktail.jpg") },
];

const CocktailBookScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        {/* 상단 로고 & 아이콘 */}
        <View style={styles.header}>
          <Image source={require("../assets/Logo.jpg")} style={styles.logo} />
          <Image source={require("../assets/allocation.jpg")} style={styles.icon} />
        </View>

        {/* 추천 배너 */}
        <View style={styles.recommendationSection}>
          <Image source={require("../assets/banner.jpg")} style={styles.recommendationImage} />
          <Text style={styles.recommendationText}>
            봄에 가볍게 한잔하기 좋은{"\n"}마포구 칵테일 10곳
          </Text>
        </View>

        {/* 분위기별 칵테일 리스트 */}
        {categories.map((category, index) => (
          <View key={index} style={styles.categorySection}>
            {/* 카테고리 제목 */}
            <View style={styles.categoryHeader}>
              <Image source={require("../assets/allocation.jpg")} style={styles.categoryIcon} />
              <View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
            </View>

            {/* 칵테일 리스트 (가로 스크롤) */}
            <FlatList
              horizontal
              data={cocktails}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.cocktailCard}>
                  <Image source={item.image} style={styles.cocktailImage} />
                  <Text style={styles.cocktailName}>{item.name}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CocktailBookScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  logo: {
    width: width * 0.3,  // 반응형 크기 조절
    height: width * 0.1,
    resizeMode: "contain",
  },
  icon: {
    width: 30,
    height: 30,
  },
  recommendationSection: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  recommendationImage: {
    width: width * 0.9,
    height: width * 0.5,
    borderRadius: 10,
    marginVertical: 15,
  },
  recommendationText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  categorySection: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  categoryDescription: {
    fontSize: 14,
    color: "#666",
  },
  cocktailCard: {
    width: width * 0.3,
    alignItems: "center",
    marginRight: 15,
  },
  cocktailImage: {
    width: "100%",
    height: width * 0.35,
    borderRadius: 10,
  },
  cocktailName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
});
