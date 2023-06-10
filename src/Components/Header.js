/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
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
import { Edit } from '../../assets/svgs/Edit';
import { Save } from '../../assets/svgs/Save';

const Header = ({ headerName, showRightButton, onPress }) => {
const [RightButton, setRightButton] =useState()
const [pressed, setPressed]=useState(true)
  const handleRightButtonClick = () => {
    if (onPress != null) {
      return showRightButton ? <Save /> : null;
    }
    return showRightButton ? <Edit /> : null;
  };

  const renderIcon = () => {
    return showRightButton ? <Edit /> : null;
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigationRef.current?.goBack()}>
          {/* Replace with your BackButton component */}
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.headerText}>{headerName}</Text>
        <TouchableOpacity style={styles.rightButton} onPress={handleRightButtonClick}>
          {/* {showRightButton && <Edit />} */}
          {renderIcon()}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_BLUE,
    elevation: 3,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  backButton: {
    width: 40,
  },
  headerText: {
    fontFamily: 'Roboto',
    color: COLORS.BLACK,
    fontSize: 20,
    fontWeight: '700',
    width: 250,
    lineHeight: 26,
    letterSpacing: 0.5,
    height: 30,
  },
  rightButton: {
    width: 40,
  },
});

export default Header;
