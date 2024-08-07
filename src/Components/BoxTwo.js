/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import COLORS from '../constants/COLORS';
import {Unit} from '../../assets/images/Unit';
import {Mieq} from '../../assets/images/Mieq';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import {useSelector} from 'react-redux';

const BoxTwo = ({data}) => {
  const {getUserID, getPurchaseData, getPlanStatus, getPurchaseAllPlans} =
    useSelector(state => state);

  const getmessage = () => {
    if (getPurchaseData.length <= 0) {
      return <Text style={styles.installation_text}></Text>;
    } else if (getPurchaseData.length == undefined) {
      if (
        getPurchaseData.data != 'Package not found' &&
        getPurchaseData?.data?.old_subscription_status != 'cancel'
      ) {
        if (getPurchaseData?.data?.energy_plan == data?.package_name) {
          var datatex = '( Current Plan )';
          return <Text style={styles.installation_text}>{datatex}</Text>;
        } else {
          if (
            getPurchaseData.data != 'Package not found' &&
            getPurchaseData?.data?.old_subscription_status != 'cancel'
          ) {
            var datatest = '';
            getPurchaseAllPlans?.forEach(item => {
              if (
                item.energy_plan == data?.package_name &&
                item.subscription_status == 'active'
              ) {
                datatest = '( Active )';
              } else if (
                item.energy_plan == data?.package_name &&
                item.subscription_status == 'scheduled'
              ) {
                datatest = '( Scheduled )';
              } else if (
                item.energy_plan == data?.package_name &&
                item.subscription_status == 'notActive'
              ) {
                datatest = '( NotActive )';
              } else datatest = '';
            });
            return <Text style={styles.installation_text}>{datatest}</Text>;
          }else{
            return <Text style={styles.installation_text}></Text>;
          }

        }
      }
    }
  };
  return (
    <View
      style={
        Platform.OS === 'android'
          ? styles.mainDiv_installation1
          : styles.mainDiv_installation
      }>
      <View style={styles.install_touchable}>
        <Image
          style={styles.img_width}
          resizeMode="contain"
          source={require('../../assets/images/details.png')}
        />
        <Text style={styles.installation_text}>Plan Details</Text>

        {getmessage()}
      </View>
      <View style={[styles.mainDiv_plan_details]}>
        <View style={styles.second_main_div_kwh}>
          <Image
            source={require('../../assets/images/kwh.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
          {/* <Unit /> */}
          <Text style={styles.kwh_mieq_text}>
            {data?.kwh ? data?.kwh : '600'} kWh
          </Text>
          <Text style={styles.unit_allowed}>Units Alloted</Text>
        </View>
        <View style={styles.second_main_div_kwh}>
          <Image
            source={require('../../assets/images/kwh_icon_one.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
          {/* <Mieq /> */}
          <Text style={styles.kwh_mieq_text}>
            ~ {data?.mi_eq ? data?.mi_eq : '1500'}
          </Text>
          <Text style={styles.unit_allowed}>Mi Eq</Text>
        </View>
        <View style={styles.second_main_div_kwh}>
          <Image
            source={require('../../assets/images/kwh_dollar.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />

          <Text style={styles.kwh_mieq_text}>
            {data?.dollar_mi ? data?.dollar_mi : '0.11'}
          </Text>
          <Text style={styles.unit_allowed}>$ / Mile</Text>
        </View>
      </View>
    </View>
  );
};

export default BoxTwo;
const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
  },
  mainDiv_installation: {
    marginTop: DIMENSIONS.SCREEN_HEIGHT * 0.02,
    marginBottom: DIMENSIONS.SCREEN_HEIGHT * 0.02,
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
    paddingVertical: 10,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  img_width: {
    marginLeft: 15,
    width: 20,
    height: 20,
  },
  installation_text: {
    fontWeight: '700',
    fontSize: 12,
    paddingLeft: 10,
    color: COLORS.BLACK,
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
    // backgroundColor: COLORS.GRAY,
  },
  state_div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainDiv_plan_details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems:'center',
    paddingVertical: 20,
    backgroundColor: COLORS.GRAY,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  kwh_mieq_text: {
    fontWeight: 800,
    fontSize: 16,
    paddingTop: 8,
    color: COLORS.BLACK,
  },
  second_main_div_kwh: {
    flexDirection: 'column',
    alignItems: 'center',
    // alignSelf: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
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

  unit_allowed: {
    fontWeight: 400,
    fontSize: 10,
  },
  mainDiv_installation1: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 0 : (DIMENSIONS.SCREEN_HEIGHT * 3) / 100,
    marginBottom: Platform.OS === 'ios' ? 0 : 15,

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
