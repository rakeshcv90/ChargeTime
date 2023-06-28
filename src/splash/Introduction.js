import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import COLORS from '../constants/COLORS';

const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

const Introduction = ({navigation}) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton
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
            marginHorizontal: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 40
          }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '800',
              lineHeight: 29,
              textAlign: 'center',
              marginBottom: 20,
              color: COLORS.BLACK
              // fontFamily: 'Monserrat',
            }}>
            Manage your EV Charger
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 22,
              textAlign: 'justify',
              color: COLORS.BLACK
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: mobileH <700 ? 0 : 70,
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
    lineHeight: 16
  },
});

export default Introduction;
