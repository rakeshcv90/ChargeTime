import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import WaveAnimation from './WaveAnimation';

const WaveLinearGradient = (props) => {
    return (
      <LinearGradient
        colors={['rgba(177, 211, 79, 0.7) 0%', 'rgb(177, 211, 79) 0%']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          width: '100%',
          height: props.RemainingFill ? `${props.RemainingFill}%` : '1%',
          flexDirection: 'column-reverse',
          background: linear-gradient('180deg', '#B1D34F 0%', '#50AC3D 100%')
        }}
      >
        <View style={{ marginBottom: 30, marginLeft: 30 }}>   background: linear-gradient(180deg, #B1D34F 0%, #50AC3D 100%)
          <WaveAnimation />
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontWeight: '800',
              fontSize: 16,
              lineHeight: 20,
              color: COLORS.BLACK,
            }}
          >
            {' '}
            {props.KWH ? props.KWH + ' kWh' : 0 + ' kWh'}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontWeight: '400',
              fontSize: 10,
              lineHeight: 12,
              color: 'rgba(61, 61, 61, 0.6)',
            }}
          >
            Units Left To Be Used
          </Text>
        </View>
      </LinearGradient>
    );
  };
  
  export default WaveLinearGradient;