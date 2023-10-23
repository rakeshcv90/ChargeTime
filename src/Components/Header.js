/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/COLORS';

import {navigationRef} from '../../App';
import {Image} from 'react-native-svg';
import {BackButton} from '../../assets/svgs/BackButton';
import {Edit} from '../../assets/svgs/Edit';
import {Save} from '../../assets/svgs/Save';
import {DIMENSIONS} from '../constants/DIMENSIONS';

const Header = ({
  headerName,
  showRightButton,
  onPress,
  enableEdit,
  editButton,
  editShow,
}) => {
  // const [RightButton, setRightButton] =useState()
  const [pressed, setPressed] = useState(true);
  const [rightButton, setRightButton] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!editButton) {
      setRightButton(false);
    }
  }, [editButton]);
  useEffect(() => {
    setShowButton(editShow);
  }, [editShow]);
  return (
    <TouchableOpacity style={styles.innerContainer}
    onPress={() => navigationRef.current?.goBack()}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigationRef.current?.goBack()}>
        {/* Replace with your BackButton component */}
        <BackButton />
      </TouchableOpacity>
      <Text style={styles.headerText}>{headerName}</Text>
      {/* {showButton&&
      <TouchableOpacity style={styles.rightButton} onPress={() => {
        if (!rightButton) {
          enableEdit();
          setRightButton(true)
        } else {
          onPress();

        }
      }}>
        {rightButton ? <Save /> : <Edit />}
   
      </TouchableOpacity> } */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  innerContainer: {
    flexDirection: 'row',
    paddingLeft:30,
    alignItems: 'center',
    height:(DIMENSIONS.SCREEN_HEIGHT*0.08),
  

  },
  backButton: {
    width: 30,

  },
  headerText: {
    color: COLORS.BLACK,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: 0.5,
     marginHorizontal: (DIMENSIONS.SCREEN_WIDTH*0.05),
  },
  rightButton: {
    width: 50,
    height: 20,
    marginRight: 15,
  },
});

export default Header;
