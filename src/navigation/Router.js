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
import PersonalDetails from '../screens/accounts/PersonalDetails';
import Security from '../screens/accounts/Security';
import Installation from '../screens/accounts/Installation';
import Theme from '../screens/accounts/Theme';
import Subscription from '../screens/accounts/Subscription';
import deleteAccount from '../screens/accounts/deleteAccount';
import EnergyStats from '../screens/EnergyStats';
import {useSelector} from 'react-redux';
import PaymentGateWay from '../screens/payment/PaymentGateWay';
import Splash from '../splash/Splash';
import Introduction from '../splash/Introduction';
import HomeOne from '../screens/downgrade/HomeOne';
import UpgradeData from '../screens/downgrade/DownGradeData';
import DownGradeData from '../screens/downgrade/DownGradeData';
import ContactUs from '../screens/drawerPart/ContactUs';
import Privacy from '../screens/drawerPart/Privacy';
import Terms from '../screens/drawerPart/Terms';
import Contact from '../screens/accounts/Contact';

// import Plan from '../screens/planSummary/Plan';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false, // Hide the header for all screens
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
        <Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigation = () => {
  const [focus, setFocus] = useState();
  const [focusOne, setFocusOne] = useState();
  const [focusTwo, setFocusTwo] = useState();
  const {getPackageStatus,getDeviceID} = useSelector(state => state);

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={CustomDrawerContent}>
      {getPackageStatus ? (
        <>
          <Drawer.Screen
            options={{
              drawerActiveBackgroundColor: '#fff',
              drawerIcon: ({focused, color, size}) => {
                setFocus(focused);
                return (
                  <Image
                    source={
                      !focused
                        ? require('../../assets/images/home_white.png')
                        : require('../../assets/images/home_green.png')
                    }
                    style={{width: 50, height: 40, padding: 0, margin: -10}}
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
            name="EnergyStats"
            component={EnergyStats}
          />
          {getDeviceID !==
          'Your Account is not currently linked with a TRO Charger. Please contact customer service if you believe this is an error.' ? (
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
                          : require('../../assets/images/energy_green.png')
                      }
                      style={{width: 50, height: 40, padding: 0, margin: -10}}
                    />
                  );
                },
                drawerLabelStyle: {
                  backgroundColor: focusOne
                    ? 'rgba(177, 211, 79, 0.8)'
                    : '#fff',
                  paddingVertical: 10,
                  paddingLeft: 10,
                  width: '200%',
                  marginLeft: -15,
                },
                drawerActiveTintColor: 'black',
                title: 'Energy',
              }}
              name="EnergyOptions"
              component={EnergyOptions}
            />
          ) : (
            <Drawer.Screen
              options={{
                drawerActiveBackgroundColor: '#fff',
                drawerIcon: ({focused, color, size}) => {
                  setFocus(focused);
                  return (
                    <Image
                      source={
                        !focused
                          ? require('../../assets/images/home_white.png')
                          : require('../../assets/images/home_green.png')
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
                title: 'Energy',
              }}
              name="HomeStack"
              component={HomeStack}
            />
          )}
        </>
      ) : (
        <Drawer.Screen
          options={{
            drawerActiveBackgroundColor: '#fff',
            drawerIcon: ({focused, color, size}) => {
              setFocus(focused);
              return (
                <Image
                  source={
                    !focused
                      ? require('../../assets/images/home_white.png')
                      : require('../../assets/images/home_green.png')
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
      )}
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',
          drawerIcon: ({focused, color, size}) => {
            setFocusTwo(focused);
            return (
              <Image
                source={
                  !focused
                    ? require('../../assets/images/account_white.png')
                    : require('../../assets/images/green_account.png')
                }
                style={{width: 50, height: 40, padding: 0, margin: -10}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: focusTwo ? 'rgba(177, 211, 79, 0.8)' : '#fff',
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
            return (
              <Image
                source={require('../../assets/images/contact_us.png')}
                style={{width: 30, height: 30, padding: 0}}
              />
            );
          },
          drawerItemStyle: {marginTop: 100},
          drawerLabelStyle: {
            backgroundColor: '#fff',
          },
          drawerActiveTintColor: 'black',
          title: 'Contact Us',
        }}
        name="Contact Us"
        component={DrawerScreenPart}
      />
      <Drawer.Screen
        options={{
          drawerActiveBackgroundColor: '#fff',
          drawerIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../../assets/images/privacy.png')}
                style={{width: 30, height: 30, padding: 0}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: '#fff',
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
                style={{width: 30, height: 30, padding: 0}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: '#fff',
          },
          drawerActiveTintColor: 'black',
        }}
        name="Terms & Conditions"
        component={Terms}
      />
    </Drawer.Navigator>
  );
};
const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Introduction" component={Introduction} />
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
const EnergyOptions = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeOne" component={HomeOne} />
      <Stack.Screen name="DownGradeData" component={DownGradeData} />
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
      <Stack.Screen name="Contact" component={Contact}/>
      <Stack.Screen name="deleteAccount" component={deleteAccount} />
      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="LoginStack" component={LoginStack} />
    </Stack.Navigator>
  );
};

export default function Router() {
  let loginDataString;
  const {getLocationID, getPackageStatus, getUserID, isAuthorized} =
    useSelector(state => state);
  useEffect(() => {
    checkLogin();
  }, []);
  let id;
  const checkLogin = async () => {
    id = await AsyncStorage.getItem('locationID');
  };

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