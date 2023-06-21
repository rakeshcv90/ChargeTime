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
          height: 100,
          width: 100,
          backgroundColor: COLORS.BLACK,
          alignItems: 'center',
          alignContent:'center',
          alignSelf:'center',
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
