import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  TextInput,
  useColorScheme,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import HorizontalLine from '../../Components/HorizontalLine';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import Header from '../../Components/Header';

import Toast from 'react-native-toast-message';

import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import {DIMENSIONS} from '../../constants/DIMENSIONS';
import {Call} from '../../../assets/svgs/Call';
import {Message} from '../../../assets/svgs/Message';
import {Name} from '../../../assets/svgs/Name';
import {API} from '../../api/API';
import {navigationRef} from '../../../App';
import {FONTS} from '../../constants/FONTS';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {mvs, ms} from 'react-native-size-matters';
import {userProfileData as updatePersionalDetail} from '../../redux/action';
const mobileW = Math.round(Dimensions.get('screen').width);

const PersonalDetails = ({route}) => {
  const userProfileData = useSelector(state => state.userProfileData);
  const getUserID = useSelector(state => state.getUserID);
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(userProfileData[0]?.name ?? '');
  const [number, setNumber] = useState(userProfileData[0]?.mobile ?? '');
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const user_ID = getUserID;

  const [showButton, setShowButton] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(userProfileData[0]?.name);
    setNumber(userProfileData[0]?.mobile);
  }, [userProfileData]);

  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const onPress = () => {
    if (name.trim().length <= 0) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Enter Name',
          })
        : ToastAndroid.show('Please Enter Name', ToastAndroid.SHORT);
    } else if (name.trim().length <3) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Enter Full Name',
          })
        : ToastAndroid.show('Please Enter Full Name', ToastAndroid.SHORT);
    } else if (number.trim().length <= 0) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Enter Mobile Number',
          })
        : ToastAndroid.show('Please Enter Mobile Number', ToastAndroid.SHORT);
    } else if (number.trim().length < 10) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Enter Correct Mobile Number',
          })
        : ToastAndroid.show(
            'Please Enter Correct Mobile Number',
            ToastAndroid.SHORT,
          );
    } else {
      updatePersonalDetails();
    }
  };

  const updatePersonalDetails = async () => {
    // setIsEditable(true);
    await fetch(`${API}/personalInfo/${user_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pwa_name: name,
        pwa_mobile: number,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg == 'Your profile has been succesfully updated') {
          const updatedData = [
            {
              ...userProfileData[0],

              name: name,
              mobile: number,
            },
          ];

          dispatch(updatePersionalDetail(updatedData));
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Profile Updated Successfully',
              })
            : ToastAndroid.show(
                'Profile Updated Successfully',
                ToastAndroid.SHORT,
              );
          setIsEditable(false);
          setShowButton(false);
        } else {
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: 'Your Profile Not Updated',
              })
            : ToastAndroid.show('Your Profile Not Updated', ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <Header
        headerName="Personal Details"
        editShow={true}
        // onPress={onPress}
        // enableEdit={enableEdit}
        // editButton={isEditable}
      />
      {Platform.OS == 'android' ? (
        <HorizontalLine style={styles.line} />
      ) : (
        <View>
          <Image
            source={require('../../../assets/images/dotted.png')}
            style={{width: mobileW * 0.99}}
            resizeMode="stretch"
          />
        </View>
      )}

      <View style={[styles.mainDiv_container]}>
        <Input
          IconLeft={null}
          editable={isEditable}
          bgColor={COLORS.CREAM}
          IconRight={() => <Name />}
          bR={3}
          bW={0.4}
          bColor={COLORS.BLACK}
          text="Name"
          mV={5}
          textWidth={ms(50)}
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          onChangeText={name => {
            setName(name);
            if (!name.match(/^(?=.[a-zA-Z])([a-zA-Z0-9_ ]+)$/)) {
              setNameError(true);
            } else {
              setNameError(false);
            }
          }}
          value={name}
        />

        {nameError ? (
          <Text style={{color: 'red'}}>Name should be start with letter.</Text>
        ) : name && name.length < 3 ? (
          <Text style={{color: 'red'}}>
            Name cannot be lesser than 3 letters
          </Text>
        ) : (
          ''
        )}

        <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          editable={isEditable}
          IconRight={() => <Call />}
          bR={3}
          bW={0.4}
          bColor={COLORS.BLACK}
          text="Phone No."
          mV={15}
          keyboardType="numeric"
          maxLength={10}
          textWi
          dth={ms(70)}
          placeholderTextColor={COLORS.HALFBLACK}
          style={{
            color: COLORS.BLACK,
            //fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          onChangeText={text => {
            const cleanedText = text.replace(/\D/g, '');
            if (cleanedText.match(/^[0-9]{10}$/)) {
              setError(false);
              
            } else {
              setError(true);
         
            }
            // Limit the length of the input to 10 characters
            const limitedText = cleanedText.slice(0, 10);
            // Update the state with the validated in
            setNumber(limitedText);
          }}
          value={number}
        />

        {error && (
          <Text style={{color: 'red', marginTop: -15, paddingBottom: 10}}>
            Number cannot be lesser than 10 digits
          </Text>
        )}

        <Input
          IconLeft={null}
          editable={false}
          bgColor={COLORS.CREAM}
          IconRight={() => <Message />}
          bR={3}
          bW={0.4}
          bColor={COLORS.BLACK}
          text="Email"
          keyboardType="email-address"
          mV={5}
          textWidth={ms(50)}
          value={userProfileData[0]?.email}
          placeholderTextColor={COLORS.HALFBLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
        />
        {showButton && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginVertical: (DIMENSIONS.SCREEN_HEIGHT * 2) / 100,

              marginRight: -30,
            }}>
            <TouchableOpacity
              onPress={() => {
                setName(userProfileData[0]?.name);
                setNumber(userProfileData[0]?.mobile);
                setShowButton(false);
                setNameError(false)
                setError(false)

                setTimeout(() => {
                  setIsEditable(false);
                }, 100);
              }}
              style={{
                width: DIMENSIONS.SCREEN_WIDTH * 0.3,
                height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,

                alignSelf: 'flex-end',
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
                  color: COLORS.BLACK,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress()}
              disabled={(nameError||error)}
              style={{
                width: DIMENSIONS.SCREEN_WIDTH * 0.3,
                height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
                backgroundColor: '#B1D34F',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 10,

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
                  color: COLORS.BLACK,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!showButton && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginVertical: (DIMENSIONS.SCREEN_HEIGHT * 2) / 100,

              marginRight: -30,
            }}>
            <TouchableOpacity
      
              onPress={() => {
                setIsEditable(true);
                setShowButton(true);
              }}
              style={{
                width: DIMENSIONS.SCREEN_WIDTH * 0.3,
                height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
                backgroundColor: '#B1D34F',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 10,

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
                  color: COLORS.BLACK,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.bottom}>
        <Text style={{fontSize: 14, color: COLORS.BLACK}}>
          Want to delete account?{' '}
        </Text>

        <TouchableOpacity
          onPress={() => navigationRef.navigate('deleteAccount')}>
          <Text
            style={{
              fontWeight: 'bold',

              fontSize: 14,
              height: 25,
              color: COLORS.BLACK,
            }}>
            Request here.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  bottom: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    bottom: mobileW * 0.2,
  },

  mainDiv_container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 40,
    width: DIMENSIONS.SCREEN_WIDTH * 0.9,
    height: DIMENSIONS.SCREEN_HEIGHT * 0.3,
  },
  textdata: {
    fontWeight: 'bold',
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
    paddingTop: 10,
    paddingBottom: 10,
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: Platform.OS === 'android' ? 'black' : 'rgba(0,0,0,.555)',
    shadowOffset: {
      width: 8,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  line: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 2,
    paddingBottom: 20,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 20,
  },
  dottedLine: {
    flex: 1,
    borderStyle: 'dotted',
    borderWidth: 1.5,
    //borderRadius: 1,
    borderColor: '#000000',
  },
});

export default PersonalDetails;
