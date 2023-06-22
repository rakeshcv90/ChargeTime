
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   Image,
//   PanResponder,
// } from 'react-native';
// import { DIMENSIONS } from '../constants/DIMENSIONS';
// import COLORS from '../constants/COLORS';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import { API } from '../api/API';
// import { useDispatch } from 'react-redux';
// import { setChargerStatus } from '../redux/action';

// const ButtonSlider = ({ ...props }) => {
//   const dispatch = useDispatch();

//   const [isSliding, setIsSliding] = useState(false);
//   const [clickOnBtn, setClickOnBtn] = useState(false);
//   const [hideText, setHideText] = useState(true);
//   const slideAnimation = useState(new Animated.Value(0))[0];

//   const handleSlide = () => {
//     Animated.timing(slideAnimation, {
//       toValue: isSliding ? 0 : 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setIsSliding(!isSliding);
//       setHideText(!hideText);
//       setClickOnBtn((data) => !data);
//     });
//   };

//   const handleOnBtn = () => {
//     if (isSliding == true) {
//       axios
//         .post(`${API}/charger_ON/${props.dataTwo}`)
//         .then((res) => {
//           console.log(res.data, 'yy');
//           dispatch(setChargerStatus(res?.data));
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       axios
//         .post(`${API}/charger_OFF/${props.dataTwo}`)
//         .then((res) => {
//           console.log(res.data, 'yy');
//           dispatch(setChargerStatus(res?.data));
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   useEffect(() => {
//     handleOnBtn();
//   }, [isSliding]);

//   const pan = useState(new Animated.ValueXY())[0];
//   const panResponder = useState(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (event, gesture) => {
//         pan.setValue({ x: gesture.dx, y: 0 });
//       },
//       onPanResponderRelease: (event, gesture) => {
//         if (Math.abs(gesture.dx) > 50) {
//           handleSlide();
//         } else {
//           Animated.spring(pan, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: true,
//           }).start();
//         }
//       },
//     })
//   )[0];

//   const slideButtonStyle = {
//     transform: [
//       {
//         translateX: pan.x.interpolate({
//           inputRange: [0, DIMENSIONS.SCREEN_WIDTH * 0.66],
//           outputRange: [0, DIMENSIONS.SCREEN_WIDTH * 0.66],
//           extrapolate: 'clamp',
//         }),
//       },
//     ],
//   };
//   const slideButtonReverseStyle = {
//     transform: [
//       {
//         translateX: pan.x.interpolate({
//           inputRange: [0, DIMENSIONS.SCREEN_WIDTH * 0.66],
//           outputRange: [0, -DIMENSIONS.SCREEN_WIDTH * 0.66],
//           extrapolate: 'clamp',
//         }),
//       },
//     ],
//   };

  
  

 


//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={[
//           'rgba(21, 251, 2, 0.1) 0%,',
//           'rgba(141, 1, 249, 0.2) 10%)',
//           'rgba(141, 1, 249, 0.2) 10%)',
//         ]}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//         style={styles.button}>
//         {!isSliding ? (
//           <TouchableOpacity style={[slideButtonStyle]} onPress={() =>handleSlide()}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <LinearGradient
//                 colors={['#50AC3D', 'rgba(141, 1, 249, 0.5) 10%)']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={{
//                   width: 50,
//                   height: 50,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 50,
//                   borderWidth: 0,
//                   // elevation: 5,
//                 }}>
//                 <Image
//                   source={require('../../assets/images/PowerButton.png')}
//                   style={{width: 20, height: 20}}
//                 />
//               </LinearGradient>
//               {hideText && (
//                 <View
//                   style={{
//                     width: '80%',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     //backgroundColor:COLORS.WHITE
//                   }}>
//                   <Image
//                     source={require('../../assets/images/BackArrow.png')}
//                     style={{
//                       width: 10,
//                       height: 10,
//                       transform: [{rotateY: '180deg'}],
//                     }}
//                   />
//                   <Text
//                     style={{
//                       fontWeight: '400',
//                       fontSize: 14,
//                       lineHeight: 18,
//                       color: COLORS.BLACK,
//                       marginLeft: 10,
                      
//                     }}>
//                     Swipe right to start charging....
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={[slideButtonReverseStyle]} onPress={() => handleSlide()}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-evenly',
//                 alignItems: 'center',
//                 overflow: 'hidden',
//                 alignSelf: 'center',
//               }}>
//               {!hideText && (
//               <View
//                 style={{
//                   width: '70%',
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   alignSelf: 'center',
//                 //   backgroundColor: COLORS.BROWN,
//                 }}>
//                 <Text
//                   style={{
//                     fontWeight: '400',
//                     fontSize: 14,
//                     lineHeight: 18,
//                     color: COLORS.BLACK,
//                     marginRight: 10,
//                   }}>
//                   Swipe left to stop charging....
//                 </Text>
//                 <Image
//                   source={require('../../assets/images/BackArrow.png')}
//                   style={{
//                     width: 10,
//                     height: 10,
//                   }}
//                 />
//               </View>
//               )}
//               <LinearGradient
//                 colors={['#50AC3D', 'rgba(141, 1, 249, 0.5) 10%)']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={{
//                   width: 50,
//                   height: 50,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 50,
//                   borderWidth: 0,
//                   // elevation: 5,
//                 }}>
//                 <Image
//                   source={require('../../assets/images/PowerButton.png')}
//                   style={{width: 20, height: 20}}
//                 />
//               </LinearGradient>
//             </View>
//           </TouchableOpacity>
//         )}



       
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     position: 'absolute',
//     flex: 1,
//     bottom: 50,
//     alignSelf: 'center',
//     borderRadius: 50,
//   },
//   button: {
//     width: DIMENSIONS.SCREEN_WIDTH * 0.8,
//     height: 55,
//     // backgroundColor: COLORS.GREEN,
//     justifyContent: 'center',
//     // alignItems: 'center',
//     borderRadius: 25,
//     borderWidth: 2,
//     borderColor: COLORS.GREEN,
//     overflow: 'hidden',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },


  
// });

// export default ButtonSlider;







import React from 'react';
import {StyleSheet,View,Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import {useState} from 'react';
import { DIMENSIONS } from '../constants/DIMENSIONS';
import COLORS from '../constants/COLORS';

import axios from 'axios';
import { API } from '../api/API';
import { useDispatch, useSelector } from 'react-redux';
import { setChargerStatus } from '../redux/action';
import { navigationRef } from '../../App';
import { DrawerActions } from '@react-navigation/native';
import ActivityLoader from './ActivityLoader';

const BUTTON_WIDTH = 330;
const BUTTON_HEIGHT = 60;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 3 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 3 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 3 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const ButtonSlider = ({onToggle}) => {
  const dispatch = useDispatch();
  const {getUserID} = useSelector((state:any)=> state)
  const [isLoading, setIsLoading] = useState(false)
  const [showText,setShowText] = useState(false)
  
  // Animated value for X translation
  const X = useSharedValue(0);
  // Toggled State
  const [toggled, setToggled] = useState(false);

  // Fires when animation ends
  const handleComplete = (isToggled:any) => {

navigationRef.dispatch(DrawerActions.closeDrawer())
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
    setIsLoading(true)
    if (isToggled == true) {
            axios
              .post(`${API}/charger_ON/${getUserID}`)
              .then((res) => {
                setShowText(true)
                dispatch(setChargerStatus(res?.data));
                setIsLoading(false)
                onToggle(isToggled);
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false)
              });
          } else {
            axios
              .post(`${API}/charger_OFF/${getUserID}`)
              .then((res) => {
                setShowText(false)
                dispatch(setChargerStatus(res?.data));
                setIsLoading(false)
                onToggle(!isToggled);
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false)
              });
          }
    
  };

  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    
    onStart: (_, ctx) => {
      ctx.completed = toggled;
      
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      
      if (X.value < BUTTON_WIDTH / 5 - SWIPEABLE_DIMENSIONS / 5) {
        X.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        X.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
    },
  });

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    
    swipeCont: useAnimatedStyle(() => {
      return {};
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,

        opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
      };
    }),
    swipeable: useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          ['#50AC3D', '#50AC3D'],
        ),
        transform: [{translateX: X.value}],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0.8, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
  };

  return (
    <View style={styles.container}>
     {isLoading && <ActivityLoader />}
    <LinearGradient
           colors={[
              'rgba(21, 251, 2, 0.1) 0%,',
              'rgba(141, 1, 249, 0.2) 10%)',
              'rgba(141, 1, 249, 0.2) 10%)',
            ]}
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
            style={styles.button}
            >
    <Animated.View style={[ AnimatedStyles.swipeCont]}>
      <AnimatedLinearGradient
        style={[AnimatedStyles.colorWave, styles.colorWave]}
        colors={['#50AC3D', '#50AC3D']}
        start={{x: 0.0, y: 0.5}}
        end={{x: 1, y: 0.5}}
      />
      <PanGestureHandler onBegan={()=>navigationRef.dispatch(DrawerActions.closeDrawer())} onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
        <Animated.View style={[styles.swipeable ]}>
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
                  elevation: 0,
                  marginTop:-14,
                  marginLeft:-5
                }}>
                <Image
                  source={require('../../assets/images/PowerButton.png')}
                  style={{width: 20, height: 20}}
                />
                
              </LinearGradient>
              
              </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
      
        {showText==true? 'Swipe left to stop charging' : 'Swipe right to start charging'}
      </Animated.Text>
      
    </Animated.View>
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
        bottom: 40,
        alignSelf: 'center',
        borderRadius: 50,
      },
  swipeCont: {
    // height: BUTTON_HEIGHT,
    // width: BUTTON_WIDTH,
    backgroundColor: '#fff',
    //borderRadius: BUTTON_HEIGHT,
    //padding: BUTTON_PADDING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorWave: {
    position: 'absolute',
    left: 0,
    // height: BUTTON_HEIGHT,
    // borderRadius: BUTTON_HEIGHT,
  },
  swipeable: {
    position: 'absolute',
    left: BUTTON_PADDING,
    // height: SWIPEABLE_DIMENSIONS,
    // width: SWIPEABLE_DIMENSIONS,
    // borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 0,
  },
  swipeText: {
    alignSelf: 'center',
    color: 'black',
    justifyContent:"center",
        fontSize: 16,
    fontWeight: '400',
     zIndex: 2,
     paddingLeft:30
    // backgroundColor:'white'
    
  },
  button: {
        width: DIMENSIONS.SCREEN_WIDTH * 0.9,
        height: 70,
        // backgroundColor: COLORS.GREEN,
        justifyContent: 'center',
        //  alignItems: 'center',
        borderRadius: 35,
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