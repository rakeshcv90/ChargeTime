import React, {useEffect, useState, useRef} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App, {navigationRef} from '../../App';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import Introduction from './Introduction';
import {BackHandler} from 'react-native';
import COLORS from '../constants/COLORS';
import {useSelector} from 'react-redux';

const Splash = () => {
  const backHandler = useRef(null);
  const [imageSource, setImageSource] = useState(
    require('../../assets/unnamed.png'),
  );

  const [showIntro, setShowIntro] = useState('');
  useEffect(() => {
    checkFirstTime();
    // const checkFirstTime=async ()=>{{
    //   navigationRef.navigate('Introduction');
    // }}

    // const timer = setTimeout(() => {
    //   checkFirstTime();
    // }, 3000);

    // return () => clearTimeout(timer);
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
  const checkFirstTime = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      if (isFirstTime === null || isFirstTime == undefined) {
        // setShowIntro(true)
        // First time user, show intro
        setTimeout(async () => {
          await AsyncStorage.setItem('isFirstTime', 'true');
          navigationRef.navigate('Introduction');
        }, 3000);
      } else {
        // Not first time user, show login
        setTimeout(async () => {
        navigationRef.navigate('Login');
        },2000)
      }
    } catch (error) {
      console.log('Error checking first time:', error);
      // In case of error, show login as fallback
      // navigationRef.navigate('Login');
    }
  };
  // const scaleValue = useRef(new Animated.Value(1)).current; // Initial scale value
  const imageIndex = useRef(0); // Initial image index
  const images = [
    require('../../assets/unnamed.png'),
    require('../../assets/images/splash_screen_top.png'),
  ]; // Array of images

  const scaleValue = useRef(new Animated.Value(0)).current;

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
