import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const MyListSheet = () => {
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
        <Text style={styles.title}>나의 리스트</Text>
        <Text style={styles.description}>내가 저장한 바 리스트를 확인할 수 있습니다.</Text>
      </View>
    </BottomSheet>
  );
};

export default MyListSheet;

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
