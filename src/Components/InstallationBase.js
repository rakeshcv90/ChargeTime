/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
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
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
// import { Address } from '../../assets/images/Address';
import {InstallBase} from '../../assets/svgs/InstallBase';
import {Vanderberg} from '../../assets/images/Vanderberg';
import {Connecticut} from '../../assets/images/Connecticut';
import COLORS from '../constants/COLORS';
import {useSelector} from 'react-redux';
import {navigationRef} from '../../App';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import Line from '../../assets/svgs/Line';

const mobileW = Math.round(Dimensions.get('screen').width);
const InstallationBase = ({data}) => {
 

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
    // <View
    //   // style={
    //   //   Platform.OS == 'android'
    //   //     ? styles.mainDiv_installation1
    //   //     : styles.mainDiv_installation
    //   // }
    //   style = {Platform.OS == 'android'
    //   ? styles.mainDiv_installation1
    //   : styles.mainDiv_installation
    //    }
    //   >
    //   <View style={styles.install_touchable}>
    //     {/* <Address style={styles.img_width} /> */}
    //     <InstallBase style={styles.img_width} />
    //     <Text style={styles.installation_text}>Installation Base</Text>
    //   </View>
    //   {/* <View> */}
    //     <View style={styles.location_div}>
    //       <Vanderberg style={styles.img_width} />
    //       <Text style={styles.force_base}>
    //         {data[0] == undefined ? data?.location : data[0].location}
    //       </Text>
    //       {/* <Text style={styles.force_base}>{data[0]=="undefined"?setBasePackage[0].location}</Text> */}
    //     </View>
    //     <Image
    //       source={require('../../assets/images/dotted1.png')}
    //       resizeMode="stretch"
    //       style={{
    //         width:  mobileW - 40,
    //         alignSelf: 'center',
    //       }}
    //     />

    //     <View style={styles.mainDiv_state_zip}>
    //       <View style={styles.state_div}>
    //         {/* <Image
    //         style={styles.img_width}
    //         source={require('../../assets/images/connecticut.png')}
    //       /> */}
    //         <Connecticut style={styles.img_width} />
    //         <Text style={styles.force_base}>
    //           {data[0] == undefined ? data?.state : data[0].state}
    //         </Text>
    //         {/* <Text style={styles.force_base}>{setBasePackage[0].state}</Text> */}
    //       {/* </View> */}

    //       <View style={styles.state_div}>
    //         <Image
    //           //style={styles.img_width}
    //           source={require('../../assets/images/zip_code.png')}
    //           resizeMode="stretch"
    //           style={{width: 25, height: 25}}
    //         />
    //         <Text style={styles.force_base}>
    //           {data[0] == undefined ? data?.ZIP_code : data[0].ZIP_code}
    //         </Text>
    //         {/* <Text style={styles.force_base}>{setBasePackage[0].ZIP_code}</Text> */}
    //       </View>
    //     </View>
    //   </View>
    // </View>

    <View
      // style={
      //   Platform.OS == 'android'
      //     ? styles.mainDiv_installation1
      //     : styles.mainDiv_installation
      // }
      style={
        Platform.OS == 'android'
          ? styles.mainDiv_installation1
          : styles.mainDiv_installation
      }>
      <View style={styles.install_touchable}>
        {/* <Address style={styles.img_width} /> */}
        <InstallBase style={styles.img_width} />
        <Text style={styles.installation_text}>Installation Base</Text>
      </View>
      {/* <View> */}
      <View style={styles.location_div}>
        <Vanderberg style={styles.img_width} />
        <Text style={styles.force_base}>
          {data[0] == undefined ? data?.location : data[0].location}
        </Text>
        {/* <Text style={styles.force_base}>{data[0]=="undefined"?setBasePackage[0].location}</Text> */}
        {/* </View> */}
      </View>
      <View style={{backgroundColor: COLORS.WHITE}}>
        <Image
          source={require('../../assets/images/dotted1.png')}
          resizeMode="stretch"
          style={{
            width: mobileW - 40,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={styles.mainDiv_state_zip}>
        {/* <View style={styles.state_div}> */}

        <View style={styles.state_div}>
          <Image
            source={require('../../assets/images/connecticut.png')}
            resizeMode="cover"
            style={{width: 20, height: 20, marginLeft: 20}}
          />
          <Text style={styles.force_base}>
            {data[0] == undefined ? data?.state : data[0].state}
          </Text>
        </View>
        <View style={styles.state_div}>
          <Image
            source={require('../../assets/images/zip_code.png')}
            resizeMode="stretch"
            style={{width: 25, height: 25}}
          />
          <Text style={styles.force_base}>
            {data[0] == undefined ? data?.ZIP_code : data[0].ZIP_code}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InstallationBase;

const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
    // paddingVertical:15
  },
  mainDiv_installation: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 5.62,
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  install_touchable: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  img_width: {
    marginLeft: 20,
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
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 8,
    // elevation: Platform.OS === 'android' ? 8 : 0,
  },
  force_base: {
    fontWeight: '400',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 70,
    color: COLORS.BLACK,
  },
  mainDiv_state_zip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingRight: 10,
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
    shadowColor: '#000000',
    shadowOffset: {
      width: 8,
      height: 6,
    },
    shadowOpacity: 2,
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
  mainDiv_installation1: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: DIMENSIONS.SCREEN_HEIGHT * 0.02,
    marginBottom: DIMENSIONS.SCREEN_HEIGHT * 0.02,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
});
