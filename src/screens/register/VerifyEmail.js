import React, {useState, useRef} from 'react';
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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Sign_up} from '../../assets/images/Sign_up';
import {ScrollView} from 'react-native-gesture-handler';
import COLORS from '../../constants/COLORS';
import {Colors} from 'react-native/Libraries/NewAppScreen';

//   const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('screen').width);

export default function VerifyEmail() {
  const [firstDigit, setFirstDigit] = useState('');
  const [secondDigit, setsecondDigit] = useState('');
  const [thirdDigit, setthirdDigit] = useState('');
  const [forthDigit, setforthDigit] = useState('');
  const [fifthDigit, setfifthDigit] = useState('');

  const otp1 = useRef(null);
  const otp2 = useRef(null);
  const otp3 = useRef(null);
  const otp4 = useRef(null);
  const otp5 = useRef(null);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const inputRefs = useRef([]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView>
        <View style={styles.mainDiv_container}>
          <View style={[styles.mainDiv_verify_email, styles.shadowProp]}>
            <Text style={styles.VerifyEmail_text}>Verify your email</Text>
            <Text style={styles.confirm_text}>Confirm your email address</Text>
            <Text style={styles.sendOtp_text}>
              We have sent a confirmation OTP email to:
            </Text>
            <TextInput
              style={[
                styles.sendOtp_email,
                {color: isDark ? COLORS.BLACK : COLORS.BLACK},
              ]}
              placeholder="Eg. john2xyz.com"
              placeholderTextColor={{color: 'black'}}
            />
            <Text style={styles.check_yourinbox}>
              Check your inbox and input the OTP here, button to confirm your
              account.
            </Text>
          </View>
          <View
            style={[
              styles.mainDiv_verify_email,
              styles.shadowProp,
              styles.haveNot_received,
            ]}>
            <Text style={styles.havenot_received_email}>
              Haven't received the OTP yet?
            </Text>
            <TouchableOpacity style={styles.resend_OTP_btn}>
              <Text style={styles.resend_otp_text}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.mainDiv_verify_email,
              styles.shadowProp,
              styles.enter_Otp,
            ]}>
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
                  value != '' ? otp5.current.focus() : otp4.current.focus();
                }}
                maxLength={1}
                style={styles.textInput_otp}
              />
            </View>
          </View>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            paddingVertical:20
          }}>
          <TouchableOpacity
            //onPress={() => navigation.navigate('VerifyEmail')}
            style={{
              marginTop: 20,
              backgroundColor: '#B1D34F',
              alignItems: 'center',
              padding: 13,
              borderRadius: 30,
              width: 180,
            }}>
            <Text style={{color: COLORS.WHITE, fontSize: 14, fontWeight: '700'}}>
              VERIFY EMAIL
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainDiv_VErify_account}>
          <Text style={styles.wrong_email_text}>Entered wrong email? </Text>
          <Text style={styles.make_changes}>Go back to make changes.</Text>
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
    paddingHorizontal: 20,
    //backgroundColor: COLORS.GRAY,
    paddingTop: 20,
    paddingBottom: 25,
    borderRadius:15
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: Platform.OS === 'android' ?'black' :"rgba(0,0,0,.555)", // Shadow color
    shadowOffset: {
      width: 6, // Horizontal offset
      height: 4, // Vertical offset
    },
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 4, // Shadow radius
    elevation: Platform.OS === 'android' ? 8 : 0,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 10},
    // shadowRadius: 6,
    // shadowOpacity: 5,
    // elevation: 8,
    // backgroundColor: 'white',
    // padding: 20,
    // borderRadius: 10,
    // marginHorizontal: 3,
    // marginVertical:3,
    // borderColor: '#D0D7DE'
  },
  VerifyEmail_text: {
    fontWeight: "800",
    fontSize: 24,
    color: COLORS.BLACK,
    paddingBottom: 20,
  },
  confirm_text: {
    fontWeight: "600",
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
  haveNot_received: {
    marginTop: 20,
  },
  havenot_received_email: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.BLACK,
  },
  resend_OTP_btn: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderColor: COLORS.BLACK,
    borderWidth: 1,
    width: 130,
    borderRadius: 50,

    marginTop: 15,
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
    paddingBottom: 20,
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
