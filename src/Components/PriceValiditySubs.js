/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../constants/COLORS';
import {DIMENSIONS} from '../constants/DIMENSIONS';

const mobileW = Math.round(Dimensions.get('screen').width);

const PriceValiditySubs = ({data}) => {
  const [showBox, setShowBox] = useState(true);
  return (
    <View
      style={
        Platform.OS === 'android'
          ? styles.mainDiv_installation1
          : styles.mainDiv_installation
      }>
      <TouchableOpacity
        style={[
          styles.install_touchable,
          {borderTopLeftRadius: 10, borderTopRightRadius: 10},
        ]}>
        <Image
          style={styles.img_width}
          resizeMode="contain"
          source={require('../../assets/images/details.png')}
        />
        <Text style={styles.installation_text}>Current Package Details</Text>
      </TouchableOpacity>

      <>
   
        <View style={styles.location_div}>
          <Text style={styles.installation_text2}>Package Name:</Text>
          <Text style={styles.force_base}>{data?.energy_plan}</Text>
        </View>
  
        <View style={{backgroundColor:COLORS.WHITE}}>
        <Image
          // style={styles.img_width}
          source={require('../../assets/images/dotted.png')}
          resizeMode="stretch"
          style={{
            alignSelf: 'center',
            width: Platform.OS === 'android' ? mobileW : mobileW - 40,
          }}
        />
        </View>
        <View style={styles.location_div}>
          <Text style={styles.installation_text2}>Price: </Text>
          <Text style={styles.force_base}>$ {data?.energy_price}</Text>
        </View>
        <View style={{backgroundColor:COLORS.WHITE}}>
        <Image
          // style={styles.img_width}
          source={require('../../assets/images/dotted.png')}
          resizeMode="stretch"
          style={{
            alignSelf: 'center',
            width: Platform.OS === 'android' ? mobileW : mobileW - 40,
          }}
        />
        </View>
        <View
          style={[
            styles.location_div,
            {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}>
          <Text style={styles.installation_text2}>Renewal Date:</Text>
          <Text style={styles.force_base}>{data?.End_validity}</Text>
        </View>
      </>
    </View>
  );
};

export default PriceValiditySubs;

const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
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
    backgroundColor: 'white',
    borderRadius: 8,
  },
  mainDiv_installation1: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 0 : (DIMENSIONS.SCREEN_HEIGHT * 2) / 100,
    // marginBottom: Platform.OS === 'ios' ? 0 : 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  // mainDiv_installation: {
  //   marginTop: DIMENSIONS.SCREEN_HEIGHT * 0.03,
  //   marginBottom: DIMENSIONS.SCREEN_HEIGHT * 0.02,
  //   // shadowColor: '#000000',
  //   // shadowOffset: {width: 0, height: 6},
  //   // shadowOpacity: 0.2,
  //   // shadowRadius: 5.62,
  //   // elevation: 8,
  // },
  install_touchable: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 20,
  },
  img_width: {
    marginLeft: -5,
    width: 20,
    height: 20,
  },
  installation_text: {
    fontWeight: '700',
    fontSize: 12,
    paddingLeft: 10,
    color: COLORS.BLACK,
  },
  installation_text2: {
    fontWeight: '700',
    fontSize: 14,
    paddingLeft: 10,
    color: COLORS.BLACK,
    marginVertical: 5,
  },
  location_div: {
    // flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    // alignItems: 'center',
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.GREEN,
  },
  force_base: {
    fontWeight: '400',
    fontSize: 14,
    paddingLeft: 10,
    color: COLORS.BLACK,
  },
  mainDiv_state_zip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.GRAY,
  },
  state_div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainDiv_plan_details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems:'center',
    paddingVertical: 10,
  },
  kwh_mieq_text: {
    fontWeight: 800,
    fontSize: 16,
    paddingTop: 8,
  },
  second_main_div_kwh: {
    flexDirection: 'column',
    alignItems: 'center',
    // alignSelf: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
  mainDiv_purchage_dollar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    backgroundColor: COLORS.WHITE,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 4,
    shadowColor: 'rgba(1, 0, 0, 0.25)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 4,
  },
  dollar_div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  per_month: {
    fontWeight: '500',
    fontSize: 20,
    color: COLORS.BLACK,
    paddingLeft: 7,
  },
  btn_purchage: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    borderRadius: 20,
  },
  purchage_text: {
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.WHITE,
  },
  // mainDiv_installation1: {
  //   overflow: 'hidden',
  //   borderRadius: 10,
  //   marginTop: Platform.OS === 'ios' ? 10 : 10,
  //   shadowColor: '#000000',
  //   shadowOffset: {width: 0, height: 6},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 5.62,
  //   elevation: 8,
  // },
});
