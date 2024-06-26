import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Platform, Image, Dimensions } from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import HorizontalLine from '../../Components/HorizontalLine';
import {WebView} from 'react-native-webview';
const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('screen').height);

export default function Terms() {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
     <Header headerName="Terms & Conditions" />
      {Platform.OS == 'android' ? <HorizontalLine style={styles.line} /> : <View
        style={{


        }}>
        <Image source={require('../../../assets/images/dotted.png')}  style={{width: mobileW * 0.99}}
          resizeMode='stretch'/>
      </View>}
      <WebView source={{uri: 'https://troes.io/terms&condition.php'}} style={{flex: 1}} />
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