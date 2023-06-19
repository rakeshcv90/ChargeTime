import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import COLORS from '../constants/COLORS';
import LinearGradient from 'react-native-linear-gradient';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import { useSelector } from 'react-redux';

const TotalUsage = ({data}) => {
  
 
  
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        width: DIMENSIONS.SCREEN_WIDTH * 0.4,
        height: DIMENSIONS.SCREEN_WIDTH * 0.35,
        marginVertical: 20,
        flexDirection: 'column-reverse',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.62,
        elevation: 8,
        borderWidth: 0,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <Text
        style={{
          padding: 5,
          fontWeight: '600',
          fontSize: 12,
          lineHeight: 14,
          textTransform: 'capitalize',
          color: COLORS.BLACK,
          position: 'absolute',
          top: 10,
          left: 10,
        }}>
        Total Usage
      </Text>
      <View
        style={{
          width: '100%',
        }}>
        <View style={{marginBottom: 30, marginLeft: 30}}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 16,
              lineHeight: 20,
              color: COLORS.BLACK,
            }}>
            
            {data ? data?.toFixed(2) + ' kWh' : 0 + ' kWh'}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 10,
              lineHeight: 12,
              color: 'rgba(61, 61, 61, 0.6)',
            }}>
            Total Weekly Usage
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TotalUsage;

const styles = StyleSheet.create({});