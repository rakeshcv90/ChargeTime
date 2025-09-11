import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import Testing from '../screens/testing/Testing';
import CustomDrawerContent from '../navigation/CustomDrawer';


const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get('window').width / 1.55,
        },
      }}
      gestureEnabled={false}
      drawerContent={props => <CustomDrawerContent {...props} />}
  

    // drawerContent={props => <DrawerItems {...props} />}
    >
    <Drawer.Screen
      name=" "
      component={Testing}
    //   options={{title: 'FitMe', headerTitleAlign: 'center'}}
      >

      </Drawer.Screen>
  </Drawer.Navigator>
  )
}

export default MyDrawer