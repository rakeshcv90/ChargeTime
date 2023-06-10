import { View, Text, SafeAreaView,TouchableOpacity,StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import HorizontalLine from '../../Components/HorizontalLine'
import { Name } from '../../../assets/svgs/Name'
import { Card } from '../../../assets/svgs/Card'
import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import Header from '../../Components/Header'
import { Delete } from '../../../assets/svgs/Delete'
import masterCard from '../../../assets/images/masterCard.png'
import visaCard from '../../../assets/images/visaCard.png'



const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');

  const handleCardNumberChange = (value) => {
    setCardNumber(value);
    setCardType(determineCardType(value));
  };

  const determineCardType = (cardNumber) => {
    if (cardNumber.startsWith('5')) {
      return 'mastercard';
    } else if (cardNumber.startsWith('4')) {
      return 'visa';
    }
    return '';
  };
  const renderCardImage = () => {
    if (cardType === 'mastercard') {
      return <Image source={masterCard} style={styles.card_image} />;
    } else if (cardType === 'visa') {
      return <Image source={visaCard} style={styles.card_image} />;
    }
    
    return null;
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
    <Header headerName="Payment Methods" showRightButton={false} />
    <HorizontalLine style={styles.line} />
    {/* <View> */}
    <View >
      <Image source={require('../../../assets/images/visaCard.png')} style={styles.card_image}/>
      </View>
    <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // width: '100%',
                  marginHorizontal: 60,
                  marginTop:30,
                }}>
                <TouchableOpacity
                  style={{
                    // marginTop: 200,
                    marginLeft:95,
                    marginRight:60,
                    backgroundColor: '#CCCCCC',
                    alignItems: 'center',
                    padding: 13,
                    borderRadius: 60,
                    width: '70%',
                  }}>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: 12,
                      fontWeight: '400',
                    }}>
                    Default Payment Method
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    
                    marginLeft:35,
                    marginRight:100,
                    backgroundColor: '#CCCCCC',
                    alignItems: 'center',
                    padding: 13,
                    borderRadius: 150,
                    width: '15%',
                  }}>
                  <Delete/>
                  </TouchableOpacity>
                </View>
                <HorizontalLine/>
    {/* </View> */}
    <View style={[styles.mainDiv_container]}>
    <Input
          IconLeft={null}
          autoFocus
          bgColor={COLORS.CREAM}
          IconRight={() => (
           <Name/>
          )}
          bR={5}
          bW={0.3}
          bColor={COLORS.BLACK}
          text="Card Holder Name"
          mV={15}
          textWidth={'45%'}
          placeholder="John Doe"
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
        />
        <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          IconRight={() => (
           <Card/>
          )}
          bR={5}
          bW={0.3}
          bColor={COLORS.BLACK}
          text="Card Number"
          mV={5}
          textWidth={'33%'}
          placeholder="1234  5678  xxxx  xxxx"
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          value={cardNumber}
        onChangeText={handleCardNumberChange}
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

                  text="Valid Till"
                  IconRight={null}
                  mV={15}
                  placeholder="07 / 23"
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

                  text="CVV"
                  IconRight={null}
                  mV={15}
                  placeholder="***"
                  bW={0.3}
                  textWidth={'40%'}
                  placeholderTextColor={COLORS.BLACK}
                  w="half"
                />
              </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // width: '100%',
                  marginHorizontal: 60,
                }}>
                <TouchableOpacity
                  style={{
                    marginTop: 85,
                    marginLeft:255,
                    backgroundColor: '#B1D34F',
                    alignItems: 'center',
                    padding: 13,
                    borderRadius: 10,
                    width: '50%',
                  }}>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    ADD CARD
                  </Text>
                </TouchableOpacity>
              </View>

    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainDiv_container: {
    paddingHorizontal: 10,
    marginLeft:10,
    marginRight:10,
    paddingTop: 10,
    marginTop:5,
    paddingBottom:200 ,
    borderRadius:4,
    border:14,
      
    },

  line:{
    marginTop:20,
    marginBottom:10,
    marginHorizontal:5,
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
card_image:{
  width:380,
  height:220,
  marginLeft:5,
  marginRight:5,
}
})

export default Payment