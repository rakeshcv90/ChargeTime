import React, {FC} from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableNativeFeedbackProps,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import COLORS from '../constants/COLORS';
import  DIMENSIONS  from '../constants/DIMENSIONS';

export type Props = TouchableNativeFeedbackProps & {
  bgColor: string;
  bColor?: string;
  bR?: number;
  text: string;
  onPress: () => void;
  textColor?: string;
  textSize?: number;
  style?: {};
  textStyle?: StyleProp<TextStyle>;
  bW?: number;
  pH?: number;
  pV?: number;
  mH?: number;
  mV?: number;
  w?: 'quarter' | 'half' | 'full' | number;
  alignSelf?: any;
};

const Button: FC<Props> = ({...Props}) => {
  return (
    <TouchableOpacity
      onPress={Props.onPress}
      style={
        Props.style
          ? Props.style
          : {
              backgroundColor: Props.disabled
                ? Props.bgColor && Props.disabled
                  ? Props.bgColor
                  : COLORS.INACTIVE
                : Props.bgColor,
              borderColor: Props.bColor,
              borderRadius: Props.bR,
              borderWidth: Props.bW || 0,
              paddingHorizontal: Props.pH ? Props.pH : 5,
              paddingVertical: Props.pV ? Props.pV : 5,
              marginHorizontal: Props.mH ? Props.mH : 5,
              marginVertical: Props.mV ? Props.mV : 5,
              alignSelf: Props.alignSelf ? Props.alignSelf : 'center',
              width:
                Props.w == 'quarter'
                  ? DIMENSIONS.SCREEN_WIDTH * 0.23
                  : Props.w == 'half'
                  ? DIMENSIONS.SCREEN_WIDTH * 0.45
                  : Props.w == 'full'
                  ? DIMENSIONS.SCREEN_WIDTH * 0.9
                  : Props.w,
              alignItems: 'center',
              justifyContent: 'center',
            }
      }>
      <Text
        style={
          Props.textStyle
            ? Props.textStyle
            : {
                color: Props.textColor ? Props.textColor : COLORS.BLACK,
                fontFamily: 'Roboto',
                fontSize: Props.textSize ? Props.textSize : 14,
                fontWeight: '500',
              }
        }>
        {Props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;