import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import COLORS from '../constants/COLORS';
import { DIMENSIONS } from '../constants/DIMENSIONS';


const ActivityLoader = (props) => {
    const {visible} = props
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          height: DIMENSIONS.SCREEN_HEIGHT,
          width: DIMENSIONS.SCREEN_WIDTH,
          backgroundColor: COLORS.BLACK,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.8
        }}>
        <ActivityIndicator size={'large'} color={COLORS.GREEN} />
      </View>
    </Modal>
  );
};

export default ActivityLoader;

const styles = StyleSheet.create({});
