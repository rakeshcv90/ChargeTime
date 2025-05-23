/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {ms} from 'react-native-size-matters';
import Clipboard from '@react-native-clipboard/clipboard';

const mobileW = Math.round(Dimensions.get('screen').width);

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is Required'),
});

const ForgetPassword = ({navigation}) => {
  const [forLoading, setForLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [remainingTime, setRemainingTime] = useState();
  const [timerActive, setTimerActive] = useState(true);
  const [disablebutton, setdisableButton] = useState(false);
  const inputRefs = useRef([]);
  const [firstDigit, setFirstDigit] = useState('');
  const [secondDigit, setsecondDigit] = useState('');
  const [thirdDigit, setthirdDigit] = useState('');
  const [forthDigit, setforthDigit] = useState('');
  const [fifthDigit, setfifthDigit] = useState('');
  const [sixDigit, setSixDigit] = useState('');
  const [currentTIme, setCurrentTIme] = useState(new Date());
  const [currentTIme1, setCurrentTIme1] = useState();

  const otp1 = useRef(null);
  const otp2 = useRef(null);
  const otp3 = useRef(null);
  const otp4 = useRef(null);
  const otp5 = useRef(null);
  const otp6 = useRef(null);

  useEffect(() => {
    if (timerActive && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
        setdisableButton(true);
        setCurrentTIme1(new Date());
      }, 1000);

      return () => clearInterval(timer);
    } else if (remainingTime === 0) {
      setdisableButton(false);
      setTimerActive(false);
    }
  }, [remainingTime, timerActive]);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setOtp(text);
  };
  const handleRemberPassWord = async values => {
    setForLoading(true);
    try {
      const res = await axios(`${API}/forgetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: values,
      });

      if (res.data) {
        if (res.data.success == true) {
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Code sent successfully.',
              })
            : ToastAndroid.show('Code sent successfully.', ToastAndroid.SHORT);
          // navigation.navigate('ResetPassword', {email: values});
          setForLoading(false);
          setShowOTP(true);
          setEmail(values.email);
          setRemainingTime(res.data.timer);
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
    const date1 = new Date(currentTIme);
    const timeDifferenceInMilliseconds = currentTIme1 - date1;
    const secondsDifference = Math.floor(timeDifferenceInMilliseconds / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);

    if (secondsDifference <= 180) {
      const otp =
        firstDigit +
        secondDigit +
        thirdDigit +
        forthDigit +
        fifthDigit +
        sixDigit;
      const date1 = new Date(currentTIme);
      const timeDifferenceInMilliseconds = currentTIme1 - date1;
      const secondsDifference = Math.floor(timeDifferenceInMilliseconds / 1000);
      const minutesDifference = Math.floor(secondsDifference / 60);
      const hoursDifference = Math.floor(minutesDifference / 60);
      if (otp.length == 0) {
        PLATFORM_IOS
          ? Toast.show({
              type: 'error',
              text1: 'Enter Code',
              // position: 'bottom',
            })
          : ToastAndroid.show('Enter Code', ToastAndroid.SHORT);
      } else if (otp.length < 6) {
        PLATFORM_IOS
          ? Toast.show({
              type: 'error',
              text1: 'Enter Code',
              // position: 'bottom',
            })
          : ToastAndroid.show('Enter Code', ToastAndroid.SHORT);
      } else if (email == '') {
        PLATFORM_IOS
          ? Toast.show({
              type: 'error',
              text1: 'Enter Email ID ',
              // position: 'bottom',
            })
          : ToastAndroid.show('Enter Email ID', ToastAndroid.SHORT);
      } else {
        setForLoading(true);

        try {
          if (email !== '' && otp !== '') {
            let payload = new FormData();
            payload.append('email', email);
            payload.append('randomotp', otp);

            const res = await axios(`${API}/forgetverifyOtp`, {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              data: payload,
            });
            if (res.data) {
              if (res.data.message == 'OTP verification successful') {
                PLATFORM_IOS
                  ? Toast.show({
                      type: 'success',
                      text1: 'Authentication Successful',
                    })
                  : ToastAndroid.show(
                      'Authentication Successful',
                      ToastAndroid.SHORT,
                    );
                navigation.navigate('ResetPassword', {email: email});
                setOtp('');
                Clipboard.setString('');
                setForLoading(false);
                setFirstDigit('');
                setsecondDigit('');
                setthirdDigit('');
                setforthDigit('');
                setfifthDigit('');
                setSixDigit('');
              } else {
                PLATFORM_IOS
                  ? Toast.show({
                      type: 'error',
                      text1: 'Invalid Code',
                      // position: 'bottom',
                    })
                  : ToastAndroid.show('Invalid Code', ToastAndroid.SHORT);

                setForLoading(false);
                Clipboard.setString('');
                setOtp('');
                setFirstDigit('');
                setsecondDigit('');
                setthirdDigit('');
                setforthDigit('');
                setfifthDigit('');
                setSixDigit('');
              }
            }
          }
        } catch (error) {
          setForLoading(false);
          Clipboard.setString('');
          setOtp('');
          setFirstDigit('');
          setsecondDigit('');
          setthirdDigit('');
          setforthDigit('');
          setfifthDigit('');
          setSixDigit('');
        }
      }
    } else {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Code Expired',
            // position: 'bottom',
          })
        : ToastAndroid.show('Code Expired', ToastAndroid.SHORT);
    }
  };
  const resendOTp = async value => {
    const data = {email: value};
    setdisableButton(true);
    setRemainingTime(180);
    setTimerActive(true);
    setForLoading(true);
    setFirstDigit('');
    setsecondDigit('');
    setthirdDigit('');
    setforthDigit('');
    setfifthDigit('');
    setSixDigit('');
    setCurrentTIme(new Date());
    try {
      const res = await axios(`${API}/forgetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      if (res.data) {
        if (res.data.success == true) {
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Code Resent Successfully.',
              })
            : ToastAndroid.show(
                'Code Resent Successfully.',
                ToastAndroid.SHORT,
              );
          // navigation.navigate('ResetPassword', {email: values});
          setForLoading(false);
          Clipboard.setString('');
          setOtp('');
          setFirstDigit('');
          setsecondDigit('');
          setthirdDigit('');
          setforthDigit('');
          setfifthDigit('');
          setSixDigit('');
          setEmail(value);
        } else {
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: 'User not found!',
                // position: 'bottom',
              })
            : ToastAndroid.show('User not found!', ToastAndroid.SHORT);

          setForLoading(false);
          Clipboard.setString('');
          setOtp('');
          setEmail(value);
          setFirstDigit('');
          setsecondDigit('');
          setthirdDigit('');
          setforthDigit('');
          setfifthDigit('');
          setSixDigit('');
        }
      }
    } catch (err) {
      console.log(err);
      setForLoading(false);
      Clipboard.setString('');
      setOtp('');
      setEmail(value);
      setFirstDigit('');
      setsecondDigit('');
      setthirdDigit('');
      setforthDigit('');
      setfifthDigit('');
      setSixDigit('');
    }
  };

  const handleInputChange = (text, index) => {
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(prevOtp => {
      let newOtp = prevOtp.split('');
      newOtp[index] = text;
      return newOtp.join('');
    });
  };

  const handleBackspace = index => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }

    setOtp(prevOtp => {
      let newOtp = prevOtp.split('');
      newOtp[index] = '';
      return newOtp.join('');
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView // scrollEnabled={false}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView behavior="position" style={{marginTop: 10}}>
            {forLoading ? <ActivityLoader /> : ''}
            <Image
              source={require('../../../assets/images/log.png')}
              resizeMode="contain"
              style={{width: mobileW, height: mobileW * 0.7}}
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
                          textWidth={ms(45)}
                          placeholderTextColor={'gray'}
                          autoCapitalize="none"
                          editable={!showOTP}
                        />
                        {errors.email && touched.email && (
                          <Text style={{color: 'red'}}>{errors.email}</Text>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      disabled={showOTP}
                      style={{
                        // marginTop: 5,
                        backgroundColor: showOTP
                          ? COLORS.HALFBLACK
                          : COLORS.GREEN,
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
                          fontWeight: '700',
                          fontSize: 14,
                          color: COLORS.BLACK,
                        }}>
                        Reset Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
              {showOTP && (
                <>
                  <View style={styles.mainDiv_verify_email}>
                    <Text
                      style={{
                        color: COLORS.BLACK,
                        fontSize: 14,
                        fontWeight: '600',
                      }}>
                      Enter the Code Below
                    </Text>
                    <View style={styles.otp_box}>
                      {/* {[...Array(6)].map((_, index) => (
                    <View style={styles.otp_box}>
                      <TouchableOpacity onLongPress={()=>{console.log("Cvdfgdgdfg222222")}} >
                      <TextInput
                        key={index}
                        ref={ref => (inputRefs.current[index] = ref)}
                        keyboardType="numeric"
                        maxLength={1}
                        style={styles.textInput_otp}
                        // value={firstDigit}
                        value={otp[index]}
                        onChangeText={text => handleInputChange(text, index)}
                        onKeyPress={({nativeEvent}) => {
                          if (nativeEvent.key === 'Backspace') {
                            handleBackspace(index);
                          }
                        }}
                        // onTextInput={()=>{console.log("Cvdfgdgdfg")}}
                        // onPressIn={({nativeEvent}) => {
                        //   fetchCopiedText();
                        // }}
                        
                      />
                      </TouchableOpacity>
                    </View>
                    
                  ))} */}
                      <TextInput
                        ref={otp1}
                        contextMenuHidden={true}
                        onChangeText={value => {
                          if (value.length >= 1) {
                            setFirstDigit(value);
                            otp2.current.focus();
                          }
                          // else setFirstDigit('');1
                        }}
                        keyboardType="numeric"
                        maxLength={1}
                        style={styles.textInput_otp}
                        value={firstDigit}
                        onKeyPress={({nativeEvent}) => {
                          if (
                            nativeEvent.key == 'Backspace' &&
                            setFirstDigit != ' '
                          ) {
                            setFirstDigit('');
                          }
                        }}
                      />
                      <TextInput
                        ref={otp2}
                        contextMenuHidden={true}
                        onChangeText={value => {
                          if (value.length >= 1) {
                            setsecondDigit(value);
                            otp3.current.focus();
                          } else if (value.length < 1) {
                            setsecondDigit('');
                            otp1.current.focus();
                          }
                        }}
                        keyboardType="numeric"
                        maxLength={1}
                        style={styles.textInput_otp}
                        value={secondDigit}
                        // onKeyPress={({nativeEvent}) => {
                        //   if (
                        //     nativeEvent.key == 'Backspace' &&
                        //     setsecondDigit != ' '
                        //   ) {
                        //     setsecondDigit('');

                        //   }
                        // }}
                      />
                      <TextInput
                        keyboardType="numeric"
                        ref={otp3}
                        contextMenuHidden={true}
                        onChangeText={value => {
                          if (value.length >= 1) {
                            setthirdDigit(value);
                            otp4.current.focus();
                          } else if (value.length < 1) {
                            setthirdDigit('');
                            otp2.current.focus();
                          }
                        }}
                        maxLength={1}
                        style={styles.textInput_otp}
                        value={thirdDigit}
                        // onKeyPress={({nativeEvent}) => {
                        //   if (
                        //     nativeEvent.key == 'Backspace' &&
                        //     setthirdDigit != ' '
                        //   ) {
                        //     setthirdDigit('');

                        //   }
                        // }}
                      />
                      <TextInput
                        keyboardType="numeric"
                        ref={otp4}
                        contextMenuHidden={true}
                        onChangeText={value => {
                          if (value.length >= 1) {
                            setforthDigit(value);
                            otp5.current.focus();
                          } else if (value.length < 1) {
                            setforthDigit('');
                            otp3.current.focus();
                          }
                        }}
                        maxLength={1}
                        style={styles.textInput_otp}
                        value={forthDigit}
                        // onKeyPress={({nativeEvent}) => {
                        //   if (
                        //     nativeEvent.key == 'Backspace' &&
                        //     setforthDigit != ''
                        //   ) {
                        //     setforthDigit('');
                        //    otp3.current.focus();
                        //   }
                        // }}
                      />
                      <TextInput
                        keyboardType="numeric"
                        ref={otp5}
                        contextMenuHidden={true}
                        onChangeText={value => {
                          if (value.length >= 1) {
                            setfifthDigit(value);
                            otp6.current.focus();
                          } else if (value.length < 1) {
                            setfifthDigit('');
                            otp4.current.focus();
                          }
                        }}
                        maxLength={1}
                        style={styles.textInput_otp}
                        value={fifthDigit}
                        // onKeyPress={({nativeEvent}) => {
                        //   if (
                        //     nativeEvent.key == 'Backspace' &&
                        //     setfifthDigit != ' '
                        //   ) {
                        //     setfifthDigit('');

                        //   }
                        // }}
                      />
                      <TextInput
                        keyboardType="numeric"
                        maxLength={1}
                        ref={otp6}
                        contextMenuHidden={true}
                        onChangeText={value => {
                          if (value.length >= 1) {
                            setSixDigit(value);
                            otp6.current.focus();
                          } else if (value.length < 1) {
                            setSixDigit('');
                            otp5.current.focus();
                          }
                        }}
                        style={styles.textInput_otp}
                        value={sixDigit}
                        // onKeyPress={({nativeEvent}) => {
                        //   if (
                        //     nativeEvent.key == 'Backspace' &&
                        //     setSixDigit != ' '
                        //   ) {
                        //     setSixDigit('');
                        //     // otp5.current.focus();
                        //   }
                        // }}
                        // onSubmitEditing={verifyOTP}
                      />
                    </View>
                    <View style={{marginTop: 20, alignSelf: 'center'}}>
                      {remainingTime > 0 ? (
                        <Text>Resend Code in {remainingTime} seconds</Text>
                      ) : (
                        <View>
                          <Text>
                            Previous Code Expired. Click Resend Code Button
                          </Text>
                          {/* <Text>Click Resend Code Button</Text> */}
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={styles.otp_yet}>
                    <Text
                      style={{
                        color: COLORS.BLACK,
                        fontSize: 14,
                        fontWeight: '600',
                      }}>
                      Haven't received the code yet?
                    </Text>
                    <TouchableOpacity
                      style={styles.resend_OTP_btn}
                      disabled={disablebutton}
                      onPress={() => resendOTp(email)}>
                      <Text style={styles.resend_otp_text}>Resend Code</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => verifyOTP()}
                    style={{
                      // marginTop: 5,
                      backgroundColor: COLORS.GREEN,
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
                        fontWeight: '700',
                        fontSize: 14,
                        color: COLORS.BLACK,
                      }}>
                      Confirm Code
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
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: 'rgba(86, 84, 84, 0.1)',
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
  otp_yet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  resend_otp_text: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 15,
  },
});
