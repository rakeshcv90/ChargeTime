import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ScrollView
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import React, {useState} from 'react';
import COLORS from '../../constants/COLORS';
import { SignUp } from '../../../assets/images/SignUp';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('screen').width);

export default function Register({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' >
      <View style={styles.mainDiv_signup}>
        
      <Image source={require("../../../assets/images/signupp.png")} resizeMode='stretch' style={{alignSelf: 'center', width: mobileW,}} />

      </View>
      <View style={[styles.second_mainDiv_signup,styles.shadowProp]}>
        <Text style={styles.signUp_text}>Sign Up</Text>
        <Text style={styles.fullName_text}>Full Name</Text>
        <TextInput
          style={styles.fullName_placeholder}
          placeholder="Ex. John Doe"
        />
        <Text style={styles.fullName_text}>Email ID</Text>
        <TextInput
          style={styles.fullName_placeholder}
          placeholder="Ex. johnd@xyz.com"
        />
        <Text style={styles.fullName_text}>Phone No.</Text>
        <TextInput
          style={styles.fullName_placeholder}
          placeholder="Ex. 89xxxxxxxx"
        />
        <Text style={styles.fullName_text}>Password</Text>
        <TextInput
          style={styles.fullName_placeholder}
          placeholder="Create a strong password"
        />
        
      </View>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VerifyEmail')}
            style={{
              marginTop: 15,
              backgroundColor: '#B1D34F',
              alignItems: 'center',
              padding: 13,
              borderRadius: 30,
              width: 150,
            }}>
            <Text style={{color: COLORS.WHITE, fontSize: 14, fontWeight: '700'}}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainDiv_Already_account}>
          <Text style={styles.dont_have_text}>Already have an account? </Text>
          <Text style={styles.sign_up}>Log In</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainDiv_signup: {
    paddingTop: 50,
    
  },
  signup_img: {
    width: mobileW,
    // height: mobileH * 0.45,
  },
  second_mainDiv_signup: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.GRAY,
    borderRadius:10,
    paddingBottom:20,
    marginHorizontal:20,
    marginVertical:20

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

  signUp_text: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.BLACK,
    paddingTop: 12,
    letterSpacing: 1,
    paddingTop: 30,
  },

  fullName_text: {
    paddingTop: 12,
    paddingBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color:COLORS.BLACK
  },
  fullName_placeholder: {
    backgroundColor: `rgba(86, 84, 84, 0.1)`,
    borderRadius: 10,
    paddingHorizontal: 15,
    height:Platform.OS === 'ios'?50:50
  },
  mainDiv_Already_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom:15
  },
  dont_have_text: {
    fontSize: 14,
    fontWeight: '400',
  },
  sign_up: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
});
