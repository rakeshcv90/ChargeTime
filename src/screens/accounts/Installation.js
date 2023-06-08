import { View, Text,SafeAreaView, TextInput,StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import HorizontalLine from '../../Components/HorizontalLine'
import Input from '../../Components/Input'
import { Install } from '../../../assets/svgs/Install'
import { Location } from '../../../assets/svgs/Location'

const Installation = () => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
     <Header headerName="Installation" showRightButton={true}/>
    <HorizontalLine style={styles.line}/>
     <View style={styles.mainDiv_container}>
          
            <Input
          IconLeft={null}
          autoFocus
          bgColor={COLORS.CREAM}
          IconRight={() => (
            <Install/>
          )}
          bR={3}
          bW={0.3}
          bColor={COLORS.LIGHT_GREY}
          text="Installation Location"
          mV={7}
          textWidth={'55%'}
          placeholder="Vandenberg Space Force Base"
          placeholderTextColor={COLORS.BLACK}
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
           <Location/>
          )}
          bR={3}
          bW={0.3}
          bColor={COLORS.LIGHT_GREY}
          text="Address Line"
          mV={10}
          textWidth={'35%'}
          placeholder="Eg. 123/B, Street A2"
          placeholderTextColor={COLORS.BLACK}
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
           <Location/>
          )}
          bR={6}
          bW={0.3}
          bColor={COLORS.LIGHT_GREY}
          text="Address Line 2"
          mV={10}
          textWidth={'40%'}
          placeholder="Eg. Block D, CA"
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
        />
         <View style={styles.mainDiv_state_ZIP}>
              <View style={styles.zip_state_view}>
                
                <Input
                  IconLeft={null}
                  errors={undefined}
                  touched={false}
                  //     value={values.name}
                  //     onChangeText={handleChange('name')}
                  // onBlur={handleBlur('name')}

                  text="ZIP Code"
                  IconRight={null}
                  mV={15}
                  placeholder="1100000"
                  bW={0.3}
                  textWidth={'60%'}
                  placeholderTextColor={COLORS.BLACK}
                  w="half"
                />
              </View>
              <View style={styles.zip_state_view}>
                <Input
                  IconLeft={null}
                  errors={undefined}
                  touched={false}
                  //     value={values.name}
                  //     onChangeText={handleChange('name')}
                  // onBlur={handleBlur('name')}

                  text="State"
                  IconRight={null}
                  mV={15}
                  placeholder="CA"
                  bW={0.3}
                  textWidth={'40%'}
                  placeholderTextColor={COLORS.BLACK}
                  w="half"
                />
              </View>
            </View>            
          </View>
          {/* </View> */}

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainDiv_signup: {
    paddingTop: 20,
  },
  // signup_img: {
  //   width: mobileW,
  //   // height: mobileH * 0.45,
  // },
  mainDiv_container: {
  paddingHorizontal: 10,
  marginLeft:10,
  marginRight:10,
  paddingTop: 10,
  marginTop:30,
  paddingBottom:200 ,
  borderRadius:4,
  border:14,
    
  },
  line:{
    marginTop:50,
    marginBottom:10,
    marginHorizontal:5,
  },
  
  mainDiv_complete_profile: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.GRAY,
    paddingTop: 20,
    paddingBottom: 25,
    borderRadius: 15,
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: Platform.OS === 'android' ?'black' :"rgba(0,0,0,.555)", // Shadow color
    shadowOffset: {
      width: 6, // Horizontal offset
      height: 4, // Vertical offset
    },
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 4, // Shadow radius
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  complete_placeholder: {
    backgroundColor: `rgba(86, 84, 84, 0.1)`,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  mainDiv_state_ZIP: {
    // display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 28,
  },
  zip_state_view: {
    display: 'flex',
    //flexDirection:'row',
    justifyContent: 'space-between',
  },
  state_placeholder: {
    width: 150,
  },
  forPaddingTOP: {
    paddingTop: 20,
  },
  label_name: {
    paddingVertical:10,
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.BLACK,
  },
  create_profile_Touchable: {
    marginTop: 20,
    backgroundColor: '#B1D34F',
    alignItems: 'center',
    padding: 13,
    borderRadius: 30,
    width: 200,
  },
});
export default Installation