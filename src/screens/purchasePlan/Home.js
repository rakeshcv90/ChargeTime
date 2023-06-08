import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import TabThree from './TabThree';
import COLORS from '../../constants/COLORS';
import DrawerOpen from '../../Components/DrawerOpen';
import {useState, useEffect} from 'react';
import {API} from '../../api/API';
import axios from 'axios';
import ActivityLoader from '../../Components/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabFour from './TabFour';
const mobileW = Math.round(Dimensions.get('screen').width);

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        overflow: 'hidden',
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

        const onPress = () => {
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
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderRadius: isFocused ? 20 : 0,
            }}>
            <Text
              style={{
                color: isFocused ? '#fff' : 'black',
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

export default function Home(route) {
  const [isLoading, setIsLoading] = useState(true);

  const Tab = createMaterialTopTabNavigator();

  

  const [apiData, setApiData] = useState([]);
  
  
  
  useEffect(() => {
    fetchData();
  }, []);
 

  const fetchData = async () => {
    let loginData = await AsyncStorage.getItem('loginDataOne');
    console.log(loginData,"object")
    try {
      const response = await axios.get(`${API}/packagePlan/${loginData}`);
      
      setApiData(response?.data?.locations);
     if(response?.data?.locations !==''){
        setIsLoading(false);
     }
      
     
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <DrawerOpen />
      <View style={styles.charging_imag_style}>
        <Image
          source={require('../../../assets/images/car_one.png')}
          resizeMode="stretch"
          style={{alignSelf: 'center', width: mobileW}}
        />
      </View>

      {isLoading || apiData !==null? (
        <ActivityLoader visible={isLoading} />||
        <Tab.Navigator >
          <Tab.Screen name='Base Package 1' component={TabFour} />
        </Tab.Navigator>
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
          {
            apiData?.length >= 1 &&
              apiData&&apiData.map((item, ind) => {
                
                return (
                  <Tab.Screen
                    key={ind}
                    name={item?.package_name}
                    component={item?.package_name}
                    initialParams={{item}}
                  />
                );
              })

            
          }
        </Tab.Navigator> 
        
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  charging_imag_style: {
    justifyContent: 'center',
    alignItems: 'center',
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
});
