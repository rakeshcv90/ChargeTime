import React, { useEffect , useRef} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../../App';
import SplashScreen from 'react-native-splash-screen';
import { DIMENSIONS } from '../constants/DIMENSIONS';
import { BackHandler } from 'react-native';

const Splash = () => {
  const backHandler = useRef(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        // SplashScreen.hide();
        checkFirstTime();
      }, 3000);
    
      const handleBackButton = () => {
        clearTimeout(timer);
        BackHandler.exitApp();
        // return true;
      };
    
      // if (Platform.OS === 'android') {
      //   BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      // }
    
      return () => {
        clearTimeout(timer);
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
      };
    }, []);
    const checkFirstTime = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        if (isFirstTime === false) {
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
    
  

  return (
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
