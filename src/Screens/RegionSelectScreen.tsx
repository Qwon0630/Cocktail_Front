import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; 
import { RootStackParamList } from "../Navigation/Navigation";
const regions = [
  '서울 전체', '강남/신논현/잠실', '청담/압구정/신사', '선릉/삼성', '논현/역삼/학동',
  '서울고대/대학로', '대치/도곡/개포', '홍대/공덕/서촌', '서울역/명동/회현',
  '왕십리/성수/천호', '신림/봉천', '독산/성수/서울숲/건대입구', '호텔/리조트/한강로',
  '마곡/목동/구룡', '뚝섬/여의도/노량진', '마이타운/노원', '이태원/삼각지',
  '서울대/사당/동작', '은평/북', '신도림/구로', '마포/공덕', '관서/기본', '수서/복정/양지'
];
type NavigationProps = StackNavigationProp<RootStackParamList, "RegionSelectScreen">;

const RegionSelectScreen = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const toggleRegion = (region: string) => {
    if(region == '서울 전체') {
      if(selectedRegions.includes(region)){
        setSelectedRegions([]);
      } else {
        setSelectedRegions(regions.filter((r) => r ))
      }
    }else
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };
  const resetSelection = () => {
    setSelectedRegions([]);
  };

  return (
    <View style={styles.container}>
      {/* 상단 제목 */}
      <View style={styles.header}>
        <Text style={styles.title}>지역</Text>
      </View>

      {/* 지역 리스트 */}
      <FlatList
        data={regions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => toggleRegion(item)}>
            <Text style={styles.itemText}>{item}</Text>
            <Checkbox
              status={selectedRegions.includes(item) ? 'checked' : 'unchecked'}
              onPress={() => toggleRegion(item)}
            />
          </TouchableOpacity>
        )}
      />

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetSelection}>
          <Text style={styles.buttonText}>초기화</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton}
       onPress={() => {
        const filteredRegions = selectedRegions.filter(region => region !== "서울 전체");
        navigation.navigate("Maps", { selectedRegions: filteredRegions });
      }}
        >
          <Text style={styles.buttonText}>적용하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF7F2' },
  header: { alignItems: 'center', padding: 16, backgroundColor: '#FFF' },
  title: { fontSize: 18, fontWeight: 'bold' },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: '#EEE' },
  itemText: { fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFF' },
  resetButton: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8, backgroundColor: '#DDD', marginRight: 8 },
  applyButton: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8, backgroundColor: '#4B286D' },
  buttonText: { fontSize: 16, color: '#FFF' },
});

export default RegionSelectScreen;
