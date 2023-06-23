import {View, Image, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, DrawerStatus, DrawerActionHelpers } from '@react-navigation/native';
import { navigationRef } from '../../App';
import { PLATFORM_IOS } from '../constants/DIMENSIONS';
import COLORS from '../constants/COLORS';



export default function DrawerOpen({navigation}) {
  const [changeImage,setChangeImage] = useState(false)
  setTimeout(() => {
    setChangeImage(true)
  },5000)
  return (
    <TouchableOpacity
    onPress={() => navigationRef.dispatch(DrawerActions.toggleDrawer())}
      style={{
        position:  'absolute',
        right: PLATFORM_IOS?25:20,
        alignSelf: 'flex-end',
        top: PLATFORM_IOS?70:25,
        zIndex: 5,
        backgroundColor:COLORS.WHITE,
        borderRadius:35,
        padding:10
      }}>
{changeImage?
  <Image
      source={require('../../assets/images/slash_line.png')}
      resizeMode="cover"
      style={{width: 25, height: 25}}
    />
      :<Image
      source={require('../../assets/images/logo_one.png')}
      resizeMode="cover"
      style={{width: 25, height: 25}}
    />}
    </TouchableOpacity>
  );
}
