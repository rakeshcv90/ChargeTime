import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import COLORS from '../constants/COLORS';
import LinearGradient from 'react-native-linear-gradient';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { API } from '../api/API';
import { setKwhData } from '../redux/action';

const TotalUsage = ({...props}) => {
  const dispatch = useDispatch();
  const {getRemainingData, getUserID, getkwhData} = useSelector(
    (state: any) => state,
  );
  useFocusEffect(
    // overusage && setModalVisible(true);
    useCallback(() => {
      dailyUsuagekwh();
    }, []),
  );
  
  const dailyUsuagekwh = () => {
    axios
      .get(`${API}/dailyusage/${getUserID}`)
      .then(res => {
        if (res?.data) {
          console.log("DAILTYRWTEW", res.data)
          dispatch(setKwhData(res?.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        width: DIMENSIONS.SCREEN_WIDTH * 0.4,
        height: DIMENSIONS.SCREEN_WIDTH * 0.35,
        marginVertical: DIMENSIONS.SCREEN_HEIGHT * 0.02,
        flexDirection: 'column-reverse',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 0,
        borderRadius: 10,
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
        <View style={{marginBottom: 50, marginLeft: 30,alignContent:'center',}}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 16,
              lineHeight: 20,
              color: COLORS.BLACK,
            }}>
            
            {getkwhData.Totalusedkwhs ? getkwhData.Totalusedkwhs?.toFixed(2) + ' kWh' : 0 + ' kWh'}
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