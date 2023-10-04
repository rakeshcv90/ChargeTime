/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../../constants/COLORS';
import {Address} from '../../../assets/images/Address';
import {Vanderberg} from '../../../assets/images/Vanderberg';
import {Connecticut} from '../../../assets/images/Connecticut';
import {TabActions} from '@react-navigation/native';
import {PlanPricing} from '../../../assets/images/PlanPricing';
import {LeftIcon} from '../../../assets/images/LeftIcon';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import InstallationBase from '../../Components/InstallationBase';
import {SafeAreaView} from 'react-native-safe-area-context';
import BoxFour from '../../Components/BoxFour';
import axios from 'axios';
import {API} from '../../api/API';
import {navigationRef} from '../../../App';

import ActivityLoader from '../../Components/ActivityLoader';
import {useDispatch} from 'react-redux';
import {setDataForPayment} from '../../redux/action';
// import DownGradeData from '../downgrade/DownGradeData';

const mobileW = Math.round(Dimensions.get('screen').width);

export default function PlanSummary({route, navigation}) {
  const [tax, setTax] = useState('');
  const [totalSalexTax, setTotalSalextax] = useState('');
  const [voucherStatus, setvoucherStatus] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState('');
  const [forLoading, setForLoading] = useState(false);
  const [data1,setData1]=useState('');
  // DownGradeData;
  const {id, package_name, total_price, salestax, coupon_promotion_code,coupon_id} =
    route.params?.data;


  useEffect(() => {
    getPlanSummary();
    if (coupon_id) {
      getVoucherDetails(coupon_id);
    }
  }, []);
  const getVoucherDetails = data => {
    axios
      .get(`${API}/couponret/${data}`)
      .then(res => {
  
        setvoucherStatus(res.data.valid);
      
      })
      .catch(err => {
        console.log("ffffffffff",err);
      });
  };
  const getPlanSummary = () => {
    setForLoading(true);
    axios
      .get(`${API}/planPurchase/${id}/${package_name}`)
      .then(res => {
 
        setData1(res.data)
        setData(res.data.locations);
        dispatch(setDataForPayment(res.data?.locations[0]));
        setTax(res.data.locations[0].salestax);
        setTotalSalextax(res.data.locations[0].totalSalexTax);
        setForLoading(false);
      })
      .catch(err => {
        setForLoading(false);
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {forLoading ? <ActivityLoader /> : ''}
        <View>
          <View
            style={{paddingHorizontal: 20, marginTop: 20, marginBottom: 20}}>
            <Text
              style={{fontSize: 24, fontWeight: '800', color: COLORS.BLACK}}>
              Plan Summary
            </Text>
          </View>
          <View style={{marginHorizontal: 20}}>
            <View style={{marginVertical:20}}>
              <InstallationBase data={route.params.data} />
            </View>
            <View style={{marginVertical:20}}>
              <BoxFour data={data} />   
            </View>
          </View>

          <View style={ Platform.OS == 'android'?styles.plan_pricing_div1:styles.plan_pricing_div}>
            <View>
              <TouchableOpacity style={styles.install_touchable}>
                <PlanPricing style={styles.img_width} />
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 12,
                    marginLeft: -10,
                    color: COLORS.BLACK,
                  }}>
                  Plan Pricing
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: COLORS.GRAY,
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderBottomLeftRadius:10,
                borderBottomRightRadius:10
         
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    paddingVertical: 5,
                    color: COLORS.BLACK,
                  }}>
                  Price (excl.taxes):
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    paddingBottom: 5,
                    color: COLORS.BLACK,
                  }}>
                  Taxes:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: COLORS.BLACK,
                  }}>
                  Total:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    paddingVertical: 5,
                    color: COLORS.BLACK,
                  }}>
                  ${total_price}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    paddingBottom: 5,
                    color: COLORS.BLACK,
                  }}>
                    ${tax}%
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: COLORS.BLACK,
                  }}>
                  ${totalSalexTax}/-
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottom_tab}>
            <TouchableOpacity
              onPress={() => navigationRef.navigate('Home')}
              style={{
                padding: 20,
                backgroundColor: COLORS.GRAY,
                borderRadius: 25,
                ...Platform.select({
                  ios: {
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                  },
                  android: {
                    elevation: 4,
                  },
                }),
              }}>
              <LeftIcon />
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: COLORS.GREEN,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 12,
                ...Platform.select({
                  ios: {
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                  },
                  android: {
                    elevation: 4,
                  },
                }),
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PaymentGateWay', {
                    data: route.params.data,
                    voucherStatus: voucherStatus,
                    details: data1,
                  })
                }>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: COLORS.BLACK,
                  }}>
                  CHECKOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
 
  plan_pricing_div: {
    marginTop: Platform.OS === 'ios' ? 15 : 10,
    marginHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    
    // backgroundColor: 'white',
    
  },
  plan_pricing_div1: {
    marginTop: Platform.OS === 'ios' ? 15 : 10,
    marginHorizontal: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 6},
    // shadowOpacity: 0.2,
    // shadowRadius: 5.62,
    // elevation: 8,
    
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
  bottom_tab: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius: 6,
  },
  install_touchable: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    paddingVertical: 10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10
  },
  img_width: {
    marginHorizontal: 20,
    overflow: 'hidden',
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
  },
  force_base: {
    fontWeight: 400,
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
    paddingVertical: 10,
  },
});
