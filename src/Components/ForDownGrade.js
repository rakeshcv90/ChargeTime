import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import COLORS from '../constants/COLORS';
import {Unit} from '../../assets/images/Unit';
import {Mieq} from '../../assets/images/Mieq';
import {PlanPricing} from '../../assets/images/PlanPricing';
import {useDispatch, useSelector} from 'react-redux';
import {navigationRef} from '../../App';
import axios from 'axios';
import {API} from '../api/API';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setDataForPayment} from '../redux/action';

export default function ForDownGrade({route, navigation}) {
  const {dataOne, purchageData, message} = route.params;

  const {getPurchaseData, getUserID, getLocationID} = useSelector(
    state => state,
  );

  const [tax, setTax] = useState('');
  const [totalSalexTax, setTotalSalextax] = useState('');
  const [voucherStatus, setvoucherStatus] = useState(false);

  //const [data,setData] = useState('');
  const dispatch = useDispatch();

  const [forLoading, setForLoading] = useState(false);

  //   const {id, package_name, total_price, salestax} = route.params.data;

  useEffect(() => {
    if (route.params.dataOne.coupon_id) {
      getVoucherDetails(route.params.dataOne.coupon_id);
    }
  }, []);
  const getVoucherDetails = data => {
    axios
      .get(`${API}/couponret/${data}`)
      .then(res => {
        console.log('FFFFFFFFFFff', res.data);
        setvoucherStatus(res.data.valid);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const forDowngradeFunction = item => {
    axios
      .post(`${API}/upgrade_downgrade/${getUserID}`)
      .then(res => {
        navigationRef.navigate('PaymentGateWay', {
          data: dataOne,
          purchageData: purchageData,
          voucherStatus: voucherStatus,
          details: item,
        });
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  };

  const getPlanSummary = () => {
    setForLoading(true);
    axios
      .get(`${API}/planPurchase/${getLocationID}/${dataOne.package_name}`)
      .then(res => {
        setForLoading(false);
        dispatch(setDataForPayment(res.data?.locations[0]));
        setTax(res.data.locations[0].salestax);
        setTotalSalextax(res.data.locations[0].totalSalexTax);
        forDowngradeFunction(res.data);
      })
      .catch(err => {
        setForLoading(false);
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 20}}>
          <View style={{marginBottom: 20}}>
            {purchageData == 'DOWNGRADE' ? (
              <Image
                source={require('../../assets/images/upgarde.png')}
                resizeMode="contain"
                style={{width: 40, height: 40}}
              />
            ) : (
              <Image
                source={require('../../assets/images/Upgrade.png')}
                resizeMode="contain"
                style={{width: 40, height: 40}}
              />
            )}

            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: purchageData == 'DOWNGRADE' ? 'red' : '#22936F',
                marginVertical: 5,
                lineHeight: 29,
              }}>
              {purchageData == 'DOWNGRADE'
                ? 'Downgrade Package'
                : 'UPGRADE Package'}
            </Text>
            <Text
              style={{
                lineHeight: 26,
                fontWeight: '400',
                fontSize: 14,
                color: COLORS.BLACK,
                textAlign: 'justify',
              }}>
              {message}
            </Text>
          </View>
          <View
            style={
              Platform.OS == 'android'
                ? styles.mainDiv_installation
                : styles.mainDiv_installation1
            }>
            <View style={styles.install_touchable_one}>
              <Text style={styles.cuurent_plan}>Current Plan</Text>
              <Text style={styles.cuurent_plan}>New Plan</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingVertical: 15,
                backgroundColor: COLORS.GRAY,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 18,
                }}>
                <Text style={styles.text_formating_part}>
                  {getPurchaseData.data.kwh}kwh
                </Text>

                <View
                  style={{
                    alignItems: 'center',
                    gap: 5,
                    paddingTop: 5,
                    alignSelf: 'center',
                  }}>
                  {/* <Unit /> */}
                  <Image
                    source={require('../../assets/images/kwh.png')}
                    resizeMode="contain"
                    style={{width: 30, height: 30}}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: '#3D3D3D',
                      opacity: 0.6,
                      lineHeight: 12,
                    }}>
                    Units Alloted
                  </Text>
                </View>
                <Text style={styles.text_formating_part}>{dataOne.kwh}kwh</Text>
              </View>
              <Image
                // style={styles.img_width}
                source={require('../../assets/images/dotted.png')}
                resizeMode="stretch"
                style={{alignSelf: 'center', width: '100%', marginTop: 15}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 18,
                }}>
                <Text style={styles.text_formating_part}>
                  ~ {getPurchaseData.data.mi_eq}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    gap: 5,
                    paddingTop: 15,
                    paddingBottom: 8,
                  }}>
                  <Image
                    source={require('../../assets/images/kwh_icon_one.png')}
                    resizeMode="contain"
                    style={{width: 30, height: 30}}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: '#3D3D3D',
                      opacity: 0.6,
                      lineHeight: 12,
                    }}>
                    Mi Eq
                  </Text>
                </View>
                <Text style={styles.text_formating_part}>
                  ~ {dataOne.mi_eq}
                </Text>
              </View>
              <Image
                // style={styles.img_width}
                source={require('../../assets/images/dotted.png')}
                resizeMode="stretch"
                style={{alignSelf: 'center', width: '100%', marginVertical: 10}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 18,
                }}>
                <Text style={styles.text_formating_part}>
                  {getPurchaseData.data.dollar_mi}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: 10,
                    gap: 5,
                    alignSelf: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/kwh_dollar.png')}
                    resizeMode="contain"
                    style={{width: 30, height: 30}}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: '#3D3D3D',
                      opacity: 0.6,
                      lineHeight: 12,
                    }}>
                    $ / Mile
                  </Text>
                </View>
                <Text style={styles.text_formating_part}>
                  {dataOne.dollar_mi}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={
              Platform.OS == 'android'
                ? styles.plan_pricing_div1
                : styles.plan_pricing_div
            }>
            <View>
              <View style={styles.install_touchable}>
                <PlanPricing style={styles.img_width} />
                <Text style={styles.installation_text}>New Plan Pricing</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.GRAY,
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderBottomLeftRadius: 10,

                  borderBottomRightRadius: 10,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      paddingVertical: 5,
                    }}>
                    Price (excl.taxes):
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', paddingBottom: 5}}>
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
                    }}>
                    ${dataOne?.total_price}
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', paddingBottom: 5}}>
                    {dataOne?.salesTax}%
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: COLORS.BLACK,
                    }}>
                    ${dataOne?.totalSalexTax}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginVertical: 20,
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigationRef.goBack()}
              style={{
                backgroundColor: COLORS.WHITE,
                paddingHorizontal: 24,
                paddingVertical: 12,
                boxShadow: '0 4 4 rgba(0, 0, 0, 0.2)',
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
              <Text
                style={{fontWeight: '700', color: COLORS.BLACK, fontSize: 14}}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => getPlanSummary()}
              style={{
                backgroundColor:
                  purchageData == 'DOWNGRADE' ? '#F84E4E' : COLORS.GREEN,
                paddingHorizontal: 24,
                paddingVertical: 12,
                boxShadow: '0 4 4 rgba(0, 0, 0, 0.2)',
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
              <Text
                style={{fontWeight: '700', color: COLORS.WHITE, fontSize: 14}}>
                {purchageData}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainDiv_installation: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  mainDiv_installation1: {
    // overflow: 'hidden',
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  install_touchable_one: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cuurent_plan: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  text_formating_part: {
    fontWeight: '800',
    fontSize: 16,
    color: COLORS.BLACK,
    paddingVertical: 7,
  },
  plan_pricing_div: {
    // overflow: 'hidden',

    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
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
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  installation_text: {
    fontWeight: '700',
    fontSize: 12,
    marginLeft: -10,
    color: COLORS.BLACK,
  },
  plan_pricing_div1: {
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
});
