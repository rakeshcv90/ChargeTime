/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import COLORS from '../constants/COLORS';
import LinearGradient from 'react-native-linear-gradient';
import { DIMENSIONS, PLATFORM_IOS } from '../constants/DIMENSIONS';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../api/API';
import {
  setOverusageCount,
  setOverUsage,
  setRemainingData,
  setOverModelView,
} from '../redux/action';
import AnimatedLottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { navigationRef } from '../../App';
import redWave from '../../assets/red_wave.json';
import Tooltip from 'react-native-walkthrough-tooltip';

const Remaining = ({ ...props }) => {
  const dispatch = useDispatch();
  const [totalAllowed, setTotalAllowed] = useState(0);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const getRemainingData = useSelector((state: any) => state.getRemainingData);
  const getUserID = useSelector((state: any) => state.getUserID);
  const overusage = useSelector((state: any) => state.overusage);
  const overusageCount = useSelector((state: any) => state.overusageCount);
  const [modalVisible, setModalVisible] = useState(false);
  const [x, setX] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      remainigUsuageData();
    }, []),
  );

  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();

    animationRef.current?.play(30, 120);
  }, []);

  const remainigUsuageData = () => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${getUserID}`)
      .then(res => {
        setTotalAllowed(res.data?.total_kwhunit);

        const remaining = parseFloat(res.data?.kwh_unit_remaining || 0);

        if (remaining > 0) {
          // If there is any usage left
          remaingData = remaining;
          dispatch(setRemainingData(remaining));
          dispatch(setOverUsage(false));
          // reset overusage count if needed
          dispatch(setOverusageCount(0));
          dispatch(setOverModelView(false));
        } else {
          // Overusage scenario
          const overUsage = parseFloat(res.data?.kwh_unit_overusage || 0);
          remaingData = overUsage;
          dispatch(setRemainingData(overUsage));
          dispatch(setOverUsage(true));
          dispatch(setOverModelView(true));

          if (overusageCount < 1) {
            setModalVisible(true);
            dispatch(setOverusageCount(overusageCount + 1));
          }
        }
      })
      .catch(err => {
        console.log('remainigUsuageData error:', err);
      });
  };

  const nav = () => {
    setModalVisible(!modalVisible);
    dispatch(setOverusageCount(overusage + 1));
    navigationRef.navigate('HomeOne');
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: '#F5F5F5',
          width:
            props?.data !== 'energy'
              ? DIMENSIONS.SCREEN_WIDTH * 0.4
              : DIMENSIONS.SCREEN_WIDTH * 0.9,
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
          overflow: PLATFORM_IOS ? 'hidden' : 'hidden',
        }}
      >
        <Text
          style={{
            padding: 5,
            fontWeight: '600',
            fontSize: 12,
            lineHeight: 14,
            textTransform: 'capitalize',
            color: overusage ? COLORS.BLACK : COLORS.BLACK,
            position: 'absolute',
            top: 10,
            left: 10,
          }}
        >
          {overusage ? 'Overusage' : 'Remaining Usage'}
        </Text>
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,
            right: 10,
            zIndex: 10,
            elevation: 10,
          }}
          onPress={() => setToolTipVisible(true)}
        >
        
          <Image
            source={require('../../assets/images/information.png')}
            style={{ height: 15, width: 15 }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
        <Tooltip
          isVisible={toolTipVisible}
          content={
            <View style={{ padding: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#555',

                  maxWidth: 150,
                }}
              >
                This indicates the remaining energy (in kWh) available for the
                current billing cycle.
              </Text>
            </View>
          }
          placement="left"
          arrowSize={{ width: 16, height: 8 }}
          backgroundColor="rgba(0,0,0,0.3)"
          contentStyle={{
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 10,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 5,
          }}
          onClose={() => setToolTipVisible(false)}
        ></Tooltip>

        <View
          style={{
            top: '45%',
            alignItems: 'center',
            position: 'absolute',
            alignSelf: 'center',
            zIndex: 1,
          }}
        >
          <Text
            style={{
              fontWeight: '800',
              fontSize: 16,
              lineHeight: 20,
              color: overusage ? COLORS.BLACK : COLORS.BLACK,
            }}
          >
            {getRemainingData ? getRemainingData : 0}
            {' kWh'}
          </Text>

          <Text
            style={{
              fontWeight: '700',
              fontSize: 10,
              lineHeight: 12,
              color: overusage ? COLORS.BLACK : 'rgba(61, 61, 61, 0.9)',
            }}
          >
            {overusage ? 'Units Used' : 'Units Left To Be Used'}
          </Text>
        </View>

        {overusage ? (
          <>
            <View
              style={{
                width: '100%',
                backgroundColor: PLATFORM_IOS
                  ? 'rgba(248, 84, 84, 1)'
                  : 'rgba(248, 98, 98, 1)',

                height: `${100 - 20}%`,
              }}
            />
            <AnimatedLottieView
              source={redWave}
              autoPlay
              loop
              style={{
                zIndex: -1,
                width: `100%`,

                marginBottom:
                  (getRemainingData / totalAllowed) * 100 <= 30 ? -10 : -10,
              }}
            />
          </>
        ) : (
          <>
            <View
              style={{
                width: '100%',
                backgroundColor: '#AFD35E',

                height: `${(getRemainingData / totalAllowed) * 100 - 20}%`,

                zIndex: -1,
              }}
            />
            <AnimatedLottieView
              source={require('../../assets/wave.json')} // Replace with your animation file
              autoPlay
              loop
              renderMode={'SOFTWARE'}
              style={{
                marginBottom:
                  (getRemainingData / totalAllowed) * 100 <= 30 ? -1 : -10,
                zIndex: -1,
                width: `100%`,
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Remaining;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: DIMENSIONS.SCREEN_WIDTH * 0.8,
  },
  button_one: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.GREEN,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 24,
    color: '#000000',
  },
});
