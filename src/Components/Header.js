/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/COLORS';
import  DIMENSIONS  from '../constants/DIMENSIONS';
import { navigationRef } from '../../App';
import { Image } from 'react-native-svg';
import { BackButton } from '../../assets/svgs/BackButton';

const Header = ({ headerName, showRightButton, onPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        // backgroundColor={COLORS.LIGHT_BLUE}
        barStyle={'dark-content'}
      />
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={{ width:0.56,marginTop:20}}
        //   onPress={() => navigationRef.current?.goBack()}
        >
          {/* Replace with your BackButton component */}
          <BackButton/>
        </TouchableOpacity>
        <Text
          style={{
            marginTop:20,
            fontfamily: 'Roboto',
            color: COLORS.BLACK,
            fontSize: 24,
            fontWeight: '700',
            width:200,
            lineHeight: 26,
            letterspacing:0.5,
            height: 30,
          }}
        >
          {headerName}
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={{
            width: 40,
          }}
        >
          {showRightButton && <Text>HeaderQ</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_BLUE,
    // height: DIMENSIONS.SCREEN_HEIGHT <= 640 ? 60 : DIMENSIONS.SCREEN_HEIGHT * 0.06,
    elevation: 3,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default Header;
