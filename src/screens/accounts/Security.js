import { View, Text, SafeAreaView,StyleSheet,TextInput} from 'react-native'
import React from 'react'
import COLORS from '../../constants/COLORS'
import HorizontalLine from '../../Components/HorizontalLine'
import Header from '../../Components/Header'
import Input from '../../Components/Input'
import { Key } from '../../../assets/svgs/Key'
import {Eye} from '../../../assets/svgs/Eye'

const Security = () => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
     <Header headerName="Security" />
     <HorizontalLine style={styles.line}/>
     
              <Input
                    IconLeft={null}
                    autoFocus
                    bgColor={COLORS.CREAM}
                    IconRight={() => (
                     <Key/>
                    )}
                    bR={5}
                    bW={0.3}
                    bColor={COLORS.BLACK}
                    text="Current Password"
                    mV={7}
                    textWidth={'53%'}
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
                    bgColor={COLORS.CREAM}
                    IconRight={() => (
                     <Eye/>
                    )}
                    bR={5}
                    bW={0.3}
                    bColor={COLORS.BLACK}
                    text="New Password"
                    mV={15}
                    textWidth={'50%'}
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
                    bgColor={COLORS.CREAM}
                    IconRight={() => (
                     <Eye/>
                    )}
                    bR={5}
                    bW={0.3}
                    bColor={COLORS.BLACK}
                    text="Re-enter New Password"
                    mV={7}
                    textWidth={'68%'}
                    placeholderTextColor={COLORS.GREY}
                    style={{
                      color: COLORS.BLACK,
                      fontFamily: 'Roboto',
                      fontWeight: '200',
                    }}
                  />
              
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