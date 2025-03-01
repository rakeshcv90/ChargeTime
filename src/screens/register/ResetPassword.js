/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Formik} from 'formik';
import COLORS from '../../constants/COLORS';
import Input from '../../Components/Input';
import {StrongPass} from '../../../assets/images/StrongPass';
import {API} from '../../api/API';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import {ms} from 'react-native-size-matters';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import ActivityLoader from '../../Components/ActivityLoader';
const PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()-_+='":;,.?/~`[{}<>€£¥÷×])[A-Za-z\d!@#$%&*()-_+='":;,.?/~`[{}<>€£¥÷×]{8,}$/;
const validationSchema = Yup.object().shape({
  // password: Yup.string()
  //   .matches(
  //     PasswordRegex,
  //     'Password must contain 1 uppercase and 1 lowercase letter, 1 digit and 1 special character, and the length must be at least 8',
  //   )
  //   .required('Password is required'),
  // password_confirmation: Yup.string()
  //   .matches(
  //     PasswordRegex,
  //     'Password must contain 1 uppercase and 1 lowercase letter, 1 digit and 1 special character, and the length must be at least 8',
  //   )
  //   .required('Password is required'),
  password: Yup.string()
    .matches(
      PasswordRegex,
      'Password must contain 1 Upper-Case letter, 1 Lower-Case letter, 1 Digit, 1 Special Character(@,$,-,^,&, !), and the length must be at least 8 characters',
    )
    .required('Please Enter New Password '),
  password_confirmation: Yup.string()
    // .oneOf([Yup.ref('newPassword'), ''], 'Confirm Password does Not Match')

    .oneOf([Yup.ref('password')], 'Confirm Password does not Match')
    .required('Please Enter Re-enter Password'),
});

const mobileW = Math.round(Dimensions.get('screen').width);
const ResetPassword = props => {
  const {navigation, route} = props;
  const {email} = route?.params;
  const [forLoading, setForLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const handleResetPasswordSubmit = async values => {
    setForLoading(true);
    try {
      const payload = {
        ...values, // Formik form values
        ...email, // Additional props data
      };

      await fetch(`${API}/resetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success !== false) {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'success',
                  text1: 'Password Reset Successfully.',
                })
              : ToastAndroid.show(
                  'Password Reset Successfully.',
                  ToastAndroid.SHORT,
                );
            navigation.navigate('Login');
            setForLoading(false);
          } else {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'error',
                  text1: 'Password did not reset Successfully.',
                  // position: 'bottom',
                })
              : ToastAndroid.show(
                  'Password did not reset Successfully.',
                  did.SHORT,
                );
            setForLoading(false);
          }
        });
    } catch (err) {
      console.log(err);
      setForLoading(false);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
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
              password: '',
              password_confirmation: '',
              email: email,
            }}
            onSubmit={values => handleResetPasswordSubmit(values)}
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
                  <Text style={styles.forget_password}>Reset Password?</Text>
                  <View style={{marginTop: 20}}>
                    <Input
                      IconLeft={null}
                      errors={errors.password}
                      touched={touched.password}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      text="New Password"
                      passwordInput={true}
                      pasButton={() => setShowPassword(!showPassword)}
                      secureTextEntry={showPassword}
                      passwordInputIcon={showPassword}
                      mV={10}
                      placeholder="Enter your new password..."
                      bW={1}
                      textWidth={ms(89)}
                      placeholderTextColor={COLORS.HALFBLACK}
                      autoCapitalize="none"
                      keyboardType="numbers-and-punctuation"
                    />
                    <Input
                      IconLeft={null}
                      errors={errors.password_confirmation}
                      touched={touched.password_confirmation}
                      value={values.password_confirmation}
                      onChangeText={handleChange('password_confirmation')}
                      onBlur={handleBlur('password_confirmation')}
                      text="Re-enter Password"
                      passwordInput={true}
                      pasButton={() => setConfirmPassword(!confirmPassword)}
                      secureTextEntry={confirmPassword}
                      passwordInputIcon={confirmPassword}
                      mV={10}
                      placeholder="Re-enter your new password.."
                      bW={1}
                      textWidth={ms(109)}
                      placeholderTextColor={COLORS.HALFBLACK}
                      autoCapitalize="none"
                    />
                    {/* {values.password !== values.password_confirmation &&
                    touched.password &&
                    touched.password_confirmation ? (
                      <Text style={{color: 'red'}}>
                        Password does not match
                      </Text>
                    ) : (
                      <Text />
                    )} */}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',

                    marginBottom: 20,
                  }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
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
                      Change Password
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  super_div: {
    marginHorizontal: 20,
  },
  login_img: {
    width: mobileW,
  },
  mainDiv_forget_ur_pass: {
    marginTop: 25,
    marginBottom: 10,

    paddingVertical: 20,
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
});
