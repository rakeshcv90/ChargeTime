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

        <View
          style={{
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            height: mobileH * 0.35,
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              padding:5,
              marginVertical: -0,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                lineHeight: 25,
                textAlign: 'justify',
                color: '#848482',
              }}>
              Welcome & Thank You for choosing ChargeTime – hosted by TRO Energy
              Solutions! is your passport to a seamless charging experience for
              your vehicle. With our app, you can connect with your charging
              device remotely, giving you the power to charge your vehicle from
              the convenience of your mobile device. No matter where you are,
              you can start and monitor the charging process seamlessly. Keep
              tabs on your charging usage data effortlessly. Stay informed about
              your vehicle's power consumption and make informed decisions.
              Upgrade or downgrade your package based on your usage needs. Our
              app provides you the flexibility to choose the charging plan that
              suits you best.
            </Text>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: mobileH < 700 ? 0 : 10,
            marginBottom: 20,
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
