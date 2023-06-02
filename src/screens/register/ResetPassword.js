import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Platform,
    Image,Dimensions
  } from 'react-native';
  import React from 'react';
  import {SafeAreaView} from 'react-native-safe-area-context';
  
  import {LoginImage} from '../../../assets/images/LoginImage';
  import COLORS from '../../constants/COLORS';
  import {TouchableOpacity} from 'react-native-gesture-handler';
  const mobileW = Math.round(Dimensions.get('screen').width);
  const ResetPassword = () => {
    return (
      <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View>
            <Image  source={require("../../../assets/images/bigstock.png")} resizeMode='stretch' style={{alignSelf: 'center', width: mobileW,}} />
          </View>
          <View style={styles.super_div}>
            <View style={[styles.mainDiv_forget_ur_pass,styles.shadowProp]}>
              <Text style={styles.forget_password}>Reset Password?</Text>
              <View>
                <Text style={styles.text_of_email}>New Password</Text>
                <TextInput
                  style={styles.email_placeholder}
                  placeholder="Enter your new password here...."
                />
                              

                <Text style={styles.text_of_email}>Repeat Password</Text>
                <TextInput
                  style={styles.email_placeholder}
                  placeholder="Re-enter your new password here...."
                />
           
            </View>
            
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                marginBottom:20
              }}>
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  backgroundColor: COLORS.GREEN,
                  alignItems: 'center',
                  padding: 13,
                  borderRadius: 30,
                  width: 270,
                }}>
                <Text style={{fontWeight: '700', fontSize: 14, color: '#fff'}}>
                  CHANGE PASSWORD
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ResetPassword;
  
  const styles = StyleSheet.create({
    super_div: {
      marginHorizontal: 20,
    },
    mainDiv_forget_ur_pass: {
      marginTop: 35,
      marginBottom: 10,
      backgroundColor: COLORS.GRAY,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 15,
    },
    forget_password: {
      fontWeight: '800',
      fontSize: 24,
      color: COLORS.BLACK,
    },
    email_placeholder: {
      backgroundColor: `rgba(86, 84, 84, 0.1)`,
      borderRadius: 10,
      paddingHorizontal: 15,
      height: Platform.OS === 'ios' ? 50 : 50,
    },
    text_of_email: {
      fontSize: 14,
      fontWeight: '500',
      paddingTop: 20,
      paddingBottom: 10,
    },
    shadowProp: {
      backgroundColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.29)', 
      shadowOffset: {
        width: 6, 
        height: 4, 
      },
      shadowOpacity: 1, 
      shadowRadius: 4, 
      elevation: Platform.OS === 'android' ? 5 : 0,
    },
    
  });
  