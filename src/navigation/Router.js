// import 'react-native-gesture-handler';
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
import Payment from '../screens/accounts/Payment';
import PersonalDetails from '../screens/accounts/PersonalDetails';
import Security from '../screens/accounts/Security';
import Installation from '../screens/accounts/Installation';
import Theme from '../screens/accounts/Theme';
import Subscription from '../screens/accounts/Subscription';
import deleteAccount from '../screens/accounts/deleteAccount';
import Plan from '../screens/planSummary/Plan';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false, // Hide the header for all screens
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: 'rgba(177, 211, 79, 0.5)',
          drawerActiveTintColor: 'black',
          drawerIcon: ({focused, color, size}) => (
            <Image
              source={require('../../assets/images/account.png')}
              style={{width: size, height: size}}
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
                source={require('../../assets/images/account.png')}
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
                source={require('../../assets/images/account.png')}
                style={{ width: size, height: size }}
              />
            ),
          }}
          name="Register"
          component={Register}
        />
         <Drawer.Screen name="PersonalDetails" component={PersonalDetails} />
        <Drawer.Screen name="Security" component={Security} />
        <Drawer.Screen name="Installation" component={Installation} />
        <Drawer.Screen name="Payment" component={Payment} />
        <Drawer.Screen name="Subscription" component={Subscription} />
        <Drawer.Screen name="Theme" component={Theme} />
        <Drawer.Screen name="deleteAccount" component={deleteAccount} />
      
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

  React.useEffect(() => {
    retrieveLoginData();
    console.log('Retrieved login data: ', isAuthorized);
  }, []);
  const retrieveLoginData = async () => {
    try {
      loginDataString = await AsyncStorage.getItem('loginData');
      if (loginDataString !== null) {
        const loginData = JSON.parse(loginDataString);
        setIsAuthorized(true);
        console.log('Retrieved login data: ', loginDataString);
        // Use the login data as needed
      }
    } catch (error) {
      console.log('Error retrieving login data: ', error);
      // setIsAuthorized(false);
    }
  };
  

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!isAuthorized ? (
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
