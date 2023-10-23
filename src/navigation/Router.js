/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  DrawerActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import VerifyEmail from '../screens/register/VerifyEmail';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Text,
  Dimensions,
  ToastAndroid,
  Animated,
} from 'react-native';
import CompleteProfile from '../screens/register/CompleteProfile';
import Home from '../screens/purchasePlan/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ForgetPassword from '../screens/register/ForgetPassword';
import Account from '../screens/accounts/Account';
import ResetPassword from '../screens/register/ResetPassword';
import Toast from 'react-native-toast-message';
import CustomDrawerContent from './CustomDrawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlanSummary from '../screens/purchasePlan/PlanSummary';
import Testing from '../screens/testing/Testing';
import Payment from '../screens/accounts/Payment';

import Security from '../screens/accounts/Security';
import Installation from '../screens/accounts/Installation';
import Theme from '../screens/accounts/Theme';
import Subscription from '../screens/accounts/Subscription';
import deleteAccount from '../screens/accounts/deleteAccount';
import EnergyStats from '../screens/EnergyStats';
import {useDispatch, useSelector} from 'react-redux';
import PaymentGateWay from '../screens/payment/PaymentGateWay';
import Splash from '../splash/Splash';
import Introduction from '../splash/Introduction';
import HomeOne from '../screens/downgrade/HomeOne';
import UpgradeData from '../screens/downgrade/DownGradeData';
import DownGradeData from '../screens/downgrade/DownGradeData';
import ContactUs from '../screens/drawerPart/ContactUs';
import Privacy from '../screens/drawerPart/Privacy';
import Terms from '../screens/drawerPart/Terms';
import Charging from '../Components/Charging';
import {OnlineCharge} from '../../assets/images/OnlineCharge';
import {NoCharge} from '../../assets/images/NoCharge';
import COLORS from '../constants/COLORS';
import {DIMENSIONS, PLATFORM_IOS} from '../constants/DIMENSIONS';
import Contact from '../screens/accounts/Contact';
import ForDownGrade from '../Components/ForDownGrade';
import PersonalDetails from '../screens/accounts/PersonalDetails';
import {CommonActions} from '@react-navigation/native';
import {persistor} from '../redux/store';
import axios from 'axios';
import {API} from '../api/API';
import {setLogout} from '../redux/action';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  gestureEnabled: false, // Hide the header for all screens
};
export const DrawerScreenPart = ({navigation}) => {
  const getEmailData = useSelector(state => state.getEmailData);
  useEffect(() => {
    handleLinkPress();
  }, []);

  const handleLinkPress = () => {
    // Handle the link press action here
    // For example, navigate to a different screen

    Linking.openURL(`mailto:${getEmailData}`);
    // Close the drawer after the navigation
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View>
      {/* Drawer content */}
      <TouchableOpacity onPress={handleLinkPress}>
        <Text />
      </TouchableOpacity>
    </View>
  );
};
export const ChargerStatus = ({navigation}) => {
  const user_ID = useSelector(state => state.getUserID);
  const dispatch = useDispatch();
  
  const handleLogOut = async () => {
    try {
      const res = await axios(`${API}/logout/${user_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.data.message == 'Your account is successfully logout') {
        // PLATFORM_IOS
        //   ? Toast.show({
        //       text1: res.data.message,

        //       position: 'bottom',
        //       type: 'success',
        //       duration: 500,
        //     })
        //   : ToastAndroid.show(res.data.message, ToastAndroid.SHORT);

        await AsyncStorage.clear();
        await persistor.purge();
        dispatch(setLogout());

        
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Login',
              },
            ],
          }),
        );
      }
    } catch (err) {
      console.log('Error', err);

      await AsyncStorage.clear();
      await persistor.purge();
      dispatch(setLogout());
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [
      //       {
      //         name: 'Login',
      //       },
      //     ],
      //   }),
      // );
    }
  };
  return (
    <>
      <TouchableOpacity onPress={handleLogOut()}></TouchableOpacity>
      <View style={styles.container}>
        <Image
          style={[
            styles.splash_image,
            {
              // transform: [{scale: scaleValue}],
              width: DIMENSIONS.SCREEN_WIDTH * 0.8,
            },
          ]}
          source={require('../../assets/unnamed.png')}
        />
        <Image
          source={require('../../assets/images/splash_screen_bottom.png')}
          style={styles.splash_botm_image}
        />
      </View>
    </>
  );
};
const DrawerNavigation = () => {
  const [focus, setFocus] = useState();
  const [focusOne, setFocusOne] = useState();
  const [focusTwo, setFocusTwo] = useState();
  const {getPackageStatus, getChargerStatus, getDeviceID} = useSelector(
    state => state,
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get('window').width / 1.65,
        },
        gestureEnabled: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {getPackageStatus ? (
        <>
          <Drawer.Screen
            options={{
              drawerActiveBackgroundColor: '#fff',
              drawerIcon: ({focused, color, size}) => {
                setFocus(focused);
                return (
                  <Image
                    resizeMode="cover"
                    source={
                      !focused
                        ? require('../../assets/images/NewHome1.png')
                        : require('../../assets/images/NewHome.png')
                    }
                    style={{width: 35, height: 25}}
                  />
                );
              },
              drawerItemStyle: {
                marginHorizontal: -7,
              },
              drawerLabelStyle: {
                backgroundColor: focus
                  ? 'rgba(177, 211, 79, 0.8)'
                  : 'rgba(255, 255, 255, 0)',
                paddingVertical: 10,
                paddingLeft: 10,
                width: '200%',
                // marginTop: -20,
                marginLeft: -30,
                color: 'black',
                fontWeight: '700',
                borderRadius: 5,

                overflow: 'hidden',
              },
              drawerActiveTintColor: 'black',
              title: 'Home',
            }}
            name="EnergyStats"
            component={EnergyStats}
          />
          <Drawer.Screen
            options={{
              drawerItemStyle: {
                marginHorizontal: -7,
              },
              drawerActiveBackgroundColor: '#fff',
              drawerIcon: ({focused, color, size}) => {
                setFocusOne(focused);
                return (
                  <Image
                    source={
                      !focused
                        ? require('../../assets/images/NewEnergy1.png')
                        : require('../../assets/images/NewEnergy.png')
                    }
                    style={{width: 35, height: 25}}
                  />
                );
              },
              drawerLabelStyle: {
                backgroundColor: focusOne
                  ? 'rgba(177, 211, 79, 0.8)'
                  : 'rgba(255, 255, 255, 0)',
                paddingVertical: 10,
                paddingLeft: 10,
                width: '200%',
                color: 'black',
                fontWeight: '700',
                marginLeft: -30,

                borderRadius: 5,

                overflow: 'hidden',
              },
              drawerActiveTintColor: 'black',
              title: 'Energy',
            }}
            name="EnergyOptions"
            component={HomeOne}
          />
        </>
      ) : (
        <Drawer.Screen
          options={{
            drawerActiveBackgroundColor: '#fff',
            drawerIcon: ({focused, color, size}) => {
              setFocus(focused);
              return (
                <Image
                  resizeMode="cover"
                  source={
                    !focused
                      ? require('../../assets/images/NewHome1.png')
                      : require('../../assets/images/NewHome.png')
                  }
                  style={{width: 35, height: 25}}
                />
              );
            },
            drawerItemStyle: {
              marginHorizontal: -7,
            },
            drawerLabelStyle: {
              backgroundColor: focus
                ? 'rgba(177, 211, 79, 0.8)'
                : 'rgba(255, 255, 255, 0)',
              paddingVertical: 10,
              paddingLeft: 10,
              width: '200%',
              color: 'black',
              fontWeight: '700',
              marginLeft: -30,

              borderRadius: 5,

              overflow: 'hidden',
            },
            drawerActiveTintColor: 'black',
            title: 'Home',
          }}
          name="HomeStack"
          component={HomeStack}
        />
      )}

      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',
          drawerItemStyle: {
            marginTop: -5,
            marginHorizontal: -9,
          },
          drawerIcon: ({focused, color, size}) => {
            setFocusTwo(focused);
            return (
              <Image
                source={
                  !focused
                    ? require('../../assets/images/NewAccount1.png')
                    : require('../../assets/images/NewAccount.png')
                }
                style={{width: 40, height: 25}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: focusTwo
              ? 'rgba(177, 211, 79, 0.8)'
              : 'rgba(255, 255, 255, 0)',
            paddingVertical: 10,
            paddingLeft: 10,
            width: '200%',
            color: 'black',
            fontWeight: '700',
            marginLeft: -30,
            borderRadius: 5,

            overflow: 'hidden',
          },
          drawerActiveTintColor: 'black',
          title: 'Account',
        }}
        name="AccountStack"
        component={Account}
      />

      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',

          drawerIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../../assets/images/contact_us.png')}
                resizeMode="stretch"
                style={{width: 20, height: 20, margin: -7}}
              />
            );
          },
          drawerItemStyle: {
            marginTop: (DIMENSIONS.SCREEN_HEIGHT * 15) / 100,
            marginLeft: (DIMENSIONS.SCREEN_WIDTH * 4) / 100,
          },
          drawerLabelStyle: {
            backgroundColor: '#fff',
            marginLeft: -10,
            color: 'black',
            fontWeight: '700',
          },
          drawerActiveTintColor: 'black',
          //title: 'Contact Us',
        }}
        name="Contact"
        component={Contact}
      />

      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',

          drawerIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../../assets/images/privacy.png')}
                resizeMode="stretch"
                style={{width: 17, height: 17, padding: 0}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: '#fff',
            marginLeft: -17,
            color: 'black',
            fontWeight: '700',
          },
          drawerActiveTintColor: 'black',
        }}
        name="Privacy Policy"
        component={Privacy}
      />
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',
          drawerIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../../assets/images/terms.png')}
                resizeMode="stretch"
                style={{width: 17, height: 17, padding: 0}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: '#fff',
            marginLeft: -17,
            color: 'black',
            fontWeight: '700',
          },
          drawerActiveTintColor: 'black',
        }}
        name="Terms & Conditions"
        component={Terms}
      />
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',
          drawerIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../../assets/images/logout.png')}
                resizeMode="stretch"
                style={{width: 17, height: 17, padding: 0}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: '#fff',
            marginLeft: -17,
            color: 'black',
            fontWeight: '700',
          },
          drawerActiveTintColor: 'black',
        }}
        name="Log Out"
        component={ChargerStatus}
      />
      {getDeviceID !==
        'Your Account is not currently linked with a TRO Charger. Please contact customer service if you believe this is an error.' &&
        getPackageStatus && (
          <Drawer.Screen
            options={{
              drawerActiveBackgroundColor: '#fff',
              gestureEnabled: false,
              drawerItemStyle: {
                marginTop: (DIMENSIONS.SCREEN_HEIGHT * 3) / 100,
                marginLeft: (DIMENSIONS.SCREEN_HEIGHT * 3) / 100,
              },
              headerInteractionEnabled: false,
              drawerIcon: ({focused, color, size}) => {
                let iconComponent = null;

                if (getChargerStatus?.message === 'Charging') {
                  iconComponent = <Charging />;
                } else if (getChargerStatus?.message === 'Online') {
                  iconComponent = (
                    <OnlineCharge style={{marginTop: 10, marginLeft: 5}} />
                  );
                } else if (getChargerStatus?.message === 'Offline') {
                  iconComponent = (
                    <NoCharge style={{marginTop: 10, marginLeft: 5}} />
                  );
                }

                return getChargerStatus.message !== 'Charging' ? (
                  <View
                    style={{
                      // margin: 20,
                      backgroundColor: COLORS.WHITE,
                      height: (DIMENSIONS.SCREEN_HEIGHT * 7) / 100,
                      width: (DIMENSIONS.SCREEN_WIDTH * 16) / 100,

                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',

                      shadowColor: '#000',
                      shadowOffset: {
                        width: -5,
                        height: 3,
                      },
                      shadowOpacity: 0.29,
                      shadowRadius: 4.65,
                      elevation: 7,
                    }}>
                    {iconComponent}
                  </View>
                ) : (
                  <View
                    style={{
                      marginLeft: -25,
                      shadowColor: '#000',
                      // shadowOffset: {
                      //   width: -5,
                      //   height: 3,
                      // },
                      // shadowOpacity: 0.29,
                      // shadowRadius: 4.65,
                      // elevation: 7,
                    }}>
                    {iconComponent}
                  </View>
                );
              },
              drawerLabelStyle: {
                backgroundColor: '#fff',
              },
              drawerActiveTintColor: 'black',
            }}
            name={getChargerStatus?.message == 'Online' ? 'Online' : 'Offline'}
            component={EnergyStats}
          />
        )}
    </Drawer.Navigator>
  );
};
const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Introduction" component={Introduction} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="DrawerStack" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PlanSummary" component={PlanSummary} />
      <Stack.Screen name="PaymentGateWay" component={PaymentGateWay} />
    </Stack.Navigator>
  );
};
// const MainStack = () => {
//   return (
//     <Stack.Navigator screenOptions={screenOptions}>
//       <Stack.Screen name="DrawerStack" component={DrawerNavigation} />
//       <Stack.Screen name="LoginStack" component={LoginStack} />
//       <Stack.Screen name="HomeStack" component={HomeStack} />
//       <Stack.Screen name="AccountStack" component={AccountStack} />
//       <Stack.Screen name="EnergyOptions" component={EnergyOptions} />
//     </Stack.Navigator>
//   );
// };

// const EnergyOptions = () => {
//   return (
//     <Stack.Navigator screenOptions={screenOptions}>
//       <Stack.Screen name="HomeOne" component={HomeOne} />
//       <Stack.Screen name="DownGradeData" component={ForDownGrade} />
//       <Stack.Screen name="PaymentGateWay" component={PaymentGateWay} />
//       {/* <Stack.Screen name="PlanSummary" component={PlanSummary} /> */}
//     </Stack.Navigator>
//   );
// };
// const AccountStack = () => {
//   return (
//     <Stack.Navigator screenOptions={screenOptions}>
//       <Stack.Screen name="Account" component={Account} />
//       <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
//       <Stack.Screen name="Security" component={Security} />
//       <Stack.Screen name="Installation" component={Installation} />
//       <Stack.Screen name="Payment" component={Payment} />
//       <Stack.Screen name="Subscription" component={Subscription} />
//       <Stack.Screen name="Theme" component={Theme} />
//       <Stack.Screen name="Contact" component={Contact} />
//       <Stack.Screen name="deleteAccount" component={deleteAccount} />
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="LoginStack" component={LoginStack} />

//       {/* <Stack.Screen name="DrawerStack" component={DrawerNavigation} /> */}
//       <Stack.Screen name="Home" component={HomeStack} />
//       <Stack.Screen name="PaymentGateWay" component={PaymentGateWay} />

//       <Stack.Screen name="PlanSummary" component={PlanSummary} />

//       <Stack.Screen name="Privacy Policy" component={Privacy} />
//     </Stack.Navigator>
//   );
// };

export default function Router() {
  // const [isAuthorized, setIsAuthorized] = useState(false);
  // let loginDataString;
  // const getLocationID = useSelector(state => state.getLocationID);
  // const getPackageStatus = useSelector(state => state.getPackageStatus);
  const {isAuthorized} = useSelector(state => state);

  useEffect(() => {
    checkLogin();
  }, []);
  let id;
  const checkLogin = async () => {
    id = await AsyncStorage.getItem('locationID');
  };

  let isFirstTime, authorized;

  useEffect(() => {
    retrieveLoginData();
  }, []);
  const retrieveLoginData = async () => {
    try {
      //loginDataString = await AsyncStorage.getItem('loginDataOne');
      isFirstTime = await AsyncStorage.getItem('isFirstTime');

      authorized = await AsyncStorage.getItem('isAuthorized');

      // if (loginDataString !== null) {
      //   const loginData = JSON.parse(loginDataString);
      //   setIsAuthorized(true);
      //   console.log('Retrieved login data: ', loginDataString);
      // }
    } catch (error) {
      console.log('Error retrieving login data: ', error);
      // setIsAuthorized(false);
    }
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="LoginStack" component={LoginStack} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PlanSummary" component={PlanSummary} />
      <Stack.Screen name="PaymentGateWay" component={PaymentGateWay} />
      <Stack.Screen name="HomeOne" component={HomeOne} />

      <Stack.Screen name="DownGradeData" component={ForDownGrade} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Installation" component={Installation} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="Theme" component={Theme} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="deleteAccount" component={deleteAccount} />
      {/* <Stack.Screen name="Login" component={Login} /> */}

      <Stack.Screen name="Privacy Policy" component={Privacy} />
      {/* <Stack.Screen name="DrawerStack" component={DrawerNavigation} /> */}

      {/* <Stack.Screen name="LoginStack" component={LoginStack} /> */}

      {/* {!isAuthorized ? (
        <>
          <Stack.Screen name="LoginStack" component={LoginStack} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainStack" component={MainStack} />
        </>
      )} */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: COLORS.CREAM,
    flex: 1,
  },
  splash_image: {
    position: 'absolute',
    width: 200,
    height: 150,
    // left: 83,
    alignSelf: 'center',
    resizeMode: 'contain',
    top: 141,
  },
  splash_botm_image: {
    position: 'absolute',
    width: DIMENSIONS.SCREEN_WIDTH * 1,
    height: 212.85,
    top: 459,
  },
});
