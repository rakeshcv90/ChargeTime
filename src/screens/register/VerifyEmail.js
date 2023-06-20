import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  useColorScheme,
  Platform,
  ToastAndroid,ScrollView
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';


import COLORS from '../../constants/COLORS';
import {API} from '../../api/API';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import ActivityLoader from '../../Components/ActivityLoader';
import AnimatedLottieView from 'lottie-react-native';

//   const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('screen').width);

export default function VerifyEmail(props) {
 
  
  const {navigation, route} = props;
  const {email,user_id} = route?.params;
  
  const [emailCheck,setEmailCheck] = useState(false)
  const [stopTimer,setStopTimer] = useState(false)
  const [statusCheck,setStatusCheck] = useState(false)
  
  const [forLoading,setForLoading] = useState(false)
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
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const inputRefs = useRef([]);
  const verifyOTP = async () => {
    setForLoading(true)
    const otp =
      firstDigit +
      secondDigit +
      thirdDigit +
      forthDigit +
      fifthDigit +
      sixDigit;
    
    try {
      if(email !== '' && otp !== ''){
      await fetch(`${API}/verifyotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pwa_email:email,  otp:otp}),
      }).then((res) => res.json())
      .then((data) => {
        if (data.message !== "Invalid OTP or OTP expired") {
          PLATFORM_IOS?
        Toast.show({
          type: 'success',
          text1: 'OTP verification successfull.',
          
        }):ToastAndroid.show('OTP verification successfull.', ToastAndroid.SHORT);
        navigation.navigate('CompleteProfile', { email: email,user_id:user_id });
        setForLoading(false)
      } else {
        PLATFORM_IOS?
        Toast.show({
          type: 'error',
          text1: "Invalid OTP or OTP expired",
          // position: 'bottom',
        }):ToastAndroid.show("Invalid OTP or OTP expired", ToastAndroid.SHORT);
      
        setForLoading(false)
        
        }
      })}else{
        PLATFORM_IOS?
        Toast.show({
          type: 'error',
          text1: "Please fill required details",
          // position: 'bottom',
        }):ToastAndroid.show("Please fill required details", ToastAndroid.SHORT);
      } 
      setForLoading(false)
      
    } catch (error) {
      console.error(error);
      setForLoading(false)
    }
  };
  const resendOTp = async () => {
    try {
      await fetch(`${API}/resendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pwa_email: email}),
      }).then((res) => res.json())
      .then((data) => {
        if (data.message === "New OTP sent successfully") {
          setStatusCheck(false)
          PLATFORM_IOS?
        Toast.show({
          type: 'success',
          text1: 'New OTP sent successfully',
          
        }):ToastAndroid.show('New OTP sent successfully', ToastAndroid.SHORT);
        
        
      } else {
        PLATFORM_IOS?
        Toast.show({
          type: 'error',
          text1: "Otp not send",
          // position: 'bottom',
        }):ToastAndroid.show("Otp not send", ToastAndroid.SHORT);
      }
      })
    } catch (error) {
      console.error(error);
      // Handle network errors or other exceptions
    }
  };

  const resendLink = async () => {
    try {
      await fetch(`${API}/resetemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pwa_email: email}),
      }).then((res) => res.json())
      .then((data) => {
       
        if (data.message !== "Invalid Email") {
          setEmailCheck(true)
          setStatusCheck(true)
          PLATFORM_IOS?
        Toast.show({
          type: 'success',
          text1: 'Email sent successfully',
          
        }):ToastAndroid.show('Email sent successfully', ToastAndroid.SHORT);
        
        
      } else {
        PLATFORM_IOS?
        Toast.show({
          type: 'error',
          text1: "Invalid Email",
          // position: 'bottom',
        }):ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
      }
      })
    } catch (error) {
      console.error(error);
      // Handle network errors or other exceptions
    }
  }
  

useEffect(() => {
  let stopTimer;

  const sendToAnotherPage = async () => {
    try {
      const response = await fetch(`${API}/emailverify/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data, 'vvv');
      if (data.status.email_verified === 1) {
        navigation.navigate('CompleteProfile', { email: email, user_id: user_id });
        clearInterval(stopTimer);
      }
    } catch (error) {
      console.error(error);
      // Handle network errors or other exceptions
    }
  };

  if (emailCheck) {
    stopTimer = setInterval(() => {
      sendToAnotherPage();
    }, 2000);
  }

  return () => {
    clearInterval(stopTimer); 
  };
}, [emailCheck]);


  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
      {forLoading?<ActivityLoader /> :""}
        <View style={styles.mainDiv_container}>
          <View style={styles.mainDiv_verify_email}>
            <Text style={styles.VerifyEmail_text}>Verify your email</Text>
            <Text style={styles.confirm_text}>Confirm your email address</Text>
            <Text style={styles.sendOtp_text}>
             {statusCheck ? `We have sent a verification email to:` : `We have sent a confirmation OTP email to:`}
            </Text>
            <TextInput
              style={[
                styles.sendOtp_email,
                {color: isDark ? COLORS.BLACK : COLORS.BLACK},
              ]}
              placeholder="Eg. john2xyz.com"
              placeholderTextColor={COLORS.BLACK}
                value={email}
            />
            <Text style={styles.check_yourinbox}>
              {statusCheck? `Check your inbox and click on the button to confirm your account.
` : `Check your inbox and input the OTP here to confirm your account.`}
            </Text>
          </View>
          <View style={styles.otp_yet}>
            <Text style={statusCheck? {color:COLORS.BLACK,fontSize:14,fontWeight:"400"}:{color:COLORS.BLACK,fontSize:14,fontWeight:"600"}}
>
             {statusCheck?`Verify with OTP instead.`:`Haven't received the OTP yet?`}
            </Text>
            <TouchableOpacity style={styles.resend_OTP_btn} onPress={resendOTp}>
              <Text style={styles.resend_otp_text}>{statusCheck?`Send OTP`:`Resend OTP`}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: mobileW,
            }}>
            <Image source={require('../../../assets/images/dotted.png')} style={{width: mobileW * 0.9 }} />

            <Text
              style={{
                alignSelf: 'center',
                position: 'relative',
                right: mobileW / 2,
                backgroundColor: COLORS.CREAM,
                padding: 10
              }}>
              OR
            </Text>
          </View>
          <View style={styles.otp_yet}>
            <Text style={statusCheck? {color:COLORS.BLACK,fontSize:14,fontWeight:"600",width:mobileW*0.6}:{color:COLORS.BLACK,fontSize:14,fontWeight:"400"}}>
              {statusCheck? `Haven’t received verification email yet?`:`Receive verification email instead.`}
            </Text>
            <TouchableOpacity style={styles.resend_OTP_btn} onPress={resendLink}>
              <Text style={styles.resend_otp_text}>{ statusCheck?`Resend Link`:`Send Link`}</Text>
            </TouchableOpacity>
          </View>
          {statusCheck ?
          <View style={{paddingTop:80}} >
            
            <AnimatedLottieView
                  source={{
                    uri: 'https://assets4.lottiefiles.com/packages/lf20_qliQPUmnXJ.json',
                  }} // Replace with your animation file
                  autoPlay
                  loop
                  // style={{width: 50, height: 50}}
                />
                
                <Text style={{textAlign:"center",fontWeight:"500",fontSize:14,color:COLORS.BLACK}}>Waiting For Account Verification</Text>
          </View>:
          <View style={[styles.mainDiv_verify_email, styles.enter_Otp]}>
            <Text style={styles.havenot_received_email}>
              Enter the OTP Below
            </Text>
            <View style={styles.otp_box}>
              <TextInput
                ref={otp1}
                onChangeText={value => {
                  setFirstDigit(value);
                  value != '' ? otp2.current.focus() : setFirstDigit('');
                }}
                keyboardType="numeric"
                maxLength={1}
                style={styles.textInput_otp}
              />
              <TextInput
                ref={otp2}
                onChangeText={value => {
                  setsecondDigit(value);
                  value != '' ? otp3.current.focus() : otp1.current.focus();
                }}
                keyboardType="numeric"
                maxLength={1}
                style={styles.textInput_otp}
              />
              <TextInput
                keyboardType="numeric"
                ref={otp3}
                onChangeText={value => {
                  setthirdDigit(value);
                  value != '' ? otp4.current.focus() : otp2.current.focus();
                }}
                maxLength={1}
                style={styles.textInput_otp}
              />
              <TextInput
                keyboardType="numeric"
                ref={otp4}
                onChangeText={value => {
                  setforthDigit(value);
                  value != '' ? otp5.current.focus() : otp3.current.focus();
                }}
                maxLength={1}
                style={styles.textInput_otp}
              />
              <TextInput
                keyboardType="numeric"
                ref={otp5}
                onChangeText={value => {
                  setfifthDigit(value);
                  value != '' ? otp6.current.focus() : otp4.current.focus();
                }}
                maxLength={1}
                style={styles.textInput_otp}
              />
              <TextInput
                keyboardType="numeric"
                ref={otp6}
                onChangeText={value => {
                  setSixDigit(value);
                  value != '' ? otp6.current.focus() : otp5.current.focus();
                }}
                maxLength={1}
                style={styles.textInput_otp}
              />
            </View>
          </View>
}
{statusCheck?'':
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',

              // paddingVertical:20
            }}>
            <TouchableOpacity
              onPress={verifyOTP}
              style={{
                marginTop: 20,
                backgroundColor: '#B1D34F',
                alignItems: 'center',
                padding: 13,
                borderRadius: 10,
                width: '100%',
              }}>
              <Text
                style={{color: COLORS.BLACK, fontSize: 14, fontWeight: '700'}}>
                VERIFY EMAIL
              </Text>
            </TouchableOpacity>
          </View>
}
          <View style={styles.mainDiv_VErify_account}>
            <Text style={styles.wrong_email_text}>Entered wrong email? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.make_changes}>Go back to make changes.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainDiv_container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  signup_img: {
    width: mobileW,
  },
  mainDiv_verify_email: {
    // paddingTop: 20,
    paddingBottom: 15,
    borderRadius: 15,
  },
  verification_email: {
    fontSize: 14,
    fontWeight: '400',
    color:COLORS.BLACK
  },
  otp_yet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  VerifyEmail_text: {
    fontWeight: '800',
    fontSize: 24,
    color: COLORS.BLACK,
    paddingBottom: 20,
  },
  confirm_text: {
    fontWeight: '600',
    fontSize: 14,
    color: COLORS.BLACK,
  },

  sendOtp_text: {
    fontWeight: 400,
    color: COLORS.BLACK,
    paddingBottom: 20,
  },
  sendOtp_email: {
    backgroundColor: COLORS.BROWN,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  check_yourinbox: {
    fontWeight: 400,
    color: COLORS.BLACK,
    paddingTop: 20,
  },

  havenot_received_email: {
    fontSize:  14,
    fontWeight: '600',
    color:COLORS.BLACK
  },
  resend_OTP_btn: {
    paddingVertical: 9,
    borderColor: COLORS.BLACK,
    borderWidth: 1,
    width: 130,
    borderRadius: 50,
    marginTop: Platform.OS === 'ios' ? 0 : 5,
  },
  resend_otp_text: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 15,
  },
  enter_Otp: {
    marginTop: 20,
  },
  otp_box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    paddingTop: 15,
  },
  textInput_otp: {
    width: 50,
    height: Platform.OS === 'ios' ? 50 : 50,
    borderRadius: 15,
    backgroundColor: COLORS.BROWN,
    paddingHorizontal: 20,
  },
  mainDiv_VErify_account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
     paddingTop: 20,
  },
  wrong_email_text: {
    fontSize: 14,
    fontWeight: '400',
  },
  make_changes: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
});
