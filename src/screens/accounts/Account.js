import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
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
  const [reset, setReset] = useState('')

  setReset('Theme')

  const Screen = [
    {
      title: 'Personal Details',
      image: require('../../../assets/images/Personal.png'),
      link: 'PersonalDetails'
    },
    {
      title: 'Security',
      image: require('../../../assets/images/Security.png'),
      link: 'Security'
    },
    {
      title: 'Installation',
      image: require('../../../assets/images/Install.png'),
      link: 'Installation'
    },
    {
      title: 'Payment Methods',
      image: require('../../../assets/images/Payment.png'),
      link: 'Payment'
    },
    {
      title: 'Subscription',
      image: require('../../../assets/images/Subscrip.png'),
      link: 'Subscription'
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
            <View>
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
                    <Image source={ require('../../../assets/images/side.png')} style={styles.side_icon}/>
                  </View>
                  <HorizontalLine />
                  
                 {item.link === 'Theme' && (
                    <View style={styles.addContainer}>
                  <Image source={require('../../../assets/images/Theme.png')} style={styles.addImage} />
        
                   <Text style={styles.addText}>Theme</Text>
                </View>
              )}
                </TouchableOpacity>
              ))}
            </View>
  );
};

const styles = StyleSheet.create({
  row: { width: '100%', flexDirection: 'row', alignItems: 'center'},
  heading: {
    color: COLORS.BLACK,
    font: 'Montserrat',
    fontSize: 28,
    fontWeight: '800%',
    marginBottom: 40,
    marginLeft: 24,
    marginTop: 30,
  },
  itemContainer: {
    marginBottom: 5,
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
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 190,
    marginTop: 20,
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 20,
  },
  side_icon: {
    width: 8,
    height: 8,
    marginLeft: 100,
    
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  addImage: {
    width: 15,
    height: 15,
    marginLeft: 20,
  },
  addText: {
    font: 'Roboto',
    fontSize: 20,
    marginLeft: 10,
    color: COLORS.BLACK,
  },
});

export default Account;
