import React, { memo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import COLORS from '../constants/COLORS';
import { DIMENSIONS } from '../constants/DIMENSIONS';
import { PLATFORM_IOS } from '../constants/DIMENSIONS';

const Input = ({ mV, mH, IconLeft, IconRight, text, errors, touched, pasButton, bgColor, bColor, bR, bW, passwordInput, passwordInputIcon, textWidth, w, ...props }) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  return (
    <View
      style={{
        width: w === 'full' ? DIMENSIONS.SCREEN_WIDTH * 0.9 : w === 'half' ? DIMENSIONS.SCREEN_WIDTH * 0.4 : DIMENSIONS.SCREEN_WIDTH * 0.9,
        marginVertical: mV,
        alignSelf: 'center',
      }}
    >
      <View
        style={[
          styles.input,
          {
            height: 50,
            marginHorizontal: mH,
            backgroundColor: bgColor,
            borderColor: bColor ? bColor : COLORS.LIGHT_BLUE,
            borderRadius: bR ? bR : 50,
            borderWidth: bW ? bW : 0,
          },
        ]}
      >
        {IconLeft && <IconLeft />}
        <View
          style={{
            marginHorizontal: 15,
            width: '80%',
            justifyContent: PLATFORM_IOS ? 'center' : 'flex-end',
            height: 50,
            paddingTop: 5,
            
            paddingBottom: PLATFORM_IOS ? 25 : 0,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: COLORS.BLACK,
              position: 'relative',
              top: PLATFORM_IOS ? -5 : 3,
              backgroundColor: COLORS.WHITE,
              width: textWidth ? textWidth : '40%',
              paddingLeft:3,
              borderWidth: 1,
              fontWeight: '400',
              borderColor: COLORS.WHITE,
              borderRadius: bgColor !== COLORS.WHITE ? 10 : 0,
            }}
          >
            {text}
          </Text>
          <TextInput
            {...props}
            style={{
              color: isDark ? COLORS.BLACK : COLORS.BLACK,
            }}
          />
        </View>
          <View style={{width: '20%' , alignItems:'center',paddingLeft: 30}}>
            {props.IconRight && <Props.IconRight />}
          </View>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10,
    marginBottom:30,
  },
});

export default memo(Input);
