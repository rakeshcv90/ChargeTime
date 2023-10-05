import {
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../constants/COLORS';

import {DIMENSIONS} from '../constants/DIMENSIONS';

import AnimatedLottieView from 'lottie-react-native';

const Maintainence = ({isVisible}: any) => {
  return (
    <Modal animationType={'slide'} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <AnimatedLottieView
            source={{
              uri: 'https://lottie.host/15a01da1-62c7-4de9-984c-8e38b160f3f9/xNI8fIqWsm.json',
            }} // Replace with your animation file
            autoPlay
            loop
            style={{width: 200, height: 150}}
          />
          <Text
            style={{
              color: COLORS.BLACK,
              fontWeight: '500',
              //fontFamily: 'Roboto',
              lineHeight: 20,
              fontSize: 14,
              marginBottom: 15,
            }}>
            We are under maintainence. Try Later
          </Text>
          {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
  
                width: 200,
                height: 40,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                 onPress={onClose}
                style={{
                  backgroundColor: COLORS.GREEN,
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
  
                  ...Platform.select({
                    ios: {
                      shadowColor: '#000000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                    },
                    android: {
                      elevation: 4,
                    },
                  }),
                }}>
                <Text style={styles.log_In_btn}>Cancel</Text>
              </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              BackHandler.exitApp();
            }}
            style={{
              backgroundColor: 'red',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,

              shadowColor: '#000000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4,
              //   ...Platform.select({
              //     ios: {
              //     },
              //     android: {
              //     },
              //   }),
            }}>
            <Text
              style={[
                styles.log_In_btn,
                {color: COLORS.WHITE, paddingHorizontal: 15},
              ]}>
              Ok
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
    </Modal>
  );
};

export default Maintainence;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  modal: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: DIMENSIONS.SCREEN_WIDTH * 0.8,
    justifyContent: 'center',
  },
  text: {
    color: '#3f2949',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  log_In_btn: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontWeight: '700',
  },
});
