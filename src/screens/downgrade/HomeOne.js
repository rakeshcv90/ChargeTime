/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import COLORS from '../../constants/COLORS';
import DrawerOpen from '../../Components/DrawerOpen';
import {useState, useEffect} from 'react';
import {API} from '../../api/API';
import axios from 'axios';
import ActivityLoader from '../../Components/ActivityLoader';

import {useDispatch} from 'react-redux';
import {setBasePackage} from '../../redux/action';

import {useSelector} from 'react-redux';
import SliderOne from './SliderOne';
import AnimatedLottieView from 'lottie-react-native';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';

const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);
let loginData;
// function MyTabBar({state, descriptors, navigation, position}) {
//    loginData = state.routes[state.index].name;

//   return (
//     <View style={[styles.tabbar_part, styles.shadowProp]}>
//       {state.routes.map((route, index) => {
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate({name: route.name, merge: true});
//           }

//         };

//         return (
//           <TouchableOpacity
//             key={index}
//             onPress={onPress}
//             style={{
//               flex: 1,
//               backgroundColor: isFocused ? '#B1D34F' : '#EEEEEE',
//               paddingHorizontal: 12,
//               paddingVertical: 13,
//               // borderRadius:10,
//               borderRadius: isFocused ? 10 : 0,
//               shadowColor: 'rgba(0, 0, 0, 1)',
//               shadowOffset: {
//                 width: isFocused ? 6 : 0,
//                 height: isFocused ? 4 : 0,
//               },
//               shadowOpacity: isFocused ? 1 : 0,
//               shadowRadius: isFocused ? 4 : 0,
//               elevation: Platform.OS === 'android' && isFocused ? 8 : 0,
//             }}>
//             <Text
//               style={{
//                 color: isFocused ? 'black' : 'black',
//                 fontWeight: isFocused ? '600' : '400',
//                 fontSize: 12,
//                 textAlign: 'center',
//               }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

export default function HomeOne(route) {
  const [isLoading, setIsLoading] = useState(true);
  const [showPackage, setShowPackage] = useState(false);
  const dispatch = useDispatch();
  const [changePage, setChangePage] = useState('');
  const Tab = createMaterialTopTabNavigator();
  // const [purChaseButton,setPurchaseButton] = use
  const [activeTab, setActiveTab] = useState('');
  const [apiData, setApiData] = useState([]);
  const [myTest, setMyTest] = useState('');
  const {getLocationID, getPurchaseData, getBasePackage} = useSelector(
    state => state,
  );
 
  const [showLottieView, setShowLottieView] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  const populateNumArray = () => {
    const numArray = [];

    if (getBasePackage?.length >= 1 && getBasePackage) {
      getBasePackage.forEach(item => {
        const num =
          getPurchaseData.data != 'Package not found'
            ? item.package_name.toLowerCase() ===
              getPurchaseData?.data?.energy_plan?.toLowerCase()
            : '';

        numArray.push(num);
      });
    }

    return numArray;
  };

  // State to hold the numArray value
  const [numArray, setNumArray] = useState([]);

  // Update the numArray when getBasePackage or getPurchaseData changes
  useEffect(() => {
    const updatedNumArray = populateNumArray();
    setNumArray(updatedNumArray);

  }, [getBasePackage, getPurchaseData]);

  const fetchData = async () => {
    //  loginData = await AsyncStorage.getItem('loginDataOne');

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
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  function MyTabBar({state, descriptors, navigation, position}) {
    useEffect(() => {
      setChangePage(state.index);
    }, []);
    let activeTabIndex = state.routes.map(item => item.name);

    useEffect(() => {
      // Do something with the activeTabIndex
    }, [activeTabIndex]);

    return (
      <View style={[styles.tabbar_part, styles.shadowProp]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          if (isFocused) {
            setMyTest(label);
          }

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
                padding:5
            
              }}
              >
              <View
                style={{
                  borderRadius: isFocused ? 10 : 10,
                  paddingVertical: 13,
                   ...Platform.select({
                  ios: {
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 6},
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
                    color: isFocused ? 'black' : 'black',
                    fontWeight: isFocused ? '600' : '400',
                    fontSize: 12,
                    textAlign: 'center',
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
      {/* {getPurchaseData.data != 'Package not found'
        ? getPurchaseData.data.energy_plan.toLowerCase() ===
            myTest.toLowerCase() && (
            <View
              style={{
                position: 'absolute',
                right: PLATFORM_IOS
                  ? (mobileW * 25) / 100
                  : (mobileW * 25) / 100,
                alignSelf: 'flex-end',
                top: PLATFORM_IOS ? (mobileH * -2) / 100 : (mobileH * -6) / 100,
                // marginVertical:PLATFORM_IOS ? -20: -40,
                zIndex: 5,
              }}>
              <AnimatedLottieView
                source={{
                  uri: 'https://assets3.lottiefiles.com/packages/lf20_OrMyddm62t.json',
                }} // Replace with your animation file
                autoPlay
                loop
                style={{
                  width: (mobileW * 25) / 100,
                  height: (mobileH * 25) / 100,
                }}
              />
            </View>
          )
        : null} */}

      <DrawerOpen top={PLATFORM_IOS ? 70 : 30} />
      <View style={[styles.charging_imag_style]}>
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

      {isLoading || showPackage ? (
        <View>
          {!showPackage ? (
            <ActivityLoader visible={!showPackage} />
          ) : (
            <View>
              <Text>No Package</Text>
            </View>
          )}
        </View>
      ) : (
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
          {getBasePackage?.length >= 1 &&
            getBasePackage &&
            getBasePackage.map((item, ind) => {
              let purchageData =
                getPurchaseData.data != 'Package not found'
                  ? item?.kwh > getPurchaseData?.data?.kwh
                    ? 'UPGRADE'
                    : item?.kwh < getPurchaseData?.data?.kwh
                    ? 'DOWNGRADE'
                    : `Renewal Date: \n${getPurchaseData?.data?.End_validity}` // This will be displayed when item.kwh == getPurchaseData.data.kwh
                  : '';
              // let num =
              //   (item.package_name.toLowerCase() === getPurchaseData.length) !=
              //     0 && getPurchaseData.data.energy_plan.toLowerCase();

              return (
                <Tab.Screen
                  key={ind}
                  name={item?.package_name}
                  component={SliderOne}
                  initialParams={{item: item, purchageData: purchageData,index:ind}}
                />
              );
            })}
        </Tab.Navigator>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  charging_imag_style: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    // backgroundColor: 'black',
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
    // paddingVertical: 8,
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
    // elevation: Platform.OS === 'android' ? 8 : 0,
  },
});
