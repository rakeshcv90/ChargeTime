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
  Alert
} from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabOne from './TabOne';

import COLORS from '../../constants/COLORS';
import DrawerOpen from '../../Components/DrawerOpen';
import {useState, useEffect} from 'react';
import {API} from '../../api/API';
import axios from 'axios';
import ActivityLoader from '../../Components/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabFour from './TabFour';

import { useDispatch } from 'react-redux';
import { getBasePackage } from '../../redux/action';

import { useSelector } from 'react-redux';


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

export default function Home(route) {
  const [isLoading, setIsLoading] = useState(true);
  const [showPackage, setShowPackage] = useState(false);
  const dispatch =useDispatch();
  const [changePage,setChangePage] = useState('')
  const Tab = createMaterialTopTabNavigator();

  const [apiData, setApiData] = useState([]);
  const getLocationID = useSelector((state) => state.getLocationID)
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //  loginData = await AsyncStorage.getItem('loginDataOne');

    try {
      const response = await axios.get(`${API}/packagePlan/${getLocationID}`);

      if (response?.data?.locations.length == 0) {
        setIsLoading(true);
        setShowPackage(true);
      } else {
        setApiData(response?.data?.locations);
        dispatch(getBasePackage(response.data.locations));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  
  function MyTabBar({state, descriptors, navigation, position}) {
    useEffect(() => {
      setChangePage(state.index)
    },[])
    
    
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
               backgroundColor: isFocused ? '#B1D34F' : '#EEEEEE',
               paddingHorizontal: 12,
               paddingVertical: 13,
               // borderRadius:10,
               borderRadius: isFocused ? 10 : 0,
               shadowColor: 'rgba(0, 0, 0, 1)',
               shadowOffset: {
                 width: isFocused ? 6 : 0,
                 height: isFocused ? 4 : 0,
               },
               shadowOpacity: isFocused ? 1 : 0,
               shadowRadius: isFocused ? 4 : 0,
               elevation: Platform.OS === 'android' && isFocused ? 8 : 0,
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
           </TouchableOpacity>
         );
       })}
     </View>
   );
 }
  //end

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <DrawerOpen />
      <View style={styles.charging_imag_style}>
        {changePage == 0 ?
        <Image
          source={require('../../../assets/images/bp_one.png')}
          resizeMode="cover"
          style={{width: mobileW,height:mobileH/4}}
        />
        :changePage == 1 ?<Image
        source={require('../../../assets/images/bp_two.png')}
        resizeMode="cover"
        style={{width: mobileW,height:mobileH/4}}
      />:<Image
      source={require('../../../assets/images/bp_three.png')}
      resizeMode="cover"
      style={{width: mobileW,height:mobileH/4}}
      />
}
      </View>

      {isLoading || showPackage ? (
        <View>
          {!showPackage ? (
            <ActivityLoader visible={!showPackage} />
          ) : (
            <Text>No Package</Text>
          )}
        </View>
      ) : (
        (
          <Tab.Navigator
            screenOptions={{
              activeTintColor: 'blue',
              inactiveTintColor: 'gray',
              labelStyle: {
                fontSize: 16,
                fontWeight: 'bold',

              },
              
            }}
            tabBar={props => <MyTabBar {...props}  />}>
            {apiData?.length >= 1 &&
              apiData &&
              apiData.map((item, ind) => {
                return (
                  <Tab.Screen
                    key={ind}
                    name={item?.package_name}
                    component={TabOne}
                    initialParams={{item}}
                  />
                );
              })}
          </Tab.Navigator>
        ) || (
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
            <Tab.Screen name="Base Package 1" component={TabFour} />
          </Tab.Navigator>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  charging_imag_style: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30
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
