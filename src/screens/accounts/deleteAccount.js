/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import {useSelector} from 'react-redux';
import {DIMENSIONS} from '../../constants/DIMENSIONS';
import HorizontalLine from '../../Components/HorizontalLine';
import Header from '../../Components/Header';
import {Eye} from '../../../assets/svgs/Eye';
import {API} from '../../api/API';
import {navigationRef} from '../../../App';
import {ms} from 'react-native-size-matters';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import {resetApp} from '../../redux/action';
import {useDispatch} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('screen').height);

// import Button from '../../Components/Button';

const DeleteAccountScreen = () => {
  const userProfileData = useSelector(state => state.userProfileData);
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');
  const getUserID = useSelector(state => state.getUserID);
  const [hidePassword, setHidePassword] = useState(true);
  const [showNew, setShowNew] = useState(false);

  const dispatch = useDispatch();
  const user_ID = getUserID;


  //  const user_ID = userRegisterData[4]?.user_id;

  const handleDelete = async () => {

    await fetch(`${API}/deleteAccount/${user_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        delete_reason: reason,
        pwa_password: password,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        console.log(data, 'fff');
        if (data.message === 'Account deleted successfully') {
          dispatch(resetApp());

          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Account deleted successfully',
              })
            : ToastAndroid.show(
                'Account deleted successfully',
                ToastAndroid.SHORT,
              );

          navigationRef.navigate('LoginStack');
        } else {
        
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: 'Incorect Password',
              })
            : ToastAndroid.show('Incorect Password', ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <Header headerName="Account Delete Request" />
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
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: COLORS.CREAM,
            width: 70,
            position: 'absolute',
            zIndex: 99,
            top: 23,
            left: 32,
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '500'}}>Reason</Text>
        </View>
        <TextInput
          style={{
            // flex: 1,
            backgroundColor: COLORS.CREAM,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: COLORS.BLACK,
            marginVertical: 19,
            width: mobileW * 0.92,
            height: ms(150),
            color: COLORS.BLACK,
            //fontFamily: 'Roboto',
            fontWeight: '400',
            // paddingLeft: 10,
            paddingTop: DIMENSIONS.SCREEN_HEIGHT*0.02,
            padding:DIMENSIONS.SCREEN_HEIGHT*0.02,
            textAlignVertical: 'top',
          }}
          multiline
          maxLength={550}
          placeholder="Please let us know the reason for the account closure request."
          placeholderTextColor={COLORS.HALFBLACK}
          onChangeText={text => setReason(text)}
          value={reason}
        />

        {/* <Input
          IconLeft={null}
          //  editable={isEditable}
          bgColor={COLORS.CREAM}
          bR={5}
          bW={0.3}
          bColor={COLORS.BLACK}
          text="Reason"
          mV={19}
          textWidth={ms(60)}
          multiline
          maxLength={550}
          inputHeight={200}
          placeholder="Please let us know the reason for the account closure request."
          placeholderTextColor={COLORS.LIGHT_GREY}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '100',
            height:200,
          }}
          onChangeText={text => setReason(text)}
          value={reason}
        /> */}

        <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          // editable={isEditable}
          placeholderTextColor={COLORS.HALFBLACK}
          passwordInput={true}
          pasButton={() => {
            setHidePassword(!hidePassword);
            setShowNew(!showNew);
          }}
          secureTextEntry={hidePassword}
          passwordInputIcon={!showNew}
          placeholder="Enter password to verify..."
          onChangeText={text => setPassword(text)}
          value={password}
          text="Password"
          mV={5}
          bW={1}
          bR={3}
          textWidth={ms(70)}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // width: '100%',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={handleDelete}
            style={{
              marginTop: 15,
              marginLeft: 190,
              backgroundColor: '#F84E4E',
              alignItems: 'center',
              padding: 13,
              borderRadius: 10,
              width: '50%',
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
                color: COLORS.WHITE,
                fontSize: 14,
                fontWeight: '700',
              }}>
              DELETE ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    // justifyContent: 'center',
  },
  line: {
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: COLORS.RED,
  },
  label: {
    position: 'absolute',
    top: ' -15px',
    left: '23px',
    padding: ' 2px',
  },
});

export default DeleteAccountScreen;
