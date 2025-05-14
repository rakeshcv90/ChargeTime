import React, {useEffect, useState, useRef} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '../../App';
import {DIMENSIONS, PLATFORM_IOS} from '../constants/DIMENSIONS';
import Introduction from './Introduction';
import {BackHandler} from 'react-native';
import COLORS from '../constants/COLORS';
import {useSelector} from 'react-redux';
import VersionNumber from 'react-native-version-number';
import {API} from '../api/API';
import axios from 'axios';
import ActivityLoader from '../Components/ActivityLoader';
const Splash = () => {
  const backHandler = useRef(null);
  const {isAuthorized} = useSelector(state => state);
   const [forLoading, setForLoading] = useState(false);
  const [imageSource, setImageSource] = useState(
    require('../../assets/unnamed.png'),
  );

  const [showIntro, setShowIntro] = useState('');
  useEffect(() => {
    checkFirstTime();

    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setImageSource(require('../../assets/images/splash_screen_top.png'));
    });
  }, []);
  const checkFirstTime = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      const userId = await AsyncStorage.getItem('userId');
      if (isFirstTime === null || isFirstTime == undefined) {
        setTimeout(async () => {
          await AsyncStorage.setItem('isFirstTime', 'true');
          navigationRef.navigate('Introduction');
        }, 3000);
      } else {
        //navigationRef.navigate('Login');
        {
          !isAuthorized
            ? setTimeout(async () => {
                navigationRef.navigate('Login');
              }, 2000)
            : sendVersionCOde(userId); //navigationRef.navigate('DrawerStack');console.log('fdfdfdfdfd', isAuthorized,userId);
        }
      }
    } catch (error) {
      console.log('Error checking first time:', error);
    }
  };

  const imageIndex = useRef(0);
  const images = [
    require('../../assets/unnamed.png'),
    require('../../assets/images/splash_screen_top.png'),
  ];

  const scaleValue = useRef(new Animated.Value(0)).current;
  const sendVersionCOde = async data => {
    setForLoading(true);
    try {
      const res = await axios(`${API}/version/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: data,
          version: VersionNumber.appVersion,
        },
      });
      setForLoading(false);
       console.log("ZXcxzcxzczxczx",VersionNumber.appVersion,)
      navigationRef.navigate('DrawerStack')
     
    } catch (err) {
      setForLoading(false);
      console.log('Error-1345', err);
    }
    // navigationRef.navigate('DrawerStack')
  };
  return (
    <>
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.splash_image,
            {
              transform: [{scale: scaleValue}],
              width: DIMENSIONS.SCREEN_WIDTH * 0.8,
            },
          ]}
          source={imageSource}
        />
            {forLoading ? <ActivityLoader /> : ''}
        <Image
          source={require('../../assets/images/splash_screen_bottom.png')}
          style={styles.splash_botm_image}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: COLORS.CREAM,
    flex: 1,
  },
  splash_image: {
    position: 'absolute',
    width: 200,
    height: 150,
    // left: 83,
    alignSelf: 'center',
    resizeMode: 'contain',
    top: 141,
  },
  splash_botm_image: {
    position: 'absolute',
    width: DIMENSIONS.SCREEN_WIDTH * 1,
    height: 212.85,
    top: 459,
  },
});

export default Splash;
