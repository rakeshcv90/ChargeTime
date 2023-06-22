import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Platform,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import React, {useState,useEffect} from 'react';
import COLORS from '../../constants/COLORS';
import Toast from 'react-native-toast-message';
import {API} from '../../api/API';
import Input from '../../Components/Input';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '../../../assets/images/Message';
import { Eye } from '../../../assets/images/Eye';
import ActivityLoader from '../../Components/ActivityLoader';
import {useDispatch,useSelector} from 'react-redux';
import { setGraphData, getLocationID, setPackageStatus, setBoxTwoDataForDashboard, setKwhData, setMonthGraphData, setQuarterGraphData, setRemainingData, setUserID, setWeekGraphData, setWeekTotalData, setYearGraphData,setChargerStatus, setEmailData, setPurchaseData, setDeviceId } from '../../redux/action';
import axios from 'axios';
import { navigationRef } from '../../../App';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

export default function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [forLoading,setForLoading] = useState(false)
  // const [graphData,setGraphData] = useState([])
  const dispatch = useDispatch();
  const {getUserID, getGraphData}  = useSelector((state) => state)
  // console.log(getUserID,"object")
  
  const loginFunction = async () => {
    setForLoading(true)
    try{
    await fetch(`${API}/logins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data,'ttww')
        AsyncStorage.setItem('locationID', JSON.stringify(data?.locationid))
              
        // AsyncStorage.setItem('loginDataOne', JSON.stringify(data.locationid ));
       
        if (data.message == 'Login Successfully') {
         PLATFORM_IOS?
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            
          }):ToastAndroid.show('Login Successfully', ToastAndroid.SHORT);
          console.log(data.status,'qqq')
          // if(data.status == "true"){
            //   navigation.navigate('EnergyStats');
            // }else if(data.status == "false"){
              
              // }
              getDeviceIDData(data?.user_id)
              fetchGraphData(data?.user_id)
              fetchWeekGraphData(data?.user_id)
              fetchMonthGraphData(data?.user_id)
              fetchQuarterGraphData(data?.user_id)
              fetchYearGraphData(data?.user_id)
              fetchBoxTwoDashboardData(data?.user_id)
              fetchStatusdata(data?.user_id)
              getPlanCurrent(data?.user_id)
              // fetchPriceDetailsDashboardData(data?.user_id)
              dispatch(setEmailData(data?.email))
              dispatch(setPackageStatus(data?.status == 'true' ? true : false))
              dispatch(setUserID(data?.user_id))
              dispatch(getLocationID(data?.locationid))

              // else
              // if(getGraphData.length)
              // navigation.navigate('DrawerStack');
              // setForLoading(false)
           
          
          //  setTimeout(() => {
          //  },5000)
        } else {
          PLATFORM_IOS?
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            
          }):ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
          setForLoading(false)
        }
        
      })
      .catch((error) => {
        console.error(error);
        setForLoading(false)
      });
    }catch(err){
      console.log(err)
    }
  };
  
  
  
  const getDeviceIDData = (userID) => {
    axios.get(`${API}/devicecheck/${userID}}`)
    .then((res) =>{
      dispatch(setDeviceId(res.data.message))
      console.log(res.data,'tt')
    }).catch((err) => {
      console.log(err)
    })  
  }
  
//day data start
  const fetchGraphData = (userID) => {
    console.log(userID,"object")
    axios.get(`${API}/dailyusagegraph/${userID}`)
    .then((res) =>{
       
        dispatch(setGraphData(res?.data))
      
     
      dailyUsuagekwh(userID)
      // navigation.navigate('DrawerStack');
    })
    .catch((err) => {
      console.log(err)
      
    })
  }
  const dailyUsuagekwh = (userId) => {
    axios.get(`${API}/dailyusage/${userId}`)
    .then((res) =>{
      if(res?.data){
        dispatch(setKwhData(res?.data))
      }
     
      remainigUsuageData(userId)
      
    })
    .catch((err) => {
      console.log(err)
      
    })
  }
  const remainigUsuageData =(userId) => {
    let remaingData;
    
    axios.get(`${API}/remainingusage/${userId}`)
    .then((res) => {
      if(res.data?.kwh_unit_remaining>=0){
        remaingData = res.data?.kwh_unit_remaining
      }else{
        remaingData = res.data?.kwh_unit_overusage
      }
      
      dispatch(setRemainingData(remaingData))
              navigation.navigate('DrawerStack');
              setForLoading(false)
            })
    .catch((err) => {
      console.log(err)
    })
  }
//day data end

//week data start
  const fetchWeekGraphData = (userID) => {
    axios.get(`${API}/weeklyusage/${userID}`)
    .then((res) =>{
      if(res?.data){
      dispatch(setWeekGraphData(res?.data))
      }
    })
    .catch((err) => {
      console.log(err)
      
    })
  }
  const fetchMonthGraphData = (userID) => {
    axios.get(`${API}/monthlyusage/${userID}`)
    .then((res) =>{
      if(res?.data){
      dispatch(setMonthGraphData(res?.data))
      }
    })
    .catch((err) => {
      console.log(err)
      
    })
  }
  const fetchQuarterGraphData = (userID) => {
    axios.get(`${API}/threemonthusage/${userID}`)
    .then((res) =>{
      if(res?.data){
      dispatch(setQuarterGraphData(res?.data))
      }
    })
    .catch((err) => {
      console.log(err)
      
    })
  }
  const fetchYearGraphData = (userID) => {
    axios.get(`${API}/yearlyusage/${userID}`)
    .then((res) =>{
      if(res?.data){
      dispatch(setYearGraphData(res?.data))
      }
    })
    .catch((err) => {
      console.log(err)
      
    })
  }

  const fetchBoxTwoDashboardData = (userId) =>{
    axios.get(`${API}/currentplan/${userId}`)
    .then((res) =>{
      
      dispatch(setBoxTwoDataForDashboard(res?.data))
      
    })
    .catch((err) => {
      console.log(err)
      
    })
  }
  const fetchStatusdata = (userId) => {
    axios.get(`${API}/chargerstatus/${userId}`)
    .then((res) =>{
      
      dispatch(setChargerStatus(res?.data))
      
    })
    .catch((err) => {
      console.log(err)
      
    })
  }
  const getPlanCurrent = (userId) => {
        
    setForLoading(true)
    axios
      .get(`${API}/currentplan/${userId}`)
      .then(res => {
        setForLoading(false)
        
        dispatch(setPurchaseData(res?.data))
         
        
      })
      .catch(err => {
        setForLoading(false)
        console.log(err);
      });
    }
  // const fetchPriceDetailsDashboardData = (userId) =>{
  //   axios.get(`${API}/yearlyusage/${userID}`)
  //   .then((res) =>{
      
  //     dispatch(setPriceAndDetailsData(res?.data))
      
  //   })
  //   .catch((err) => {
  //     console.log(err)
      
  //   })
  // }
  
  //week data end
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
          
        <View style={styles.login_img}>
          <Image
            source={require('../../../assets/images/log.png')}
            resizeMode="contain"
            style={{width: mobileW, }}
          />
        </View>
        <View style={styles.login_css}>
          <Text style={styles.login}>Login</Text>
          
          <Input
            IconLeft={null}
            
            errors={undefined}
            touched={false}
            value={email}
            onChangeText={text => setEmail(text)}
            text="Email"
            IconRight={() => (
             
              <Message />
            )}
            mV={20}
            placeholder="Enter your Email"
            
            bW={1}
            textWidth={'22%'}
            placeholderTextColor={COLORS.BLACK}
            autoCapitalize='none'
            
          />
          
          <Input
            IconLeft={null}
            
            errors={undefined}
            touched={false}
            placeholderTextColor={COLORS.BLACK}
            text="Password"
            
            passwordInput={true}
            pasButton={() => setShowPassword(!showPassword)}
            secureTextEntry={showPassword}
            passwordInputIcon={showPassword}
            onChangeText={text => setPassword(text)}
            value={password}
            mV={5}
            placeholder="Enter your password"
            bW={1}
            textWidth={'30%'}
            
          />
          <View style={styles.main_div_lock_img}>
            <Image source={require('../../../assets/images/lock_two.png')} resizeMode='contain' style={{width:20,height:20}} />
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgot_password}>Forgot my password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',

              marginHorizontal: 20,
            }}>
              {forLoading?<ActivityLoader /> :""}
            <TouchableOpacity
              onPress={loginFunction}
              style={{
                marginTop: 20,
                backgroundColor: COLORS.GREEN,
                alignItems: 'center',
                padding: 13,
                borderRadius: 10,
                width: '100%',
              }}>
              <Text style={styles.log_In_btn}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainDiv_donot_account}>
            <Text style={styles.dont_have_text}>Don't have an account? </Text>
            <TouchableOpacity onPress={() =>  navigation.navigate('Register', { email: 'email',user_id:'user_id' })
      }>
              <Text style={styles.sign_up}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_page: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_img: {
    width: mobileW,
    
  },
  img_width: {
    width: mobileW,
    height: mobileH * 0.45,
  },
  login_css: {
   
    paddingBottom: 15,
    marginHorizontal: 20,
    // marginTop: 110,

    borderRadius: 10,
    
  },
  
  login: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
    paddingVertical: 10,
    letterSpacing: 1,
  },
  email: {
    paddingTop: 12,
    paddingBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  email_placeholder: {
    backgroundColor: `rgba(86, 84, 84, 0.1)`,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  main_div_lock_img: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 10,
  },

  forgot_password: {
    // letterSpacing: 1,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  mainDiv_donot_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  dont_have_text: {
    fontSize: Platform.OS === 'ios' ? 14 : 15,
    fontWeight: '500',
  },
  sign_up: {
    fontSize: Platform.OS === 'ios' ? 16 : 15,
    fontWeight: '600',
    color: 'black',
  },
  log_In_btn: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? 700 : 700,
  },
});