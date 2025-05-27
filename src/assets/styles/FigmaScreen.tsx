import { Dimensions, PixelRatio } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp}from "react-native-responsive-screen"
// Figma 기준 사이즈
const FIGMA_BASE_WIDTH = 375;
const FIGMA_BASE_HEIGHT = 812; // matters를 적용하려면 667의 고정사이즈가 있어서, 피그마 디자인을 변경하는 것 외에는 직접 커스텀 함수를 만들어야 한다. 

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


//기존과 동일하게 준다. 
export const widthPercentage = (width: number): number => {
  return (SCREEN_WIDTH / FIGMA_BASE_WIDTH) * width;
}

export const heightPercentage = (height: number): number => {
  return (SCREEN_HEIGHT / FIGMA_BASE_HEIGHT) * height;
}

export const fontPercentage = (size: number): number => {
  const scaleFactor = SCREEN_WIDTH / FIGMA_BASE_WIDTH;
  const scaledSize = size * scaleFactor;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
}


//레이아웃 크기를 잡을 때에는 아래 함수 %를 사용해서 진행하기
export const wpPercent = wp;
export const hpPercent = hp;