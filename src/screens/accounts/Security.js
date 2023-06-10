import { View, Text, SafeAreaView,StyleSheet,TextInput} from 'react-native'
import React, { useEffect } from 'react'
import * as Yup from 'yup';
import COLORS from '../../constants/COLORS'
import HorizontalLine from '../../Components/HorizontalLine'
import Header from '../../Components/Header'
import Input from '../../Components/Input'
import { Key } from '../../../assets/svgs/Key'
import {Eye} from '../../../assets/svgs/Eye'
import { Formik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';



const PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const ValidateSchema = Yup.object().shape({
  password: Yup
    .string()
    .matches(
      PasswordRegex,
      'Wachtwoord moet 1 hoofdletter en 1 kleine letter bevatten, 1 cijfer en 1 speciaal teken, en de lengte moet minimaal 8 zijn',
    )
    .required('Voer uw wachtwoord in'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), ''], 'wachtwoorden moeten overeenkomen')
    .required('Voer je wachtwoord opnieuw in'),
});


const Security = () => {
const userRegisterData = useSelector((state)=> state.userRegisterData)
const [code, getCode]= useState('');

useEffect(() => {
  // console.log('data for this User:---------', userRegisterData); 
  console.log("+++++++++++++++",userRegisterData)
}, []);

const UpdatePassword= async (values) =>{
    console.log(values);
    try {
      const response = await axios.post(`${API}/changePassword `, values);
      
      
      if (response.data.message != "Your Email is already exist") {
        PLATFORM_IOS?
        Toast.show({
          type: 'success',
          text1: 'User registered successfully.',
          
        }):ToastAndroid.show('User registered successfully.', ToastAndroid.SHORT);
        navigation.navigate('VerifyEmail', { email: values?.email });
        //  const data=[{ email: values?.email },{ name: values?.name },{ mobile: values?.mobile }]
       
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
    // <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
    //  <Header headerName="Security"  />
    //  <HorizontalLine style={styles.line}/>
     <Formik
  initialValues={{
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }}
  onSubmit={(values) => {
    
    console.log(values);
  }}
>
  {({ handleChange, handleBlur, handleSubmit, values }) => (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
      <Header headerName="Security" />
      <HorizontalLine style={styles.line} />

      <Input
        IconLeft={null}
        autoFocus
        bgColor={COLORS.CREAM}
        IconRight={() => <Key />}
        bR={5}
        bW={0.3}
        bColor={COLORS.BLACK}
        onChangeText={handleChange('currentPassword')}
        onBlur={handleBlur('currentPassword')}
        value={values.currentPassword}
        text="Current Password"
        mV={7}
        textWidth={'50%'}
        placeholder="*************"
        placeholderTextColor={COLORS.GREY}
        style={{
          color: COLORS.BLACK,
          fontFamily: 'Roboto',
          fontWeight: '200',
        }}
      />

      <Input
        IconLeft={null}
        autoFocus
        bgColor={COLORS.CREAM}
        IconRight={() => <Eye />}
        bR={5}
        bW={0.3}
        bColor={COLORS.BLACK}
        onChangeText={handleChange('newPassword')}
        onBlur={handleBlur('newPassword')}
        value={values.newPassword}
        text="New Password"
        mV={15}
        textWidth={'35%'}
        placeholderTextColor={COLORS.GREY}
        style={{
          color: COLORS.BLACK,
          fontFamily: 'Roboto',
          fontWeight: '200',
        }}
      />

      <Input
        IconLeft={null}
        autoFocus
        bgColor={COLORS.CREAM}
        IconRight={() => <Eye />}
        bR={5}
        bW={0.3}
        bColor={COLORS.BLACK}
        onChangeText={handleChange('confirmNewPassword')}
        onBlur={handleBlur('confirmNewPassword')}
        value={values.confirmNewPassword}
        text="Re-enter New Password"
        mV={7}
        textWidth={'53%'}
        placeholderTextColor={COLORS.GREY}
        style={{
          color: COLORS.BLACK,
          fontFamily: 'Roboto',
          fontWeight: '200',
        }}
      />

    </SafeAreaView>
  )}
</Formik>
              
            // </SafeAreaView>
  )
}
const styles = StyleSheet.create({
mainDiv_container: {
  paddingHorizontal: 20,
  marginLeft:20,
  marginRight:20,
  paddingTop: 30,
  marginTop:30,
  paddingBottom:30 ,
  borderRadius:4,
  border:14,
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
  shadowColor: Platform.OS === 'android' ?'black' :"rgba(0,0,0,.555)", // Shadow color
  shadowOffset: {
    width: 6, 
    height: 4, 
  },
  shadowOpacity: 1, 
  shadowRadius: 4, 
  elevation: Platform.OS === 'android' ? 8 : 0,
},
line:{
  marginTop:50,
  marginBottom:10,
  marginHorizontal:5,
}
});

export default Security