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
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import {navigationRef} from '../../../App';
import {ms} from 'react-native-size-matters';

const Security = () => {
  const userProfileData = useSelector(state => state.userProfileData);
  const [isEditable, setIsEditable] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [showNew1, setShowNew1] = useState(false);
  const [showReE, setShowReE] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [Password, setPassword] = useState(true);
  const [keyPressed, setKeyPressed] = useState(true);
  const [errors, setErrors] = useState({});

  const mobileW = Math.round(Dimensions.get('screen').width);
  const PasswordRegex = /[!@#$%^&*(),.?":{}|<>]/g;
  const onPress = async () => {
    if (currentPassword.trim().length <= 0) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Enter Old Password',
          })
        : ToastAndroid.show('Please Enter Old Password', ToastAndroid.SHORT);
    } else if (newPassword.trim().length <= 0) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Enter New Password',
          })
        : ToastAndroid.show('Please Enter New Password', ToastAndroid.SHORT);
    } else if (PasswordRegex.test(newPassword[0])) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'First Place Special Characters Not Allowed',
          })
        : ToastAndroid.show(
            'First Place Special Characters Not Allowed',
            ToastAndroid.SHORT,
          );
    } else if (PasswordRegex.test(confirmPassword[0])) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'First Place Special Characters Not Allowed',
          })
        : ToastAndroid.show(
            'First Place Special Characters Not Allowed',
            ToastAndroid.SHORT,
          );
    } else if (confirmPassword.trim().length <= 0) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Enter Confirm Password',
          })
        : ToastAndroid.show(
            'Please Enter Confirm Password',
            ToastAndroid.SHORT,
          );
    } else if (confirmPassword != newPassword) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Confirm Password Not Match',
          })
        : ToastAndroid.show('Confirm Password Not Match', ToastAndroid.SHORT);
    } else {
      // UpdatePassword();
    }
  };

  const mail = userProfileData[0]?.email;
  const enableEdit = () => {
    setIsEditable(true);
  };
  const UpdatePassword = async () => {
    try {
      // const values = { password: newPassword, confirmPassword };

      // await ValidateSchema.validate(values, { abortEarly: false });
      await fetch(`${API}/changePassword `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pwa_email: mail,
          old_password: currentPassword,
          password: newPassword,
          conifrm_password: confirmPassword,
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
            setCurrentPassword(' ');
            setNewPassword(' ');
            setConfirmPassword(' ');
            setErrors({});
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
          }
        });
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
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
        onPress={onPress}
        enableEdit={enableEdit}
        editButton={isEditable}
      />

      {Platform.OS == 'android' ? (
        <HorizontalLine style={styles.line} />
      ) : (
        <View style={{}}>
          <Image
            source={require('../../../assets/images/dotted.png')}
            style={{width: mobileW * 0.97}}
          />
        </View>
      )}

      <View style={[styles.mainDiv_container]}>
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
          error={errors.currentPassword}
          onChangeText={text => setCurrentPassword(text)}
          value={currentPassword}
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
        {/* {errors.password && touched.password && (
                    <Text style={{color: 'red'}}>{errors.password}</Text>
                  )} */}

        <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          editable={isEditable}
          placeholderTextColor={COLORS.BLACK}
          passwordInput={true}
          error={errors.newPassword}
          pasButton={() => {
            setHidePassword(!hidePassword);
            setShowNew(!showNew);
          }}
          secureTextEntry={hidePassword}
          passwordInputIcon={!showNew}
          placeholder=""
          onChangeText={text => setNewPassword(text)}
          value={newPassword}
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
        {/* {errors.password && touched.password && (

                    <Text style={{color: 'red'}}>{errors.password}</Text>
                  )} */}

        <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          editable={isEditable}
          placeholderTextColor={COLORS.HALFBLACK}
          passwordInput={true}
          error={errors.confirmPassword}
          pasButton={() => {
            setPassword(!Password);
            setShowNew1(!showNew1);
          }}
          secureTextEntry={Password}
          passwordInputIcon={!showNew1}
          placeholder=""
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
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
        {/* {errors.password && touched.password && (
                    <Text style={{color: 'red'}}>{errors.password}</Text>
                  )} */}
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
