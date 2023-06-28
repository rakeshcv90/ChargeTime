import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, SafeAreaView, TouchableOpacity, Text, ToastAndroid, Dimensions, Image } from 'react-native';
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

import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import axios from 'axios';
const mobileW = Math.round(Dimensions.get('screen').width);



const Contact = () => {


  const [message, setMessage] = useState('');

  const handleMessage = async (values) => {

    try {

      const response = await axios.post(`${API}/sendEmail`, {

        "message": message,
      });
      // console.log("update-----------",response)
      if (response.data.message === 'Email sent successfully') {
        setMessage('')
        console.log("hello");
        PLATFORM_IOS
          ? Toast.show({
            type: 'success',
            text1: 'Email sent successfully.',
          })
          : ToastAndroid.show(
            'Email sent successfully.',
            ToastAndroid.SHORT,
          );
      }
      else {
        // cb();
        PLATFORM_IOS
          ? Toast.show({
            type: 'success',
            text1: 'Email not sent ',
          })
          : ToastAndroid.show(
            'Email not sent.',
            ToastAndroid.SHORT,
          );
      }
    } catch (error) {
      console.error(error);
    }

  };



  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
      <Header headerName="Contact Us" />
      {Platform.OS == 'android' ? <HorizontalLine style={styles.line} /> : <View


   
        <Image source={require('../../../assets/images/dotted.png')} style={{ width: mobileW * 0.97, }} />

      </View>}
      {/* <HorizontalLine style={styles.line} /> */}
      <View style={styles.container}>
        <View style={{ backgroundColor: COLORS.CREAM, width: 110, position: 'absolute', zIndex: 99, top: 23, left: 32, alignItems: 'center' }}><Text style={{ color: 'black' }}>Your Message</Text></View>
        <TextInput
          style={{
            // flex: 1,
            backgroundColor: COLORS.CREAM,
            borderRadius: 5,
            borderWidth: 0.7,
            borderColor: COLORS.BLACK,
            marginVertical: 19,

            width:  mobileW*0.92,
            height: ms(150),
            color: COLORS.BLACK,
            fontSize: 14,
            //fontFamily: 'Roboto',

            fontWeight: '100',
            paddingLeft: 10,
            paddingTop: 10,
            textAlignVertical: 'top',

          }}
          multiline
          maxLength={550}
          placeholder="Please describe your query / issue in detail. "
          placeholderTextColor={COLORS.HALFBLACK}
          onChangeText={text => setMessage(text)}
          value={message}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // width: '100%',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => handleMessage(message)}
            style={{
              marginTop: 15,
              marginLeft: 190,
              backgroundColor: COLORS.GREEN,
              alignItems: 'center',
              padding: 13,
              borderRadius: 10,
              width: '50%',
              ...Platform.select({
                ios: {
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                },
                android: {
                  elevation: 4,
                },
              }),
            }}

          >

            <Text
              style={{
                color: COLORS.BLACK,
                fontSize: 14,
                fontWeight: '700',
              }}>
              SEND MESSAGE
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
    position: "absolute",
    top: ' -15px',
    left: "23px",
    padding: " 2px",
  }
});

export default Contact;


