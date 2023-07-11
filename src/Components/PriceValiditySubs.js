/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Connecticut} from '../../assets/images/Connecticut';
import {Charge} from '../../assets/svgs/Charge';
import COLORS from '../constants/COLORS';
import {useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import { DIMENSIONS } from '../constants/DIMENSIONS';

const mobileW = Math.round(Dimensions.get('screen').width);

const PriceValidity = () => {
  const getCurrentPlan = useSelector(state => state.getCurrentPlan);

  return (
    <View  style={
      Platform.OS === 'android'
        ? styles.mainDiv_installation1
        : styles.mainDiv_installation
    }>
      <TouchableOpacity style={styles.install_touchable}>
        <Charge style={styles.img_width} />
        <Text style={styles.installation_text}>Price & Validity</Text>
      </TouchableOpacity>
      <View style={styles.location_div}>
        <Text style={styles.force_base_b}>Package Name :</Text>
        <Text style={styles.force_base}>{getCurrentPlan.energy_plan}</Text>
      </View>
      {/* <Image
        // style={styles.img_width}
        source={require('../../assets/images/straight2.png')}
        resizeMode='stretch' style={{ alignSelf: 'center', width: mobileW, }}
      /> */}

      <View style={styles.location_div}>
        <Text style={styles.force_base_b}>Price :</Text>
        <Text style={styles.force_base}> $ {getCurrentPlan.energy_price}</Text>
      </View>
      <Image
        // style={styles.img_width}
        source={require('../../assets/images/straight2.png')}
        resizeMode="stretch"
        style={{alignSelf: 'center', width: mobileW}}
      />
      <View style={styles.location_div}>
        <Text style={styles.force_base_b}>Valid Till :</Text>
        <Text style={styles.force_base}>{getCurrentPlan.End_validity}</Text>
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
    marginTop: DIMENSIONS.SCREEN_HEIGHT * 0.03,
    marginBottom: DIMENSIONS.SCREEN_HEIGHT * 0.01,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  mainDiv_installation1: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 0 : (DIMENSIONS.SCREEN_HEIGHT * 3) / 100,
    marginBottom: Platform.OS === 'ios' ? 0 : 10,

    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: Platform.OS === 'android' ? 8 : 0,
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
    color: COLORS.BLACK,
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
    paddingTop: 5,
    color: COLORS.BLACK,
    // paddingRight:250,
  },
  force_base: {
    fontWeight: '350',
    color: COLORS.BLACK,
    fontSize: 14,
    paddingLeft: 20,
    paddingTop: 5,
    // marginRight:200,
  },
});
