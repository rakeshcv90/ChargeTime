import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import COLORS from '../constants/COLORS';
import {Unit} from '../../assets/images/Unit';
import {Mieq} from '../../assets/images/Mieq';
import {PlanPricing} from '../../assets/images/PlanPricing';
import {useDispatch, useSelector} from 'react-redux';
import {navigationRef} from '../../App';
import axios from 'axios';

export default function ForDownGrade({dataOne, purchageData, navigation}) {
  const {getPurchaseData} = useSelector(state => state);
  console.log(purchageData, 'getPurchaseData', dataOne);
  const [tax, setTax] = useState('');
  const [totalSalexTax, setTotalSalextax] = useState('');

  //const [data,setData] = useState('');
  const dispatch = useDispatch();

  const [data, setData] = useState('');
  const [forLoading, setForLoading] = useState(false);

  //   const {id, package_name, total_price, salestax} = route.params.data;

  //   useEffect(() => {
  //     getPlanSummary();
  //   }, []);

  const forDowngradeFunction = () => {
    axios.post(`${API}/upgrade_downgrade/31`)
    .then((res) => {
      
      navigationRef.navigate('PaymentGateWay',{data:dataOne})
    })
    .catch((err) => {
      console.log(err)
    })
  }
 
  const getPlanSummary = () => {
    setForLoading(true);
    axios
      .get(`${API}/planPurchase/${id}/${package_name}`)
      .then(res => {
        setForLoading(false);
        setData(res.data.locations);
        dispatch(setDataForPayment(res.data?.locations[0]));
        setTax(res.data.locations[0].salestax);
        setTotalSalextax(res.data.locations[0].totalSalexTax);
      })
      .catch(err => {
        setForLoading(false);
        console.log(err);
      });
  };
  return (
    <View>
      <View style={{marginBottom: 20}}>
        <Image
          source={require('../../assets/images/upgarde.png')}
          resizeMode="contain"
          style={{width: 40, height: 40}}
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 16,
            color: purchageData == 'DOWNGRADE' ? 'red' : '#22936F',
            paddingBottom: 5,
          }}>
          {purchageData == 'DOWNGRADE'
            ? 'Downgrade Package'
            : 'UPGRADE Package'}
        </Text>
        <Text style={{fontWeight: '600', fontSize: 16}}>
          Downgrade Package? You have purchased downgraded package!! If you want
          to buy this package then the scheduled package will be canceled.
        </Text>
      </View>
      <View style={styles.mainDiv_installation}>
        <TouchableOpacity style={styles.install_touchable_one}>
          <Text style={styles.cuurent_plan}>Current Plan</Text>
          <Text style={styles.cuurent_plan}>New Plan</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',

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
              {getPurchaseData[0].kwh}kwh
            </Text>
            <View style={{alignItems: 'center', gap: 5, paddingTop: 5}}>
              <Unit />
              <Text>Units Alloted</Text>
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
              {getPurchaseData[0].mi_eq}kwh
            </Text>
            <View
              style={{
                alignItems: 'center',
                gap: 5,
                paddingTop: 15,
                paddingBottom: 8,
              }}>
              <Mieq />
              <Text>Mi Eq</Text>
            </View>
            <Text style={styles.text_formating_part}>{dataOne.mi_eq}kwh</Text>
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
              {getPurchaseData[0].dollar_mi}kwh
            </Text>
            <View style={{alignItems: 'center', paddingVertical: 10, gap: 5}}>
              <Image
                source={require('../../assets/images/kwh_dollar.png')}
                style={{width: 22, height: 20}}
              />
              <Text>$ / Mile</Text>
            </View>
            <Text style={styles.text_formating_part}>
              {dataOne.dollar_mi}kwh
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.plan_pricing_div}>
        <View>
          <View>
            <TouchableOpacity style={styles.install_touchable}>
              <PlanPricing style={styles.img_width} />
              <Text style={styles.installation_text}>New Plan Pricing </Text>
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
              <Text style={{fontSize: 12, fontWeight: '400', paddingBottom: 5}}>
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
              <Text style={{fontSize: 12, fontWeight: '400', paddingBottom: 5}}>
                {dataOne?.salesTax}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: COLORS.BLACK,
                }}>
                {dataOne?.totalSalexTax}
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
          }}>
          <Text style={{fontWeight: '700', color: COLORS.BLACK, fontSize: 14}}>
            CANCEL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => forDowngradeFunction}
          style={{
            backgroundColor:
              purchageData == 'DOWNGRADE' ? '#F84E4E' : COLORS.GREEN,
            paddingHorizontal: 24,
            paddingVertical: 12,
            boxShadow: '0 4 4 rgba(0, 0, 0, 0.2)',
            borderRadius: 12,
          }}>
          <Text style={{fontWeight: '700', color: COLORS.WHITE, fontSize: 14}}>
            {purchageData}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  install_touchable_one: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 18,
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
    overflow: 'hidden',

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
  },
  img_width: {
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  installation_text: {
    fontWeight: 700,
    fontSize: 12,

    color: COLORS.BLACK,
  },
});
