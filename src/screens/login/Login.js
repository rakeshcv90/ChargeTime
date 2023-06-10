import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Platform,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import React, {useState} from 'react';
import COLORS from '../../constants/COLORS';
import Toast from 'react-native-toast-message';
import {API} from '../../api/API';
import Input from '../../Components/Input';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '../../../assets/images/Message';
import { Eye } from '../../../assets/images/Eye';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

export default function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  // const toggleSecureTextEntry = () => {
  //   setIsSecureTextEntry(!isSecureTextEntry);
  // };
  const loginFunction = async () => {
    try{
    await fetch(`${API}/logins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(data => {
       
        AsyncStorage.setItem('loginDataOne', JSON.stringify(data.locationid ));
       
        if (data.status == 'success') {
          PLATFORM_IOS?
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            
          }):ToastAndroid.show('Login Successful', ToastAndroid.SHORT);

          navigation.navigate('DrawerStack');
          // navigation.navigate('Home');
        } else {
          PLATFORM_IOS?
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            
          }):ToastAndroid.show('Login Failed', ToastAndroid.SHORT);

        }
       
        
      })
      .catch((error) => {
        console.error(error);
      });
    }catch(err){
      console.log(err)
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.login_img}>
          <Image
            source={require('../../../assets/images/log.png')}
            resizeMode="contain"
            style={{width: mobileW, }}
          />
        </View>
        <View style={styles.login_css}>
          <Text style={styles.login}>Login</Text>
          
          <Input
            IconLeft={null}
            
            errors={undefined}
            touched={false}
            value={email}
            onChangeText={text => setEmail(text)}
            text="Email"
            IconRight={() => (
             
              <Message />
            )}
            mV={20}
            placeholder="Enter your Email"
            
            bW={1}
            textWidth={'22%'}
            placeholderTextColor={COLORS.BLACK}
            autoCapitalize='none'
            
          />
          
          <Input
            IconLeft={null}
            
            errors={undefined}
            touched={false}
            secureTextEntry={true}
            placeholderTextColor={COLORS.BLACK}
            text="Password"
            
            onChangeText={text => setPassword(text)}
            value={password}
            IconRight={() => (
              <Eye />
            )}
            mV={5}
            placeholder="Enter your password"
            bW={1}
            textWidth={'30%'}
            
          />
          <View style={styles.main_div_lock_img}>
            <Image source={require('../../../assets/images/lock_two.png')} resizeMode='contain' style={{width:20,height:20}} />
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgot_password}>Forgot my password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',

              marginHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={loginFunction}
              style={{
                marginTop: 20,
                backgroundColor: COLORS.GREEN,
                alignItems: 'center',
                padding: 13,
                borderRadius: 10,
                width: '100%',
              }}>
              <Text style={styles.log_In_btn}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainDiv_donot_account}>
            <Text style={styles.dont_have_text}>Don't have an account? </Text>
            <TouchableOpacity onPress={() =>  navigation.navigate('Register', { email: 'email',user_id:'user_id' })
      }>
              <Text style={styles.sign_up}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_page: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_img: {
    width: mobileW,
    
  },
  img_width: {
    width: mobileW,
    height: mobileH * 0.45,
  },
  login_css: {
   
    paddingBottom: 15,
    marginHorizontal: 20,
    // marginTop: 110,

    borderRadius: 10,
    
  },
  
  login: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
    paddingVertical: 10,
    letterSpacing: 1,
  },
  email: {
    paddingTop: 12,
    paddingBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  email_placeholder: {
    backgroundColor: `rgba(86, 84, 84, 0.1)`,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  main_div_lock_img: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 10,
  },

  forgot_password: {
    // letterSpacing: 1,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  mainDiv_donot_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  dont_have_text: {
    fontSize: Platform.OS === 'ios' ? 14 : 15,
    fontWeight: '500',
  },
  sign_up: {
    fontSize: Platform.OS === 'ios' ? 16 : 15,
    fontWeight: '600',
    color: 'black',
  },
  log_In_btn: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? 700 : 700,
  },
});
