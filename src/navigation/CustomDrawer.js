/* eslint-disable no-unused-vars */
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import home_icon from '../../assets/images/home_icon.png';
import cross_sign from '../../assets/images/cross_sign.png';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
const CustomDrawerContent = props => {
  const {navigation} = props;

  const handleDrawerClose = () => {
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo_one.png')}style={styles.logo} />
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.closeButton} onPress={handleDrawerClose}>
        <Image source={cross_sign} style={styles.closeIcon} />
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
   
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginVertical:20
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    right: 10,
  },
  closeIcon: {
    width: 34,
    height: 34,
  },
});
