import {
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../constants/COLORS';

import {DIMENSIONS} from '../constants/DIMENSIONS';

import AnimatedLottieView from 'lottie-react-native';


const CardDeleteConfirmation = ({ isVisible, onClose, onPress }) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.text}>Delete Card</Text>
          <AnimatedLottieView
            source={{
              uri: 'https://assets6.lottiefiles.com/private_files/lf30_mf7q9oho.json',
            }} // Replace with your animation file
            autoPlay
            loop
            style={{width: 200, height: 150}}
          />
          <View
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
                padding: 13,
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
            </TouchableOpacity>
            <TouchableOpacity
            onPress={onPress}
              style={{
                backgroundColor: 'red',
                alignItems: 'center',
                padding: 13,
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
              <Text style={[styles.log_In_btn, {color: COLORS.WHITE}]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CardDeleteConfirmation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  log_In_btn: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? 700 : 700,
  },
});
