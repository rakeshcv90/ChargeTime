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
import {DrawerActions, useIsFocused} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
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
  setOverModelView,
  setSubcriptionCancelStatus,
  setPurchaseData,
  setPackageStatus,
} from '../../redux/action';
import ButtonSlider2 from '../../Components/ButtonSlider2';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PauseModal from '../../Components/PauseModal';

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
  const [cancelled, setCancelled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [deviceIdTemp, setDeviceIdTemp] = useState('');
  const [refresh, setRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const {getGraphData} = useSelector((state: any) => state);
  const isFocused = useIsFocused();
  const {
    getChargerStatus,
    getDeviceID,
    getUserID,
    getSubscriptionCancelStatus,
  } = useSelector((state: any) => state);

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
  useEffect(() => {
    if (isFocused) {
      fetchBoxTwoDashboardData(getUserID);
      getSubscriptionStatus();
    }
  }, [isFocused]);
  const getSubscriptionStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/planstatuspauseresume/${getUserID}`);
      const res = await response.json();
      dispatch(setSubscriptionStatus(res.PlanStatus));
      setPaused(res.PlanStatus == '1' ? true : false);
      setIsLoading(false);

    } catch (error) {
      console.log('Error-7', error);
      setIsLoading(false);
    }
  };
  const getDeviceIDData = () => {
    setIsLoading(true);
    axios
      .get(`${API}/devicecheck/${getUserID}}`)
      .then(res => {
     
        setIsLoading(false);
        if (res.data.status == 'True') {
          setDeviceIdTemp(res.data.message);
          fetchGraphData(getUserID);
          fetchBoxTwoDashboardData(getUserID);
          fetchStatusdata(getUserID);
          setIsLoading(false);
          // }, 3000);
        } else {
          setIsLoading(false);
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Device not assigned. Contact service provider',
                props: {
                  numberLines: 2,
                },
              })
            : ToastAndroid.show(
                'Device not assigned. Contact service provider',
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
    const message = 'No usage data available';
    axios
      .get(`${API}/dailyusagedeviceid/${userID}`)
      .then(res => {
        setIsLoading(false);
        console.log('TRTRT22222222',res.data);
        if (res.data.length > 0) {
          dispatch(setGraphData(res.data.Dayusagewithgraph));
          dispatch(setWeekGraphData(res.data.weeklyusagewithgraph));
          dispatch(setMonthGraphData(res?.data.monthlyusagewithgraph));
          dispatch(setQuarterGraphData(res?.data.threemonthusagewithgraph));
          dispatch(setYearGraphData(res?.data.yearlyusagewithgraph));
          dailyUsuagekwh(getUserID);
          setIsLoading(false);
        } else if (res.data.length == undefined) {
          dispatch(setGraphData(res.data.Dayusagewithgraph));
          dispatch(setWeekGraphData(res.data.weeklyusagewithgraph));
          dispatch(setMonthGraphData(res?.data.monthlyusagewithgraph));
          dispatch(setQuarterGraphData(res?.data.threemonthusagewithgraph));
          dispatch(setYearGraphData(res?.data.yearlyusagewithgraph));
          dailyUsuagekwh(getUserID);
          setIsLoading(false);
        } else {
        
          dispatch(setGraphData({message}));
          dispatch(setWeekGraphData({message}));
          dispatch(setMonthGraphData({message}));
          dispatch(setQuarterGraphData({message}));
          dispatch(setYearGraphData({message}));
          setIsLoading(false);
        }
      })
      .catch(err => {
        setIsLoading(false);
        // console.log('TRTRT', err);
      });
  };
  const dailyUsuagekwh = (userId: string) => {
    axios
      .get(`${API}/dailyusage/${userId}`)
      .then(res => {
        setIsLoading(false);
        if (res?.data) {
          dispatch(setKwhData(res?.data));
        }

        remainigUsuageData(getUserID);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };
  const remainigUsuageData = (userId: string) => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${userId}`)
      .then(res => {
        setIsLoading(false);
        if (parseInt(res.data?.kwh_unit_remaining) > 0) {
          remaingData = res.data?.kwh_unit_remaining;
          dispatch(setRemainingData(res.data?.kwh_unit_remaining));

          dispatch(setOverUsage(false));
          dispatch(setOverModelView(false));
          setIsLoading(false);
        } else {
          remaingData = res.data?.kwh_unit_overusage;
          dispatch(setRemainingData(res.data?.kwh_unit_overusage));

          dispatch(setOverUsage(true));
          dispatch(setOverModelView(true));
          setIsLoading(false);
        }
    
        // dispatch(setRemainingData(remaingData));
        setIsLoading(false);
        //fetchWeekGraphData(getUserID);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('TRTRT333333333', err);
      });
  };

  const fetchBoxTwoDashboardData = (userId: string) => {
    setIsLoading(true);
    axios
      .get(`${API}/currentplan/${userId}`)
      .then(res => {
        const subCancelStatus = res.data?.message?.subscription_cancel_status;

        setIsLoading(false);
      
        if (res.data.data == 'Package not found') {
          dispatch(setBoxTwoDataForDashboard(res?.data));
          dispatch(setPurchaseData(res.data));
        } else if (subCancelStatus == 4 || subCancelStatus == 2) {
          dispatch(
            setSubcriptionCancelStatus(
              subCancelStatus == 2 ? 2 : subCancelStatus == 4 ? 4 : 0,
            ),
          );
          dispatch(setPackageStatus(false));
          dispatch(setBoxTwoDataForDashboard({data: 'Package not found'}));
          dispatch(setPurchaseData({data: 'Package not found'}));
        } else {
          dispatch(setBoxTwoDataForDashboard(res?.data));
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
        }
        setCancelled(
          subCancelStatus == 1 ||
            subCancelStatus == 2 ||
            subCancelStatus == 3 ||
            subCancelStatus == 4
            ? true
            : false,
        );
      })
      .catch(err => {
        console.log('TRTRT444444444', err);
        setIsLoading(false);
      });
  };
  const fetchStatusdata = (userId: string) => {
    axios
      .get(`${API}/chargerstatus/${userId}`)
      .then(res => {
        setIsLoading(false);
        dispatch(setChargerStatus(res?.data));
        dispatch(setDeviceId(deviceIdTemp));
        setIsLoading(false);
      })
      .catch(err => {
        console.log('TRTRT5555555555', err);
        setIsLoading(false);
      });
  };
  const handleRefresh = () => {
  
    setRefresh(true);
    fetchBoxTwoDashboardData(getUserID);
    remainigUsuageData(getUserID);
    dailyUsuagekwh(getUserID);
    fetchGraphData(getUserID);
    fetchStatusdata(getUserID);
    setTimeout(() => {
      setRefresh(false);
    }, 3000);
  };
  return (
    <>
      <DrawerOpen top={PLATFORM_IOS ? DIMENSIONS.SCREEN_WIDTH * 0.19 : 30} />
      <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
        <StatusBar backgroundColor={COLORS.CREAM2} barStyle={'dark-content'} />

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
                  uri: 'https://lottie.host/a18631fc-3895-4d33-8395-8a338608b16a/BIk5hlIWG8.json',
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
                color: COLORS.BLACK,
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
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 16,
                fontWeight: 'bold',
              },
              swipeEnabled: false,
              tabBarScrollEnabled: true,
            }}
            tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen
              name="Day"
              component={Day}
              initialParams={{handleRefresh, refresh}}
            />
            <Tab.Screen
              name="Week"
              component={Week}
              initialParams={{handleRefresh, refresh}}
            />
            <Tab.Screen
              name="Month"
              component={Month}
              initialParams={{handleRefresh, refresh}}
            />
            <Tab.Screen
              name="Quarter"
              component={Quarter}
              initialParams={{handleRefresh, refresh}}
            />
            <Tab.Screen
              name="Year"
              component={Year}
              initialParams={{handleRefresh, refresh}}
            />
          </Tab.Navigator>
        )}
        {getDeviceID ==
        'Your Account is not currently linked with a TRO Charger. Please contact customer service if you believe this is an error.' ? (
          <View>
            <Text></Text>
          </View>
        ) : (
          <>
            <View
              style={{
                marginVertical:
                  Platform.OS == 'ios'
                    ? -(DIMENSIONS.SCREEN_HEIGHT * 0.05)
                    : -10,
              }}>
              {getSubscriptionCancelStatus ==
              2 ? null : getSubscriptionCancelStatus == 4 ? null : (
                <ButtonSlider2 />
              )}
            </View>
          </>
        )}

        {paused ? (
          <PauseModal
            paused={paused}
            setPaused={setPaused}
            cancel1={getSubscriptionCancelStatus == 1}
            cancel2={getSubscriptionCancelStatus == 2}
            cancel1Stripe={getSubscriptionCancelStatus == 3}
            cancel2Stripe={getSubscriptionCancelStatus == 4}
          />
        ) : (
          <PauseModal
            paused={cancelled}
            setPaused={setCancelled}
            cancel1={getSubscriptionCancelStatus == 1}
            cancel2={getSubscriptionCancelStatus == 2}
            cancel1Stripe={getSubscriptionCancelStatus == 3}
            cancel2Stripe={getSubscriptionCancelStatus == 4}
          />
        )}
        {isLoading && (
          <View
            style={{
              height: DIMENSIONS.SCREEN_WIDTH / 5,
              width: DIMENSIONS.SCREEN_WIDTH / 5,
              backgroundColor: COLORS.LIGHT_GREY,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 15,
              marginTop: 'auto',
              marginBottom: 'auto',
              top: DIMENSIONS.SCREEN_HEIGHT * 0.5,
              position: 'absolute',
            }}>
            <ActivityIndicator size="large" color="#05bea5" />
          </View>
        )}
      </SafeAreaView>
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
