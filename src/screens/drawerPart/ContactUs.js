/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import {useSelector} from 'react-redux';

const ContactUs = () => {
  const getEmailData = useSelector(state => state.getEmailData); // Assuming the getEmailData is stored in Redux state

  const handlePress = () => {
    if (getEmailData) {
      const emailUrl = `mailto:${getEmailData}`;
      Linking.openURL(emailUrl);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        <Image
          source={require('../../../assets/images/contact_us.png')}
          style={{width: 55, height: 55, padding: 0}}
        />
        <Text>Contact Us</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactUs;
