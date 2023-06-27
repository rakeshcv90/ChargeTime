import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import COLORS from '../constants/COLORS';
import LinearGradient from 'react-native-linear-gradient';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {API} from '../api/API';
import {setRemainingData} from '../redux/action';

const Remaining = ({...props}) => {
  const dispatch = useDispatch();
  const {getRemainingData, getUserID} = useSelector((state: any) => state);
  useEffect(() => {
    remainigUsuageData();
  }, []);

  const remainigUsuageData = () => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${getUserID}`)
      .then(res => {
        if (res.data?.kwh_unit_remaining >= 0) {
          remaingData = res.data?.kwh_unit_remaining;
        } else {
          remaingData = res.data?.kwh_unit_overusage;
        }
        dispatch(setRemainingData(remaingData));
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        width:
          props?.data !== 'energy'
            ? DIMENSIONS.SCREEN_WIDTH * 0.4
            : DIMENSIONS.SCREEN_WIDTH * 0.9,
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
            // transform: [animatedValue ? {rotate}: null],
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
        Remaining Usage
      </Text>
      <LinearGradient
        colors={['rgba(177, 211, 79, 0.7) 0%,', 'rgb(177, 211, 79) 0%,']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          width: '100%',
          height: getRemainingData ? `${getRemainingData/10}%` : '1%',
          flexDirection: 'column-reverse',
        }}>
        <View style={{marginBottom: 30, marginLeft: 30}}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 16,
              lineHeight: 20,
              color: COLORS.BLACK,
            }}>
            {' '}
            {getRemainingData ? getRemainingData : 0}{' kWh'}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 10,
              lineHeight: 12,
              color: 'rgba(61, 61, 61, 0.6)',
            }}>
            Units Left To Be Used
          </Text>
        </View>
      </LinearGradient>
      {/* <View
        style={{
          flexDirection: 'row',
        //   flex: 0.1,
          backgroundColor: COLORS.GREEN,
        }}>
        {getRemainingData > 10 && getRemainingData < 90 && (
          <View
            style={{
              width: '100%',
              height: '1%',
            }}>
            <LinearGradient
              colors={['#B1D34F', '#50AC3D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '100%',
                height: '1%',
              }}
            />
          </View>
        )}
        {getRemainingData > 10 && getRemainingData < 90 && (
          <View
            style={{
              width: '100%',
              height: '10%',
            }}>
            <LinearGradient
              colors={['#B1D34F', '#50AC3D']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                width: '100%',
                height: '10%',
              }}
            />
          </View>
        )}
      </View> */}
    </View>
  );
};

export default Remaining;

const styles = StyleSheet.create({});
