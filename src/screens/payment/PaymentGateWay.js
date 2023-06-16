import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState,useRef} from 'react';
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
import { API } from '../../api/API';
import { navigationRef } from '../../../App';
const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);
const validationSchema = Yup.object().shape({
  cardHolderName: Yup.string().required('Card Holder Name is required'),
  cardNumber: Yup.string().required('Invalid Card Number'),
  validTill: Yup.string().required('expiry date required'),
  cvv: Yup.string().required('cvv is required'),
});
export default function PaymentGateWay({navigation}) {
  const {getDataForPayment, getUserID,getEmailDAta} = useSelector(state => state);
  const inputRef = useRef(null);

  const handlePaymentSubmit = async values => {
    let exp_month = values?.validTill?.split('/')[0]
    let exp_year = values?.validTill?.split('/')[1]
    console.log(exp_month,"object",exp_year,getEmailDAta)
    console.log(values);
    //console.log(values.cardHolderName,,"4567890")
    try {
      const response = await axios.post(`${API}/checkout`, {
        "customerName": values.cardHolderName,
        "pwa_email":getEmailDAta,
        "customerZipcode": getDataForPayment.ZIP_code,
        "customerState": getDataForPayment.state,
        "customerCountry": getDataForPayment.location,
        "card_number": values.cardNumber,
        "card_cvc": values.cvv,
        "card_exp_month": exp_month,
        "card_exp_year": exp_year,
        "item_details": getDataForPayment.package_name,
        "price": getDataForPayment.total_price,
        "total_amount": getDataForPayment.totalSalexTax,
        "price_stripe_id": getDataForPayment.price_stripe_id,
        "cust_id": getUserID,
      });
      console.log(response, 'payment');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
        <ScrollView>
      <View style={{marginHorizontal: 20, paddingTop: 20}}>
        <Text style={styles.complete_profile}>Payment Details</Text>
        
      </View>

      <View style={styles.mainDiv_container}>
        <View>
          <Formik
            initialValues={{
              cardHolderName: '',
              cardNumber: '',
              validTill: '',
              cvv: '',
            }}
            onSubmit={values => handlePaymentSubmit(values)}
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
          style={{width: DIMENSIONS.SCREEN_WIDTH * 0.9, resizeMode: 'contain'}}
        />
        <View style={styles.cardNumber_position}>
        <Text style={{color:"#fff",fontWeight:"600",fontSize:13}}>{values.cardNumber}</Text>
        </View>
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
                
                  onChangeText={(text) => {
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
  handleChange('cardNumber')(formattedCardNumber)
                  }}
                  onBlur={handleBlur('cardNumber')}
                  maxLength={14}
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
                    onChangeText={(text) => {
                        // Remove non-digit characters from the input
                        const validTill = text.replace(/\D/g, '');
                    
                        // Insert a slash after the second character
                        let formattedValidTill = validTill;
                        if (validTill.length > 2) {
                          formattedValidTill = validTill.slice(0, 2) + '/' + validTill.slice(2);
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
                      keyboardType='numeric'
                    />
                    {errors.cvv && touched.cvv && (
                      <Text style={{color: 'red'}}>{errors.cvv}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.bottom_tab}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      padding: 20,
                      backgroundColor: COLORS.GRAY,
                      borderRadius: 25,
                    }}>
                    <LeftIcon />
                  </TouchableOpacity>

                  <View
                    style={{
                      backgroundColor: COLORS.GREEN,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 12,
                    }}>
                    <TouchableOpacity onPress={handleSubmit}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: COLORS.BLACK,
                        }}>
                        Make Payment
                      </Text>
                    </TouchableOpacity>
                  </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRadius: 6,
  },
  cardNumber_position:{
    position:'absolute',
top:130,
left:30
  }
});
