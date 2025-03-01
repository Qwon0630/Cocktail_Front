import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const RegionSheet = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '50%', '90%'], []);

  return (
    <BottomSheet 
      ref={sheetRef} 
      index={1} 
      snapPoints={snapPoints} 
      enablePanDownToClose={true}
      backgroundStyle={styles.sheetBackground}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>지역</Text>
        <Text style={styles.description}>선택한 지역의 바 리스트를 확인할 수 있습니다.</Text>
      </View>
    </BottomSheet>
  );
};

export default RegionSheet;

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#FFFCF3',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#7D7A6F',
  },
});
