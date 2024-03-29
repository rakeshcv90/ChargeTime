/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabOne from './TabOne';
import AnimatedLottieView from 'lottie-react-native';

import COLORS from '../../constants/COLORS';
import DrawerOpen from '../../Components/DrawerOpen';
import {useState, useEffect} from 'react';
import {API} from '../../api/API';
import axios from 'axios';
import ActivityLoader from '../../Components/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabFour from './TabFour';

import {useDispatch} from 'react-redux';
import {setBasePackage} from '../../redux/action';

import {useSelector} from 'react-redux';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';

const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);
let loginData;

export default function Home(route) {
  const [isLoading, setIsLoading] = useState(true);
  const [showPackage, setShowPackage] = useState(false);
  const dispatch = useDispatch();
  const [changePage, setChangePage] = useState('');
  const Tab = createMaterialTopTabNavigator();

  const {getLocationID, getBasePackage, getPackageStatus, getMyLocation} =
    useSelector(state => state);

  const [apiData, setApiData] = useState(getBasePackage || []);

  useEffect(() => {
    fetchData();

    getBasePackage.length == 0 ? setShowPackage(true) : setShowPackage(false);
  }, []);

  const fetchData = async () => {
    //  loginData = await AsyncStorage.getItem('loginDataOne');
    // setIsLoading(true);

    try {
      const response = await axios.get(`${API}/packagePlan/${getLocationID}`);

      if (response?.data?.locations.length == 0) {
        setIsLoading(true);
        setShowPackage(true);
        dispatch(setBasePackage([]));
      } else {
        setApiData(response?.data?.locations);
        dispatch(setBasePackage(response.data.locations));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data44444444:', error);
      setIsLoading(false);
    }
  };

  function MyTabBar({state, descriptors, navigation, position}) {
    useEffect(() => {
      setChangePage(state.index);
    }, []);

    return (
      <View style={[styles.tabbar_part]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({name: route.name, merge: true});
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{
                flex: 1,
                backgroundColor: '#EEEEEE',
                padding: 5,
              }}>
              <View
                style={{
                  borderRadius: isFocused ? 10 : 10,
                  paddingVertical: 13,
                  ...Platform.select({
                    ios: {
                      shadowColor: '#000000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                    },
                    android: {
                      elevation: isFocused ? 4 : 0,
                    },
                  }),
                  backgroundColor: isFocused ? '#B1D34F' : null,
                }}>
                <Text
                  style={{
                    fontWeight: isFocused ? '600' : '400',
                    fontSize: 12,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  //end

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <DrawerOpen top={PLATFORM_IOS ? 70 : 30} />
      {getBasePackage.length != 0 && (
        <View style={styles.charging_imag_style}>
          {changePage == 0 ? (
            <Image
              source={require('../../../assets/images/bp_one.png')}
              resizeMode="cover"
              style={{width: mobileW, height: mobileH / 4}}
            />
          ) : changePage == 1 ? (
            <Image
              source={require('../../../assets/images/bp_two.png')}
              resizeMode="cover"
              style={{width: mobileW, height: mobileH / 4}}
            />
          ) : (
            <Image
              source={require('../../../assets/images/bp_three.png')}
              resizeMode="cover"
              style={{width: mobileW, height: mobileH / 4}}
            />
          )}
        </View>
      )}

      {getBasePackage?.length > 1 ? (
        <Tab.Navigator
          screenOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            labelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
          tabBar={props => <MyTabBar {...props} />}>
          {getBasePackage.map((item, ind) => {
            return (
              <Tab.Screen
                key={ind}
                name={item?.package_name}
                component={TabOne}
                initialParams={{index: ind}}
              />
            );
          })}
        </Tab.Navigator>
      ) : getBasePackage.length == 1 ? (
        <>
              <Tab.Navigator
          screenOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            labelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
          tabBar={props => <MyTabBar {...props} />}>
          {getBasePackage.map((item, ind) => {
            return (
              <Tab.Screen
                key={ind}
                name={item?.package_name}
                component={TabOne}
                initialParams={{index: ind}}
              />
            );
          })}
        </Tab.Navigator>
          {/* <TabOne item={getBasePackage[0]} /> */}
        </>
      ) : (
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
            No Package Available for this Location
          </Text>
        </View>
      )}
      {/* </Tab.Navigator> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  charging_imag_style: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
    fontWeight: '600',
    fontSize: 12,
  },
  for_notmanage: {
    color: '#fff',
  },
  tabbar_part: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    overflow: 'hidden',
  },
  shadowProp: {
    //backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
});
