import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image,Dimensions, Platform} from 'react-native';
import React, {useEffect, useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalLine from  '../../Components/HorizontalLine'
import Header from '../../Components/Header'
import COLORS from '../../constants/COLORS';
import SubBoxOne from '../../Components/SubBoxOne';
import SubBoxTwo from '../../Components/SubBoxTwo';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import WaveAnimation from '../../Components/WaveAnimation';
import { DIMENSIONS } from '../../constants/DIMENSIONS';
import PriceValidity from '../../Components/PriceValidity';
import { API } from '../../api/API';
import { getBasePackage } from '../../redux/action';


const mobileW = Math.round(Dimensions.get('screen').width);
 const Subscription = () => {
 
  // const getPlanSummary = useSelector((state)=> state.getPlanSummary)
  const getUserID = useSelector((state)=> state.getUserID)
  const [getSubscription, setGetSubscription] = useState([]);
  const dispatch =useDispatch();
  useEffect(() => {
    // console.log('data for this User:---------', getPlanSummary); 
    userSubscription();
 }, []);

 const user_id= getUserID;
//  console.log("user_id", user_id)

 const userSubscription = async () =>{
  // const response = await fetch(`${API}/userexisting/${user_ID}`);
  try {
    const response = await fetch(`${API}/subscriptionplan/${user_id}`);
    const result = await response.json();
  //  console.log("response...>>>",JSON.stringify(response))
  //  console.log("result...>>>",JSON.stringify(result))
 
    if(result[0].message == "sucess")
    {
      setGetSubscription(result[0])
// console.log('wwwwww',result);
// setGetSubscription(result);
// console.log("Dispatch..",dispatch)
  dispatch(getBasePackage(result)); 
    }else{
      console.log("iiiiiiiiiiii")
    }
    // setLocationMap(result);
  } catch (error) {
    console.error(error);
  }
};



  return (
    <ScrollView showsVerticalScrollIndicator={false} >
  <View>
    <Header headerName="Subscription" editShow={false} />
    <HorizontalLine/>
    <View style={styles. managing_width}>
          <SubBoxOne data={getSubscription} />
          <SubBoxTwo data={getSubscription} />
        
        </View>
        <View style={styles.mainDiv_installation}>
      <WaveAnimation />
      </View>
      <View style={styles.managing_width}>
      <PriceValidity data={getSubscription} />
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
    paddingVertical: PLATFORM_IOS? 20:10,
  },
  mainDiv_installation: {
    marginLeft:20,
    backgroundColor: '#F5F5F5',
    width: DIMENSIONS.SCREEN_WIDTH * 0.9,
    height: DIMENSIONS.SCREEN_WIDTH * 0.35,
    marginVertical: 20,
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
