/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable react/self-closing-comp */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  BackHandler,
  Platform,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import COLORS from '../../constants/COLORS';
import Day from './Day';
import Month from './Month';
import Week from './Week';
import Quarter from './Quarter';
import Year from './Year';
import {DIMENSIONS, PLATFORM_IOS} from '../../constants/DIMENSIONS';

import {NoCharge} from '../../../assets/images/NoCharge';
import {OnlineCharge} from '../../../assets/images/OnlineCharge';
import Charging from '../../Components/Charging';
import axios from 'axios';
import {API} from '../../api/API';
import ActivityLoader from '../../Components/ActivityLoader';
import DrawerOpen from '../../Components/DrawerOpen';
import {navigationRef} from '../../../App';
import {DrawerActions} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import {
  setBoxTwoDataForDashboard,
  setChargerStatus,
  setDeviceId,
  setGraphData,
  setKwhData,
  setMonthGraphData,
  setOverUsage,
  setQuarterGraphData,
  setRemainingData,
  setWeekGraphData,
  setYearGraphData,
  setSubscriptionStatus,
} from '../../redux/action';
import ButtonSlider2 from '../../Components/ButtonSlider2';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mobileW = Math.round(Dimensions.get('screen').width);

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        ...Platform.select({
          ios: {
            shadowColor: '#000000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
          android: {
            elevation: 4,
            overflow: 'hidden',
          },
        }),
        borderWidth: 1,
        borderColor: '#EEEEEE',
        zIndex: 1,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = async () => {
          let data = 0;

          if (route.name == 'Day') {
            data = DIMENSIONS.SCREEN_WIDTH * 2.4;
            // AsyncStorage.setItem(
            //   'graph_Width',
            //   JSON.stringify(DIMENSIONS.SCREEN_WIDTH * 2.4),
            // );
          } else if (route.name == 'Week') {
            data = DIMENSIONS.SCREEN_WIDTH * 2;
          } else if (route.name == 'Month') {
            data = DIMENSIONS.SCREEN_WIDTH * 8;
          } else if (route.name == 'Year') {
            data = DIMENSIONS.SCREEN_WIDTH * 1;
          } else if (route.name == 'Quarter') {
            data = DIMENSIONS.SCREEN_WIDTH * 9;
          } else {
            data = DIMENSIONS.SCREEN_WIDTH * 2.4;
          }
          AsyncStorage.setItem('graph_Width', JSON.stringify(data));
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? COLORS.GREEN : '#EEEEEE',
              paddingHorizontal: index == 2 ? 10 : 0,
              paddingVertical: 10,
              borderRadius: isFocused ? 20 : 20,
              alignItems: 'center',
              justifyContent: 'center',
              //   elevation: isFocused ? 10 : 0,
              overflow: 'hidden',
            }}>
            <Text
              style={{
                textTransform: 'uppercase',
                color: isFocused ? '#fff' : 'black',
                fontWeight: isFocused ? 'bold' : '400',
                fontSize: 12,
                textAlign: 'center',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
export default function EnergyStats() {
  const Tab = createMaterialTopTabNavigator();
  const [showCar, setShowCar] = useState(true);
  const [offline, setOffline] = useState(true);
  const [charging, setCharging] = useState(true);
  const [deviceIdTemp, setDeviceIdTemp] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const {getGraphData} = useSelector((state: any) => state);

  const {getChargerStatus, getDeviceID, getUserID} = useSelector(
    (state: any) => state,
  );

  const [toggleState, setToggleState] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackButton = () => {
    return true;
  };

  const handleToggle = (value: any) => {
    setToggleState(value);
    navigationRef.dispatch(DrawerActions.closeDrawer());
  };

  const getDeviceIDData = () => {
    setIsLoading(true);
    axios
      .get(`${API}/devicecheck/${getUserID}}`)
      .then(res => {
        if (res.data.status == 'True') {
          console.log('bbbbbbbb', res.data.message);
          setDeviceIdTemp(res.data.message);
          fetchGraphData(getUserID);
          fetchBoxTwoDashboardData(getUserID);
          fetchStatusdata(getUserID);
          // }, 3000);
        } else {
          setIsLoading(false);
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1:
                  'Device ID not found. Contact your service representative for more information.',
                props: {
                  numberLines: 2,
                },
              })
            : ToastAndroid.show(
                'Device ID not found. Contact your service representative for more information.',
                ToastAndroid.SHORT,
              );
          // getPlanCurrent(res.data?.user_id);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('rererererere', err);
      });
  };

  //day data start
  const fetchGraphData = (userID: string) => {
    axios
      .get(`${API}/dailyusagedeviceid/${userID}`)
      .then(res => {
        dispatch(setGraphData(res.data.Dayusagewithgraph));
        dispatch(setWeekGraphData(res.data.weeklyusagewithgraph));
        dispatch(setMonthGraphData(res?.data.monthlyusagewithgraph));
        dispatch(setQuarterGraphData(res?.data.threemonthusagewithgraph));
        dispatch(setYearGraphData(res?.data.yearlyusagewithgraph));
        dailyUsuagekwh(getUserID);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('TRTRT', err);
      });
  };
  const dailyUsuagekwh = (userId: string) => {
    axios
      .get(`${API}/dailyusage/${userId}`)
      .then(res => {
        if (res?.data) {
          dispatch(setKwhData(res?.data));
        }

        remainigUsuageData(getUserID);
      })
      .catch(err => {
        console.log('TRTRT11111111', err);
      });
  };
  const remainigUsuageData = (userId: string) => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${userId}`)
      .then(res => {
        if (parseInt(res.data?.kwh_unit_remaining) > 0) {
          remaingData = res.data?.kwh_unit_remaining;
          dispatch(setOverUsage(false));
        } else {
          remaingData = res.data?.kwh_unit_overusage;
          dispatch(setOverUsage(true));
        }
        console.log('first', res.data);
        dispatch(setRemainingData(remaingData));
        setIsLoading(false);
        //fetchWeekGraphData(getUserID);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('TRTRT333333333', err);
      });
  };

  const fetchBoxTwoDashboardData = (userId: string) => {
    axios
      .get(`${API}/currentplan/${userId}`)
      .then(res => {
        dispatch(setBoxTwoDataForDashboard(res?.data));
      })
      .catch(err => {
        console.log('TRTRT444444444', err);
      });
  };
  const fetchStatusdata = (userId: string) => {
    axios
      .get(`${API}/chargerstatus/${userId}`)
      .then(res => {
        dispatch(setChargerStatus(res?.data));
        dispatch(setDeviceId(deviceIdTemp));
      })
      .catch(err => {
        console.log('TRTRT5555555555', err);
      });
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
        <StatusBar backgroundColor={COLORS.CREAM2} barStyle={'dark-content'} />

        <DrawerOpen top={PLATFORM_IOS ? 70 : 30} />
        {getDeviceID ==
        'Your Account is not currently linked with a TRO Charger. Please contact customer service if you believe this is an error.' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
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
                style={{width: 150, height: 150}}
              />
              <AnimatedLottieView
                // source={{
                //   uri: 'https://assets7.lottiefiles.com/packages/lf20_qgq2nqsy.json',
                // }} // Replace with your animation file
                source={require('../../../assets/question.json')}
                autoPlay
                loop
                style={{
                  width: 100,
                  height: 100,
                  marginTop: -0,
                  marginHorizontal: -5,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 25,
                textAlign: 'center',
                paddingHorizontal: 30,
              }}>
              {getDeviceID}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={getDeviceIDData}
                style={{
                  width: mobileW * 0.3,
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
                  Refresh
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigationRef.navigate('Contact')}
                style={{
                  width: mobileW * 0.3,
                  borderRadius: 10,
                  backgroundColor: COLORS.GREEN,
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
                  Contact Us
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View style={{backgroundColor: COLORS.CREAM2}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {getChargerStatus?.message == 'Charging' ? (
                  <Charging />
                ) : (
                  <>
                    <View
                      style={{
                        margin: 20,
                        backgroundColor: COLORS.WHITE,
                        height: 50,
                        width: 60,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: -5,
                          height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                      }}>
                      {getChargerStatus?.message == 'Online' ? (
                        <OnlineCharge style={{marginTop: 8, marginLeft: 5}} />
                      ) : (
                        <NoCharge style={{marginTop: 8, marginLeft: 5}} />
                      )}
                    </View>
                    <View>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 10,
                          lineHeight: 17,
                          color: COLORS.BLACK,
                        }}>
                        Current Status
                      </Text>
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: 16,
                          lineHeight: 17,
                          color: COLORS.BLACK,
                        }}>
                        {getChargerStatus?.message == 'Online'
                          ? 'Online'
                          : 'Offline'}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
            <View>
              {getChargerStatus?.message !== 'Offline' ? (
                <Image
                  source={require('../../../assets/images/dashboard_img.png')}
                  style={{
                    width: DIMENSIONS.SCREEN_WIDTH,
                    height: DIMENSIONS.SCREEN_WIDTH / 3,
                  }}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/WithoutCar.png')}
                  style={{
                    width: DIMENSIONS.SCREEN_WIDTH,
                    height: DIMENSIONS.SCREEN_WIDTH / 3,
                  }}
                />
              )}
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 16,
                  lineHeight: 19,
                  textTransform: 'capitalize',
                  color: '#000000',
                  marginBottom: 15,
                  marginTop: 15,
                }}>
                Energy Statistics
              </Text>
            </View>
          </View>
        )}

        {getDeviceID ==
        'Your Account is not currently linked with a TRO Charger. Please contact customer service if you believe this is an error.' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}></View>
        ) : (
          <Tab.Navigator
            swipeEnabled={false}
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 16,
                fontWeight: 'bold',
              },
              tabBarScrollEnabled: true,
            }}
            tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Day" component={Day} />
            <Tab.Screen name="Week" component={Week} />
            <Tab.Screen name="Month" component={Month} />
            <Tab.Screen name="Quarter" component={Quarter} />
            <Tab.Screen name="Year" component={Year} />
          </Tab.Navigator>
        )}
        {getDeviceID ==
        'Your Account is not currently linked with a TRO Charger. Please contact customer service if you believe this is an error.' ? (
          <View>
            <Text></Text>
          </View>
        ) : (
          <>
            <View style={{marginVertical: Platform.OS == 'ios' ? -40 : -10}}>
              <ButtonSlider2 />
            </View>
          </>
        )}
      </SafeAreaView>
      {isLoading && <ActivityLoader />}
    </>
  );
}

const styles = StyleSheet.create({
  charging_imag_style: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: DIMENSIONS.SCREEN_WIDTH,
  },
  managing_width: {
    paddingHorizontal: 20,
    // paddingVertical:15
  },
  allPackage_style: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  for_package_one: {
    backgroundColor: '#B1D34F',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    fontWeight: 600,
    fontSize: 12,
  },
  for_notmanage: {
    color: '#fff',
  },
});
