import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text,TouchableOpacity } from 'react-native';
import { DIMENSIONS } from '../constants/DIMENSIONS';
import Button from '../Components/Button';
import COLORS from '../constants/COLORS';
import { navigationRef } from '../../App';
// import { navigationRef } from '../../App';

const Introduction = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/Group23.png')}
          style={styles.splash_botm_image}
        />
        
        <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop:150,
              marginHorizontal: 20,
            }}>
            <TouchableOpacity
            onPress={()=>navigation.navigate('Login')}
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
    width: DIMENSIONS.SCREEN_WIDTH * 1,
    height: 450,
    top: 27,
  },
 
  btntext:{
    color: "black",
    // fontWeight: '500',
  }
});

export default Introduction;


