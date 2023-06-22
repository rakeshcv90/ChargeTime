import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App, { navigationRef } from '../../App';
import { DIMENSIONS } from '../constants/DIMENSIONS';
import Introduction from './Introduction';

const Splash = () => {
  const [showIntro, setShowIntro] = useState(false)
  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        if (isFirstTime === null || isFirstTime == undefined ) {
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
        // navigationRef.navigate('Login');
      }
    };

    // const checkFirstTime=async ()=>{{
    //   navigationRef.navigate('Introduction');
    // }}

    const timer = setTimeout(() => {
      checkFirstTime();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (<>
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash_screen_top.png')}
        style={styles.splash_image}
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
    backgroundColor: '#F7FBED',
  },
  splash_image: {
    position: 'absolute',
    width: 200,
    height: 150,
    left: 83,
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
