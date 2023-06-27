import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Formik} from 'formik';
import COLORS from '../../constants/COLORS';
import Input from '../../Components/Input';
import {Message} from '../../../assets/images/Message';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {API} from '../../api/API';
import ActivityLoader from '../../Components/ActivityLoader';
import axios from 'axios';

const mobileW = Math.round(Dimensions.get('screen').width);

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
});

const ForgetPassword = ({navigation}) => {
  const [forLoading, setForLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [firstDigit, setFirstDigit] = useState('');
  const [secondDigit, setsecondDigit] = useState('');
  const [thirdDigit, setthirdDigit] = useState('');
  const [forthDigit, setforthDigit] = useState('');
  const [fifthDigit, setfifthDigit] = useState('');
  const [sixDigit, setSixDigit] = useState('');

  const otp1 = useRef(null);
  const otp2 = useRef(null);
  const otp3 = useRef(null);
  const otp4 = useRef(null);
  const otp5 = useRef(null);
  const otp6 = useRef(null);
  const handleRemberPassWord = async values => {
    setForLoading(true);
    try {
     const res = await axios(`${API}/forgetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: values,
      })
        if(res.data) {
          console.log(res.data);
          if (res.data.success == true) {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'success',
                  text1: 'Otp sent successfully.',
                })
              : ToastAndroid.show('Otp sent successfully.', ToastAndroid.SHORT);
            // navigation.navigate('ResetPassword', {email: values});
            setForLoading(false);
            setShowOTP(true);
            setEmail(values.email);
          } else {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'error',
                  text1: 'User not found!',
                  // position: 'bottom',
                })
              : ToastAndroid.show('User not found!', ToastAndroid.SHORT);

            setForLoading(false);
          }
        }
    } catch (err) {
      console.log(err);
      setForLoading(false);
    }
  };

  const verifyOTP = async () => {
    setForLoading(true);
    const otp =
      firstDigit +
      secondDigit +
      thirdDigit +
      forthDigit +
      fifthDigit +
      sixDigit;

    try {
      if (email !== '' && otp !== '') {
        let payload = new FormData();
        payload.append('email', email);
        payload.append('randomotp', otp);
        console.log(payload);
        const res = await axios(`${API}/forgetverifyOtp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: payload,
        });
        if (res.data) {
          if (res.data.message == 'OTP verification successful' ) {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'success',
                  text1: 'OTP verification successfull.',
                })
              : ToastAndroid.show(
                  'OTP verification successfull.',
                  ToastAndroid.SHORT,
                );
            navigation.navigate('ResetPassword', {email: email});
            setForLoading(false);
          } else {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'error',
                  text1: 'Invalid OTP or OTP expired',
                  // position: 'bottom',
                })
              : ToastAndroid.show(
                  'Invalid OTP or OTP expired',
                  ToastAndroid.SHORT,
                );

            setForLoading(false);
          }
        }
      } else {
        PLATFORM_IOS
          ? Toast.show({
              type: 'error',
              text1: 'Please fill required details',
              // position: 'bottom',
            })
          : ToastAndroid.show(
              'Please fill required details',
              ToastAndroid.SHORT,
            );
      }
      setForLoading(false);
    } catch (error) {
      console.error('VERIFY OTP', error.response.data);
      setForLoading(false);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
        <KeyboardAvoidingView behavior="position" style={{marginTop: 10}} >
          {forLoading ? <ActivityLoader /> : ''}
          <Image
            source={require('../../../assets/images/log.png')}
            resizeMode="contain"
            style={{width: mobileW, height: mobileW * 0.7  }}
          />
          <View style={styles.super_div}>
            <Formik
              initialValues={{
                email: '',
              }}
              onSubmit={values => handleRemberPassWord(values)}
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
                  <View style={styles.mainDiv_forget_ur_pass}>
                    <Text style={styles.forget_password}>
                      Forgot Your Password?
                    </Text>
                    <View style={{marginTop: 20}}>
                      <Input
                        IconLeft={null}
                        errors={undefined}
                        touched={false}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        text="Email"
                        IconRight={() => <Message />}
                        mV={1}
                        placeholder="Enter your Email"
                        bW={1}
                        textWidth={'22%'}
                        placeholderTextColor={COLORS.BLACK}
                        autoCapitalize="none"
                      />
                      {errors.email && touched.email && (
                        <Text style={{color: 'red'}}>{errors.email}</Text>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={{
                      // marginTop: 5,
                      backgroundColor: showOTP
                        ? COLORS.HALFBLACK
                        : COLORS.GREEN,
                      alignItems: 'center',
                      padding: 13,
                      borderRadius: 30,
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        color: COLORS.BLACK,
                      }}>
                      RESET PASSWORD
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            {showOTP && (
              <>
              <View style={styles.mainDiv_verify_email}>
                <Text style={styles.havenot_received_email}>
                  Enter the OTP Below
                </Text>
                <View style={styles.otp_box}>
                  <TextInput
                    ref={otp1}
                    onChangeText={value => {
                      if (value != '') {
                        otp2.current.focus();
                        setFirstDigit(value);
                      }
                      // else setFirstDigit('');
                    }}
                    keyboardType="numeric"
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={firstDigit}
                    onKeyPress={({nativeEvent}) => {
                      nativeEvent.key == 'Backspace' && setFirstDigit('');
                    }}
                  />
                  <TextInput
                    ref={otp2}
                    onChangeText={value => {
                      if (value != '') {
                        otp3.current.focus();
                        setsecondDigit(value);
                      }
                      // else {
                      //   otp1.current.focus();
                      //   setFirstDigit('');
                      // }
                    }}
                    keyboardType="numeric"
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={secondDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key == 'Backspace') {
                        setFirstDigit('');
                        otp1.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    ref={otp3}
                    onChangeText={value => {
                      if (value != '') {
                        otp4.current.focus();
                        setthirdDigit(value);
                      }
                      // else {
                      //   otp2.current.focus();
                      //   setsecondDigit('');
                      // }
                    }}
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={thirdDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key == 'Backspace') {
                        setsecondDigit('');
                        otp2.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    ref={otp4}
                    onChangeText={value => {
                      if (value != '') {
                        otp5.current.focus();
                        setforthDigit(value);
                      }
                      // else {
                      //   otp3.current.focus();
                      //   setthirdDigit('');
                      // }
                    }}
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={forthDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key == 'Backspace') {
                        otp3.current.focus();
                        setthirdDigit('');
                      }
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    ref={otp5}
                    onChangeText={value => {
                      if (value != '') {
                        otp6.current.focus();
                        setfifthDigit(value);
                      }
                      // else {
                      //   otp4.current.focus();
                      //   setforthDigit('');
                      // }
                    }}
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={fifthDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key == 'Backspace') {
                        otp4.current.focus();
                        setforthDigit('');
                      }
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    ref={otp6}
                    onChangeText={value => {
                      if (value != '') {
                        setSixDigit(value);
                      }
                      // else {
                      //   otp5.current.focus();
                      //   setfifthDigit('');
                      // }
                    }}
                    maxLength={1}
                    style={styles.textInput_otp}
                    value={sixDigit}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key == 'Backspace') {
                        otp5.current.focus();
                        setfifthDigit('');
                        setSixDigit('');
                      }
                    }}
                    onSubmitEditing={verifyOTP}
                  />
                </View>
              </View>
                <TouchableOpacity
                  onPress={() => verifyOTP()}
                  style={{
                    // marginTop: 5,
                    backgroundColor: COLORS.GREEN,
                    alignItems: 'center',
                    padding: 13,
                    borderRadius: 30,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 14,
                      color: COLORS.BLACK,
                    }}>
                    Confirm OTP
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <View style={styles.mainDiv_donot_account}>
              <Text style={styles.dont_have_text}>
                Remember your password?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.sign_up}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  super_div: {
    marginHorizontal: 20,
  },
  login_img: {
    width: mobileW,
  },
  mainDiv_forget_ur_pass: {
    marginTop: 35,
    marginBottom: 20,

    // paddingVertical: 20,
    borderRadius: 15,
  },
  forget_password: {
    fontWeight: '800',
    fontSize: 24,
    color: COLORS.BLACK,
  },
  email_placeholder: {
    backgroundColor: `rgba(86, 84, 84, 0.1)`,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  text_of_email: {
    fontSize: 14,
    fontWeight: '500',
    paddingTop: 20,
    paddingBottom: 10,
  },

  mainDiv_donot_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  dont_have_text: {
    fontSize: 14,
    fontWeight: '400',
  },
  sign_up: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.29)',
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 5 : 0,
  },
  otp_box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 15,
  },
  textInput_otp: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: COLORS.BROWN,
    textAlign: 'center',
    fontSize: 14,
    // paddingHorizontal: 20,
  },
  mainDiv_verify_email: {
    // paddingTop: 20,
    paddingBottom: 15,
    borderRadius: 15,
    marginTop: 20,
  },
});
