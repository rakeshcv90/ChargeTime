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

const Header = ({ headerName, showRightButton, onPress, enableEdit ,editButton, editShow }) => {
// const [RightButton, setRightButton] =useState()
const [pressed, setPressed]=useState(true)
const [rightButton, setRightButton] = useState(null);

useEffect(()=>{
  if(!editButton){
    setRightButton(false)
  }
},[editButton])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigationRef.current?.goBack()}>
          {/* Replace with your BackButton component */}
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.headerText}>{headerName}</Text>
        {editShow ? <TouchableOpacity style={styles.rightButton} onPress={()=>{
          if(!rightButton){
            enableEdit();
            setRightButton(true)
          }else{
            onPress();
            
          }
          }}>
        {rightButton  ? <Save /> :<Edit />}
          {/* {showRightButton && <Edit />} */}
          {/* {renderIcon()} */}
        </TouchableOpacity>:null}
        
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
    paddingHorizontal: 25,
    paddingVertical: 25,
    alignItems: 'center',
  },
  backButton: {
    width: 30,
  },
  headerText: {
    
    color: COLORS.BLACK,
    fontSize: 20,
    fontWeight: '700',
    width: 280,
    lineHeight: 26,
    letterSpacing: 0.5,
    height: 30,
  },
  rightButton: {
    width: 50,
    height:20,
    marginRight:15,
  },
});

export default Header;