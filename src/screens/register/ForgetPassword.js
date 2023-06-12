import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Platform,
  Dimensions,Image,
  TouchableOpacity,ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {Formik} from 'formik';
import COLORS from '../../constants/COLORS';
import Input from '../../Components/Input';
import { Message } from '../../../assets/images/Message';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { API } from '../../api/API';
import ActivityLoader from '../../Components/ActivityLoader';

const mobileW = Math.round(Dimensions.get('screen').width);

const validationSchema = Yup.object().shape({
  
  email: Yup.string().email('Invalid Email').required('Email is required'),
  
});

const ForgetPassword = ({navigation}) => {
  const [forLoading,setForLoading] = useState(false)
  const handleRemberPassWord = async values => {
    setForLoading(true)
    try{
      
        await fetch(`${API}/forgetPassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }).then((res) => res.json())
        .then((data) => {
          
          if (data.success !== false) {
            PLATFORM_IOS?
          Toast.show({
            type: 'success',
            text1: 'Email added successfully.',
            
          }):ToastAndroid.show('Email added successfully.', ToastAndroid.SHORT);
          navigation.navigate('ResetPassword', { email: values });
          setForLoading(false)
        } else {
          PLATFORM_IOS?
          Toast.show({
            type: 'error',
            text1: "Email already in use",
            // position: 'bottom',
          }):ToastAndroid.show("Email already in use", ToastAndroid.SHORT);
        
          setForLoading(false)
          
          }
        })}
    catch(err){
console.log(err)
setForLoading(false)
    }
  }
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
          {forLoading?<ActivityLoader /> :""}
        <View style={styles.login_img}>
          <Image
            source={require('../../../assets/images/log.png')}
            resizeMode="contain"
            style={{width: mobileW, }}
          />
        </View>
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
            <Text style={styles.forget_password}>Forgot Your Password?</Text>
            <View style={{marginTop:20}}>
            <Input
            IconLeft={null}
            
            errors={undefined}
            touched={false}
            value={values.email}
            onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
            
            text="Email"
            IconRight={() => (
             
              <Message />
            )}
            mV={10}
            placeholder="Enter your Email"
            
            bW={1}
            textWidth={'22%'}
            placeholderTextColor={COLORS.BLACK}
            autoCapitalize='none'
            
          />
          {errors.email && touched.email && (
                    <Text style={{color: 'red'}}>{errors.email}</Text>
                  )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              
            }}>
            <TouchableOpacity
            onPress={handleSubmit}
              style={{
                marginTop: 5,
                backgroundColor: COLORS.GREEN,
                alignItems: 'center',
                padding: 13,
                borderRadius: 30,
                width: '100%',
              }}>
              <Text style={{fontWeight: '700', fontSize: 14, color: COLORS.BLACK}}>
                RESET PASSWORD
              </Text>
            </TouchableOpacity>
          </View>
          </View>
)}
          </Formik>
          
          
          <View style={styles.mainDiv_donot_account}>
            <Text style={styles.dont_have_text}>Remember your password? </Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
            <Text style={styles.sign_up}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: 65,
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
});
