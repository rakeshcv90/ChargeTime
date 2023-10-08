/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */

/* eslint-disable prettier/prettier */

/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
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
import notifee, {EventType} from '@notifee/react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../../constants/COLORS';
import Toast from 'react-native-toast-message';
import {API} from '../../api/API';
import Input from '../../Components/Input';
import {DIMENSIONS, PLATFORM_IOS} from '../../constants/DIMENSIONS';
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
  setSubscriptionStatus,
  setMaintainence,
} from '../../redux/action';
import axios from 'axios';
import {navigationRef} from '../../../App';
import messaging from '@react-native-firebase/messaging';
import {ms} from 'react-native-size-matters';
import {Alert, PermissionsAndroid} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [forLoading, setForLoading] = useState(false);
  const [token1, setToken] = useState('');
  const [id, setId] = useState();

  const dispatch = useDispatch();
  const {getDeviceID, getGraphData, getUserID} = useSelector(state => state);

  useEffect(() => {
    let unsubscribe = null;
    let token = 0;
    const notificationService = async () => {
      if (Platform.OS == 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        await messaging().registerDeviceForRemoteMessages();
        token = await messaging().getToken();
      } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          await messaging().registerDeviceForRemoteMessages();
          token = await messaging().getToken();
        }
      }

      if (token?.length > 0) {
        console.log('FCM....', token);
        setToken(token);
      }
    };

    if (Platform.OS === 'android') {
      notificationService();
    } else {
      notificationService();
    }
  }, []);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
  }, []);
  const handleBackButton = () => {
    return true;
  };

  const packagePlans = async locationID => {
    //  loginData = await AsyncStorage.getItem('loginDataOne');

    try {
      const response = await axios.get(`${API}/packagePlan/${locationID}`);

      if (response?.data?.locations.length == 0) {
        setForLoading(true);
        // setShowPackage(true);
        dispatch(setBasePackage([]));
        // dispatch(setIsAuthorized(true));
        setForLoading(false);
        navigationRef.navigate('DrawerStack');
      } else {
        dispatch(setBasePackage(response.data.locations));
        // dispatch(setIsAuthorized(true));
        setForLoading(false);
        navigationRef.navigate('DrawerStack');
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
          device_token: token1,
          notification_status: 'true',
        },
      });
      if (res.data) {
        // AsyncStorage.setItem('loginDataOne', JSON.stringify(data.locationid ));
        if (res.data.splash_notification == 0) {
          if (res.data.message == 'Login Successfull') {
            dispatch(setUserID(res.data?.user_id));
            setId(res.data?.user_id);

            AsyncStorage.setItem(
              'locationID',
              JSON.stringify(res.data?.locationid),
            );
            AsyncStorage.setItem('userId', JSON.stringify(res.data?.user_id));
            AsyncStorage.setItem('graph_Width', JSON.stringify(1032));
            PLATFORM_IOS
              ? Toast.show({
                  type: 'success',
                  text1: 'Login Successful',
                })
              : ToastAndroid.show('Login Successful', ToastAndroid.SHORT);

            // if(data.status == "true"){
            //   navigation.navigate('EnergyStats');
            // }else if(data.status == "false"){
            // setTimeout(() => {
            // }, 15000);
            // }
            await AsyncStorage.setItem('isAuthorized', res.data.user_id + '');
            if (res.data.status == 'All details available') {
              dispatch(setEmailData(res.data?.email));
              dispatch(setPackageStatus(true));
              // dispatch(setUserID(res.data?.user_id));
              dispatch(getLocationID(res.data?.locationid));

              // setInterval(() => {
              fetchGraphData(res.data?.user_id);
              // }, 300000);

              // fetchWeekGraphData(res.data?.user_id);
              // fetchMonthGraphData(res.data?.user_id);
              // fetchQuarterGraphData(res.data.user_id);
              // fetchYearGraphData(res.data?.user_id);

              // setTimeout(() => {
              //   fetchMessage(res.data?.user_id);
              // }, 15000);
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
              dispatch(setIsAuthorized(true));
              getPlanCurrent(res.data?.user_id);
              dispatch(
                setDeviceId(
                  'Your Account is not currently linked with a TRO Charger. Please contact customer service if you believe this is an error.',
                ),
              );
            } else {
              //  dispatch(setPackageStatus(false));
              dispatch(setDeviceId(res.data.message));
              dispatch(setIsAuthorized(true));
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
                  text1: 'Username or Password is Incorrect',
                })
              : ToastAndroid.show(
                  'Username or Password is Incorrect',
                  ToastAndroid.SHORT,
                );
            setForLoading(false);
          }
        } else {
          dispatch(setMaintainence(true));
          setForLoading(false);
          console.log("dvfdsfdsfd22222",res.data)
        }
      }
    } catch (err) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Network failed! Please check your internet connection.',
          })
        : ToastAndroid.show(
            'Network failed!Please check your internet connection.ß',
            ToastAndroid.SHORT,
          );
      setForLoading(false);
      console.log('Error-1', err);
    }
  };

  //day data start
  const fetchGraphData = userID => {
    const message = 'No usage data available';
    axios
      .get(`${API}/dailyusagedeviceid/${userID}`)
      .then(res => {
        dispatch(setGraphData(res.data.Dayusagewithgraph));
        dispatch(setWeekGraphData(res.data.weeklyusagewithgraph));
        dispatch(setMonthGraphData(res?.data.monthlyusagewithgraph));
        dispatch(setQuarterGraphData(res?.data.threemonthusagewithgraph));
        dispatch(setYearGraphData(res?.data.yearlyusagewithgraph));

        dailyUsuagekwh(userID);
        fetchBoxTwoDashboardData(userID);
        fetchStatusdata(userID);
        getPlanCurrent(userID);
        // navigation.navigate('DrawerStack');
      })
      .catch(err => {
        dispatch(setGraphData({message}));
        dispatch(setWeekGraphData({message}));
        dispatch(setMonthGraphData({message}));
        dispatch(setQuarterGraphData({message}));
        dispatch(setYearGraphData({message}));

        getPlanCurrent(userID);
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
        console.log('Error-2', err);
      });
  };
  const remainigUsuageData = userId => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${userId}`)
      .then(res => {
        if (res.data?.kwh_unit_remaining > 0) {
          remaingData = res.data?.kwh_unit_remaining;
          dispatch(setOverUsage(false));
        } else {
          remaingData = res.data?.kwh_unit_overusage;

          dispatch(setOverUsage(true));
        }
        dispatch(setRemainingData(remaingData));
        setForLoading(false);
      })
      .catch(err => {
        console.log('Error-3', err);
      });
  };

  const fetchBoxTwoDashboardData = userId => {
    axios
      .get(`${API}/currentplan/${userId}`)
      .then(res => {
        if (res.data.data == 'Package details not found') {
          dispatch(setBoxTwoDataForDashboard(res.data));
        } else {
          dispatch(setBoxTwoDataForDashboard(res?.data));
        }
      })
      .catch(err => {
        console.log('Error-4', err);
      });
  };
  const fetchStatusdata = userId => {
    axios
      .get(`${API}/chargerstatus/${userId}`)
      .then(res => {
        getSubscriptionStatus(userId);

        dispatch(setChargerStatus(res?.data));
      })
      .catch(err => {
        console.log('Error-5', err);
      });
  };
  const getPlanCurrent = userId => {
    setForLoading(true);
    axios
      .get(`${API}/currentplan/${userId}`)
      .then(res => {
        setForLoading(false);
        getSubscriptionStatus(userId);
        dispatch(setPurchaseData(res?.data));
        navigation.navigate('DrawerStack');
        dispatch(setIsAuthorized(true));
      })
      .catch(err => {
        setForLoading(false);
        navigation.navigate('DrawerStack');
        dispatch(setIsAuthorized(true));
        console.log('Error-6', err);
      });
  };
  const getSubscriptionStatus = data => {
    axios
      .get(`${API}/planstatuspauseresume/${data}/`)
      .then(res => {
        dispatch(setSubscriptionStatus(res.data.PlanStatus));
      })
      .catch(err => {
        console.log('Error-7', err);
      });
  };
  const sendToForgetpassword = () => {
    Clipboard.setString('');
    navigation.navigate('ForgetPassword');
  };
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
            textWidth={ms(45)}
            placeholderTextColor={COLORS.HALFBLACK}
            autoCapitalize="none"
          />

          <Input
            IconLeft={null}
            errors={undefined}
            touched={false}
            placeholderTextColor={COLORS.HALFBLACK}
            text="Password"
            passwordInput={true}
            pasButton={() => setShowPassword(!showPassword)}
            secureTextEntry={showPassword}
            passwordInputIcon={showPassword}
            onChangeText={text => setPassword(text)}
            value={password}
            mV={5}
            placeholder="Enter your password "
            bW={1}
            textWidth={ms(66)}
          />
          <View style={styles.main_div_lock_img}>
            <Image
              source={require('../../../assets/images/lock_two.png')}
              resizeMode="contain"
              style={{width: 18, height: 18}}
            />
            <TouchableOpacity onPress={() => sendToForgetpassword()}>
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
