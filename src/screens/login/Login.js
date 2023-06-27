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
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import React, {useState, useEffect} from 'react';
import COLORS from '../../constants/COLORS';
import Toast from 'react-native-toast-message';
import {API} from '../../api/API';
import Input from '../../Components/Input';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Message} from '../../../assets/images/Message';
import {Eye} from '../../../assets/images/Eye';
import ActivityLoader from '../../Components/ActivityLoader';
import {useDispatch, useSelector} from 'react-redux';
import {
  setGraphData,
  getLocationID,
  setPackageStatus,
  setBoxTwoDataForDashboard,
  setKwhData,
  setMonthGraphData,
  setQuarterGraphData,
  setRemainingData,
  setUserID,
  setWeekGraphData,
  setWeekTotalData,
  setYearGraphData,
  setChargerStatus,
  setEmailData,
  setPurchaseData,
  setDeviceId,
  setIsAuthorized,
  setBasePackage,
  setOverUsage,
} from '../../redux/action';
import axios from 'axios';
import {navigationRef} from '../../../App';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [forLoading, setForLoading] = useState(false);
  // const [graphData,setGraphData] = useState([])
  const dispatch = useDispatch();
  const {getDeviceID, getGraphData} = useSelector(state => state);
  // console.log(getUserID,"object")
  useEffect(() => {
    // const backAction = () => {
    //   Alert.alert(
    //     'Exit App',
    //     'Are you sure you want to exit?',
    //     [
    //       {
    //         text: 'Cancel',
    //         onPress: () => null,
    //         style: 'cancel',
    //       },
    //       { text: 'Exit', onPress: () => BackHandler.exitApp() },
    //     ],
    //     { cancelable: false }
    //   );
    //   return true;
    // };
    BackHandler.addEventListener('hardwareBackPress', () =>
      BackHandler.exitApp(),
    );

    // return () => backHandler.remove();
  }, []);
  const packagePlans = async locationID => {
    //  loginData = await AsyncStorage.getItem('loginDataOne');

    try {
      const response = await axios.get(`${API}/packagePlan/${locationID}`);

      if (response?.data?.locations.length == 0) {
        setForLoading(true);
        setShowPackage(true);
        dispatch(setBasePackage([]));
      } else {
        console.log(response.data, 'Packaagessssss');
        dispatch(setBasePackage(response.data.locations));
        // dispatch(setIsAuthorized(true));
        setForLoading(false);
        navigation.navigate('DrawerStack');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setForLoading(false);
    }
  };
  const loginFunction = async () => {
    setForLoading(true);
    try {
      const res = await axios(`${API}/logins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: email,
          password: password,
        },
      });
      if (res.data) {
        console.log(res.data, 'ttww');

        // AsyncStorage.setItem('loginDataOne', JSON.stringify(data.locationid ));

        if (res.data.message == 'Login Successfull') {
          // console.log("------------",res.data.user_id)
          dispatch(setUserID(res.data?.user_id));
          AsyncStorage.setItem(
            'locationID',
            JSON.stringify(res.data?.locationid),
          );
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Login Successful',
              })
            : ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
          console.log(res.data, 'Loginnnnnnnnnn');
          console.log('firstSTATUS', res.data.status);

          // if(data.status == "true"){
          //   navigation.navigate('EnergyStats');
          // }else if(data.status == "false"){

          // }
          if (res.data.status == 'All details available') {
            dispatch(setEmailData(res.data?.email));
            dispatch(setPackageStatus(true));
            // dispatch(setUserID(res.data?.user_id));
            dispatch(getLocationID(res.data?.locationid));
            // dispatch(setIsAuthorized(true));
            fetchGraphData(res.data?.user_id);
            fetchWeekGraphData(res.data?.user_id);
            fetchMonthGraphData(res.data?.user_id);
            fetchQuarterGraphData(res.data.user_id);
            fetchYearGraphData(res.data?.user_id);
            fetchBoxTwoDashboardData(res.data?.user_id);
            fetchStatusdata(res.data?.user_id);
            getPlanCurrent(res.data?.user_id);
            dispatch(setDeviceId(''));
          } else if (
            res.data.status ==
            'Your Account is not currently linked with a TRO Charger. Please contact customer service if you believe this is an error.'
          ) {
            // getDeviceIDData(res.data);
            dispatch(setEmailData(res.data?.email));
            dispatch(setPackageStatus(true));
            dispatch(setUserID(res.data?.user_id));
            dispatch(getLocationID(res.data?.locationid));
            // dispatch(setIsAuthorized(true));
            getPlanCurrent(res.data?.user_id);
            dispatch(
              setDeviceId(
                'Your Account is not currently linked with a TRO Charger. Please contact customer service if you believe this is an error.',
              ),
            );
          } else {
            dispatch(setPackageStatus(false));
            dispatch(setDeviceId(res.data.message));
            // dispatch(setIsAuthorized(true));
            dispatch(setEmailData(res.data?.email));
            dispatch(setUserID(res.data?.user_id));
            dispatch(getLocationID(res.data?.locationid));
            packagePlans(res.data?.locationid);
          }
          // fetchPriceDetailsDashboardData(data?.user_id)
          // else
          // if(getGraphData.length)
          // navigation.navigate('DrawerStack');
          // setForLoading(false)

          //  setTimeout(() => {
          //  },5000)
        } else {
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: 'Username or Password is incorrect',
              })
            : ToastAndroid.show('Username or Password is incorrect', ToastAndroid.SHORT);
          setForLoading(false);
        }
      }
    } catch (err) {
      setForLoading(false);
      console.log(err);
    }
  };

  const getDeviceIDData = prevData => {
    axios
      .get(`${API}/devicecheck/${prevData?.user_id}}`)
      .then(res => {
        console.log(res.data, 'tt');
        if (res.data.status == 'True') {
          dispatch(setDeviceId(res.data.message));
          getPlanCurrent(prevData?.user_id);
        } else {
          dispatch(setDeviceId(res.data.message));
          packagePlans(res.data?.locationid);
          // fetchGraphData(res.data?.user_id);
          // fetchWeekGraphData(res.data?.user_id);
          // fetchMonthGraphData(res.data?.user_id);
          // fetchQuarterGraphData(res.data.user_id);
          // fetchYearGraphData(res.data?.user_id);
          // fetchBoxTwoDashboardData(res.data?.user_id);
          // fetchStatusdata(res.data?.user_id);
          // getPlanCurrent(res.data?.user_id);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //day data start
  const fetchGraphData = userID => {
    console.log(userID, 'object');
    axios
      .get(`${API}/dailyusagegraph/${userID}`)
      .then(res => {
        console.log("DAY GRAPH", res.data)
        dispatch(setGraphData(res?.data));

        dailyUsuagekwh(userID);
        // navigation.navigate('DrawerStack');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const dailyUsuagekwh = userId => {
    axios
      .get(`${API}/dailyusage/${userId}`)
      .then(res => {
        if (res?.data) {
          dispatch(setKwhData(res?.data));
        }

        remainigUsuageData(userId);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const remainigUsuageData = userId => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${userId}`)
      .then(res => {
        if (res.data?.kwh_unit_remaining >= 0) {
          remaingData = res.data?.kwh_unit_remaining;
          dispatch(setOverUsage(false));
        } else {
          remaingData = res.data?.kwh_unit_overusage;
          dispatch(setOverUsage(true));
        }
        console.log('first', res.data);
        dispatch(setRemainingData(remaingData));
        setForLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //day data end

  //week data start
  const fetchWeekGraphData = userID => {
    axios
      .get(`${API}/weeklyusage/${userID}`)
      .then(res => {
        if (res?.data) {
          console.log("WEEKGRAPHDATA", res.data)
          dispatch(setWeekGraphData(res?.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const fetchMonthGraphData = userID => {
    axios
      .get(`${API}/monthlyusage/${userID}`)
      .then(res => {
        if (res?.data) {
          console.log("MONTH GRAPH", res.data)
          dispatch(setMonthGraphData(res?.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const fetchQuarterGraphData = userID => {
    axios
      .get(`${API}/threemonthusage/${userID}`)
      .then(res => {
        if (res?.data) {
          console.log("QUARTER GRAPH", res.data)
          dispatch(setQuarterGraphData(res?.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const fetchYearGraphData = userID => {
    axios
      .get(`${API}/yearlyusage/${userID}`)
      .then(res => {
        if (res?.data) {
          console.log("Year GRAPH", res.data)
          dispatch(setYearGraphData(res?.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchBoxTwoDashboardData = userId => {
    axios
      .get(`${API}/currentplan/${userId}`)
      .then(res => {
        dispatch(setBoxTwoDataForDashboard(res?.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
  const fetchStatusdata = userId => {
    axios
      .get(`${API}/chargerstatus/${userId}`)
      .then(res => {
        dispatch(setChargerStatus(res?.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getPlanCurrent = userId => {
    setForLoading(true);
    axios
      .get(`${API}/currentplan/${userId}`)
      .then(res => {
        setForLoading(false);

        dispatch(setPurchaseData(res?.data));
        // dispatch(setIsAuthorized(true));
        navigation.navigate('DrawerStack');
      })
      .catch(err => {
        setForLoading(false);
        console.log(err);
      });
  };
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
      <KeyboardAvoidingView behavior="position" style={{marginTop: 10}}>
        {forLoading ? <ActivityLoader /> : ''}
        <Image
          source={require('../../../assets/images/log.png')}
          resizeMode="contain"
          style={{width: mobileW, height: mobileW * 0.7}}
        />
        <View style={styles.login_css}>
          <Text style={styles.login}>Login</Text>

          <Input
            IconLeft={null}
            errors={undefined}
            touched={false}
            value={email}
            onChangeText={text => setEmail(text)}
            text="Email"
            IconRight={() => <Message />}
            mV={20}
            placeholder="Enter your Email"
            bW={1}
            textWidth={'22%'}
            placeholderTextColor={COLORS.BLACK}
            autoCapitalize="none"
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
            <Image
              source={require('../../../assets/images/lock_two.png')}
              resizeMode="contain"
              style={{width: 18, height: 18}}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
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
            <TouchableOpacity
              onPress={() =>
                // navigation.navigate('VerifyEmail', {
                navigation.navigate('Register', {
                  email: 'email',
                  user_id: 'user_id',
                })
              }>
              <Text style={styles.sign_up}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
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
    marginTop: 30,
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