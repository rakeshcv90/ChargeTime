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
  setSubcriptionCancelStatus,
  setSubscriptionStatus,
} from '../../redux/action';
import {userSubsData} from '../../redux/action';

import AnimatedLottieView from 'lottie-react-native';
import {navigationRef} from '../../../App';
import axios from 'axios';
import Remaining from '../../Components/Remaining';
import ActivityLoader from '../../Components/ActivityLoader';
import RemainingHorizontal from '../../Components/RemainingHorizontal';
import PauseModal from '../../Components/PauseModal';

const mobileW = Math.round(Dimensions.get('screen').width);
const Subscription = ({navigation, route}) => {
  const getUserID = useSelector(state => state.getUserID);
  const getPurchaseData = useSelector(state => state.getPurchaseData);
  const {getChargerStatus, getDeviceID, subscriptionStatus} = useSelector(
    state => state,
  );
  const getSubscriptionCancelStatus = useSelector(
    state => state.getSubscriptionCancelStatus,
  );

  const [text, setText] = useState(
    subscriptionStatus == '0' || subscriptionStatus == null
      ? 'Pause Subscription'
      : 'Resume Subscription',
  );

  const [forLoading, setForLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [getData, setGetData] = useState([]);
  const [paused, setPaused] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    getPlanCurrent();
    getSubscriptionStatus1();
    // getSubscription()
  }, []);

  // const getSubscription = () => {
  //   axios
  //     .get(`${API}/planstatuspauseresume/${getUserID}`)
  //     .then(res => {
  //       dispatch(setSubscriptionStatus(res.data.PlanStatus));
  //       if (res.data.PlanStatus == '0' || res.data.PlanStatus == null) {
  //         setText('Pause Subscription');
  //       } else {
  //         setText('Resume Subscription');
  //       }
  //     })
  //     .catch(err => {
  //       console.log('1111144444', err);
  //     });
  // };

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
        const subCancelStatus = response?.data?.subscription_cancel_status;
        dispatch(
          setSubcriptionCancelStatus(
            subCancelStatus == 1
              ? 1
              : subCancelStatus == 2
              ? 2
              : subCancelStatus == 3
              ? 3
              : subCancelStatus == 4
              ? 4
              : 0,
          ),
        );
        getPlanCurrent();
        // PlanStatus()
        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: response.data.message,
            })
          : ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        setModalVisible(false);
        setForLoading(false);
      }
    } catch (error) {
      setForLoading(false);
      console.error(error);
      setModalVisible(false);
    }
  };
  const getPlanCurrent = () => {
    // setForLoading(true);
    axios
      .get(`${API}/currentplan/${getUserID}`)
      .then(res => {
        setForLoading(false);
        setModalVisible(false);
        const subCancelStatus = res.data?.message?.subscription_cancel_status;

        if (res.data.data == 'Package not found') {
          dispatch(setPurchaseData(res.data));
          setGetData(res.data);
          dispatch(setPackageStatus(false));
        } else if (subCancelStatus == 4 || subCancelStatus == 2) {
          dispatch(
            setSubcriptionCancelStatus(
              subCancelStatus == 2 ? 2 : subCancelStatus == 4 ? 4 : 0,
            ),
          );
          dispatch(setPackageStatus(false));
          dispatch(setPurchaseData({data: 'Package not found'}));
        } else {
          dispatch(
            setSubcriptionCancelStatus(
              subCancelStatus == 1
                ? 1
                : subCancelStatus == 2
                ? 2
                : subCancelStatus == 3
                ? 3
                : subCancelStatus == 4
                ? 4
                : 0,
            ),
          );
          dispatch(setPurchaseData(res?.data));
          setGetData(res.data);
          dispatch(setPackageStatus(true));
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
  const getSubscriptionStatus = async () => {
    setForLoading(true);
    try {
      const res = await axios({
        url:
          subscriptionStatus == '0' || subscriptionStatus == null
            ? `${API}/subscription_pause/${getUserID}`
            : `${API}/subscription_resume/${getUserID}`,
      });
      if (res.data) {
        setForLoading(false);
        getSubscriptionStatus1();

        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: res.data.subscription,
            })
          : ToastAndroid.show(res.data.subscription, ToastAndroid.SHORT);
      }
    } catch (error) {
      setForLoading(false);
      console.log('dddd1111', err);
    }
    // if (text == 'Pause Subscription') {
    //   axios
    //     .get(`${API}/subscription_pause/${getUserID}`)
    //     .then(res => {
    //       setForLoading(false);
    //       getSubscriptionStatus1();

    //       PLATFORM_IOS
    //         ? Toast.show({
    //             type: 'success',
    //             text1: res.data.subscription,
    //           })
    //         : ToastAndroid.show(res.data.subscription, ToastAndroid.SHORT);
    //     })
    //     .catch(err => {
    //       setForLoading(false);
    //       console.log('dddd1111', err);
    //     });
    // } else {
    //   axios
    //     .get(`${API}/subscription_resume/${getUserID}`)
    //     .then(res => {
    //       setForLoading(false);
    //       getSubscriptionStatus1();
    //       PLATFORM_IOS
    //         ? Toast.show({
    //             type: 'success',
    //             text1: res.data.subscription,
    //           })
    //         : ToastAndroid.show(res.data.subscription, ToastAndroid.SHORT);
    //     })
    //     .catch(err => {
    //       setForLoading(false);
    //       console.log(err);
    //     });
    // }
  };
  const getSubscriptionStatus1 = async () => {
    try {
      const res = await axios({
        url: `${API}/planstatuspauseresume/${getUserID}`,
        // url: `${API}/planstatuspauseresume/${getUserID}/`,
        method: 'get',
      });
      if (res.data) {
        console.log('My Plan Status', res.data, getUserID);
        // res.data.PlanStatus == '1'
        //   ? setPaused(
        //       getSubscriptionCancelStatus == 1 ||
        //         getSubscriptionCancelStatus == 2,
        //     )
        //   :
        setPaused(res.data.PlanStatus == '1' ? true : false);
        dispatch(setSubscriptionStatus(res.data.PlanStatus));
      }
    } catch (error) {
      console.log('dddd143', error);
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
        <Header headerName={'Subscription'} editShow={false} />
        {Platform.OS == 'android' ? (
          <HorizontalLine style={styles.line} />
        ) : (
          <View>
            <Image
              source={require('../../../assets/images/dotted.png')}
              style={{width: mobileW * 0.99}}
              resizeMode="stretch"
            />
          </View>
        )}
        {getPurchaseData.data != 'Package not found' &&
        getPurchaseData?.data?.old_subscription_status != 'cancel' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.managing_width}>
              {/* <Text
                style={{
                  color: 'black',
                  fontWeight: '400',
                  fontSize: 14,
                  marginVertical: 5,
                  alignSelf: 'center',
                  textAlign: 'justify'
                }}>
                {getSubscriptionCancelStatus == 1
                  ? `You don’t have a plan. You can use your remaining credits until its over.`
                  : getSubscriptionCancelStatus == 3
                  ? `Your account has been cancelled due to a declined payment. Please update your payment information to reinstate your account. You can use the charger until your usage quota limit is reached.`
                  : ''}
              </Text> */}
              <SubBoxOne />
              <SubBoxTwo />
              <RemainingHorizontal data={'energy'} />
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

            {/* <View
              style={{
                
                //  marginHorizontal: DIMENSIONS.SCREEN_WIDTH * 0.1,
                paddingBottom: 30,
                width: DIMENSIONS.SCREEN_WIDTH * 0.8,
                height: DIMENSIONS.SCREEN_HEIGHT * 0.1,
               
                flexDirection:'row',
          
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  marginTop: 15,

                  backgroundColor: '#F84E4E',
                  alignItems: 'center',
                  padding: 13,
                  borderRadius: 10,

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
                    color: COLORS.WHITE,
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  Cancel Subscription
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  getSubscriptionStatus();
                }}
                style={{
                  marginTop: 15,
                  marginHorizontal:10,
                  backgroundColor: COLORS.GREEN,
                  alignItems: 'center',
               
                  borderRadius: 10,
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
                    color: COLORS.BLACK,
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  {text}
                </Text>
              </TouchableOpacity>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: DIMENSIONS.SCREEN_WIDTH * 0.9,
                alignItems: 'center',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                disabled={
                  subscriptionStatus == '1' || getSubscriptionCancelStatus != 0
                }
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  width: DIMENSIONS.SCREEN_WIDTH * 0.4,
                  height: (DIMENSIONS.SCREEN_HEIGHT * 6) / 100,
                  backgroundColor:
                    subscriptionStatus == '1' ||
                    getSubscriptionCancelStatus != 0
                      ? 'lightgrey'
                      : '#F84E4E',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
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
                    color: COLORS.WHITE,
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  Cancel Subscription
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={getSubscriptionCancelStatus != 0}
                onPress={() => {
                  getSubscriptionStatus();
                }}
                style={{
                  width: DIMENSIONS.SCREEN_WIDTH * 0.4,
                  height: (DIMENSIONS.SCREEN_HEIGHT * 6) / 100,
                  // marginLeft: DIMENSIONS.SCREEN_WIDTH * 0.1,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    getSubscriptionCancelStatus != 0
                      ? 'lightgrey'
                      : COLORS.GREEN,
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
                    color:
                      getSubscriptionCancelStatus != 0
                        ? COLORS.WHITE
                        : COLORS.BLACK,
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  {subscriptionStatus == '0' || subscriptionStatus == null
                    ? 'Pause Subscription'
                    : 'Resume Subscription'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
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
                // source={{
                //   uri: 'https://assets7.lottiefiles.com/packages/lf20_qgq2nqsy.json',
                // }} // Replace with your animation file
                source={require('../../../assets/question.json')}
                autoPlay
                loop
                style={{width: 100, height: 100, marginVertical: -5}}
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
              No (Active/Scheduled) Package Available.
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
              onPress={
                () => {
                  if (
                    getPurchaseData?.data != 'Package not found' &&
                    getPurchaseData?.data?.old_subscription_status == 'cancel'
                  ) {
                    navigation.navigate('DrawerStack', {
                      screen: 'EnergyOptions',
                    });
                  } else {
                    navigation.navigate('HomeStack');
                  }
                }

                //
              }
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
        )}
        {/* {getPurchaseData.data == 'Package not found' ||
        getSubscriptionCancelStatus == 2 ||
        getSubscriptionCancelStatus == 4 ? (
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
                // source={{
                //   uri: 'https://assets7.lottiefiles.com/packages/lf20_qgq2nqsy.json',
                // }} // Replace with your animation file
                source={require('../../../assets/question.json')}
                autoPlay
                loop
                style={{width: 100, height: 100, marginVertical: -5}}
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
              No (Active/Scheduled) Package Available.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('HomeStack')}
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
              <RemainingHorizontal data={'energy'} />
            </View>

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
                justifyContent: 'space-between',
                width: DIMENSIONS.SCREEN_WIDTH * 0.9,
                alignItems: 'center',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                disabled={
                  subscriptionStatus == '1' || getSubscriptionCancelStatus != 0
                }
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  width: DIMENSIONS.SCREEN_WIDTH * 0.4,
                  height: (DIMENSIONS.SCREEN_HEIGHT * 6) / 100,
                  backgroundColor:
                    subscriptionStatus == '1' ||
                    getSubscriptionCancelStatus != 0
                      ? 'lightgrey'
                      : '#F84E4E',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
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
                    color: COLORS.WHITE,
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  Cancel Subscription
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={getSubscriptionCancelStatus != 0}
                onPress={() => {
                  getSubscriptionStatus();
                }}
                style={{
                  width: DIMENSIONS.SCREEN_WIDTH * 0.4,
                  height: (DIMENSIONS.SCREEN_HEIGHT * 6) / 100,
                  // marginLeft: DIMENSIONS.SCREEN_WIDTH * 0.1,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    getSubscriptionCancelStatus != 0
                      ? 'lightgrey'
                      : COLORS.GREEN,
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
                    color:
                      getSubscriptionCancelStatus != 0
                        ? COLORS.WHITE
                        : COLORS.BLACK,
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  {subscriptionStatus == '0' || subscriptionStatus == null
                    ? 'Pause Subscription'
                    : 'Resume Subscription'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )} */}
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
        <PauseModal
          paused={paused}
          setPaused={setPaused}
          cancel1={getSubscriptionCancelStatus == 1}
          cancel2={getSubscriptionCancelStatus == 2}
        />
      </SafeAreaView>

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
