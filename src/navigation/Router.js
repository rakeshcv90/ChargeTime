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

export default function Router() {
  //const {navigation, route} = props;
  //  const {locationid} = route?.params;
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  let loginDataString;
  // let locationId;

  useEffect(() => {
    retrieveLoginData();
    
  }, []);
  const retrieveLoginData = async () => {
    try {
      loginDataString = await AsyncStorage.getItem('loginDataOne');
      
      
      if (loginDataString !== null) {
        const loginData = JSON.parse(loginDataString);
        setIsAuthorized(true);
        console.log('Retrieved login data: ', loginDataString);
        
      }
    } catch (error) {
      console.log('Error retrieving login data: ', error);
      // setIsAuthorized(false);
    }
  };
  

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isAuthorized ? (
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
