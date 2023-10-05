/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {Dolllar} from '../../assets/images/Dollar';
import {navigationRef} from '../../App';
import {DIMENSIONS} from '../constants/DIMENSIONS';

const PurchseButton = ({data}) => {

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
    <View style={[styles.mainDiv_purchage_dollar, styles.shadowProp]}>
      <View style={styles.dollar_div}>
        {/* <Image source={require('../../assets/images/price.png')} /> */}
        <Dolllar />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.per_month}>
            ${data[0] == undefined ? data?.total_price : data[0].total_price}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: COLORS.BLACK,
              paddingLeft: 2,
              lineHeight: 24,
            }}>
            month
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn_purchage}
          onPress={() =>
            
            navigationRef.navigate('PlanSummary', {
              data: data[0] == undefined ? data : data[0],
            })
          }>
          <Text style={styles.purchage_text}>PURCHASE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PurchseButton;
const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
    // paddingVertical:15
  },
  shadowProp: {
    backgroundColor: 'white',
     shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  mainDiv_installation: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
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
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREEN,
    borderStyle: 'dotted',
  },
  force_base: {
    fontWeight: 400,
    fontSize: 14,
    paddingLeft: 10,
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
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    marginTop: (DIMENSIONS.SCREEN_HEIGHT * 1.5) / 100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
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
    lineHeight: 24,
  },
  btn_purchage: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    borderRadius: 12,
  },
  purchage_text: {
    fontWeight: 700,
    fontSize: 14,
    color: COLORS.BLACK,
  },
});
