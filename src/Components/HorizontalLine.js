import React from 'react';
import {View} from 'react-native';
import COLORS from '../constants/COLORS';


const HorizontalLine = (props) => {
  return (
    <View
      style={{
        height: props.height ? props.height : 1,
        alignSelf: 'center',
        backgroundColor: COLORS.GREEN,
        width: props.width ? props.width : '100%',
        marginVertical: props.mV ? props.mV :20,
      }}></View>
  );
};

export default HorizontalLine;
