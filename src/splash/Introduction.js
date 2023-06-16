import React from 'react';
import { View, Image, StyleSheet, SafeAreaView,Dimensions, Text,TouchableOpacity } from 'react-native';
import { DIMENSIONS } from '../constants/DIMENSIONS';
import COLORS from '../constants/COLORS';


const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

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
    width: mobileW,
    height: mobileH * 0.58,
    top: 27,
  },
 
  btntext:{
    color: "black",
    // fontWeight: '500',
  }
});

export default Introduction;


