/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {Address} from '../../assets/images/Address';
import {Vanderberg} from '../../assets/images/Vanderberg';
import {Connecticut} from '../../assets/images/Connecticut';
import COLORS from '../constants/COLORS';
const mobileW = Math.round(Dimensions.get('screen').width);
const BoxFour = ({data}) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
  }, []);
  const handleBackButton = () => {
    return true;
  };
  return (
    <View
      style={
        Platform.OS == 'android'
          ? styles.mainDiv_installation1
          : styles.mainDiv_installation
      }>
      <View style={styles.install_touchable}>
        <Address style={styles.img_width} />
        <Text style={styles.installation_text}>Plan Details</Text>
      </View>
      <View style={styles.shadowProp}>
        <View style={styles.location_div}>
          <Image
            source={require('../../assets/images/plan.png')}
            resizeMode="cover"
            style={styles.img_width}
          />
          {/* <Vanderberg style={styles.img_width} /> */}
          <Text style={styles.force_base}>
            {data[0] == undefined ? data.package_name : data[0].package_name}
          </Text>
        </View>
        <Image
          // style={styles.img_width}
          source={require('../../assets/images/dotted.png')}
          resizeMode="stretch"
          style={{alignSelf: 'center', width: mobileW - 40}}
        />
        <View style={styles.mainDiv_state_zip}>
          <View style={styles.state_div}>
            {/* <Connecticut style={styles.img_width} /> */}
            <Image
              source={require('../../assets/images/date.png')}
              resizeMode="cover"
              style={[styles.img_width,{
                width: 16,
                height: 16,
              }]}
            />
            <Text style={styles.force_base}>
              {data[0]?.date} - {data[0]?.thirty_days_ago}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BoxFour;

const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
    // paddingVertical:15
  },
  mainDiv_installation: {
    // marginTop: 55,
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
    // borderRadius:10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  img_width: {
    marginLeft: 20,
    width: 18,
    height: 18,
  },
  installation_text: {
    fontWeight: '700',
    fontSize: 12,
    paddingLeft: 10,
    color: COLORS.BLACK,
  },
  location_div: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY,
    alignItems: 'center',
    paddingVertical: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.GREEN,
  },
  // shadowProp: {
  //   backgroundColor: 'white',
  //   shadowColor: 'rgba(0, 0, 0, 0.7)',
  //   shadowOffset: {
  //     width: 6,
  //     height: 4,
  //   },
  //   shadowOpacity: 1,
  //   shadowRadius: 4,
  //   elevation: Platform.OS === 'android' ? 8 : 0,
  // },
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  state_div: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
    fontWeight: 500,
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
    fontWeight: 700,
    fontSize: 14,
    color: COLORS.WHITE,
  },
});
