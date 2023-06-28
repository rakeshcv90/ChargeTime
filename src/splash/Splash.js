import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App, { navigationRef } from '../../App';
import { DIMENSIONS } from '../constants/DIMENSIONS';
import Introduction from './Introduction';
import { BackHandler } from 'react-native';
import COLORS from '../constants/COLORS';
import { useSelector } from 'react-redux';

const Splash = () => {
  const backHandler = useRef(null);
  const [imageSource, setImageSource] = useState(require('../../assets/unnamed.png'));
  useEffect(() => {
    // const handleBackButton = () => {
    //   clearTimeout(timer);
    //   BackHandler.exitApp();
    //   // return true;
    // };

    // // if (Platform.OS === 'android') {
    // //   BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    // // }

    // return () => {
    //   if (Platform.OS === 'android') {
    //     BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    //   }
    // };
  }, []);
  const [showIntro, setShowIntro] = useState('');
  useEffect(() => {
checkFirstTime()
    // const checkFirstTime=async ()=>{{
    //   navigationRef.navigate('Introduction');
    // }}

    // const timer = setTimeout(() => {
    //   checkFirstTime();
    // }, 3000);

    // return () => clearTimeout(timer);
  }, []);
  const checkFirstTime = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      if (isFirstTime === null || isFirstTime == undefined) {
        // setShowIntro(true)
        // First time user, show intro
        await AsyncStorage.setItem('isFirstTime', 'true');
        navigationRef.navigate('Introduction');
      } else {
        // Not first time user, show login
        navigationRef.navigate('Login');
      }
    } catch (error) {
      console.log('Error checking first time:', error);
      // In case of error, show login as fallback
      navigationRef.navigate('Login');
    }
  };
  // const scaleValue = useRef(new Animated.Value(1)).current; // Initial scale value
  const imageIndex = useRef(0); // Initial image index
  const images = [
    require('../../assets/unnamed.png'),
    require('../../assets/images/splash_screen_top.png'),
  ]; // Array of images

  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Zoom out animation
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Animation completed, change image source
      // You can replace 'image2.jpg' with the path to your new image
      // imageRef.setNativeProps({ source: require('../../assets/unnamed.png') });
      setImageSource(require('../../assets/images/splash_screen_top.png'));
    });
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Animated.Image
          // ref={imageRef}r
          style={[
            styles.splash_image,
            {
              transform: [{scale: scaleValue}],
              width: DIMENSIONS.SCREEN_WIDTH * 0.8,
            },
          ]}
          source={imageSource}
        />
        <Image
          source={require('../../assets/images/splash_screen_bottom.png')}
          style={styles.splash_botm_image}
        />
      </View>
      {/* {showIntro ? <Introduction /> : <App /> } */}
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
