import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, DrawerStatus, DrawerActionHelpers } from '@react-navigation/native';
import { navigationRef } from '../../App';
import { PLATFORM_IOS } from '../constants/DIMENSIONS';



export default function DrawerOpen({navigation}) {
  return (
    <TouchableOpacity
    onPress={() => navigationRef.dispatch(DrawerActions.toggleDrawer())}
      style={{
        position:  'absolute',
        right: PLATFORM_IOS?25:20,
        alignSelf: 'flex-end',
        top: PLATFORM_IOS?70:40,
        zIndex: 5,
      }}>

      <Image
        source={require('../../assets/images/logo_one.png')}
        resizeMode="cover"
        style={{width: 50, height: 50}}
      />
    </TouchableOpacity>
  );
}
