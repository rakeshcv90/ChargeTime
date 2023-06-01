import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

export default function App() {
  const Drawer = createDrawerNavigator();

  const CustomDrawerContent = (props) => {
    const { navigation } = props;

    const handleDrawerClose = () => {
      navigation.closeDrawer();
    };

    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.logoContainer}>
          <Image source={home_icon} style={styles.logo} />
          {/* <Logo style={styles.logo} />
          <View style={{display:"flex",flexDirection:"row"}}>
            <Text style={{color:'red'}}>Charge</Text>
            <Text>Time</Text>
          </View> */}
        </View>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.closeButton} onPress={handleDrawerClose}>
          <Image source={cross_sign} style={styles.closeIcon} />
        </TouchableOpacity>
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="VerifyEmail"
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
      </Drawer.Navigator>
    </NavigationContainer>
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