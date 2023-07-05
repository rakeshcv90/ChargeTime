import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import { Card } from '../../../assets/svgs/Card';
import { Name } from '../../../assets/svgs/Name';
import { DIMENSIONS, PLATFORM_IOS } from '../../constants/DIMENSIONS';
import { LeftIcon } from '../../../assets/images/LeftIcon';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Admin } from '../../../assets/images/Admin';
import { Message } from '../../../assets/images/Message';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../api/API';
import { navigationRef } from '../../../App';
import ActivityLoader from '../../Components/ActivityLoader';
import HorizontalLine from '../../Components/HorizontalLine';
import { mvs, ms } from 'react-native-size-matters';


import {
  setCardDetails,
  setDeviceId,
  setPackageStatus,
  setPlanStatus,
  setPurchaseData,
} from '../../redux/action';

const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);
const validationSchema = Yup.object().shape({
  cardHolderName: Yup.string().required('Card Holder Name is required'),
  cardNumber: Yup.string()
    .required('Invalid Card Number')
    .min(19, 'Card number must be 16 digits'),
   
    
  // .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  validTill: Yup.string()
    .required('expiry date required')
    .test(
      'expiration',
      'Expiration date must be greater than current date',
      function (value) {
        if (!value) return false;
        const currentDate = new Date();
        const [month, year] = value.split('/');
        const expirationDate = new Date(
          parseInt(`20${year}`, 10),
          parseInt(month, 10) - 1,
        );
        return expirationDate > currentDate;
      },
    ),
  cvv: Yup.string()
    .required('cvv is required')
    .matches(/^[0-9]{3}$/, 'CVV must be 3 digits'),
});
export default function PaymentGateWay({ navigation, route }) {
  const { getDataForPayment, getUserID, getEmailDAta } = useSelector(
    state => state,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const getCardDetails = useSelector(state => state.getCardDetails);

  useEffect
  const [cardId, setCardId] = useState('');
  const [cardDetails, setCardDetails1] = useState({
    cardHolderName: getCardDetails[0]?.cust_name,
    card_number: getCardDetails[0]?.card_number,
    card_cvv: getCardDetails[0]?.card_cvc,

    validTill:
      getCardDetails[0]?.card_exp_month +
      '/' +
      getCardDetails[0]?.card_exp_year,
    // card_exp_year:'',
  });
  const [card_name, setCard_Name] = useState(
    getCardDetails[0]?.cust_name ?? '',
  );
  const [card_Number, setCard_Number] = useState(
    String(getCardDetails[0]?.card_number).replace(
      /^(\d{4})(\d{4})(\d{4})(\d{4})$/,
      '$1 $2 $3 $4',
    ) ?? '',
  );
  const [card_cvv, setCard_Cvv] = useState(
    String(getCardDetails[0]?.card_cvc) ?? '',
  );
  const [validity, setValidity] = useState(
    String(
      getCardDetails[0]?.card_exp_month +
      '/' +
      getCardDetails[0]?.card_exp_year,
    ) ?? '',
  );



  // console.log(savedCard,"------------")

  const newPAYMENT = async values => {
   
    setLoader(true);
    let payload = new FormData();

    let exp_month = cardDetails?.validTill?.split('/')[0];
    let exp_year = cardDetails?.validTill?.split('/')[1];
    payload.append('kwh_unit', route.params.data.kwh);
    payload.append('card_number', cardDetails.card_number);
    payload.append('card_cvc', cardDetails.card_cvv);
    payload.append('card_exp_month', exp_month);
    payload.append('card_exp_year', exp_year);
    payload.append('item_details', getDataForPayment.package_name);
    payload.append('price', getDataForPayment.total_price);
    payload.append('price_stripe_id', getDataForPayment.price_stripe_id);
    payload.append('user_id', getUserID);
    console.log("----------------",payload);
    try {
      const response = await axios.post(`${API}/checkout`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
console.log('PAYMENT', response.data);
      if ((response.data.status = 'success')) {
        setLoader(false);
        setModalVisible(true);
      }
    
    } catch (err) {
      setLoader(false);
      if (err.response) {
        PLATFORM_IOS
        ? Toast.show({
          type: 'success',
          text1: "Invalid Card Details !",
        })
        : ToastAndroid.show(
          "Invalid Card Details !",
          ToastAndroid.SHORT,
        );
        console.log("-------------------------",err.response.data);
        console.log(err.response.status);
      } else {
        console.log(err);
      }
    }
  };
  
  const handlePaymentSubmit = async values => {
    setLoader(true);
    let payload = new FormData();

    let exp_month = values?.validTill?.split('/')[0];
    let exp_year = values?.validTill?.split('/')[1];

    payload.append('kwh_unit', route.params.data.kwh);
    payload.append('card_number', values.cardNumber.replace(/\s/g, ''));
    payload.append('card_cvc', values.cvv);
    payload.append('card_exp_month', exp_month);
    payload.append('card_exp_year', exp_year);
    payload.append('item_details', getDataForPayment.package_name);
    payload.append('price', getDataForPayment.total_price);
    payload.append('price_stripe_id', getDataForPayment.price_stripe_id);
    payload.append('user_id', getUserID);
    console.log(payload, 'object');
    try {
      const response = await axios.post(`${API}/checkout`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('PAYMENT', response.data);
      if ((response.data.status = 'success')) {


        // handleAddCard(values)

        setModalVisible(true);

        setLoader(false);
      }
      else{
        PLATFORM_IOS
        ? Toast.show({
          type: 'success',
          text1: 'Server Busy Please Try Later.',
        })
        : ToastAndroid.show(
          'Server Busy Please Try Later.',
          ToastAndroid.SHORT,
        );
      }
    } catch (err) {
      setLoader(false);
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
      } else {
        console.log(err);
      }
    }
  };

  

  const getDeviceIDData = () => {
    axios
      .get(`${API}/devicecheck/${getUserID}}`)
      .then(res => {
        setModalVisible(false);
        console.log(res.data, 'tt');
        if (res.data.status == 'True') {
          // dispatch(setDeviceId(res.data.message));
          console.log(route.params.purchageData);
          if (route.params.purchageData == 'DOWNGRADE') {
            // PlanStatus();

        navigationRef.navigate('HomeOne');
          } else {
            getPlanCurrent();
          }
        } else {
          getPlanCurrent();
          dispatch(setDeviceId(res.data.message));
          navigationRef.navigate('DrawerStack');

          // fetchGraphData(res.data?.user_id);
          // fetchWeekGraphData(res.data?.user_id);
          // fetchMonthGraphData(res.data?.user_id);
          // fetchQuarterGraphData(res.data.user_id);
          // fetchYearGraphData(res.data?.user_id);
          // fetchBoxTwoDashboardData(res.data?.user_id);
          // fetchStatusdata(res.data?.user_id);
          // getPlanCurrent(res.data?.user_id);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getPlanCurrent = () => {
    axios
      .get(`${API}/currentplan/${getUserID}`)
      .then(res => {
        console.log(res.data);
      
        if (res.data.data == 'Package details not found') {
          dispatch(setPurchaseData(res.data));
        } else {
          dispatch(setPurchaseData(res?.data));
        }
        dispatch(setPackageStatus(true));
        navigationRef.navigate('HomeOne');
      })
      .catch(err => {
        console.log(err);
      });
  };

  function formatCreditCardNumber(cardNumber) {
    const digitsOnly = cardNumber.replace(/\D/g, '');

    // If the number is less than 16 digits, return the original input
    if (digitsOnly.length < 16) {
      return cardNumber;
    }
  
    // Mask the first 12 digits and display the last 4 digits
    const maskedNumber = "xxxx xxxx xxxx " + digitsOnly.substring(12,16);
  
    return maskedNumber;
  }
  // const PlanStatus = () => {
  //   axios
  //     .get(`${API}/planstatus/${getUserID}`)
  //     .then(res => {
  //       const name = res.data.subscriptions.filter(
  //         item => item.subscription_status == 'scheduled',
  //       );
  //       dispatch(setPlanStatus(name[0].item_name));
  //       navigationRef.navigate('HomeOne');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
       <View style={{ marginHorizontal: 20, paddingTop: 20 }}>
          <Text style={styles.complete_profile}>Payment Details</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} >
      {loader && <ActivityLoader />}
    
       
       
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Plan Purchased</Text>
                <AnimatedLottieView
                  source={{
                    uri: 'https://assets6.lottiefiles.com/private_files/lf30_mf7q9oho.json',
                  }} // Replace with your animation file
                  autoPlay
                  loop
                  style={{ width: 50, height: 50 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: COLORS.BLACK,
                  }}>
                  Thank you for subscribing!
                </Text>
                <View style={styles.button_one}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={getDeviceIDData}>
                    <Text style={styles.textStyle}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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
                setFieldValue,
              }) => (
                <KeyboardAvoidingView behavior="padding">
                  <Image
                    source={require('../../../assets/images/visaCard.png')}
                    style={{
                      width: DIMENSIONS.SCREEN_WIDTH * 0.9,
                      resizeMode: 'contain',
                    }}
                  />
                  <View style={styles.cardNumber_position}>

                    {cardDetails.card_number ? (
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '600',
                          fontSize: 20,
                        }}>
                         
                        {cardDetails?.card_number >0 && formatCreditCardNumber(cardDetails.card_number+'')}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '600',
                          fontSize: 20,
                        }}>
                        {formatCreditCardNumber(values.cardNumber+'')}
                      </Text>
                    )}
                    <View style={styles.text_div}>
                      <View style={{ gap: 5, width: 100 }}>
                        <Text
                          style={{
                            color: 'gray',
                            fontWeight: '600',
                            fontSize: 8,
                          }}>
                          Card Holder
                        </Text>

                        {cardDetails.cardHolderName ? (
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 13,
                            }}>
                            {cardDetails.cardHolderName}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 13,
                            }}>
                            {values.cardHolderName}
                          </Text>
                        )}
                      </View>
                      <View style={{ gap: 5 }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 8,
                            color: 'gray',
                          }}>
                          Expires
                        </Text>

                        {cardDetails.validTill !== 'undefined/undefined' ? (
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 13,
                            }}>
                            {cardDetails.validTill}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 13,
                            }}>
                            {values.validTill}
                          </Text>
                        )}

                      </View>
                      <View style={{ gap: 5 }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 8,
                            color: 'gray',
                          }}>
                          CVV
                        </Text>
                        {cardDetails.card_cvv ? (
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 13,
                            }}>
                          {cardDetails.card_cvv ? '*'.repeat(String(cardDetails.card_cvv).length) : null}

                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 13,
                            }}>
                            {values.cvv? '*'.repeat(String(values.cvv).length) : null }

                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: COLORS.GREEN,
                      //width:DIMENSIONS.SCREEN_WIDTH*0.3,
                      height:DIMENSIONS.SCREEN_HEIGHT*0.05,                     
                      marginBottom:35,
                      justifyContent:'center',
                      alignItems:'center',
                      borderRadius: 12,
                      ...Platform.select({
                        ios: {
                          shadowColor: '#000000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.3,
                          shadowRadius: 4,
                        },
                        android: {
                          elevation: 4,
                        },
                      }),
                    }}>
                    <TouchableOpacity onPress={newPAYMENT}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: COLORS.BLACK,
                        }}>
                        Make Payment By Default Card 
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {Platform.OS == 'android' ? <HorizontalLine style={styles.line} /> : <View>
                    <Image source={require('../../../assets/images/dotted.png')} style={{ width: mobileW * 0.98 }} />
                  </View>}

                  <Input
                    IconLeft={null}
                    errors={errors.cardHolderName}
                    touched={touched.cardHolderName}
                    value={values.cardHolderName}
                    onChangeText={handleChange('cardHolderName')}
                    onBlur={handleBlur('cardHolderName')}
                    text="Card Holder Name"
                    IconRight={() => <Admin />}
                    mV={15}
                    placeholder="John Doe"
                    bW={1}
                    textWidth={ms(110)}
                    placeholderTextColor={COLORS.HALFBLACK}
                  />
                  <Input
                    IconLeft={null}
                    errors={errors.cardNumber}
                    touched={errors.cardNumber}
                    value={values.cardNumber}
                    //onChangeText={handleChange('cardNumber')}
                    onChangeText={text => {
                      var num = /[^0-9]/g;
                      const cardNumbers = text.replace(/\s/g, ''); // Remove spaces from card number
                      const cardNumber = cardNumbers.replace(num, '');
                      let formattedCardNumber = '';
                      for (let i = 0; i < cardNumber.length; i += 4) {
                        formattedCardNumber += cardNumber.substr(i, 4) + ' ';
                      }

                      formattedCardNumber = formattedCardNumber.trim();

                      handleChange('cardNumber')(formattedCardNumber);
                    }}
                    onBlur={handleBlur('cardNumber')}
                    maxLength={19}
                    text="Card Number"
                    IconRight={() => <Message />}
                    mV={15}
                    placeholder="xxxx  xxxx 1234 5678"
                    bW={1}
                    textWidth={ms(85)}
                    placeholderTextColor={COLORS.HALFBLACK}
                    keyboardType="number-pad"
                  />
                  <View style={styles.mainDiv_state_ZIP}>
                    <View style={styles.zip_state_view}>
                      <Input
                        IconLeft={null}
                        errors={errors.validTill}
                        touched={touched.validTill}
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
                          console.log(formattedValidTill, 'asd');
                          // Update the valid till value
                          handleChange('validTill')(formattedValidTill);
                        }}
                        onBlur={handleBlur('validTill')}
                        text="Valid Till"
                        IconRight={null}
                        mV={15}
                        placeholder="07/23"
                        bW={1}
                        textWidth={ms(62)}
                        placeholderTextColor={COLORS.HALFBLACK}
                        w="half"
                        keyboardType="numeric"
                        maxLength={5}
                      />
                    </View>
                    <View style={styles.zip_state_view}>
                      <Input
                        IconLeft={null}
                        errors={errors.cvv}
                        touched={touched.cvv}
                        value={values.cvv}
                        onChangeText={handleChange('cvv')}
                        onBlur={handleBlur('cvv')}
                        text="CVV"
                        IconRight={null}
                        mV={15}
                        placeholder="***"
                        bW={1}
                        textWidth={ms(38)}
                        placeholderTextColor={COLORS.HALFBLACK}
                        w="half"
                        secureTextEntry={true}
                        maxLength={3}
                        keyboardType="numeric"
                      />
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
                        ...Platform.select({
                          ios: {
                            shadowColor: '#000000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                          },
                          android: {
                            elevation: 4,
                          },
                        }),
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
                </KeyboardAvoidingView>
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
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    // borderRadius: 6,
  },
  cardNumber_position: {
    position: 'absolute',
    top: 120,
    left: 30,
  },
  text_div: {
    position: 'relative',
    top: 45,
    left: 0,
    flexDirection: 'row',
    gap: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: DIMENSIONS.SCREEN_WIDTH * 0.8,
  },
  button_one: {
    marginLeft: 80,
    marginTop: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    borderRadius: 100,
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
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 24,
    color: '#000000',
  },
});

