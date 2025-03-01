import React, { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, StatusBar, Text, TouchableOpacity,TextInput } from "react-native";
import SearchBar from "../Components/SearchBar";
import CustomMapView from "../Components/CustomMapView";
import SearchSheet from "../BottomSheet/SearchSheet";
import theme from "../assets/styles/theme";
import { heightPercentage, widthPercentage, fontPercentage } from "../assets/styles/FigmaScreen";

type RootStackParamList = {
  SearchScreen: undefined;
  Maps: { searchCompleted?: boolean };
};

type MapsProps = StackScreenProps<RootStackParamList, "Maps">;

const Maps: React.FC<MapsProps> = ({ navigation, route }) => {
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);

  useEffect(() => {
    if (route.params?.searchCompleted) {
      setIsSearchCompleted(true);
    }
  }, [route.params?.searchCompleted]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {isSearchCompleted ? (
        <View style={styles.resultHeader}>
          {/* 뒤로가기 버튼 */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>🔙</Text>
          </TouchableOpacity>
           {/* 검색 결과 화면 */}
          <TextInput
                    style={[styles.searchButton, {backgroundColor : "white"}]}
                    placeholder="입력한 검색어"
                    placeholderTextColor="black"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      navigation.navigate("Maps", { searchCompleted: true });
                    }}
                  />

          {/* 검색 초기화 버튼 */}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <Text style={styles.buttonText}>❌</Text>
            
          </TouchableOpacity>
        </View>
      ) : (
        <SearchBar />
      )}

      {/* 지도 */}
      <View style={styles.mapContainer}>
        <CustomMapView
          initialRegion={{
            latitude: 37.5665,
            longitude: 126.9780,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        />
      </View>

      <SearchSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  mapContainer: {
    flex: 1,
  },
  resultHeader: {
    marginTop: heightPercentage(58),
    backgroundColor: theme.background,
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    width: widthPercentage(275),
    height: heightPercentage(48),
    borderRadius: widthPercentage(8),
    backgroundColor: theme.background,
    paddingHorizontal: widthPercentage(10),
    zIndex: 10,
    marginBottom : heightPercentage(12),
    borderWidth : widthPercentage(1),
    borderColor : "#E4DFD8"
    
  },
  backButton: {
    marginBottom : heightPercentage(10),
    width : widthPercentage(24),
    height : heightPercentage(24),
    marginLeft : widthPercentage(16),
    marginRight : widthPercentage(10),
   
  },
  clearButton: {
    padding: widthPercentage(10),
    borderRadius: widthPercentage(8),
  },
  buttonText: {
    marginLeft : widthPercentage(5),
    marginBottom : heightPercentage(10),
    width : widthPercentage(24),
    height : heightPercentage(24),
  },
});

export default Maps;
