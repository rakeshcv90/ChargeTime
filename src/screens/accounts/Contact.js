import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, SafeAreaView, TouchableOpacity, Text, ToastAndroid, Dimensions } from 'react-native';
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
import { Image } from 'react-native';

// import Button from '../../Components/Button';

const Contact = () => {
  const getUserID = useSelector((state) => state.getUserID);
  const [message, setMessage] = useState('');
  const user_ID = getUserID;
  const mobileW = Math.round(Dimensions.get('screen').width);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
      <Header headerName="Contact Us" />
      {Platform.OS == 'android' ? <HorizontalLine style={styles.line} /> : <View
        style={{


        }}>
        <Image source={require('../../../assets/images/dotted.png')} style={{ width: mobileW * 0.97 }} />
      </View>}
      <View style={styles.container}>
        <TextInput
          style={{
            // flex: 1,
            backgroundColor: COLORS.CREAM,
            borderRadius: 5,
            borderWidth: 0.7,
            borderColor: COLORS.BLACK,
            marginVertical: 19,
            width: ms(340),
            height: ms(150),
            color: COLORS.BLACK,
            fontSize: 14,
            fontFamily: 'Roboto',
            fontWeight: '100',
            paddingLeft: 10,
            paddingTop: 10,
            textAlignVertical: 'top',

          }}
          multiline
          maxLength={550}
          placeholder="Please describe your query / issue in detail. "
          placeholderTextColor={COLORS.LIGHT_GREY}
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
