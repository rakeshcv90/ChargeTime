

import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { DIMENSIONS } from '../constants/DIMENSIONS';
import COLORS from '../constants/COLORS';

import axios from 'axios';
import { API } from '../api/API';
import { useDispatch, useSelector } from 'react-redux';
import { setChargerStatus } from '../redux/action';
import { navigationRef } from '../../App';
import { DrawerActions } from '@react-navigation/native';
import ActivityLoader from './ActivityLoader';
import AnimatedLottieView from 'lottie-react-native';



const ButtonSlider2 = () => {
    const { getUserID, getChargerStatus } = useSelector((state) => state);

    const animation = useSharedValue(0)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: animation.value }]
        }
    })


    const handleComplete = (Data) => {


        setIsLoading(true);
        if (Data == '0') {
            axios
                .post(`${API}/charger_ON/${getUserID}`)
                .then(res => {
                    // setShowText(true);
                    dispatch(setChargerStatus(res?.data));
                    setIsLoading(false);

                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                });
        }
        else {
            axios
                .post(`${API}/charger_OFF/${getUserID}`)
                .then(res => {
                    // setShowText(false);
                    dispatch(setChargerStatus(res?.data));
                    setIsLoading(false);
                    ;
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                });
        }
    };


    return (
        <View style={styles.container}>
            {isLoading && <ActivityLoader />}
            {console.log("Animation Style isiiii",)}
            <TouchableOpacity style={styles.button}
                onPress={() => {


                    if (animation.value == 0) {
                        animation.value = withTiming(DIMENSIONS.SCREEN_WIDTH * 75 / 100, { duration: 1000 })

                        handleComplete(animation.value)
                    } else {
                        animation.value = withTiming(0, { duration: 1000 })

                        handleComplete(animation.value)
                    }
                }}
                activeOpacity={1}>
                <LinearGradient
                    colors={[
                        'rgba(21, 251, 2, 0.1) 0%,',
                        'rgba(141, 1, 249, 0.2) 10%)',
                        'rgba(141, 1, 249, 0.2) 10%)',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        width: DIMENSIONS.SCREEN_WIDTH * 89 / 100,
                        height: DIMENSIONS.SCREEN_HEIGHT * 6.5 / 100,
                        borderRadius: 35,

                        position: 'absolute',

                    }}
                >


                </LinearGradient>
                <Animated.View style={animatedStyle}>
                   
                    <LinearGradient
                        colors={['#50AC3D', 'rgba(141, 1, 249, 0.5) 10%)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            width: DIMENSIONS.SCREEN_WIDTH * 10 / 100,
                            height: DIMENSIONS.SCREEN_HEIGHT * 5 / 100,
                            justifyContent: 'center',
                            margin: DIMENSIONS.SCREEN_WIDTH * 2 / 100,
                            borderRadius: 70,
                            marginHorizontal:getChargerStatus.message == 'Online' ||
                                 getChargerStatus.message == 'Charging' ? 150 : 0,



                            alignItems: 'center',
                            justifyContent: 'center',




                        }}>

                        {getChargerStatus.message == 'Online' ||
                            getChargerStatus.message == 'Charging' ? (
                            <Image
                                source={require('../../assets/images/PowerButton.png')}
                                style={{ width: 20, height: 20 }}
                            />
                        ) : (

                            <AnimatedLottieView
                                source={{
                                    uri: 'https://assets9.lottiefiles.com/packages/lf20_hbr24n88.json',
                                }} // Replace with your animation file
                                autoPlay
                                loop
                                style={{ width: 20, height: 20, }}
                            />

                        )}

                    </LinearGradient>
                </Animated.View>

            </TouchableOpacity>

            <Text style={[styles.swipeText]}>
                {getChargerStatus.message == 'Online' ||
                    getChargerStatus.message == 'Charging'
                    ? 'Click left to stop charging'
                    : 'Click  right to start charging'}

            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        width: DIMENSIONS.SCREEN_WIDTH * 0.9,
        height: DIMENSIONS.SCREEN_HEIGHT * 0.07,
        borderRadius: 35,
        borderWidth: 2,
        position: 'absolute',
        bottom: DIMENSIONS.SCREEN_HEIGHT * 0.01,
        borderColor: COLORS.GREEN,
        justifyContent: 'center',

    },
    swipeText: {
        alignSelf: 'center',
        color: 'black',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: '400',
        zIndex: 2,
        bottom: DIMENSIONS.SCREEN_HEIGHT * 0.03,
        //  paddingLeft:30
        // backgroundColor:'white'
    }


});

export default ButtonSlider2;
