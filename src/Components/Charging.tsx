import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import COLORS from '../constants/COLORS';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import AnimatedLottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
const Charging = () => {
  const slideAnimation = useState(new Animated.Value(0))[0];
  // const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // setIsSliding(!isSliding);
    });
  }, []);

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
        width: (DIMENSIONS.SCREEN_WIDTH * 60) / 100,
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
      <LinearGradient
        colors={['rgba(34, 147, 111, 1), 10%', 'rgba(157, 196, 47, 1), 15%']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: '100%',
          width: '50%',
          // justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <AnimatedLottieView
          source={{
            uri: 'https://assets9.lottiefiles.com/packages/lf20_hbr24n88.json',
          }} // Replace with your animation file
          autoPlay
          loop
          style={{width: 50, height: 50}}
        />
      </LinearGradient>
      <View
        style={{
          marginHorizontal: 10,
          position: 'absolute',
          top: (DIMENSIONS.SCREEN_HEIGHT * 2) / 100,

          alignSelf: 'center',
        }}>
        <Text style={{textAlign:'center',color:COLORS.BLACK,fontSize:15,fontWeight:'500',lineHeight:17}}>charging ...</Text>
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
