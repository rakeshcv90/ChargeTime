import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Charging} from '../../../assets/images/Charging';
import {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import TabThree from './TabThree';
import COLORS from '../../constants/COLORS';

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
              paddingHorizontal: 20,
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

export default function Home() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <View style={styles.charging_imag_style}>
        <Charging />
      </View>

      {/* <View style={styles.allPackage_style}>
    <TouchableOpacity style={packageOne ==  true? styles.for_package_one:styles.for_notmanage} onChange={handleChangeOne}>
        <Text style={[styles.pack_one_text_condition,styles.pack_one_text]}>PACKAGE-1</Text>
    </TouchableOpacity>
    <TouchableOpacity style={packageTwo == true?styles.for_package_one:styles.for_notmanage} onChange={handleChangeTwo}>
        <Text style={[styles.pack_two_text_condition,styles.pack_one_text]}>PACKAGE-2</Text>
    </TouchableOpacity>
    <TouchableOpacity style={packageThree?styles.for_package_one :styles.for_notmanage} onChange={handleChangeThree}>
        <Text style={[styles.pack_three_text_condition,styles.pack_three_text]}>PACKAGE-3</Text>
    </TouchableOpacity>
</View> */}
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
        <Tab.Screen name="PACKAGE-1" component={TabOne} />
        <Tab.Screen name="PACKAGE-2" component={TabTwo} />
        <Tab.Screen name="PACKAGE-3" component={TabThree} />
      </Tab.Navigator>
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
    fontWeight: 600,
    fontSize: 12,
  },
  for_notmanage: {
    color: '#fff',
  },
});
