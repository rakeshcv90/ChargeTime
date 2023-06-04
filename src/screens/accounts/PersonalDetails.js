import {  View, Text, StyleSheet,SafeAreaView, TextInput,useColorScheme } from 'react-native'
import React from 'react'
import HorizontalLine from '../../Components/HorizontalLine';
import Header from '../../Components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native-svg';
import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import { DIMENSIONS } from '../../constants/DIMENSIONS';


const PersonalDetails = () => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  return (
    <SafeAreaView style={{backgroundColor: COLORS.WHITE, flex: 1}}>
     <Header headerName="Personal Details"/>
    <HorizontalLine style={styles.line}/>
        <View style={[styles.mainDiv_container,styles.shadowProp,]}>
            {/* <Text style={[styles.textdata,styles.forPaddingTOP]}>Name</Text> */}
            {/* <TextInput
              style={[
                styles.textinput,
                {color: isDark ? COLORS.BLACK : COLORS.BLACK},
              ]}
              text='Name'
              placeholder="Eg. John Doe"
              placeholderTextColor={{color: 'black'}}
            
            /> */}
                  <Input
                    IconLeft={null}
                    autoFocus
                    bgColor={COLORS.WHITE}
                    IconRight={() => (
                      <Image
                        source={require('../../../assets/images/personal2.png')}
                        style={styles.icon}
                      />
                    )}
                    bR={2}
                    bW={1}
                    bColor={COLORS.BLACK}
                    text="Name"
                    mV={7}
                    textWidth={'20%'}
                    placeholder="Eg John Doe"
                    placeholderTextColor={COLORS.GREY}
                    style={{
                      color: COLORS.BLACK,
                      fontFamily: 'Roboto',
                      fontWeight: '200',
                    }}
                  />
                  <Input
                    IconLeft={null}
                    autoFocus
                    bgColor={COLORS.WHITE}
                    IconRight={() => (
                      <Image
                        source={require('../../../assets/images/phone.png')}
                        style={styles.icon}
                      />
                    )}
                    bR={2}
                    bW={1}
                    bColor={COLORS.BLACK}
                    text="Phone No."
                    mV={7}
                    textWidth={'30%'}
                    placeholder="Eg. +123 (456) 789"
                    placeholderTextColor={COLORS.GREY}
                    style={{
                      color: COLORS.BLACK,
                      fontFamily: 'Roboto',
                      fontWeight: '200',
                    }}
                  />
                  <Input
                    IconLeft={null}
                    autoFocus
                    bgColor={COLORS.WHITE}
                    IconRight={() => (
                      <Image
                        source={require('../../../assets/images/mail.png')}
                        style={styles.icon}
                      />
                    )}
                    bR={2}
                    bW={1}
                    bColor={COLORS.BLACK}
                    text="Email"
                    mV={7}
                    textWidth={'20%'}
                    placeholder="Eg. johndoe@xyz.com"
                    placeholderTextColor={COLORS.GREY}
                    style={{
                      color: COLORS.BLACK,
                      fontFamily: 'Roboto',
                      fontWeight: '200',
                    }}
                  />
             {/* <Text style={[styles.textdata,styles.forPaddingTOP]}>Phone No.</Text>
            <TextInput
              style={[
                styles.textinput,
                {color: isDark ? COLORS.BLACK : COLORS.BLACK},
              ]}
              placeholder="Eg. +123 (456) 789"
              placeholderTextColor={{color: 'black'}}
            />
             <Text style={[styles.textdata,styles.forPaddingTOP]}>Email</Text>
            <TextInput
              style={[
                styles.textinput,
                {color: isDark ? COLORS.BLACK : COLORS.BLACK},
              ]}
              placeholder="Eg. johndoe@xyz.com"
              placeholderTextColor={{color: 'black'}}
            />  */} 
        </View> 
        <View style={styles.bottom}>
          <Text>Want to delete account?{' '}</Text>
          <TouchableOpacity>
            <Text style={{
              fontWeight:800,
              font:14,
              height:25,
              }}
              >Request here.</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
 }
  const styles = StyleSheet.create({
    bottom:{
      marginTop:200,
      marginLeft:70,
      font:14,
      fontWeight:600,
      fontfamily:'Roboto',
      height:25,
      color:'black',
      flexDirection: 'row',
    },

    mainDiv_container: {
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom:30,
      marginLeft:10,
      marginRight:10,
      marginTop:40,
    },
    textdata: {
      fontWeight: 800,
      fontSize: 15,
      color: COLORS.BLACK,
    },
  
    textinput: {
      backgroundColor: COLORS.BROWN,
      borderRadius: 10,
      paddingHorizontal: 15,
      height: Platform.OS === 'ios' ? 50 : 50,
    },
    forPaddingTOP: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    shadowProp: {
      backgroundColor: 'white',
      shadowColor: Platform.OS === 'android' ?'black' :"rgba(0,0,0,.555)", 
      shadowOffset: {
        width: 8,
        height: 6,
      },
      shadowOpacity: 1, 
      shadowRadius: 4, 
      elevation: Platform.OS === 'android' ? 8 : 0,
    },
    line:{
      marginTop:50,
      marginBottom:10,
      marginHorizontal:5,
    },
    icon: {
      width: 15,
      height: 15,
      marginRight: 20,
    }
  });


export default PersonalDetails