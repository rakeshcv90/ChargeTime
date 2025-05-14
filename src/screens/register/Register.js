/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
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
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import COLORS from '../../constants/COLORS';
import axios from 'axios';
import * as Yup from 'yup';
import {API} from '../../api/API';
import Input from '../../Components/Input';
import Toast from 'react-native-toast-message';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import {Admin} from '../../../assets/images/Admin';
import {Message} from '../../../assets/images/Message';
import {Call} from '../../../assets/images/Call';
import {StrongPass} from '../../../assets/images/StrongPass';
import {useDispatch, useSelector} from 'react-redux';
import {setUserRegisterData} from '../../redux/action';
import ActivityLoader from '../../Components/ActivityLoader';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('screen').width);
const PasswordRegex =
  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()-_+='":;,.?/~`[{}<>€£¥÷×])[A-Za-z\d!@#$%&*()-_+='":;,.?/~`[{}<>€£¥÷×]{8,}$/;
const validationSchema = Yup.object().shape({
  // name: Yup.string().required('Full Name is required'),
  name: Yup.string()
    .required('First Name is Required')
    .matches(/^[A-Za-z].*/, 'First Name must start with a character')
    .min(3, 'First Name must contain atleast 3 characters'),
  lname: Yup.string()
    .required(' Last Name is Required')
    .matches(/^[A-Za-z].*/, 'Last Name must start with a character')
    .min(3, 'Last Name must contain atleast 3 characters'),
  // email: Yup.string().email('Invalid Email').required('Email is required'),
  email: Yup.string()
    .matches(/^[\w.\-]+@[\w.\-]+\.\w{2,4}$/, 'Invalid Email Format')
    .required('Email is Required'),
  // mobile: Yup.string().min(10).required('Phone No. is required'),
  mobile: Yup.string()
    .test('is-ten-digits', 'Phone No. must be a 10-digit number', value => {
      if (value) {
        return /^\d{10}$/.test(value);
      }
      return true; // Allows an empty field, but shows a different required error message
    })
    .required('Phone No. is required'),
  password: Yup.string()
    .matches(
      PasswordRegex,
      'Password must contain 1 Upper-Case letter, 1 Lower-Case letter, 1 Digit, 1 Special Character(@,$,-,^,&, !), and the length must be at least 8 characters',
    )
    .required('Password is Required'),
  repeat_password: Yup.string()
    .matches(
      PasswordRegex,
      'Password must contain 1 Upper-Case letter, 1 Lower-Case letter, 1 Digit, 1 Special Character(@,$,-,^,&, !), and the length must be at least 8 characters',
    )
    .required('Confirm Password is Required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
export default function Register({navigation}) {
  const [forLoading, setForLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const dispatch = useDispatch();
  const {userRegisterData} = useSelector(state => state);

  const handleFormSubmit = async values => {
    setForLoading(true);

    try {
      const response = await axios.post(`${API}/createuser`, {
        name: values.name ,
        email: values.email,
      });

      if (response.data.status == 'true') {
        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: 'Please complete your profile',
            })
          : ToastAndroid.show(
              'Please complete your profile',
              ToastAndroid.SHORT,
            );

        setForLoading(false);

       dispatch(setUserRegisterData(values));
        navigation.navigate('CompleteProfile', {
          email: values?.email,
          user_id: response.data?.user_id,
        });
      } else {
        if (response.data.error != 1) {
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Please verify your email with code.',
              })
            : ToastAndroid.show(
                'Please verify your email with code.',
                ToastAndroid.SHORT,
              );
              // console.log("My DATa is",response.data?.time)
          navigation.navigate('VerifyEmail', {
            email: values?.email,
            user_id: response.data?.user_id,
             time:response.data?.time,
          });

          setForLoading(false);

          dispatch(setUserRegisterData(values));
        } else {
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: 'This Email id already exists!',
              })
            : ToastAndroid.show(
                'This Email id already exists!',
                ToastAndroid.SHORT,
              );
          setForLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      setForLoading(false);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        // scrollEnabled={false}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={PLATFORM_IOS ? 'position' : undefined}
          contentContainerStyle={{flexGrow: 1}}
          // behavior={'padding'}
          // keyboardVerticalOffset={PLATFORM_IOS ? 200 : 0}
        >
          {forLoading ? <ActivityLoader /> : ''}
          <Image
            source={require('../../../assets/images/res.png')}
            resizeMode="contain"
            style={{width: mobileW, height: mobileH / 5, marginTop: 10}}
          />
          <Formik
            initialValues={{
              name: userRegisterData.name,
              lname: userRegisterData.lname,
              email: userRegisterData.email,
              mobile: userRegisterData.mobile,
              password: '',
              repeat_password: '',
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
                  <Input
                    IconLeft={null}
                    errors={errors.name}
                    touched={touched.name}
                    value={values.name}
                    // autoFocus
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    text="First Name"
                    IconRight={() => <Admin />}
                    mV={10}
                    placeholder="Ex. John"
                    bW={1}
                    textWidth={'30%'}
                    placeholderTextColor={COLORS.HALFBLACK}
                  />
                  <Input
                    IconLeft={null}
                    errors={errors.lname}
                    touched={touched.lname}
                    value={values.lname}
                    // autoFocus
                    onChangeText={handleChange('lname')}
                    onBlur={handleBlur('lname')}
                    text="Last Name"
                    IconRight={() => <Admin />}
                    mV={10}
                    placeholder="Ex. Doe"
                    bW={1}
                    textWidth={'30%'}
                    placeholderTextColor={COLORS.HALFBLACK}
                  />
                  <Input
                    IconLeft={null}
                    errors={errors.email}
                    touched={touched.email}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    text="Email ID"
                    IconRight={() => <Message />}
                    mV={10}
                    placeholder="Ex. johnd@xyz.com"
                    bW={1}
                    textWidth={'30%'}
                    placeholderTextColor={COLORS.HALFBLACK}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />

                  <Input
                    IconLeft={null}
                    errors={errors.mobile}
                    touched={touched.mobile}
                    value={values.mobile}
                    keyboardType="numeric"
                    onChangeText={handleChange('mobile')}
                    maxLength={10}
                    onBlur={handleBlur('mobile')}
                    text="Phone No."
                    IconRight={() => <Call />}
                    mV={10}
                    placeholder="Ex. 89xxxxxxxx"
                    bW={1}
                    textWidth={'30%'}
                    placeholderTextColor={COLORS.HALFBLACK}
                  />

                  <Input
                    IconLeft={null}
                    errors={errors.password}
                    touched={touched.password}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    text="Password"
                    passwordInput={true}
                    pasButton={() => setShowPassword(!showPassword)}
                    passwordInputIcon={showPassword}
                    mV={10}
                    placeholder="Create a strong password"
                    bW={1}
                    textWidth={'30%'}
                    placeholderTextColor={COLORS.HALFBLACK}
                    secureTextEntry={showPassword}
                  />
                  <Input
                    IconLeft={null}
                    errors={errors.repeat_password}
                    touched={touched.repeat_password}
                    value={values.repeat_password}
                    onChangeText={handleChange('repeat_password')}
                    onBlur={handleBlur('repeat_password')}
                    text="Confirm Password"
                    passwordInput={true}
                    pasButton={() => setShowPassword1(!showPassword1)}
                    passwordInputIcon={showPassword1}
                    mV={10}
                    placeholder="Create a strong password"
                    bW={1}
                    textWidth={'50%'}
                    placeholderTextColor={COLORS.HALFBLACK}
                    secureTextEntry={showPassword1}
                  />
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
                      // marginTop: 15,
                      backgroundColor: '#B1D34F',
                      alignItems: 'center',
                      padding: 13,
                      borderRadius: 10,
                      width: '100%',
                      ...Platform.select({
                        ios: {
                          shadowColor: '#000000',
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.3,
                          shadowRadius: 4,
                        },
                        android: {
                          elevation: 4,
                        },
                      }),
                    }}>
                    <Text
                      style={{
                        color: COLORS.BLACK,
                        fontSize: 14,
                        fontWeight: '700',
                      }}>
                      Sign Up
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainDiv_signup: {
    width: mobileW,
    backgroundColor: 'red',
  },
  signup_img: {
    width: mobileW,
    // height: mobileH * 0.45,
  },
  second_mainDiv_signup: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
  },

  signUp_text: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.BLACK,
    paddingTop: 12,
    paddingBottom: 16,
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
    backgroundColor: 'rgba(86, 84, 84, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  mainDiv_Already_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 15,
  },
  dont_have_text: {
    fontSize: 14,
    fontWeight: '400',
    color:'black',
  },
  sign_up: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
});
