import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

import  Toast  from 'react-native-toast-message';
import Router from './src/navigation/Router';

import React, { useEffect } from 'react';
import { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Login from './src/screens/login/Login';
import Register from './src/screens/register/Register';
import VerifyEmail from './src/screens/register/VerifyEmail';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import home_icon from './assets/images/home_icon.png';
import cross_sign from './assets/images/cross_sign.png';
import CompleteProfile from './src/screens/register/CompleteProfile';
import Home from './src/screens/purchasePlan/Home';
import { Logo } from './assets/images/Logo';
import { Text } from 'react-native-svg';
import ForgetPassword from './src/screens/register/ForgetPassword';
import Account from './src/screens/accounts/Account';
import ResetPassword from './src/screens/register/ResetPassword';
import Payment from './src/screens/accounts/Payment';
import PersonalDetails from './src/screens/accounts/PersonalDetails';
import Security from './src/screens/accounts/Security';
import Installation from './src/screens/accounts/Installation';
import Theme from './src/screens/accounts/Theme';
import Subscription from './src/screens/accounts/Subscription';
import SplashScreen from 'react-native-splash-screen';
import deleteAccount from './src/screens/accounts/deleteAccount';



 function App() {
  const Drawer = createDrawerNavigator();
 const navigationRef = useRef();
 
 useEffect(() => {
  SplashScreen.hide(); 
}, []);


  const CustomDrawerContent = (props) => {
    const { navigation } = props;


export const navigationRef = createNavigationContainerRef();
export default function App() {
 

  return (

    <>
    <NavigationContainer ref={navigationRef}>
      <Router />

    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown:false }}
        drawerContent={CustomDrawerContent}
       
      >
        <Drawer.Screen
          options={{
            drawerActiveBackgroundColor: 'rgba(177, 211, 79, 0.5)',
            drawerActiveTintColor: 'black',
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/images/home.png')}
                style={{ width: size, height: size }}
              />
            ),
          }}
          name="Login"
          component={Login}
        />
        <Drawer.Screen
          options={{
            drawerActiveBackgroundColor: 'rgba(177, 211, 79, 0.5)',
            drawerActiveTintColor: 'black',
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/images/energy.png')}
                style={{ width: size, height: size }}
              />
            ),
          }}
          name="Register"
          component={Register}
        />
        <Drawer.Screen
          options={{
            drawerActiveBackgroundColor: 'rgba(177, 211, 79, 0.5)',
            drawerActiveTintColor: 'black',
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/images/account.png')}
                style={{ width: size, height: size }}
              />
            ),
          }}
          name="VerifyEmail"
          component={VerifyEmail}
        />
        <Drawer.Screen
          options={{
            drawerActiveBackgroundColor: 'rgba(177, 211, 79, 0.5)',
            drawerActiveTintColor: 'black',
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/images/account.png')}
                style={{ width: size, height: size }}
              />
            ),
          }}
          name="Account"
          component={Account}
        />
        <Drawer.Screen
          options={{
            drawerActiveBackgroundColor: 'rgba(177, 211, 79, 0.5)',
            drawerActiveTintColor: 'black',
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/images/account.png')}
                style={{ width: size, height: size }}
              />
            ),
          }}
          name="CompleteProfile"
          component={CompleteProfile}
        />
        <Drawer.Screen
          options={{
            drawerActiveBackgroundColor: 'rgba(177, 211, 79, 0.5)',
            drawerActiveTintColor: 'black',
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/images/account.png')}
                style={{ width: size, height: size }}
              />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerActiveBackgroundColor: 'rgba(177, 211, 79, 0.5)',
            drawerActiveTintColor: 'black',
            drawerIcon: ({ focused, color, size }) => (
              <Image
                source={require('./assets/images/account.png')}
                style={{ width: size, height: size }}
              />
            ),
          }}
          name="ForgetPassword"
          component={ForgetPassword}
        />
        <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: 'rgba(177, 211, 79, 0.5)',
          drawerActiveTintColor: 'black',
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require('./assets/images/account.png')}
              style={{ width: size, height: size }}
            />
          ),
        }}
        name="ResetPassword"
        component={ResetPassword}
      />
       <Drawer.Screen name="PersonalDetails" component={PersonalDetails} />
        <Drawer.Screen name="Security" component={Security} />
        <Drawer.Screen name="Installation" component={Installation} />
        <Drawer.Screen name="Payment" component={Payment} />
        <Drawer.Screen name="Subscription" component={Subscription} />
        <Drawer.Screen name="Theme" component={Theme} />
        <Drawer.Screen name="deleteAccount" component={deleteAccount} />
      </Drawer.Navigator>

    </NavigationContainer>
     <Toast position="bottom" />
     </>
  );
}



const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  closeButton: {
    position:'absolute',
    top: Platform.OS === 'ios'?60:20,
    right: 10,
  },
  closeIcon: {
    width: 34,
    height: 34,
  },
});
// export default {
//   navigationRef,
//   App
// };
export default App;

