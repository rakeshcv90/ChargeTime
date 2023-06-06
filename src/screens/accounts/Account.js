import { Image, View, Text, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Picker from '@react-native-picker/picker'
import logo from '../../../assets/images/logo.png';
import COLORS from '../../constants/COLORS';
import HorizontalLine from '../../Components/HorizontalLine';
import PersonalDetails from './PersonalDetails';
import Security from './Security';
import Installation from './Installation';
import Theme from './Theme';
import Payment from './Payment';
import Subscription from './Subscription';



const Account = ({ navigation }) => {
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
               {/* {isOpen && (
                 <Text style={styles.buttonText}>{selectedOption || 'Follow System'}</Text>
                 <View style={styles.dropdown}>
                      {options.map((option, index) => (
                     <TouchableOpacity
                       key={index}
                       style={styles.option}
                    onPress={() => handleOptionSelect(option)}
                    >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity> */}
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
    fontSize: 20,
    marginLeft: 10,
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
});

export default Account;
