import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import COLORS from '../constants/COLORS';
import { DIMENSIONS } from '../constants/DIMENSIONS';

const ActivityLoader = props => {
  const { visible = true } = props;
  if (!visible) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.15)', // Lighter backdrop for better visibility
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        borderRadius: 15, // Match modalView if used inside it
      }}
    >
      <View
        style={{
          height: 80,
          width: 80,
          backgroundColor: COLORS.LIGHT_GREY, // Match the grey loader theme
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          // elevation: 5,
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    </View>
  );
};

export default ActivityLoader;
