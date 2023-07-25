/* eslint-disable prettier/prettier */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  Image,
  Dimensions,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import HorizontalLine from '../../Components/HorizontalLine';
import Header from '../../Components/Header';

import COLORS from '../../constants/COLORS';
import SubBoxOne from '../../Components/SubBoxOne';
import SubBoxTwo from '../../Components/SubBoxTwo';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import WaveAnimation from '../../Components/WaveAnimation';
import {DIMENSIONS} from '../../constants/DIMENSIONS';
import PriceValiditySubs from '../../Components/PriceValiditySubs';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {API} from '../../api/API';
import {
  getCurrentPlan as UpdatedCurrentPlan,
  setPackageStatus,
  setPlanStatus,
  setPurchaseData,
} from '../../redux/action';
import {userSubsData} from '../../redux/action';

import AnimatedLottieView from 'lottie-react-native';
import {navigationRef} from '../../../App';
import axios from 'axios';
import Remaining from '../../Components/Remaining';
import ActivityLoader from '../../Components/ActivityLoader';

const mobileW = Math.round(Dimensions.get('screen').width);
const Subscription = () => {
  const getUserID = useSelector(state => state.getUserID);
  const getPurchaseData = useSelector(state => state.getPurchaseData);
  const {getChargerStatus, getDeviceID} = useSelector(state => state);

  const [forLoading, setForLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [getData, setGetData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    getPlanCurrent();
  }, []);

  const user_id = getUserID;

  const PlanCancel = async () => {
    try {
      setForLoading(true);
      const response = await axios({
        url: `${API}/plancancel/${user_id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // const result = await response.json();
      console.log(response.data, 'ttt');
      if (response.data.message == 'Plan Cancelled Successfully') {
        const updatedData = [
          {
            ...getPurchaseData[0],
            End_validity: null,
            dollar_mi: null,
            energy_plan: null,
            energy_price: null,
            kwh: null,
            mi_eq: null,
            remaining_package: null,
            total_package: null,
          },
        ];
        dispatch(UpdatedCurrentPlan(updatedData));
        getPlanCurrent();
        // PlanStatus()
        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: 'Plan Cancelled Successfully',
            })
          : ToastAndroid.show(
              'Plan Cancelled Successfully',
              ToastAndroid.SHORT,
            );
      }
    } catch (error) {
      setForLoading(false);
      console.error(error);
    }
  };
  const getPlanCurrent = () => {
    // setForLoading(true);
    axios
      .get(`${API}/currentplan/${getUserID}`)
      .then(res => {
        setForLoading(false);
        setModalVisible(false);
        if (res.data.data == 'Package details not found') {
          dispatch(setPurchaseData(res.data));
          // console.log("-------------------",res.data)
          setGetData(res.data);
          dispatch(setPackageStatus(false));
        } else {
          dispatch(setPurchaseData(res?.data));
          setGetData(res.data);
        }
      })
      .catch(err => {
        setForLoading(false);
        console.log(err);
      });
  };

  const CancelModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cancel Subscription</Text>
            <AnimatedLottieView
              source={{
                uri: 'https://assets6.lottiefiles.com/private_files/lf30_mf7q9oho.json',
              }} // Replace with your animation file
              autoPlay
              loop
              style={{width: 50, height: 50}}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: COLORS.BLACK,
              }}>
              Do you really want to cancel your Subscription
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: COLORS.RED,
                marginVertical: 5,
              }}>
              All your (Active / Scheduled ) Subscriptions will be Cancelled
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View style={styles.button_one}>
                <Pressable
                  style={{
                    borderRadius: 20,
                    padding: 10,
                  }}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
              <View style={styles.button_one}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={PlanCancel}>
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };


  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
        <Header headerName="Subscription" />
        {Platform.OS == 'android' ? (
          <HorizontalLine style={styles.line} />
        ) : (
          <View>
            <Image
              source={require('../../../assets/images/dotted.png')}
              style={{width: mobileW * 0.97}}
            />
          </View>
        )}

        {getPurchaseData.data == 'Package details not found' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              marginBottom: DIMENSIONS.SCREEN_HEIGHT * 0.25,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',

                alignItems: 'center',
              }}>
              <AnimatedLottieView
                source={{
                  uri: 'https://assets5.lottiefiles.com/packages/lf20_v4UB4ch6dZ.json',
                }} // Replace with your animation file
                autoPlay
                loop
                style={{
                  width: DIMENSIONS.SCREEN_WIDTH * 0.4,
                  height: DIMENSIONS.SCREEN_HEIGHT * 0.25,
                }}
              />
              <AnimatedLottieView
                source={{
                  uri: 'https://assets7.lottiefiles.com/packages/lf20_qgq2nqsy.json',
                }} // Replace with your animation file
                autoPlay
                loop
                style={{width: 50, height: 50}}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 25,
                textAlign: 'center',
                paddingHorizontal: 30,
                color: COLORS.BLACK,
              }}>
              No (Active / Scheduled ) Package Available.
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                // fontWeight: '500',
                color: COLORS.BLACK,
                marginVertical: 5,
              }}>
              Please Purchase Package from Home.
            </Text> */}
            <TouchableOpacity
              onPress={() => navigationRef.navigate('HomeStack')}
              style={{
                width: mobileW * 0.45,
                borderRadius: 10,
                backgroundColor: COLORS.WHITE,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
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
              <Text
                style={{
                  color: '#263238',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 17,
                  textTransform: 'capitalize',
                }}>
                Purchase Plan
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.managing_width}>
              <SubBoxOne />
              <SubBoxTwo />
              <Remaining data={'energy'} />
            </View>
            {/* <View style={styles.mainDiv_installation}> */}
            {/* <WaveAnimation /> */}

            {/* < WaveLinearGradient /> */}
            {/* </View> */}
            <View
              style={{
                ...styles.managing_width,
                marginTop: PLATFORM_IOS ? -12 : 0,
              }}>
              <PriceValiditySubs data={getPurchaseData.data} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginHorizontal: 20,
                paddingBottom: 30,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  marginTop: 15,
                  marginRight: 170,
                  backgroundColor: '#F84E4E',
                  alignItems: 'center',
                  padding: 13,
                  borderRadius: 10,
                  width: '50%',
                }}>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  Cancel Subscription
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
      <CancelModal />
      {forLoading && <ActivityLoader />}
    </>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 10,
    border: 15,
    marginLeft: 10,
    marginRight: 10,
    //  flex: 1,
    paddingVertical: PLATFORM_IOS ? 0 : 3,
  },
  mainDiv_installation: {
    marginLeft: 20,
    backgroundColor: '#F5F5F5',
    width: DIMENSIONS.SCREEN_WIDTH * 0.9,
    height: DIMENSIONS.SCREEN_WIDTH * 0.35,
    marginVertical: 10,
    flexDirection: 'column-reverse',
    shadowColor: '#000000',
    shadowOffSet: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    borderWidth: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: DIMENSIONS.SCREEN_WIDTH * 0.9,
  },
  button_one: {
    // marginLeft: 80,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    borderRadius: 100,
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
