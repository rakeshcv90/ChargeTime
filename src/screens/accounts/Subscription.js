import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image,Dimensions, Platform} from 'react-native';
import React from 'react';
import { Vanderberg } from '../../../assets/svgs/Vanderberg';
import { Connecticut } from '../../../assets/svgs/Connecticut';
import {InstallBase} from '../../../assets/svgs/InstallBase';
import {Charge} from '../../../assets/svgs/Charge';
const mobileW = Math.round(Dimensions.get('screen').width);
import HorizontalLine from  '../../Components/HorizontalLine'
import Header from '../../Components/Header'
import COLORS from '../../constants/COLORS';


 const Subscription = () => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
    <Header headerName="Subscription" />
    <HorizontalLine/>
    <View style={[styles.mainDiv_installation,styles.shadowProp]}>
      <TouchableOpacity style={styles.install_touchable}>
      <InstallBase style={styles.img_width} />
        <Text style={styles.installation_text}>Installation Base</Text>
      </TouchableOpacity>
      <View style={styles.location_div}>
        
         <Vanderberg style={styles.img_width} />
        <Text style={styles.force_base}>Vanderberg Space Force Base</Text>
      </View>
      <Image
          // style={styles.img_width}
          source={require('../../../assets/images/dotted.png')}
          resizeMode='stretch' style={{alignSelf: 'center', width: mobileW,}}
        />
      <View style={styles.mainDiv_state_zip}>
        <View style={styles.state_div}>
          {/* <Image
            style={styles.img_width}
            source={require('../../assets/images/connecticut.png')}
          /> */}
          <Connecticut style={styles.img_width} />
          <Text style={styles.force_base}>Connecticut</Text>
        </View>
        <View style={styles.state_div}>
          <Image
            //style={styles.img_width}
            source={require('../../../assets/images/zip_code.png')}
            style={{width:20,height:20}}
          />
          <Text style={styles.force_base}>123456</Text>
        </View>
      </View>
    </View>
    <View style={[styles.mainDiv_installation,styles.shadowProp]}>
    <TouchableOpacity style={styles.install_touchable}>
        
        <Charge style={styles.img_width} />
        <Text style={styles.installation_text}>Plan Details</Text>
      </TouchableOpacity>
      <View style={styles.plan_div}>
      <View>
        <Image source={require('../../../assets/images/kwh.png')}
           style={{width:30,height:30, }}
        />
      </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
    // paddingVertical:15
  },
  mainDiv_installation: {
    overflow:'hidden',
    borderRadius: 10,
    border:5,
    marginLeft:20,
    marginRight:20,
    marginTop: Platform.OS === "ios"?10: 20,
  },
  install_touchable: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    paddingVertical: 15,
  },
  img_width: {
    marginLeft: 20,
  },
  installation_text: {
    fontWeight: '900',
    fontSize: 14,
    paddingLeft: 10,
    fontFamily:'Roboto',
    color:COLORS.BLACK,
  },
  location_div: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY,
    alignItems: 'center',
    paddingVertical: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.GREEN,
    
  },
 
  force_base: {
    fontWeight: 400,
    fontSize: 14,
    paddingLeft: 10,
    color:COLORS.BLACK,
  },
  mainDiv_state_zip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 20,
    backgroundColor: COLORS.GRAY,
  },
  state_div: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:10,
    paddingRight:80,
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: Platform.OS === 'android' ? 'black' : "rgba(0,0,0,.555)",
    shadowOffset: {
      width: 10,
      height: 8,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  plan_div:{
    flexDirection: 'column',
    backgroundColor: COLORS.GRAY,
    justifyContent: 'space-between',
    paddingLeft:  20,
    paddingVertical: 60,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.GREEN,
},
kwh_image:{
backgroundColor:COLORS.GREEN,
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
    borderRadius: 5,
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
 
});
