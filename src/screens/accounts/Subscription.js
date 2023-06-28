
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,ToastAndroid, Image, Dimensions, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalLine from '../../Components/HorizontalLine'
import Header from '../../Components/Header'
import COLORS from '../../constants/COLORS';
import SubBoxOne from '../../Components/SubBoxOne';
import SubBoxTwo from '../../Components/SubBoxTwo';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import WaveAnimation from '../../Components/WaveAnimation';
import { DIMENSIONS } from '../../constants/DIMENSIONS';
import PriceValiditySubs from '../../Components/PriceValiditySubs';
import { API } from '../../api/API';
import { getCurrentPlan as UpdatedCurrentPlan } from '../../redux/action';
import { userSubsData } from '../../redux/action';


const mobileW = Math.round(Dimensions.get('screen').width);
const Subscription = () => {
  const getUserID = useSelector((state) => state.getUserID)
  const getCurrentPlan = useSelector((state)=> state.getCurrentPlan)

  // const [getSubscription, setGetSubscription] = useState([]);
  // const [getData, setGetData] = useState([]);
  // const [packageExists, setPackageExists] = useState(getCurrentPlan[0]);

  const packageExists = getCurrentPlan[0]?.energy_plan;

  console.log("helloooooo", packageExists);
  const dispatch = useDispatch();
  useEffect(() => {

    // userSubsEnergy();
 }, []);

 const user_id= getUserID;
 console.log("user_id", user_id)

// const userSubsEnergy = async () => {

//   try {
//     const response = await fetch(`${API}/subscription/${user_id}`);
//     const result = await response.json();
//     // console.log("-----",result)
//     if(result !== null)
//     {
//     console.log(result, "----------------")
//     // dispatch(userSubsData(result));
//     // setGetData(result)
//     }else{
//       console.log("iiiiiiiiiiii")
//     }
 
//   } catch (error) {
//    console.log("get deleted", error)
//   }
// }  

const PlanCancel = async () => {
  try {
    const response = await fetch(`${API}/plancancel/${user_id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
    })
    const result = await response.json();
    console.log(result,'ttt');
    if(result.message == 'Plan Cancelled Successfully'){
      const updatedData = [{
        ...getCurrentPlan[0],
        End_validity : null,
        dollar_mi : null,
        energy_plan: null,
        energy_price :null, 
        kwh: null,
        mi_eq: null,
        remaining_package : null,
        total_package: null,
      }];
      dispatch(UpdatedCurrentPlan(updatedData));
      PLATFORM_IOS
      ? Toast.show({
          type: 'success',
          text1: 'Plan Cancelled Successfully',
        })
      : ToastAndroid.show(
          'Plan Cancelled Successfully',
          ToastAndroid.SHORT,
        );
        
    }
  }catch (error) {
    console.error(error);
  }
}




  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
   <Header headerName="Subscription" />
      {Platform.OS == 'android' ? (
        <HorizontalLine style={styles.line} />
      ) : (
        <View>
          <Image
            source={require('../../../assets/images/dotted.png')}
            style={{ width: mobileW * 0.97, top: Platform.OS == 'ios' ? -30 : 2 }}
          />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
      {packageExists !== null ? (
      <View>
        <View style={styles.managing_width}>
          <SubBoxOne />
          <SubBoxTwo />
        </View>
        <View style={styles.mainDiv_installation}>
          <WaveAnimation />
        </View>
        <View style={styles.managing_width}>
          <PriceValiditySubs />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 20,
            paddingBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              PlanCancel();
            }}
            style={{
              marginTop: 15,
              marginRight: 170,
              backgroundColor: '#F84E4E',
              alignItems: 'center',
              padding: 13,
              borderRadius: 10,
              width: '50%',
            }}>
            <Text
              style={{
                color: COLORS.WHITE,
                fontSize: 14,
                fontWeight: '700',
              }}>
              Cancel Subscription
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.managing_width}>
        <Text style={{
                color: COLORS.RED,
                fontSize: 16,
                fontWeight: '700',
              }}>
                No Active Subscription.
                </Text>
        {/* <SubBoxOne /> */}
      </View>
    )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 10,
    border: 15,
    marginLeft: 10,
    marginRight: 10,
    //  flex: 1,
    paddingVertical: PLATFORM_IOS ? 20 : 10,
  },
  mainDiv_installation: {
    marginLeft: 20,
    backgroundColor: '#F5F5F5',
    width: DIMENSIONS.SCREEN_WIDTH * 0.9,
    height: DIMENSIONS.SCREEN_WIDTH * 0.35,
    marginVertical: 10,
    flexDirection: 'column-reverse',
    shadowColor: '#000000',
    shadowOffSet: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    borderWidth: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },

});
