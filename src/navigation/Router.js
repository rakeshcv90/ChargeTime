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
import Charging from '../Components/Charging';
import {OnlineCharge} from '../../assets/images/OnlineCharge';
import {NoCharge} from '../../assets/images/NoCharge';
import COLORS from '../constants/COLORS';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import Contact from '../screens/accounts/Contact';
import ForDownGrade from '../Components/ForDownGrade';


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
export const ChargerStatus = () => {
  const getChargerStatus = useSelector(state => state.getChargerStatus);
  console.log(getChargerStatus, 'getChargerStatus');
  return (
    <View>
      <Text></Text>
    </View>
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
          width: Dimensions.get('window').width / 1.55,
        },
      }}
      gestureEnabled={false}
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
                    style={{width: 25, height: 30, padding: 0, margin: -10}}
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
                    style={{
                      width: 25,
                      height: 30,
                      padding: 0,
                      margin: -10,
                      marginTop: -30,
                    }}
                  />
                );
              },
              drawerLabelStyle: {
                backgroundColor: focusOne ? 'rgba(177, 211, 79, 0.8)' : '#fff',
                paddingVertical: 10,
                marginTop: -20,
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
                  style={{width: 25, height: 30, margin: -10, marginTop: -30}}
                />
              );
            },
            drawerLabelStyle: {
              backgroundColor: focus ? 'rgba(177, 211, 79, 0.8)' : '#fff',
              paddingVertical: 10,
              paddingLeft: 10,
              width: '200%',
              marginTop: -20,
              marginLeft: -15,
            },
            drawerActiveTintColor: 'black',
            title: 'Home',
          }}
          name="HomeStack"
          component={HomeStack}
        />
      )}
      {/* <Drawer.Screen
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
            backgroundColor: focusOne ? 'rgba(177, 211, 79, 0.8)' : '#fff',
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
      /> */}
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
                style={{
                  width: 25,
                  height: 30,
                  padding: 0,
                  margin: -10,
                  marginTop: -30,
                }}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: focusTwo ? 'rgba(177, 211, 79, 0.8)' : '#fff',
            paddingVertical: 10,
            paddingLeft: 10,
            marginTop: -20,
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
                resizeMode="center"
                style={{width: 25, height: 25, padding: 0, margin: -7}}
              />
            );
          },
          drawerItemStyle: {marginTop: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100},
          drawerLabelStyle: {
            backgroundColor: '#fff',
            marginLeft: -17,
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
                style={{width: 17, height: 17, padding: 0, margin: -5}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: '#fff',
            marginLeft: -15,
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
                style={{width: 17, height: 17, padding: 0, margin: -5}}
              />
            );
          },
          drawerLabelStyle: {
            backgroundColor: '#fff',
            marginLeft: -15,
          },
          drawerActiveTintColor: 'black',
        }}
        name="Terms & Conditions"
        component={Terms}
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
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.29,
                      shadowRadius: 4.65,
                      elevation: Platform.OS === 'android' ? 10 : 0,
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
            name={getChargerStatus?.message == 'Online' ? `Online` : `Offline`}
            component={ChargerStatus}
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
const SplashStack = () => {
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
const EnergyOptions = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeOne" component={HomeOne} />
      <Stack.Screen name="DownGradeData" component={ForDownGrade} />
      <Stack.Screen name="PaymentGateWay" component={PaymentGateWay} />
      {/* <Stack.Screen name="PlanSummary" component={PlanSummary} /> */}
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
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="deleteAccount" component={deleteAccount} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginStack" component={LoginStack} />
      <Stack.Screen name="EnergyStats" component={EnergyStats} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="PaymentGateWay" component={PaymentGateWay} />
      <Stack.Screen name="HomeOne" component={HomeOne} />
      <Stack.Screen name="DownGradeData" component={ForDownGrade} />
      {/* <Stack.Screen name="PaymentGateWay" component={PaymentGateWay} /> */}

      <Stack.Screen name="PlanSummary" component={PlanSummary} />

      <Stack.Screen name="Privacy Policy" component={Privacy} />
    </Stack.Navigator>
  );
};

export default function Router() {
  // const [isAuthorized, setIsAuthorized] = useState(false);
  let loginDataString;
  const getLocationID = useSelector(state => state.getLocationID);
  const getPackageStatus = useSelector(state => state.getPackageStatus);
  const isAuthorized = useSelector(state => state.isAuthorized);

  useEffect(() => {
    checkLogin();
  }, []);
  let id;
  const checkLogin = async () => {
    id = await AsyncStorage.getItem('locationID');
  };

  console.log(isAuthorized, 'getLocationId');
  let isFirstTime;

  useEffect(() => {
    retrieveLoginData();
  }, []);
  const retrieveLoginData = async () => {
    try {
      //loginDataString = await AsyncStorage.getItem('loginDataOne');
      isFirstTime = await AsyncStorage.getItem('isFirstTime');
console.log('isFirstTime',isFirstTime)
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
      {/* {(isFirstTime == null || isFirstTime == undefined) && (
        <>
          <Stack.Screen name="SplashStack" component={SplashStack} />
        </>
      )} */}
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
