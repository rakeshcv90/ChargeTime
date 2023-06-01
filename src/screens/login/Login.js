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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import React, {useState} from 'react';
import COLORS from '../../constants/COLORS';
import { LoginImage } from '../../../assets/images/LoginImage';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('screen').width);

export default function Login({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView>
      {/* <Image
        style={styles.img_width}
        source={require('../../assets/images/login-image.png')}
      /> */}
      <View  style={styles.login_img} >
      <LoginImage />
      </View>
      <View style={styles.login_css}>
        <Text style={styles.login}>Login</Text>
        <Text style={styles.email}>Email</Text>
        <TextInput
          style={styles.email_placeholder}
          placeholder="Enter your email here"
        />
        <Text style={styles.email}>Password</Text>
        <TextInput
          style={styles.email_placeholder}
          placeholder="Enter your password here"
        />
        <View style={styles.main_div_lock_img}>
          <Image
            style={styles.lock_img}
            source={require('../../../assets/images/lock.png')}
          />
          <Text style={styles.forgot_password}>Forgot my password</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DrawerNavigation')}
              style={{
                marginTop: 20,
                backgroundColor: COLORS.GREEN,
                alignItems: 'center',
                padding: 13,
                borderRadius: 30,
                width: 300,
              }}>
              <Text style={styles.log_In_btn}>
                LOG IN
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainDiv_donot_account}>
            <Text style={styles.dont_have_text}>Don't have an account? </Text>
            <Text style={styles.sign_up}>Sign Up</Text>
          </View>
        </View>
      </View></ScrollView>
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
  login_img:{
    width: mobileW,
    height: mobileH * 0.45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img_width: {
    width: mobileW,
    height: mobileH * 0.45,
  },
  login_css: {
    padding: 20,
  },

  login: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
    paddingTop: 20,
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
    height:Platform.OS === 'ios'?50:50
  },
  main_div_lock_img: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 10,
  },
  lock_img: {
    width: 20,
    height: 20,
  },
  forgot_password: {
    letterSpacing: 1,
    paddingLeft: 10,
    fontSize: 17,
  },
  mainDiv_donot_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  dont_have_text: {
    fontSize: 17,
    fontWeight: '500',
  },
  sign_up: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },
  log_In_btn:{
    color: COLORS.BLACK, fontSize: 17, fontWeight: Platform.OS ==='ios'? 800:900
  }
});
