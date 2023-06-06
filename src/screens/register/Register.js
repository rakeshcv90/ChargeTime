import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
  ToastAndroid
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import React, {useState} from 'react';
import COLORS from '../../constants/COLORS';
import axios from 'axios';
import * as Yup from 'yup';
import {API} from '../../api/API';
import Input from '../../Components/Input';
import Toast from 'react-native-toast-message';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import { Admin } from '../../../assets/images/Admin';
import { Message } from '../../../assets/images/Message';
import { Call } from '../../../assets/images/Call';
import { StrongPass } from '../../../assets/images/StrongPass';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('screen').width);
const PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  mobile: Yup.string().min(10).required('Phone No. is required'),
  password: Yup.string().matches(
    PasswordRegex,
    'Password must contain 1 uppercase and 1 lowercase letter, 1 digit and 1 special character, and the length must be at least 8',
  ).required('Password is required'),
});
export default function Register({navigation}) {
  const handleFormSubmit = async values => {
    console.log(values);
    try {
      const response = await axios.post(`${API}/createuser`, values);
      
      
      
      if (response.data.message != "Your Email is already exist") {
        PLATFORM_IOS?
        Toast.show({
          type: 'success',
          text1: 'User registered successfully.',
          
        }):ToastAndroid.show('User registered successfully.', ToastAndroid.SHORT);
        navigation.navigate('VerifyEmail', { email: values?.email });
        
      } else {
        PLATFORM_IOS?
        Toast.show({
          type: 'error',
          text1: 'Your Email is already exist.',
          // position: 'bottom',
        }):ToastAndroid.show('Your Email is already exist.', ToastAndroid.SHORT);
      
      
      }
    } catch (error) {
      
      console.error(error);
      
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.mainDiv_signup}>
          <Image
            source={require('../../../assets/images/signupp.png')}
            resizeMode="stretch"
            style={{alignSelf: 'center', width: mobileW}}
          />
        </View>
        <Formik
          initialValues={{
            name: '',
            email: '',
            mobile: '',
            password: '',
          }}
          onSubmit={values => handleFormSubmit(values)}
          validationSchema={validationSchema}>
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.second_mainDiv_signup}>
                <Text style={styles.signUp_text}>Sign Up</Text>
                {/* <Text style={styles.fullName_text}>Full Name</Text>
        <TextInput
          style={styles.fullName_placeholder}
          placeholder="Ex. John Doe"
          value={values.name}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        /> */}
                <Input
                  IconLeft={null}
                  errors={undefined}
                  touched={false}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  text="Full Name"
                  IconRight={() => (
                    <Admin />
                  )}
                  mV={20}
                  placeholder="Ex. John Doe"
                  bW={1}
                  textWidth={'30%'}
                  placeholderTextColor={COLORS.BLACK}
                />
                {errors.name && touched.name && (
                  <Text style={{color: 'red'}}>{errors.name}</Text>
                )}
                {/* <Text style={styles.fullName_text}>Email ID</Text>
        <TextInput
          style={styles.fullName_placeholder}
          placeholder="Ex. johnd@xyz.com"
          value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        /> */}
                <Input
                  IconLeft={null}
                  errors={undefined}
                  touched={false}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  text="Email ID"
                  IconRight={() => (
                    <Message />
                  )}
                  mV={10}
                  placeholder="Ex. johnd@xyz.com"
                  bW={1}
                  textWidth={'30%'}
                  placeholderTextColor={COLORS.BLACK}
                  autoCapitalize='none'
                />
                {errors.email && touched.email && (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                )}
                {/* <Text style={styles.fullName_text}>Phone No.</Text>
        <TextInput
          style={styles.fullName_placeholder}
          placeholder="Ex. 89xxxxxxxx"
          value={values.mobile}
        onChangeText={handleChange('mobile')}
        onBlur={handleBlur('mobile')}
        /> */}
                <Input
                  IconLeft={null}
                  errors={undefined}
                  touched={false}
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  text="Phone No."
                  IconRight={() => (
                    <Call />
                  )}
                  mV={10}
                  placeholder="Ex. 89xxxxxxxx"
                  bW={1}
                  textWidth={'30%'}
                  placeholderTextColor={COLORS.BLACK}
                />
                {errors.mobile && touched.mobile && (
                  <Text style={{color: 'red'}}>{errors.mobile}</Text>
                )}
                {/* <Text style={styles.fullName_text}>Password</Text>
        <TextInput
          style={styles.fullName_placeholder}
          placeholder="Create a strong password"
          secureTextEntry={true}
          value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        /> */}
                <Input
                  IconLeft={null}
                  errors={undefined}
                  touched={false}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  text="Password"
                  IconRight={() => (
                    <StrongPass />
                  )}
                  mV={10}
                  placeholder="Create a strong password"
                  bW={1}
                  textWidth={'30%'}
                  placeholderTextColor={COLORS.BLACK}
                  secureTextEntry={true}
                />
                {errors.password && touched.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // width: '100%',
                  marginHorizontal: 20,
                }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    marginTop: 15,
                    backgroundColor: '#B1D34F',
                    alignItems: 'center',
                    padding: 13,
                    borderRadius: 10,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    SIGN UP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.mainDiv_Already_account}>
          <Text style={styles.dont_have_text}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.sign_up}>Log In</Text>
          </TouchableOpacity>
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

    paddingBottom: 15,
  },

  signUp_text: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.BLACK,
    paddingTop: 12,
    letterSpacing: 1,
  },

  fullName_text: {
    paddingTop: 12,
    paddingBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  fullName_placeholder: {
    backgroundColor: `rgba(86, 84, 84, 0.1)`,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  mainDiv_Already_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
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
