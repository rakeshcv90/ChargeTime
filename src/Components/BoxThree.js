import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { Dolllar } from '../../assets/images/Dollar';

const BoxThree = () => {
  return (
    <View style={styles.mainDiv_purchage_dollar}>
      <View style={styles.dollar_div}>
        {/* <Image source={require('../../assets/images/price.png')} /> */}
        <Dolllar />
        <Text style={styles.per_month}>$74.67 /month</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btn_purchage}>
          <Text style={styles.purchage_text}>PURCHAGE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoxThree;
const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
    // paddingVertical:15
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
