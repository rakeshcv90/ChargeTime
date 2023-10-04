import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import * as Yup from 'yup';
import COLORS from '../../constants/COLORS';
import HorizontalLine from '../../Components/HorizontalLine';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import {Key} from '../../../assets/svgs/Key';
import {Eye} from '../../../assets/svgs/Eye';
import {Formik} from 'formik';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API} from '../../api/API';
import Toast from 'react-native-toast-message';
import {DIMENSIONS, PLATFORM_IOS} from '../../constants/DIMENSIONS';
import {navigationRef} from '../../../App';
import {ms} from 'react-native-size-matters';
import * as yup from 'yup';
import ActivityLoader from '../../Components/ActivityLoader';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()-_+='":;,.?/~`[{}<>€£¥÷×])[A-Za-z\d!@#$%&*()-_+='":;,.?/~`[{}<>€£¥÷×]{8,}$/;

const ValidateSchema = yup.object().shape({
  oldPassword: yup
    .string()

    .required('Please Enter Old Password'),
  newPassword: yup
    .string()
    .matches(
      passwordRegex,
      'The password must contain 1 uppercase letter and 1 lowercase letter, 1 digit and 1 special character, and must be at least 8 in length.',
    )
    .required('Please Enter New Password '),
  conpassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), ''], 'Confirm Password Not Match')
    .required('Please Enter Confirm Password'),
});
const Security = () => {
  const userProfileData = useSelector(state => state.userProfileData);
  const [isEditable, setIsEditable] = useState(false);
  //  const [currentPassword, setCurrentPassword] = useState('');
  //const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [showNew1, setShowNew1] = useState(false);
  const [showReE, setShowReE] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [Password, setPassword] = useState(true);
  const [keyPressed, setKeyPressed] = useState(true);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const [showButton, setShowButton] = useState(false);

  const mobileW = Math.round(Dimensions.get('screen').width);

  const mail = userProfileData[0]?.email;
  const enableEdit = () => {
    setIsEditable(true);
  };
  const UpdatePassword = async (value, action) => {
    setLoader(true);
    try {
      await fetch(`${API}/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pwa_email: mail,
          old_password: value.oldPassword,
          password: value.newPassword,
          conifrm_password: value.conpassword,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success !== false) {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'success',
                  text1: 'Password updated Successfully',
                })
              : ToastAndroid.show(
                  'Password updated Successfully',
                  ToastAndroid.SHORT,
                );
            setIsEditable(false);
            // navigationRef.navigate('Account');

            setErrors({});
            action.resetForm();
            setLoader(false);
          } else {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'error',
                  text1: 'Current password does not match',
                  // position: 'bottom',
                })
              : ToastAndroid.show(
                  'Current password does not match',
                  ToastAndroid.SHORT,
                );
            action.resetForm();
            setLoader(false);
          }
        });
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        action.resetForm();
        setLoader(false);
      }
      action.resetForm();
      setLoader(false);
    }
  };

  const keyPress = () => {
    setKeyPressed(!keyPressed);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <Header
        headerName="Security"
        editShow={true}
        // onPress={onPress}
        // enableEdit={enableEdit}
        // editButton={isEditable}
      />

      {Platform.OS == 'android' ? (
        <HorizontalLine style={styles.line} />
      ) : (
        <View style={{}}>
          <Image
          source={require('../../../assets/images/dotted.png')}
          style={{width: mobileW * 0.99}}
          resizeMode='stretch'
          />
        </View>
      )}
      <ActivityLoader visible={loader} />
      <View style={[styles.mainDiv_container]}>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            conpassword: '',
          }}
          onSubmit={(values, action) => UpdatePassword(values, action)}
          validationSchema={ValidateSchema}>
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            setFieldError,
            resetForm,
          }) => (
            <View>
              <View style={styles.second_mainDiv_signup}>
                <Input
                  IconLeft={null}
                  bgColor={COLORS.CREAM}
                  editable={isEditable}
                  placeholderTextColor={COLORS.HALFBLACK}
                  text=" Current Password"
                  // passwordInput={true}
                  // pasButton={() => setShowPassword(!showPassword)}
                  IconRight={() => <Key onPress={() => keyPress()} />}
                  secureTextEntry={keyPressed}
                  passwordInputIcon={!showPassword}
                  placeholder="*************"
                  errors={errors.oldPassword}
                  touched={touched.oldPassword}
                  value={values.oldPassword}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  mV={15}
                  bW={1}
                  bR={3}
                  textWidth={ms(120)}
                  style={{
                    color: COLORS.BLACK,
                    fontFamily: 'Roboto',
                    fontWeight: '200',
                  }}
                />

                <Input
                  IconLeft={null}
                  bgColor={COLORS.CREAM}
                  editable={isEditable}
                  placeholderTextColor={COLORS.BLACK}
                  passwordInput={true}
                  pasButton={() => {
                    setHidePassword(!hidePassword);
                    setShowNew(!showNew);
                  }}
                  secureTextEntry={hidePassword}
                  passwordInputIcon={!showNew}
                  placeholder=""
                  errors={errors.newPassword}
                  touched={touched.newPassword}
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  text="New Password"
                  mV={5}
                  bW={1}
                  bR={3}
                  textWidth={ms(100)}
                  style={{
                    color: COLORS.BLACK,
                    fontFamily: 'Roboto',
                    fontWeight: '200',
                  }}
                />

                <Input
                  IconLeft={null}
                  bgColor={COLORS.CREAM}
                  editable={isEditable}
                  placeholderTextColor={COLORS.HALFBLACK}
                  passwordInput={true}
                  pasButton={() => {
                    setPassword(!Password);
                    setShowNew1(!showNew1);
                  }}
                  secureTextEntry={Password}
                  passwordInputIcon={!showNew1}
                  placeholder=""
                  errors={errors.conpassword}
                  touched={touched.conpassword}
                  value={values.conpassword}
                  onChangeText={handleChange('conpassword')}
                  onBlur={handleBlur('conpassword')}
                  text="Re-enter New Password"
                  mV={15}
                  bW={1}
                  bR={3}
                  textWidth={ms(145)}
                  style={{
                    color: COLORS.BLACK,
                    fontFamily: 'Roboto',
                    fontWeight: '200',
                  }}
                />
                {/* {!showButton && (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 13,
                      textAlign: 'center',
                      marginVertical: -10,
                    }}>
                    {errors.conpassword}
                  </Text>
                )} */}
              </View>
              {showButton && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginVertical: (DIMENSIONS.SCREEN_HEIGHT * 2) / 100,

                    marginRight: -30,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      // setFieldValue('conpassword', '');
                      // setFieldValue('newPassword', '');
                      // setFieldValue('oldPassword','');
                      // setFieldTouched('conpassword', false);
                      // setFieldTouched('newPassword',false);
                      // setFieldTouched('oldPassword',false);
                      // setFieldError('conpassword', '')
                      resetForm();

                      setShowButton(false);
                      setTimeout(() => {
                        setIsEditable(false);
                      }, 100);
                    }}
                    style={{
                      width: DIMENSIONS.SCREEN_WIDTH * 0.3,
                      height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
                      backgroundColor: '#ffffff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,

                      alignSelf: 'flex-end',
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
                        fontSize: 17,
                        fontWeight: '700',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={{
                      width: DIMENSIONS.SCREEN_WIDTH * 0.3,
                      height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
                      backgroundColor: '#B1D34F',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                      borderRadius: 10,

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
                        fontSize: 17,
                        fontWeight: '700',
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </Formik>

        {!showButton && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginVertical: (DIMENSIONS.SCREEN_HEIGHT * 2) / 100,

              marginRight: -30,
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsEditable(true);
                setShowButton(true);
              }}
              style={{
                width: DIMENSIONS.SCREEN_WIDTH * 0.3,
                height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
                backgroundColor: '#B1D34F',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 10,

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
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainDiv_container: {
    paddingHorizontal: 20,
    marginLeft: 20,
    marginRight: 20,
    // paddingTop: 30,
    marginTop: 15,
    paddingBottom: 30,
    borderRadius: 4,
    border: 14,
  },
  textdata: {
    fontWeight: 800,
    fontSize: 15,
    color: COLORS.BLACK,
  },

  textinput: {
    backgroundColor: COLORS.BROWN,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  forPaddingTOP: {
    paddingTop: 20,
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: Platform.OS === 'android' ? 'black' : 'rgba(0,0,0,.555)', // Shadow color
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  line: {
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.CREAM,
  },
  headerButton: {
    paddingHorizontal: 10,
  },
  backButton: {
    width: 40,
  },
  headerText: {
    fontFamily: 'Roboto',
    color: COLORS.BLACK,
    fontSize: 20,
    fontWeight: '700',
    width: 250,
    lineHeight: 26,
    letterSpacing: 0.5,
    height: 30,
  },
  rightButton: {
    width: 40,
  },
});

export default Security;
