import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import COLORS from '../constants/COLORS';
import LinearGradient from 'react-native-linear-gradient';

const ButtonSlider = () => {
  const [isSliding, setIsSliding] = useState(false);
  const [hideText, setHideText] = useState(true);
  const slideAnimation = useState(new Animated.Value(0))[0];

  const handleSlide = () => {
    
    Animated.timing(slideAnimation, {
      toValue: isSliding ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsSliding(!isSliding);
      setHideText(!hideText);
    });

    
  };

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
  const slideButtonReverseStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [DIMENSIONS.SCREEN_WIDTH * 0.1, 0], // Adjust the slide distance as per your needs
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(21, 251, 2, 0.1) 0%,',
          'rgba(141, 1, 249, 0.2) 10%)',
          'rgba(141, 1, 249, 0.2) 10%)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.button}>
        {!isSliding ? (
          <TouchableOpacity style={[slideButtonStyle]} onPress={handleSlide}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <LinearGradient
                colors={['#50AC3D', 'rgba(141, 1, 249, 0.5) 10%)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderWidth: 0,
                  // elevation: 5,
                }}>
                <Image
                  source={require('../../assets/images/PowerButton.png')}
                  style={{width: 20, height: 20}}
                />
              </LinearGradient>
              {hideText && (
                <View
                  style={{
                    width: '80%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    //backgroundColor:COLORS.WHITE
                  }}>
                  <Image
                    source={require('../../assets/images/BackArrow.png')}
                    style={{
                      width: 10,
                      height: 10,
                      transform: [{rotateY: '180deg'}],
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 14,
                      lineHeight: 18,
                      color: COLORS.BLACK,
                      marginLeft: 10,
                      
                    }}>
                    Swipe right to start charging....
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[slideButtonReverseStyle]} onPress={handleSlide}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                overflow: 'hidden',
                alignSelf: 'center',
              }}>
              {!hideText && (
              <View
                style={{
                  width: '70%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                //   backgroundColor: COLORS.BROWN,
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 14,
                    lineHeight: 18,
                    color: COLORS.BLACK,
                    marginRight: 10,
                  }}>
                  Swipe left to stop charging....
                </Text>
                <Image
                  source={require('../../assets/images/BackArrow.png')}
                  style={{
                    width: 10,
                    height: 10,
                  }}
                />
              </View>
              )}
              <LinearGradient
                colors={['#50AC3D', 'rgba(141, 1, 249, 0.5) 10%)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderWidth: 0,
                  // elevation: 5,
                }}>
                <Image
                  source={require('../../assets/images/PowerButton.png')}
                  style={{width: 20, height: 20}}
                />
              </LinearGradient>
            </View>
          </TouchableOpacity>
        )}

        {/* {!hideText && (
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              bottom: 25
            }}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 18,
                color: COLORS.BLACK,
                marginRight: 10,
              }}>
              Swipe left to stop charging....
            </Text>
            <Image
              source={require('../../assets/images/BackArrow.png')}
              style={{
                width: 10,
                height: 10,
              }}
            />
          </View>
        )} */}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'absolute',
    flex: 1,
    bottom: 50,
    alignSelf: 'center',
    borderRadius: 50,
  },
  button: {
    width: DIMENSIONS.SCREEN_WIDTH * 0.8,
    height: 55,
    // backgroundColor: COLORS.GREEN,
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ButtonSlider;