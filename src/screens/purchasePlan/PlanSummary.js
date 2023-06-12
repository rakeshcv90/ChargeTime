import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
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
import BoxOne from '../../Components/BoxOne';
import {SafeAreaView} from 'react-native-safe-area-context';
import BoxFour from '../../Components/BoxFour';
import axios from 'axios';
import {API} from '../../api/API';
import {navigationRef} from '../../../App';

const mobileW = Math.round(Dimensions.get('screen').width);

export default function PlanSummary({route, navigation}) {
  const [tax, setTax] = useState('');
  const [data,setData] = useState('');
  const dispatch =useDispatch();
  const {id, package_name, total_price, salestax} = route.params.data;

  useEffect(() => {
    getPlanSummary();
  }, []);

  const getPlanSummary = () => {
    axios
      .get(`${API}/planPurchase/${id}/${package_name}`)
      .then(res => {
        console.log(res.data,'ppp')
        setData(res.data.locations)
        dispatch(getPlanSummary(res))
        setTax(res.data.locations[0].salestax);
        
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View>
          <View
            style={{paddingHorizontal: 20, marginTop: 30, marginBottom: 20}}>
            <Text
              style={{fontSize: 24, fontWeight: '800', color: COLORS.BLACK}}>
              Plan Summary
            </Text>
          </View>
          <View style={{marginHorizontal: 20}}>
            <View style={{marginBottom: 10}}>
              <BoxOne data={route.params.data} />
            </View>
            <View style={{marginBottom: 10}}>
              <BoxFour data={data} />
            </View>
          </View>
          {/* <View style={styles.mainDiv_installation_one}>
        
        <TouchableOpacity style={styles.install_touchable}>
          <Address style={styles.img_width} />
          <Text style={styles.installation_text}>Installation Base</Text>
        </TouchableOpacity>
        <View style={styles.shadowProp}>
          <View style={styles.location_div}>
            <Vanderberg style={styles.img_width} />
            <Text style={styles.force_base}>Vanderberg</Text>
          </View>
          <Image
            source={require('../../../assets/images/dotted.png')}
            resizeMode="cover"
            style={{alignSelf: 'center', width: mobileW}}
          />
          <View style={styles.mainDiv_state_zip}>
            <View style={styles.state_div}>
              
              <Connecticut style={styles.img_width} />
              <Text style={styles.force_base}>fgchvjk</Text>
            </View>
            <View style={styles.state_div}>
              <Image
                //style={styles.img_width}
                source={require('../../../assets/images/zip_code.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={styles.force_base}>sdfghjk</Text>
            </View>
          </View>
        </View>
        
      </View> */}

          {/* <View style={styles.mainDiv_installation_one}>
        <TouchableOpacity style={styles.install_touchable}>
          <Address style={styles.img_width} />
          <Text style={styles.installation_text}>Plan Details</Text>
        </TouchableOpacity>
        <View style={styles.shadowProp}>
          <View style={styles.location_div}>
            <Vanderberg style={styles.img_width} />
            <Text style={styles.force_base}>Vanderberg</Text>
          </View>
          <Image
            source={require('../../../assets/images/dotted.png')}
            resizeMode="contain"
            style={{alignSelf: 'center', width: mobileW}}
          />
          <View style={styles.mainDiv_state_zip}>
            <View style={styles.state_div}>
              
              <Connecticut style={styles.img_width} />
              <Text style={styles.force_base}>fgchvjk</Text>
            </View>
            <View style={styles.state_div}>
              <Image
                
                source={require('../../../assets/images/zip_code.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={styles.force_base}>sdfghjk</Text>
            </View>
          </View>
        </View>
      </View> */}
          <View style={styles.plan_pricing_div}>
            <View>
              <View>
                <TouchableOpacity style={styles.install_touchable}>
                  <PlanPricing style={styles.img_width} />
                  <Text style={styles.installation_text}>Plan Pricing </Text>
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
                    ${total_price}
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', paddingBottom: 5}}>
                    ${tax}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: COLORS.BLACK,
                    }}>
                    $135.00/-
                  </Text>
                </View>
              </View>
            </View>
           
          </View>
          <View style={styles.bottom_tab}>
             
                <TouchableOpacity
                  onPress={() => navigationRef.navigate('Home')}
                  style={{padding: 20, backgroundColor: COLORS.GRAY,borderRadius:25}}>
                  <LeftIcon />
                </TouchableOpacity>
              
              <View
                style={{
                  backgroundColor: COLORS.GREEN,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 12,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: COLORS.BLACK,
                  }}>
                  CHECKOUT
                </Text>
              </View>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // mainDiv_installation_one: {
  //   // overflow: 'hidden',
  //   // borderWidth:0.5,
  //   borderRadius: 20,
  //   marginTop: Platform.OS === 'ios' ? 10 : 20,
  //   marginHorizontal: 20,
  // },
  plan_pricing_div: {
     marginHorizontal: 20,
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: Platform.OS === "ios"?10: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  
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
  },
  img_width: {
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  installation_text: {
    fontWeight: 700,
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
