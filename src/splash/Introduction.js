/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import COLORS from '../constants/COLORS';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const Introduction = ({navigation}) => {
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
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/Intro.png')}
          style={styles.splash_botm_image}
        />
        <ScrollView >
        <View
          style={{
            marginHorizontal: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 40,
          }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '800',
              lineHeight: 29,
              textAlign: 'center',
              marginBottom: 20,
              color: COLORS.BLACK,
              // fontFamily: 'Monserrat',
            }}>
            Manage your EV Charger
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              lineHeight: 25,
              textAlign: 'justify',
              color: COLORS.BLACK,
            }}>
           ChargeTime is your passport to a seamless charging experience for your vehicle. 
           With our app, you can effortlessly connect with your charging device remotely, 
           giving you the power to charge your vehicle from the comfort of your fingertips. 
           No matter where you are, initiate and monitor the charging process seamlessly. 
           Keep tabs on your charging usage data effortlessly. 
           Stay informed about your vehicle's power consumption and make informed decisions.
           Upgrade or downgrade your package based on your usage needs. 
           Our app provides you the flexibility to choose the charging plan that suits you best.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
           marginTop: mobileH < 700 ? 0 : 30,
           marginBottom:30,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              marginTop: 20,
              backgroundColor: COLORS.GREEN,
              alignItems: 'center',
              padding: 13,
              borderRadius: 10,
              width: '100%',
              ...Platform.select({
                ios: {
                  shadowColor: '#000000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                },
                android: {
                  elevation: 4,
                },
              }),
            }}>
            <Text style={styles.btntext}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.CREAM,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7FBED',
  },
  splash_botm_image: {
    width: mobileW,
    alignSelf: 'center',
    marginTop: 80,
  },

  btntext: {
    color: COLORS.BLACK2,
    fontWeight: '700',
    // fontFamily: 'Roboto',
    fontSize: 14,
    lineHeight: 16,
  },
});

export default Introduction;
