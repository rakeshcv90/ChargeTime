/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import COLORS from '../constants/COLORS';
import axios from 'axios';
import {API} from '../api/API';
import {useDispatch, useSelector} from 'react-redux';
import {setChargerStatus} from '../redux/action';
import ActivityLoader from './ActivityLoader';
import AnimatedLottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import {PLATFORM_IOS} from '../constants/DIMENSIONS';

const ButtonSlider2 = () => {
  const {getUserID, getChargerStatus, subscriptionStatus} = useSelector(
    state => state,
  );

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = Data => {
    setIsLoading(true);
    if (Data == '0') {
      axios
        .post(`${API}/charger_ON/${getUserID}`)
        .then(res => {
          if (res?.data.message === 'Device not connected with server') {
            PLATFORM_IOS
              ? Toast.show({
                  text1: res?.data.message,

                  position: 'top',
                  type: 'success',
                  duration: 500,
                })
              : ToastAndroid.show(res?.data.message, ToastAndroid.SHORT);
          }

          dispatch(setChargerStatus(res?.data));
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      axios
        .post(`${API}/charger_OFF/${getUserID}`)
        .then(res => {
          if (res?.data.message === 'Device not connected with server') {
            PLATFORM_IOS
              ? Toast.show({
                  text1: res?.data.message,

                  position: 'top',
                  type: 'success',
                  duration: 1000,
                  textStyle: {
                    textAlign: 'center',
                  },
                  // {
                  //   type: 'success',
                  //   text1: res?.data.message,

                  // }
                })
              : ToastAndroid.show(res?.data.message, ToastAndroid.SHORT);
          }
          dispatch(setChargerStatus(res?.data));
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <TouchableOpacity
      // disabled={subscriptionStatus=='0'?false:true}
      onPress={() => {
        if (subscriptionStatus == '1') {
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Your Subscription is Paused',
              })
            : ToastAndroid.show(
                'Your Subscription is Paused',
                ToastAndroid.SHORT,
              );
        } else {
          if (
            getChargerStatus.message == 'Online' ||
            getChargerStatus.message == 'Charging'
          ) {
            handleComplete(1);
          } else {
            handleComplete(0);
          }
        }
      }}
      style={styles.container}>
      {isLoading && <ActivityLoader />}

      <View style={styles.button} activeOpacity={1}>
        <Text style={[styles.swipeText]}>
          {getChargerStatus.message == 'Online' ||
          getChargerStatus.message == 'Charging'
            ? 'TURN CHARGER OFF'
            : 'TURN CHARGER ON'}
        </Text>
        <LinearGradient
          colors={['rgba(22, 249, 4, 0.3)', 'rgba(138, 8, 242, 0.3)']}
          // colors={['#50AC3D', 'rgba(141, 1, 249, 0.5) 50%)']}
          end={{x: 1, y: 0}}
          style={{
            width: (DIMENSIONS.SCREEN_WIDTH * 10) / 100,
            height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
            margin: (DIMENSIONS.SCREEN_WIDTH * 2) / 100,
            borderRadius: 70,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            elevation: 1,
          }}>
          {getChargerStatus.message == 'Online' ||
          getChargerStatus.message == 'Charging' ? (
            <Image
              source={require('../../assets/images/PowerButton.png')}
              style={{width: 20, height: 20}}
            />
          ) : (
            <AnimatedLottieView
              source={{
                uri: 'https://assets9.lottiefiles.com/packages/lf20_hbr24n88.json',
              }} // Replace with your animation file
              autoPlay
              loop
              style={{width: 32, height: 32}}
            />
          )}
        </LinearGradient>
        <LinearGradient
          colors={[
            // 'rgba(22, 249, 4, 0.2) 0%,',
            // 'rgba(138, 8, 242, 0.2) 10%)',
            // 'rgba(138, 8, 242, 0.2) 10%)',

            'rgba(22, 249, 4, 0.3)',
            'rgba(255, 255, 255, 0)',
            'rgba(138, 8, 242, 0.3)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: (DIMENSIONS.SCREEN_WIDTH * 60) / 100,
            height: (DIMENSIONS.SCREEN_HEIGHT * 6.5) / 100,
            borderRadius: 15,
            position: 'absolute',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: DIMENSIONS.SCREEN_WIDTH * 0.04,
    marginBottom: (DIMENSIONS.SCREEN_HEIGHT * 4) / 100,
    backgroundColor: 'red',
  },
  button: {
    width: DIMENSIONS.SCREEN_WIDTH * 0.6,
    height: DIMENSIONS.SCREEN_HEIGHT * 0.07,
    borderRadius: 15,
    borderWidth: 1,
    position: 'absolute',
    bottom: DIMENSIONS.SCREEN_HEIGHT * 0.01,
    borderColor: ['rgba(22, 249, 4, 0.4)', 'rgba(138, 8, 242, 0.5)'],
    // alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  swipeText: {
    // alignSelf: 'flex-start',
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: 10,
    alignSelf:'center'
    // left: DIMENSIONS.SCREEN_WIDTH * 0.41,
    //  zIndex: 2,
    // bottom: DIMENSIONS.SCREEN_HEIGHT * 0.03,
    //  paddingLeft:30
    // backgroundColor:'white'
  },
});

export default ButtonSlider2;
