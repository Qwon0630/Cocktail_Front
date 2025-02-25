import React, {useEffect,useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
// import NaverLogin from '@react-native-seoul/naver-login';
// import type {
//   GetProfileResponse,
//   NaverLoginResponse,
// } from '@react-native-seoul/naver-login';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
 
  const consumerKey = 'pjSp0u95mvc6Ufq_TQbP';
  const consumerSecret = 'xD2ZRcw_px';
  const appName = '온즈';
  const serviceUrlScheme = 'navertest';

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Maps : undefined;
};

type LoginScreenProps = StackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {

  // useEffect(() => {
  //   NaverLogin.initialize({
  //     appName,
  //     consumerKey,
  //     consumerSecret,
  //     serviceUrlSchemeIOS: serviceUrlScheme,
  //     disableNaverAppAuthIOS: true,
  //   });
  // }, []);

  // const [success, setSuccessResponse] =
  //   useState<NaverLoginResponse['successResponse']>();

  // const [failure, setFailureResponse] =
  //   useState<NaverLoginResponse['failureResponse']>();
  // const [getProfileRes, setGetProfileRes] = useState<GetProfileResponse>();

  // const naverLogin = async (): Promise<void> => {
  //   const { failureResponse, successResponse } = await NaverLogin.login();
  //   setSuccessResponse(successResponse);
  //   setFailureResponse(failureResponse);
  // };


  return (
    
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => naverLogin()} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../assets/naver_icon.png')} />
        </TouchableOpacity> */}
    <TouchableOpacity onPress={() => kakaologin()} style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image source={require('../assets/kakao_icon.png')}  />
    
    </TouchableOpacity>
      <Text onPress={() => navigation.navigate("Maps")}>비회원 로그인</Text>
    </View>
  );
};

const kakaologin = () => {
  KakaoLogin.login().then((result) => {
      console.log("Login Success", JSON.stringify(result));
      getProfile();
  }).catch((error) => {
      if (error.code === 'E_CANCELLED_OPERATION') {
        console.log(KakaoLogin)
          console.log("Login Cancel", error.message);
      } else {
        console.log(KakaoLogin)
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
