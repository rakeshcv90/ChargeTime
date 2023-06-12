import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import COLORS from '../constants/COLORS';

 const WaveAnimation = () => {
    const wavePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(wavePosition, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        // Animated.timing(wavePosition, {
        //   toValue: 0,
        //   duration: 3000,
        //   useNativeDriver: true,
        // }),
      ]),
    );

    waveAnimation.start();

    return () => {
      waveAnimation.stop();
    };
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: wavePosition.interpolate({
              inputRange: [1, 2],
              outputRange: [0, -100],
              
            }),
          },
        ],
        height: 100,
        backgroundColor: COLORS.GREEN,
      }}
    />
  );
};

  export default WaveAnimation;
  

  