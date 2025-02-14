import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import  KakaoLogin from '@react-native-seoul/kakao-login';

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Maps : undefined;
};

type LoginScreenProps = StackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    
    <View style={styles.container}>
    <TouchableOpacity onPress={() => login()} style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image source={require('../assets/kakao_icon.png')}  />
    
    </TouchableOpacity>
      <Text onPress={() => navigation.navigate("Maps")}>비회원 로그인</Text>
    </View>
  );
};

const login = () => {
  KakaoLogin.login().then((result) => {
      console.log("Login Success", JSON.stringify(result));
      getProfile();
  }).catch((error) => {
      if (error.code === 'E_CANCELLED_OPERATION') {
          console.log("Login Cancel", error.message);
      } else {
          console.log(`Login Fail(code:${error.code})`, error.message);
      }
  });
};
const getProfile = () => {
  KakaoLogin.getProfile().then((result) => {
      console.log("GetProfile Success", JSON.stringify(result));
  }).catch((error) => {
      console.log(`GetProfile Fail(code:${error.code})`, error.message);
  });
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      button: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
      },
      buttonText: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "bold",
      },
    });

export default LoginScreen;
