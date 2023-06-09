import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image,Dimensions, Platform} from 'react-native';
import React from 'react';
const mobileW = Math.round(Dimensions.get('screen').width);
import HorizontalLine from  '../../Components/HorizontalLine'
import Header from '../../Components/Header'
import COLORS from '../../constants/COLORS';
import BoxOne from '../../Components/BoxOne';
import BoxTwo from '../../Components/BoxTwo';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import WaveAnimation from '../../Components/WaveAnimation';
import { DIMENSIONS } from '../../constants/DIMENSIONS';
import PriceValidity from '../../Components/PriceValidity';

 const Subscription = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
  <View>
    <Header headerName="Subscription" />
    <HorizontalLine/>
    <View style={styles. managing_width}>
          <BoxOne />
          <BoxTwo />
        
        </View>
        <View style={styles.mainDiv_installation}>
      <WaveAnimation />
      </View>
      <View style={styles.managing_width}>
      <PriceValidity />
      </View>
        </View>
        </ScrollView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 10,
    border:15,
    marginLeft:10,
    marginRight:10,
    //  flex: 1,
    paddingVertical: PLATFORM_IOS? 20:0,
  },
  mainDiv_installation: {
    marginLeft:20,
    backgroundColor: '#F5F5F5',
    width: DIMENSIONS.SCREEN_WIDTH * 0.9,
    height: DIMENSIONS.SCREEN_WIDTH * 0.35,
    marginVertical: 20,
    flexDirection: 'column-reverse',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    borderWidth: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
 
//   install_touchable: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.GREEN,
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   img_width: {
//     marginLeft: 20,
//   },
//   installation_text: {
//     fontWeight: '900',
//     fontSize: 14,
//     paddingLeft: 10,
//     fontFamily:'Roboto',
//     color:COLORS.BLACK,
//   },
//   location_div: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.GRAY,
//     alignItems: 'center',
//     paddingVertical: 20,
//     // borderBottomWidth: 1,
//     // borderBottomColor: COLORS.GREEN,
    
//   },
 
//   force_base: {
//     fontWeight: 400,
//     fontSize: 14,
//     paddingLeft: 10,
//     color:COLORS.BLACK,
//   },
//   mainDiv_state_zip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingRight: 10,
//     paddingVertical: 20,
//     backgroundColor: COLORS.GRAY,
//   },
//   state_div: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical:10,
//     paddingRight:80,
//   },
//   shadowProp: {
//     backgroundColor: 'white',
//     shadowColor: Platform.OS === 'android' ? 'black' : "rgba(0,0,0,.555)",
//     shadowOffset: {
//       width: 10,
//       height: 8,
//     },
//     shadowOpacity: 2,
//     shadowRadius: 4,
//     elevation: Platform.OS === 'android' ? 8 : 0,
//   },
//   plan_div:{
//     flexDirection: 'column',
//     backgroundColor: COLORS.GRAY,
//     justifyContent: 'space-between',
//     paddingLeft:  20,
//     paddingVertical: 60,
//     // borderBottomWidth: 1,
//     // borderBottomColor: COLORS.GREEN,
// },
// kwh_image:{
// backgroundColor:COLORS.GREEN,
// },
//   kwh_mieq_text: {
//     fontWeight: 800,
//     fontSize: 16,
//     paddingTop: 8,
//   },
//   second_main_div_kwh: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     // alignSelf: 'center',
//     alignContent: 'center',
//     paddingHorizontal: 10,
//   },
//   mainDiv_purchage_dollar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: COLORS.GREEN,
//     borderRadius: 5,
//     backgroundColor: COLORS.WHITE,
//     marginTop: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 30,
//     elevation: 4,
//     shadowColor: 'rgba(1, 0, 0, 0.25)',
//     shadowOffset: {
//       width: 4,
//       height: 4,
//     },
//     shadowOpacity: 0,
//     shadowRadius: 4,
//   },
//   dollar_div: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
 
});
