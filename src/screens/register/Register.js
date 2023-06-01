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
        
        <SignUp />
      </View>
      <View style={styles.second_mainDiv_signup}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VerifyEmail')}
            style={{
              marginTop: 20,
              backgroundColor: '#B1D34F',
              alignItems: 'center',
              padding: 13,
              borderRadius: 30,
              width: 200,
            }}>
            <Text style={{color: COLORS.WHITE, fontSize: 15, fontWeight: '800'}}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainDiv_Already_account}>
          <Text style={styles.dont_have_text}>Already have an account? </Text>
          <Text style={styles.sign_up}>Log In</Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainDiv_signup: {
    paddingTop: 50,
    backgroundColor: COLORS.WHITE,
  },
  signup_img: {
    width: mobileW,
    // height: mobileH * 0.45,
  },
  second_mainDiv_signup: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
  },

  signUp_text: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.BLACK,
    paddingTop: 12,
    letterSpacing: 1,
    paddingTop: 60,
  },

  fullName_text: {
    paddingTop: 12,
    paddingBottom: 6,
    fontSize: 18,
    fontWeight: '600',
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
});
