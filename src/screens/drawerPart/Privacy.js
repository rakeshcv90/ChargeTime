import { View, Text, SafeAreaView, StyleSheet, Platform, Image, Dimensions } from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import HorizontalLine from '../../Components/HorizontalLine';
const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('screen').height);

export default function Privacy() {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
     <Header headerName="Privacy Policy" />
      {Platform.OS == 'android' ? <HorizontalLine style={styles.line} /> : <View
        style={{


        }}>
        <Image source={require('../../../assets/images/dotted.png')} style={{ width: mobileW * 0.97 }} />
      </View>}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({


  line: {
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 5,
  },
});