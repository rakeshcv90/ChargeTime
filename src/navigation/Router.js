import React, {useEffect, useState} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import VerifyEmail from '../screens/register/VerifyEmail';
import {Image, View, StyleSheet} from 'react-native';
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
import PersonalDetails from '../screens/accounts/PersonalDetails';
import Security from '../screens/accounts/Security';
import Installation from '../screens/accounts/Installation';
import Theme from '../screens/accounts/Theme';
import Subscription from '../screens/accounts/Subscription';
import deleteAccount from '../screens/accounts/deleteAccount';
import EnergyStats from '../screens/EnergyStats';
import { useSelector } from 'react-redux';
import PaymentGateWay from '../screens/payment/PaymentGateWay';
// import HomeOne from '../screens/downgrade/HomeOne';
// import Plan from '../screens/planSummary/Plan';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false, // Hide the header for all screens
};

const DrawerNavigation = () => {
  const [focus, setFocus] = useState();
  const [focusOne, setFocusOne] = useState();
  const getPackageStatus  = useSelector((state) => state.getPackageStatus)

  // console.log('object',getPackageStatus)


  return (
    <Drawer.Navigator
    initialRouteName={+getPackageStatus !== true ?  'HomeStack':"EnergyStats"}
      screenOptions={{headerShown: false}}
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',
          drawerIcon: ({focused, color, size}) => {
            setFocus(focused);
            return (
              <Image
                source={
                  !focused
                    ? require('../../assets/images/testing.png')
                    : require('../../assets/images/green_account.png')
                }
                style={{width: 50, height: 40, margin: -10}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: focus ? 'rgba(177, 211, 79, 0.8)' : '#fff',
            paddingVertical: 10,
            paddingLeft: 10,
            width: '200%',
            marginLeft: -15,
          },
          drawerActiveTintColor: 'black',
          title: 'Home',
        }}
        name="HomeStack"
        component={HomeStack}
      />

      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',
          drawerIcon: ({focused, color, size}) => {
            setFocusOne(focused);
            return (
              <Image
                source={
                  !focused
                    ? require('../../assets/images/testing.png')
                    : require('../../assets/images/green_account.png')
                }
                style={{width: 50, height: 40, padding: 0, margin: -10}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: focusOne ? 'rgba(177, 211, 79, 0.8)' : '#fff',
            paddingVertical: 10,
            paddingLeft: 10,
            width: '200%',
            marginLeft: -15,
          },
          drawerActiveTintColor: 'black',
          title: 'Account',
        }}
        name="AccountStack"
        component={AccountStack}
      />
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',
          drawerIcon: ({focused, color, size}) => {
            setFocusOne(focused);
            return (
              <Image
                source={
                  !focused
                    ? require('../../assets/images/testing.png')
                    : require('../../assets/images/green_account.png')
                }
                style={{width: 50, height: 40, padding: 0, margin: -10}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: focusOne ? 'rgba(177, 211, 79, 0.8)' : '#fff',
            paddingVertical: 10,
            paddingLeft: 10,
            width: '200%',
            marginLeft: -15,
          },
          drawerActiveTintColor: 'black',
          title: 'EnergyStats',
        }}
        name="EnergyStats"
        component={EnergyStats}
      />
      {/* <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',
          drawerIcon: ({focused, color, size}) => {
            // setFocusOne(focused);
            return (
              <Image
                source={
                  !focused
                    ? require('../../assets/images/testing.png')
                    : require('../../assets/images/green_account.png')
                }
                style={{width: 50, height: 40, padding: 0, margin: -10}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor:  'rgba(177, 211, 79, 0.8)' ,
            paddingVertical: 10,
            paddingLeft: 10,
            width: '200%',
            marginLeft: -15,
          },
          drawerActiveTintColor: 'black',
          title: 'HomeOne',
        }}
        name="HomeOne"
        component={HomeOne}
      /> */}
      
    </Drawer.Navigator>
  );
};
const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={Login} />
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
const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Installation" component={Installation} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="Theme" component={Theme} />
      <Stack.Screen name="deleteAccount" component={deleteAccount} />
    </Stack.Navigator>
  );
};

export default function Router() {
  

  const [isAuthorized, setIsAuthorized] = useState(false);
  let loginDataString;
  const getLocationID  = useSelector((state) => state.getLocationID)
  const getPackageStatus = useSelector((state) => state.getPackageStatus)
  const getUserID  = useSelector((state) => state.getUserID)
  
  // console.log(getLocationId,"getLocationId")
  // let locationId;

  // useEffect(() => {
  //   retrieveLoginData();
  // }, []);
  // const retrieveLoginData = async () => {
  //   try {
  //     //loginDataString = await AsyncStorage.getItem('loginDataOne');

  //     if (loginDataString !== null) {
  //       const loginData = JSON.parse(loginDataString);
  //       setIsAuthorized(true);
  //       console.log('Retrieved login data: ', loginDataString);
  //     }
  //   } catch (error) {
  //     console.log('Error retrieving login data: ', error);
  //     // setIsAuthorized(false);
  //   }
  // };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {getLocationID == 0 ? (
        <>
          <Stack.Screen name="LoginStack" component={LoginStack} />
        </>
      ) : (
        <>
          <Stack.Screen name="DrawerStack" component={DrawerNavigation} />
        </>
      )}
    </Stack.Navigator>
  );
}