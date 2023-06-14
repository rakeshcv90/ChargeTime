import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Splash = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
     
      SplashScreen.hide();
      // navigation.navigate('MainScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
    <Image source ={require('../assets/images/splash_screen_top.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  splash_image: {
   width : 40,
   height:40,
  },
});

export default Splash;
