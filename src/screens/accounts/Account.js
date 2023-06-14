import { Image, View, Text, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Picker from '@react-native-picker/picker'
import logo from '../../../assets/images/logo.png';
import COLORS from '../../constants/COLORS';
import HorizontalLine from '../../Components/HorizontalLine';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../../../App';

const Account = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const Screen = [
    {
      title: 'Personal Details',
      image: require('../../../assets/images/Personal.png'),
      link: 'PersonalDetails',
      side_image: require('../../../assets/images/side.png'),
      // style={styles.side_icon}

    },
    {
      title: 'Security',
      image: require('../../../assets/images/Security.png'),
      link: 'Security', 
      side_image: require('../../../assets/images/side.png'),
    },
    {
      title: 'Installation',
      image: require('../../../assets/images/Install.png'),
      link: 'Installation', 
      side_image: require('../../../assets/images/side.png'),
    },
    {
      title: 'Payment Methods',
      image: require('../../../assets/images/Payment.png'),
      link: 'Payment', 
      side_image: require('../../../assets/images/side.png'),
    },
    {
      title: 'Subscription',
      image: require('../../../assets/images/Subscrip.png'),
      link: 'Subscription', 
      side_image: require('../../../assets/images/side.png'),
    },
    // {
    //   // title: 'Theme',
    //   // image: require('../../../assets/images/Theme.png')
    //   link: 'Theme'
    // },
  ];

  const handleLogOut =async () => {
    try{
    // await AsyncStorage.removeItem('loginDataOne');
    AsyncStorage.clear();
    persistor.purge();
    navigationRef.navigate('Login');
    console.log('Log out successfully');
    }catch (error) {
      console.error('Error during logout:', error);
    }
  };

 

  const handleLinkPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
            <View >
              <View style={styles.row}>
                <Text style={styles.heading}>Account</Text>
                <Image source={logo} style={styles.logo} />
              </View>
              {Screen.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => handleLinkPress(item.link)}
                >
                  <View style={styles.row}>
                    <Image source={item.image} style={styles.icon} />
                    <Text style={styles.title}>{item.title} </Text>
                    <View style={styles.sideImageContainer}>
                     <Image source={item.side_image} style={styles.side_icon} />
                      </View>
                  </View>
                  <HorizontalLine />
                  
                </TouchableOpacity>
              ))}
              <View style={styles.row}>
              <Image source={require('../../../assets/images/Theme.png')} style={styles.icon} />
              <Text style={styles.title}>Theme</Text>
              <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Follow System</Text>
                 </TouchableOpacity>
              </View>
              <View style={styles.addContainer}>
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.text}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem} >
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.text}>Rate Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.text}>Contact Us</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.ButtonsContainer}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => handleLogOut()}>
                <Text style={styles.logoutbuttonText}>LOG OUT</Text>
              </TouchableOpacity>
              </View>
            </View>
       </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: { width: '100%', flexDirection: 'row', alignItems: 'center'},
  heading: {
    color: COLORS.BLACK,
    font: 'Montserrat',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    marginLeft: 24,
    marginTop: 30,
  },
  itemContainer: {
    marginBottom: 3,
  },
  title: {
    font: 'Roboto',
    fontSize: 18,
    marginLeft: 10,
    color: COLORS.BLACK,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  text: {
    font: 'Roboto',
    fontSize: 12,
    marginLeft: 10,
    color: COLORS.BLACK,
  },
  bullet: {
    marginRight: 5,
    fontSize: 15,
    color: COLORS.BLACK,
  },
  link: {
    color: 'blue',
  },
 
  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft : 90,
    borderRadius: 5,
   
  
  },
  buttonText: {
    fontSize: 15,
    color:COLORS.BLACK,
    marginRight:20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 170,
    flex:1,
    // alignItems: 'flex-end',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 20,
  },
  sideImageContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  side_icon: {
    width: 8,
    height: 8,
    marginLeft: 120,
    
  },
  dropdown: {
    flex: 1,
    marginLeft: 8,
  },
  addContainer:{
    marginRight: 20,
    marginLeft:30,
    marginTop:80,
  },
  ButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#F84E4E',
    padding: 5,
    borderRadius: 10,
  },
  logoutbuttonText: {
    color: 'white',
    fontWeight: '500',
    paddingLeft:5,
    paddingRight:5,
    
  },
});

export default Account;
