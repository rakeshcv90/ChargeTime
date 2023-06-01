import { View, Text,
    
    StyleSheet,
    TouchableOpacity,
    Image, } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'
const BoxTwo = () => {
  return (
    <View style={styles.mainDiv_installation}>
            <TouchableOpacity style={styles.install_touchable}>
              <Image
                style={styles.img_width}
                source={require('../../assets/images/details.png')}
              />
              <Text style={styles.installation_text}>Plan Details</Text>
            </TouchableOpacity>
            <View style={styles.mainDiv_plan_details}>
              <View style={styles.second_main_div_kwh}>
                <Image source={require('../../assets/images/kwh.png')} />
                <Text style={styles.kwh_mieq_text}>600 kWh</Text>
                <Text style={styles.unit_allowed}>Units Alloted</Text>
              </View>
              <View style={styles.second_main_div_kwh}>
                <Image
                  source={require('../../assets/images/kwh_icon_one.png')}
                />
                <Text style={styles.kwh_mieq_text}>~ 1500</Text>
                <Text style={styles.unit_allowed}>Mi Eq</Text>
              </View>
              <View style={styles.second_main_div_kwh}>
                <Image source={require('../../assets/images/mile.png')} />
                <Text style={styles.kwh_mieq_text}>0.11</Text>
                <Text style={styles.unit_allowed}>$ / Mile</Text>
              </View>
            </View>
          </View>
  )
}

export default BoxTwo
const styles = StyleSheet.create({
    managing_width: {
      paddingHorizontal: 20,
      // paddingVertical:15
    },
    mainDiv_installation: {
      backgroundColor:COLORS.GRAY,
      borderRadius: 10,
      marginTop: 20,
      overflow:'hidden',

    },
    install_touchable: {
      flexDirection: 'row',
      backgroundColor: COLORS.GREEN,
      alignItems: 'center',
      paddingVertical: 10,
    },
    img_width: {
      marginLeft: 20,
    },
    installation_text: {
      fontWeight: 700,
      fontSize: 12,
      paddingLeft: 10,
    },
    location_div: {
      flexDirection: 'row',
      backgroundColor: COLORS.GRAY,
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.GREEN,
      borderStyle: 'dotted',
    },
    force_base: {
      fontWeight: 400,
      fontSize: 14,
      paddingLeft: 10,
    },
    mainDiv_state_zip: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 10,
      paddingVertical: 10,
      backgroundColor: COLORS.GRAY,
    },
    state_div: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    mainDiv_plan_details: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // alignItems:'center',
      paddingVertical: 10,
    },
    kwh_mieq_text: {
      fontWeight: 800,
      fontSize: 16,
      paddingTop: 8,
    },
    second_main_div_kwh: {
      flexDirection: 'column',
      alignItems: 'center',
      // alignSelf: 'center',
      alignContent: 'center',
      paddingHorizontal: 10,
    },
    mainDiv_purchage_dollar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.GREEN,
      borderRadius: 5,
      backgroundColor: COLORS.WHITE,
      marginTop: 20,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 30,
      elevation: 4,
      shadowColor: 'rgba(1, 0, 0, 0.25)',
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 0,
      shadowRadius: 4,
    },
    dollar_div: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    per_month: {
      fontWeight: 500,
      fontSize: 20,
      color: COLORS.BLACK,
      paddingLeft: 7,
    },
    btn_purchage: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      backgroundColor: COLORS.GREEN,
      alignItems: 'center',
      borderRadius: 20,
    },
    purchage_text: {
      fontWeight: 700,
      fontSize: 14,
      color: COLORS.WHITE,
    },
    unit_allowed:{
        fontWeight: 400,
fontSize: 10,
    }
  });