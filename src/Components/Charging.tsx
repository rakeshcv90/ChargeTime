/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import COLORS from '../constants/COLORS';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import AnimatedLottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
const Charging = () => {
  const slideAnimation = useState(new Animated.Value(0))[0];
  // const [isSliding, setIsSliding] = useState(false);

  const [height, setHeight] = useState(0);
  const animatedHeight = new Animated.Value(height);
  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // setIsSliding(!isSliding);
    });
  }, []);

  const screenWidth = (DIMENSIONS.SCREEN_WIDTH * 33) / 100;
  useEffect(() => {
    // setTimeout(() => {
    //   height >= 100 ? setHeight(0) : setHeight(height + 10);
    // }, 500);
    const animate = () => {
      const heights = Animated.timing(animatedHeight, {
        // toValue: height >= 100 ? 0 : height + 10,
        toValue: height >= screenWidth ? 0 : screenWidth,
        duration: 5000,
        easing: Easing.linear, // Use linear easing for smoother animation
        useNativeDriver: false, // You need to set this to 'false' for layout animations
      });
      const time = Animated.timing(animatedHeight, {
        // toValue: height >= 100 ? 0 : height + 10,
        toValue: height == screenWidth ? screenWidth : 0,
        duration: 5000,
        easing: Easing.linear, // Use linear easing for smoother animation
        useNativeDriver: false, // You need to set this to 'false' for layout animations
      });
      // const reverse = Animated.timing(animatedHeight, {
      //   // toValue: height >= 100 ? 0 : height + 10,
      //   toValue: height < screenWidth ? 0 : screenWidth,
      //   duration: 1000,
      //   easing: Easing.linear, // Use linear easing for smoother animation
      //   useNativeDriver: false, // You need to set this to 'false' for layout animations
      // });
      Animated.loop(Animated.sequence([heights, time])).start();
    };

    animate();
  }, [height, animatedHeight]);
  const slideButtonStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, DIMENSIONS.SCREEN_WIDTH * 0.66], // Adjust the slide distance as per your needs
        }),
      },
    ],
  };

  return (
    <View
      style={{
        marginTop: 27,
        marginLeft: 20,
        backgroundColor: COLORS.WHITE,
        height: 50,
        width: (DIMENSIONS.SCREEN_WIDTH * 40) / 100,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 5.65,
        elevation: 7,
        overflow: 'hidden',
      }}>
      {/* <LinearGradient
        colors={['rgba(34, 147, 111, 1), 10%', 'rgba(157, 196, 47, 1), 15%']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: '100%',
          width: '50%',
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
      </LinearGradient> */}
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Animated.View
          style={{
            backgroundColor: '#AFD35E',
            height: '100%',
            width: animatedHeight,
          }}
        />
        <AnimatedLottieView
          source={require('../../assets/charge.json')} // Replace with your animation file
          autoPlay
          loop
          speed={30}
          style={{height: '100%'}}
        />
      </View>
      <View
        style={{
          marginHorizontal: 10,
          position: 'absolute',
          // top: (DIMENSIONS.SCREEN_HEIGHT * 2) / 100,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AnimatedLottieView
          source={{
            uri: 'https://assets9.lottiefiles.com/packages/lf20_hbr24n88.json',
            // uri: 'https://lottie.host/c6a8913a-4bdf-4379-a373-dc9904e879fb/DxU4iRBgZj.json',
          }} // Replace with your animation file
          autoPlay
          loop
          style={{width: 50, height: 50}}
        />
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.BLACK,
            fontSize: 15,
            fontWeight: '500',
            lineHeight: 17,
          }}>
          Charging...
        </Text>
      </View>
    </View>
  );
};

export default Charging;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
