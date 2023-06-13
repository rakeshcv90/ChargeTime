import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import COLORS from '../../constants/COLORS';
import Day from './Day';
import Month from './Month';
import Week from './Week';
import Quarter from './Quarter';
import Year from './Year';
import {DIMENSIONS} from '../../constants/DIMENSIONS';
import ButtonSlider from '../../Components/ButtonSlider';
import {NoCharge} from '../../../assets/images/NoCharge';
import {OnlineCharge} from '../../../assets/images/OnlineCharge';
import Charging from '../../Components/Charging';
import axios from 'axios';
import { API } from '../../api/API';
import ActivityLoader from '../../Components/ActivityLoader';
import DayOne from './DayOne';
import DrawerOpen from '../../Components/DrawerOpen';
const mobileW = Math.round(Dimensions.get('screen').width);

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 1,
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
              paddingHorizontal: index == 2 ? 10 : 0,
              paddingVertical: 10,
              borderRadius: isFocused ? 20 : 0,
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
  
  const [isLoading, setIsLoading] = useState(true);
  const {getGraphData}  = useSelector((state:any) => state)
// const {getWeekGraphData} =  useSelector((state:any) => state)

  
  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
        <StatusBar backgroundColor={COLORS.CREAM2} barStyle={'dark-content'} />
        
        <DrawerOpen />
       
        
        <View style={{backgroundColor: COLORS.CREAM2, flex: 0.3}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {charging ? (
              <Charging />
            ) : (
              <>
                <View
                  style={{
                    margin: 20,
                    backgroundColor: COLORS.WHITE,
                    height: 70,
                    width: 70,
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
                  {offline ? <NoCharge /> : <OnlineCharge />}
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
                    {offline ? 'Offline' : 'Online'}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View >
        <View style={{marginTop:-60}}>
        {showCar ? (
          <Image
            source={require('../../../assets/images/WithCar.png')}
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
            marginTop:15
          }}>
          Energy Statistics
        </Text>
        </View>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              
            },
            tabBarScrollEnabled:true
          }}
          tabBar={props => <MyTabBar {...props} />}>
          {/* {isLoading?<Tab.Screen name="Day" component={ActivityLoader}  />: */}
      <Tab.Screen name="Day" component={Day} initialParams={{getGraphData}} />

    
          <Tab.Screen name="Week" component={Week} />
          <Tab.Screen name="Month" component={Month} />
          <Tab.Screen name="Quarter" component={Quarter} />
          <Tab.Screen name="Year" component={Year} />
        </Tab.Navigator>
       
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