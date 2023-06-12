import {View, Text, StyleSheet, TouchableOpacity, Image,Dimensions, Platform, SafeAreaView} from 'react-native';
import React, { useState, useEffect } from 'react'
import { Connecticut } from '../../assets/images/Connecticut';
import { Charge } from '../../assets/svgs/Charge';
import COLORS from '../constants/COLORS';
import { useSelector } from 'react-redux';
const mobileW = Math.round(Dimensions.get('screen').width);

const PriceValidity = () => {
  const getBasePackage = useSelector((state)=> state.getBasePackage)
  useEffect(() => {
    console.log('data for package=============',getBasePackage);
 }, [getBasePackage]);
  return (
    <View style={[styles.mainDiv_installation]}>
      <TouchableOpacity style={styles.install_touchable}>
        
      <Charge style={styles.img_width} />
        <Text style={styles.installation_text}>Price & Validity</Text>
      </TouchableOpacity>
      <View style={styles.location_div}>
        
      <Text style={styles.force_base_b}>Package Name :</Text>
        <Text style={styles.force_base}>Base Package - 1</Text>
      </View>
      <Image
          // style={styles.img_width}
          source={require('../../assets/images/straight.png')}
          resizeMode='stretch' style={{alignSelf: 'center', width: mobileW,}}
        />
        <View style={styles.location_div}>
        <Text style={styles.force_base_b}>Price :</Text>
        <Text style={styles.force_base}>$ 50.66</Text>
        </View>
    </View>

  );
};

export default PriceValidity;

const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 10,
    // paddingVertical:15
  },
  mainDiv_installation: {
    overflow:'hidden',
    borderRadius: 10,
    // marginTop: Platform.OS === "ios"?5: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  
  install_touchable: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    paddingVertical: 10,
  },
 
  img_width: {
    marginLeft: 20,
  },
  installation_text: {
    fontWeight: 700,
    fontSize: 12,
    paddingLeft: 10,
  },
  location_div: {
    flexDirection: 'column',
    backgroundColor: COLORS.GRAY,
    alignItems: 'flex-start',
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.GREEN,
    
  },
  force_base_b: {
    fontWeight: 700,
    fontSize: 14,
    paddingLeft: 20,
    // paddingRight:250,
  },
  force_base: {
    fontWeight: 400,
    fontSize: 14,
    paddingLeft: 20,
    // marginRight:200,
  },
});
