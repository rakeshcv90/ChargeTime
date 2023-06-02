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
import axios from 'axios';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('screen').width);

export default function Login({navigation}) {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  // const loginFunction = () => {
  //   axios.post(`${API}/`)
  // }
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.login_img}>
          <Image
            source={require('../../../assets/images/bigstock.png')}
            resizeMode="stretch"
            style={{alignSelf: 'center', width: mobileW}}
          />
        </View>
        <View style={[styles.login_css,styles.shadowProp]}>
          <Text style={styles.login}>Login</Text>
          <Text style={styles.email}>Email</Text>
          <TextInput
            style={styles.email_placeholder}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Enter your email here"
            onChangeText={text => setEmail(text)}
        value={email}
          />
          <Text style={styles.email}>Password</Text>
          <TextInput
            style={styles.email_placeholder}
            secureTextEntry={true}
            placeholder="Enter your password here"
            onChangeText={text => setPassword(text)}
        value={password}
          />
          <View style={styles.main_div_lock_img}>
            <Image
              
              source={require('../../../assets/images/lock.png')}
            />
            <Text style={styles.forgot_password}>Forgot my password</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              //onPress={loginFunction}
              style={{
                marginTop: 20,
                backgroundColor: COLORS.GREEN,
                alignItems: 'center',
                padding: 13,
                borderRadius: 30,
                width: 150,
              }}>
              <Text style={styles.log_In_btn}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainDiv_donot_account}>
            <Text style={styles.dont_have_text}>Don't have an account? </Text>
            <Text style={styles.sign_up}>Sign Up</Text>
          </View>
        </View>
      </ScrollView>
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
    // padding: 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: COLORS.GRAY,
    borderRadius: 10,
    
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: Platform.OS === 'android' ?'black' :"rgba(0,0,0,.555)", // Shadow color
    shadowOffset: {
      width: 6, // Horizontal offset
      height: 4, // Vertical offset
    },
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 4, // Shadow radius
    elevation: Platform.OS === 'android' ? 8 : 0,
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
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  main_div_lock_img: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 10,
  },
  
  forgot_password: {
    letterSpacing: 1,
    paddingLeft: 10,
    fontSize: 10,
    fontWeight:"300",
    color:COLORS.BLACK
  },
  mainDiv_donot_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom:20
  },
  dont_have_text: {
    fontSize: 17,
    fontWeight: '500',
  },
  sign_up: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  log_In_btn: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? 700 : 700,
  },
});
