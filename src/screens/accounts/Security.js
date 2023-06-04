import { View, Text, SafeAreaView,StyleSheet,TextInput} from 'react-native'
import React from 'react'
import COLORS from '../../constants/COLORS'
import HorizontalLine from '../../Components/HorizontalLine'
import Header from '../../Components/Header'
import Input from '../../Components/Input'

const Security = () => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.WHITE, flex: 1}}>
     <Header headerName="Security" />
     <HorizontalLine style={styles.line}/>
     
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
                    bR={5}
                    bW={0.3}
                    bColor={COLORS.BLACK}
                    text="Current Password"
                    mV={7}
                    textWidth={'40%'}
                    placeholder="*************"
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
                    bR={5}
                    bW={0.5}
                    bColor={COLORS.BLACK}
                    text="New Password"
                    mV={7}
                    textWidth={'35%'}
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
                    bR={5}
                    bW={0.5}
                    bColor={COLORS.BLACK}
                    text="Re-enter New Password"
                    mV={7}
                    textWidth={'53%'}
                    placeholderTextColor={COLORS.GREY}
                    style={{
                      color: COLORS.BLACK,
                      fontFamily: 'Roboto',
                      fontWeight: '200',
                    }}
                  />
                
     {/* <View style={[styles.mainDiv_container,styles.shadowProp,]}>
    <Text style={[styles.textdata,styles.forPaddingTOP]}>Name</Text>
            <TextInput style={styles.textinput} placeholder='Eg John Doe' />
            <Text style={[styles.textdata,styles.forPaddingTOP]}>Phone No.</Text>
            <TextInput style={styles.textinput} placeholder='Eg. +123 (456) 789' />
            <Text style={[styles.textdata,styles.forPaddingTOP]}>Email</Text>
            <TextInput style={styles.textinput} placeholder='Eg. johndoe@xyz.com' />
            </View> */}
            </SafeAreaView>
  )
}
const styles = StyleSheet.create({
mainDiv_container: {
  paddingHorizontal: 20,
  marginLeft:20,
  marginRight:20,
  paddingTop: 30,
  marginTop:30,
  paddingBottom:30 ,
  borderRadius:4,
  border:14,
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
  paddingTop: 20,
},
shadowProp: {
  backgroundColor: 'white',
  shadowColor: Platform.OS === 'android' ?'black' :"rgba(0,0,0,.555)", // Shadow color
  shadowOffset: {
    width: 6, 
    height: 4, 
  },
  shadowOpacity: 1, 
  shadowRadius: 4, 
  elevation: Platform.OS === 'android' ? 8 : 0,
},
line:{
  marginTop:50,
  marginBottom:10,
  marginHorizontal:5,
}
});

export default Security