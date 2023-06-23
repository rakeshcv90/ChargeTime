import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, SafeAreaView, TouchableOpacity, Text, ToastAndroid, Image, Platform,Dimensions } from 'react-native';
import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import { useSelector } from 'react-redux';
import { DIMENSIONS } from '../../constants/DIMENSIONS';
import HorizontalLine from '../../Components/HorizontalLine';
import Header from '../../Components/Header';
import { Eye } from '../../../assets/svgs/Eye';
import { API } from '../../api/API';
import { navigationRef } from '../../../App';
import { ms } from 'react-native-size-matters';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';

// import Button from '../../Components/Button';

const DeleteAccountScreen = () => {
  const userRegisterData = useSelector((state) => state.userRegisterData)
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');
  const getUserID = useSelector((state) => state.getUserID)
  const user_ID = getUserID;
  const mobileW = Math.round(Dimensions.get('screen').width);

  useEffect(() => {
    console.log('data for this User:---------', userRegisterData);

  }, [userRegisterData]);
  //  const user_ID = userRegisterData[4]?.user_id;

  const handleDelete = async () => {
    console.log(user_ID, 'user');
    console.log(reason, 'reason');
    console.log(password, 'password')

    await fetch(`${API}/deleteAccount/${user_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        delete_reason: reason,
        pwa_password: password,
      }),
    }).then(res => res.json())
      .then(data => {
        console.log(data, 'fff');
        if (data.message === "Account deleted successfully") {
          PLATFORM_IOS ?
            Toast.show({
              type: 'success',
              text1: 'Account deleted successfully',

            }) : ToastAndroid.show('Account deleted successfully', ToastAndroid.SHORT);

          navigationRef.navigate('Login');

        } else {

          console.log('Inccorect Password');
          PLATFORM_IOS ?
            Toast.show({
              type: 'error',
              text1: 'Inccorect Password',

            }) : ToastAndroid.show('Inccorect Password', ToastAndroid.SHORT);

        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
      <Header headerName="Account Delete Request" />
      {Platform.OS=='android'? <HorizontalLine style={styles.line} />:<View
              style={{
             
             
              }}>
              <Image source={require('../../../assets/images/dotted.png')} style={{ width: mobileW * 0.97 ,top:Platform.OS=='ios'?-30:2}} />
            </View> }
      <View style={styles.container}>
        {/* <TextInput
          style={{
            ...styles.input,
            backgroundColor: COLORS.CREAM,
            borderRadius: 5,
            borderWidth: 0.3,
            borderColor: COLORS.BLACK,
            marginVertical: 19,
            width: '30%',
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '100',
            height: 100, // Adjust the height value as needed
          }}
          aria-label='Reason'
          placeholder="Enter Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        /> */}

        <Input
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
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '100',
            height:200,
          }}
          onChangeText={text => setReason(text)}
          value={reason}
        />
        <Input
          IconLeft={null}
          autoFocus
          bgColor={COLORS.CREAM}
          IconRight={() => (
            <Eye />
          )}
          bR={5}
          bW={0.3}
          bColor={COLORS.BLACK}
          text="Password"
          mV={19}
          textWidth={ms(70)}
          placeholder="Enter password to verify..."
          placeholderTextColor={COLORS.BLACK}
          onChangeText={text => setPassword(text)}
          value={password}
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
              marginLeft: 200,
              backgroundColor: '#F84E4E',
              alignItems: 'center',
              padding: 13,
              borderRadius: 10,
              width: '50%',
            }}

          >

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
  }
});

export default DeleteAccountScreen;
