import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  Dimensions,
  ScrollView,
  Modal,
  Pressable,
  Alert
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import {Card} from '../../../assets/svgs/Card';
import {Name} from '../../../assets/svgs/Name';
import {DIMENSIONS} from '../../constants/DIMENSIONS';
import {LeftIcon} from '../../../assets/images/LeftIcon';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Admin} from '../../../assets/images/Admin';
import {Message} from '../../../assets/images/Message';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Header from '../../Components/Header'
import HorizontalLine from '../../Components/HorizontalLine'
import {API} from '../../api/API';
import { Delete } from '../../../assets/svgs/Delete'
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';


import {navigationRef} from '../../../App';
const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);
const validationSchema = Yup.object().shape({
  cardHolderName: Yup.string().required('Card Holder Name is required'),
  cardNumber: Yup.string().required('Invalid Card Number'),
  validTill: Yup.string().required('expiry date required'),
  cvv: Yup.string().required('cvv is required'),
});
export default function PaymentGateWay({navigation}) {
  const { getUserID} = useSelector(
    state => state,
  );
const user_ID =getUserID;
  const handleAddCard = async (values) => {
    let exp_month = values?.validTill?.split('/')[0];
    let exp_year = values?.validTill?.split('/')[1];
    // console.log(exp_month, 'object', exp_year, getEmailDAta);
    console.log(values);
    console.log('month is',exp_month);
    console.log('year is',exp_year);
    console.log("user_id is",user_id)
    //console.log(values.cardHolderName,,"4567890")
    try {
      const response = await fetch(`${API}/addcarddetail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
       body: JSON.stringify({
          user_id: getUserID,
          cust_name: values.cardHolderName,
          card_number: values.cardNumber,
          card_cvc: values.cvv,
          card_exp_month: exp_month,
          card_exp_year: exp_year,
        }) 
       
      })
      const result = await response.json();
  console.log(result,'ttt');
      if(result.msg == 'Your Card Detail Save'){
        PLATFORM_IOS
        ? Toast.show({
            type: 'success',
            text1: ' Your Card Detail Save.',
          })
        : ToastAndroid.show(
            'Your Card Detail Save.',
            ToastAndroid.SHORT,
          );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
       <Header headerName="Payment Methods" editShow={false} />
    <HorizontalLine />
      <ScrollView>
        <View style={styles.mainDiv_container}>
          <View>
            <Formik
              initialValues={{
                cardHolderName: '',
                cardNumber: '',
                validTill: '',
                cvv: '',
              }}
              onSubmit={values => handleAddCard(values)}
              validationSchema={validationSchema}>
              {({
                values,
                handleChange,
                handleSubmit,
                handleBlur,
                errors,
                touched,
              }) => (
                <View>
                  <Image
                    source={require('../../../assets/images/visaCard.png')}
                    style={{
                      width: DIMENSIONS.SCREEN_WIDTH * 0.9,
                      resizeMode: 'contain',
                    }}
                  />
                  <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    // width: '100%',
                    marginHorizontal: 60,
                    marginTop:10,
                  }}>
                  <TouchableOpacity
                    style={{
                      // marginTop: 200,
                      marginLeft:95,
                      marginRight:50,
                      backgroundColor: '#CCCCCC',
                      alignItems: 'center',
                      padding: 10,
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
                  
                  <View style={styles.cardNumber_position}>
                    
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {values.cardNumber}
                    </Text>
                    <View style={styles.text_div}>
                    <View style={{gap:5, width:100}}>
                      <Text style={{color: 'gray', fontWeight: '600', fontSize: 8}}>Card Holder</Text>
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {values.cardHolderName}
                    </Text>
                    </View>
                    <View style={{gap:5}}>
                    <Text style={{ fontWeight: '600', fontSize: 8,color:'gray'}}>Expires</Text>
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {values.validTill}
                    </Text>
                    </View>
                    <View style={{gap:5}}>
                    <Text style={{fontWeight: '600', fontSize: 8,color:'gray'}}>CVV</Text>
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {values.cvv}
                    </Text>
                    </View>
                     </View>
                  </View>
                  <HorizontalLine/>

                  <Input
                    IconLeft={null}
                    errors={undefined}
                    touched={false}
                    value={values.cardHolderName}
                    onChangeText={handleChange('cardHolderName')}
                    onBlur={handleBlur('cardHolderName')}
                    text="Card Holder Name"
                    IconRight={() => <Admin />}
                    mV={15}
                    placeholder="John Doe"
                    bW={1}
                    textWidth={'45%'}
                    placeholderTextColor={COLORS.BLACK}
                  />
                  {errors.cardHolderName && touched.cardHolderName && (
                    <Text style={{color: 'red'}}>{errors.cardHolderName}</Text>
                  )}
                  <Input
                    IconLeft={null}
                    errors={undefined}
                    touched={false}
                    value={values.cardNumber}
                    onChangeText={text => {
                      // Remove non-digit characters from the input
                      const cardNumber = text.replace(/\D/g, '');

                      // Insert a space after every fourth digit
                      let formattedCardNumber = '';
                      for (let i = 0; i < cardNumber.length; i += 4) {
                        formattedCardNumber += cardNumber.substr(i, 4) + ' ';
                      }

                      // Remove any trailing space
                      formattedCardNumber = formattedCardNumber.trim();

                      // Update the card number value
                      handleChange('cardNumber')(formattedCardNumber);
                    }}
                    onBlur={handleBlur('cardNumber')}
                    maxLength={19}
                    text="Card Number"
                    IconRight={() => <Message />}
                    mV={15}
                    placeholder="1234  5678  xxxx  xxxx"
                    bW={1}
                    textWidth={'35%'}
                    placeholderTextColor={COLORS.BLACK}
                    keyboardType="numeric"
                  />
                  {errors.cardNumber && touched.cardNumber && (
                    <Text style={{color: 'red'}}>{errors.cardNumber}</Text>
                  )}
                  <View style={styles.mainDiv_state_ZIP}>
                    <View style={styles.zip_state_view}>
                      <Input
                        IconLeft={null}
                        errors={undefined}
                        touched={false}
                        value={values.validTill}
                        //
                        onChangeText={text => {
                          // Remove non-digit characters from the input
                          const validTill = text.replace(/\D/g, '');

                          // Insert a slash after the second character
                          let formattedValidTill = validTill;
                          if (validTill.length > 2) {
                            formattedValidTill =
                              validTill.slice(0, 2) + '/' + validTill.slice(2);
                          }

                          // Update the valid till value
                          handleChange('validTill')(formattedValidTill);
                        }}
                        onBlur={handleBlur('validTill')}
                        text="Valid Till"
                        IconRight={null}
                        mV={15}
                        placeholder="07/23"
                        bW={1}
                        textWidth={'70%'}
                        placeholderTextColor={COLORS.BLACK}
                        w="half"
                        keyboardType="numeric"
                        maxLength={5}
                      />
                      {errors.validTill && touched.validTill && (
                        <Text style={{color: 'red'}}>{errors.validTill}</Text>
                      )}
                    </View>
                    <View style={styles.zip_state_view}>
                      <Input
                        IconLeft={null}
                        errors={undefined}
                        touched={false}
                        value={values.cvv}
                        onChangeText={handleChange('cvv')}
                        onBlur={handleBlur('cvv')}
                        text="CVV"
                        IconRight={null}
                        mV={15}
                        placeholder="***"
                        bW={1}
                        textWidth={'50%'}
                        placeholderTextColor={COLORS.BLACK}
                        w="half"
                        secureTextEntry={true}
                        maxLength={3}
                        keyboardType="numeric"
                      />
                      {errors.cvv && touched.cvv && (
                        <Text style={{color: 'red'}}>{errors.cvv}</Text>
                      )}
                    </View>
                  </View>
                    <View
                      style={{
                        backgroundColor: COLORS.GREEN,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 12,
                        marginLeft:240,
                      }}>
                      <TouchableOpacity onPress={handleSubmit}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: COLORS.BLACK,
                          }}>
                          ADD CARD
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  complete_profile: {
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.BLACK,
  },
  mainDiv_container: {
    paddingHorizontal: 20,
    // paddingTop: 30,
  },
  mainDiv_state_ZIP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  bottom_tab: {
    // paddingHorizontal: 20,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'left',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius: 6,
  },
  cardNumber_position: {
    position: 'absolute',
    top: 130,
    left: 30,
  },
  text_div:{
    position: 'relative',
    top: 45,
    left: 0,
    flexDirection:'row',
    gap:40
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    
  },
  button_one: {
   marginLeft:80,
   marginTop:40,
    alignItems:"flex-end",
    justifyContent:'flex-end',
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    borderRadius: 100
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
     backgroundColor: COLORS.GREEN,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical:5,
    paddingHorizontal:20
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight:"400",
    fontSize:24,
    color:"#000000"
  }
});