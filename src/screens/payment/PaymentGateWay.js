/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
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
  ImageBackground,
} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import {Card} from '../../../assets/svgs/Card';
import {Name} from '../../../assets/svgs/Name';
import {DIMENSIONS, PLATFORM_IOS} from '../../constants/DIMENSIONS';
import {LeftIcon} from '../../../assets/images/LeftIcon';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Admin} from '../../../assets/images/Admin';
import {Message} from '../../../assets/images/Message';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {API} from '../../api/API';
import {navigationRef} from '../../../App';
import ActivityLoader from '../../Components/ActivityLoader';
import HorizontalLine from '../../Components/HorizontalLine';
import {mvs, ms} from 'react-native-size-matters';
import creditCardType, {types as CardType} from 'credit-card-type';

import {
  setCardDetails,
  setDeviceId,
  setPackageStatus,
  setPlanStatus,
  setPurchaseData,
} from '../../redux/action';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Carousel from 'react-native-reanimated-carousel';
import {CardNumber} from '../../../assets/svgs/CardNumber';

const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);
const validationSchema = Yup.object().shape({
  // cardHolderName: Yup.string().required('Card Holder Name is required'),
  cardHolderName: Yup.string()
    .required('Card Holder Name is required')
    .matches(/^[a-zA-Z]*$/, 'Name must be start with a character')
    .min(3, 'Name must contain at least 3 characters'),
  cardNumber: Yup.string()
    .required('Invalid Card Number')
    .min(19, 'Card number must be 16 digits'),

  // .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  validTill: Yup.string()
    .required('Expiry date is required')
    .test(
      'expiration',
      'Year should be greater or equal to the current year',
      function (value) {
        if (!value) {
          return false;
        }
        const currentDate = new Date();
        const [month, year] = value.split('/');

        // Check if month is between 1 and 12
        if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
          return this.createError({
            message: 'Invalid month',
            path: 'validTill',
          });
        }

        const expirationDate = new Date(
          parseInt(`20${year}`, 10),
          parseInt(month, 10) - 1,
        );

        // // Check if the year is greater than or equal to the current year
        // if (expirationDate.getFullYear() <= currentDate.getFullYear()) {
        //   return this.createError({
        //     message: 'Year should be greater or equal to the current year',
        //     path: 'validTill',
        //   });
        // }
        // Check if the year is equal to the current year but the month is greater than the current month
        if (
          expirationDate.getFullYear() === currentDate.getFullYear() &&
          expirationDate.getMonth() <= currentDate.getMonth()
        ) {
          return this.createError({
            message: 'Month should be greater than the current month',
            path: 'validTill',
          });
        }

        // Check if the expiration date is greater than the current date
        return expirationDate > currentDate;
      },
    ),
  cvv: Yup.string()
    .required('cvv is required')
    .matches(/^[0-9]{3}$/, 'CVV must be 3 digits'),
});
export default function PaymentGateWay({navigation, route}) {
  const [allSavedCard, setSavedCard] = useState([]);
  const [currentCard, setCurrentCard] = useState('');
  const [focusIndex, setFocusedIndex] = useState(0);
  const [coupon, setCoupen] = useState(null);
  const [coupenStates, setCoupenStates] = useState(false);
  const [couponerror, setCoupenError] = useState(null);
  const [color, setColor] = useState(false);
  const voucherStatus = route.params.voucherStatus;
  const [cardData, setCardData] = useState();

  const {getDataForPayment, getUserID, getEmailDAta} = useSelector(
    state => state,
  );

  useEffect(() => {
    handleGetCard();
    handleAllGetCard();
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const [card, setCard] = useState([]);

  const handleGetCard = async () => {
    try {
      const response = await fetch(`${API}/getcarddetails/${getUserID}`);
      const result = await response.json();

      if (result[0]?.length > 0) {
        const statusOneObjects = result[0].filter(item => item.status === 1);

        setCard(statusOneObjects);
      } else {
      }
    } catch (error) {
      console.log('ERROR123', error);
    }
  };

  const handlePaymentSubmit = async () => {
    setLoader(true);
    let payload = new FormData();
    let exp_month = cardData?.validTill?.split('/')[0];
    let exp_year = cardData?.validTill?.split('/')[1];
    payload.append('kwh_unit', route.params.data.kwh);
    payload.append('card_number', cardData.cardNumber.replace(/\s/g, ''));
    payload.append('card_cvc', cardData.cvv);
    payload.append('card_exp_month', exp_month);
    payload.append('card_exp_year', exp_year);
    payload.append('item_details', getDataForPayment.package_name);
    payload.append('price', getDataForPayment.total_price);
    payload.append('price_stripe_id', getDataForPayment.price_stripe_id);
    payload.append('user_id', getUserID);
    payload.append('voucherCode', coupon == null ? '' : coupon);
    try {
      const response = await axios.post(`${API}/checkout`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if ((response.data.status = 'success')) {
        // handleAddCard(values)
        setModalVisible(true);
        setModalVisible1(false);
        setLoader(false);
      } else {
        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: 'Invalid Card Details !',
            })
          : ToastAndroid.show('Invalid Card Details !', ToastAndroid.SHORT);
        setModalVisible1(false);
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      if (err.response) {
        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: 'Server Busy Please Try Later.',
            })
          : ToastAndroid.show(
              'Server Busy Please Try Later.',
              ToastAndroid.SHORT,
            );
        setModalVisible1(false);
        setLoader(false);
      } else {
        console.log('test111111', err.response.data);
        setModalVisible1(false);
        setLoader(false);
      }
    }
  };

  const getDeviceIDData = () => {
    axios
      .get(`${API}/devicecheck/${getUserID}}`)
      .then(res => {
        setModalVisible(false);

        if (res.data.status == 'True') {
          // dispatch(setDeviceId(res.data.message));

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
    const maskedNumber = 'xxxx xxxx xxxx ' + digitsOnly.substring(12, 16);

    return maskedNumber;
  }

  const handleAllGetCard = async () => {
    try {
      const response = await fetch(`${API}/getcarddetails/${getUserID}`);
      const result = await response.json();

      if (result[0]?.length > 0) {
        setSavedCard(result[0].sort((b, a) => a.status - b.status));
        const statusOneObjects = result[0].filter(item => item.status === 1);
        dispatch(setCardDetails(statusOneObjects));
      } else {
        setSavedCard([]);
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  const getCardType = cardNumber => {
    const cardType = creditCardType(cardNumber ? cardNumber : creditCard)[0]
      ?.type;

    if (cardType === 'visa') {
      return require('../../../assets/images/Visa.png');
    } else if (cardType === 'master') {
      return require('../../../assets/images/Master.png');
    } else if (cardType === 'american-express') {
      return require('../../../assets/images/Amex.png');
    } else if (cardType === 'discover') {
      return require('../../../assets/images/Discover.png');
    } else {
      return require('../../../assets/images/visaCard.png');
    }
  };
  const coupenDetail = data => {
    if (data == null) {
      setCoupenError('Enter Coupon Code');
      setCoupenStates(true);
      setColor(false);
    } else if (data.trim().length <= 0) {
      setCoupenError('Enter Coupon Code');
      setCoupenStates(true);
      setColor(false);
    } else {
      setLoader(true);
      axios
        .get(
          `${API}/couponpricetblvalid/${data}/${route.params.details.locations[0].price_stripe_id}`,
        )
        .then(res => {
          setLoader(false);
          console.log('fsfdsfds', res.data.couponstatus);
          if (res.data.couponstatus == 'true' && voucherStatus) {
            setCoupenError('Coupon Applied!');
            setCoupenStates(true);
            setColor(true);
          } else {
            setCoupenError('Coupon Expired/Invalid!');
            setCoupenStates(true);
            setColor(false);
          }
        })
        .catch(err => {
          console.log(err);
          setLoader(false);
        });
    }
  };
  const checkCoupeonDetails = () => {
    if (coupon == null) {
      setModalVisible1(true);
    } else if (coupon && couponerror == 'Coupon Expired/Invalid!') {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Coupon Expired/Invalid!',
          })
        : ToastAndroid.show('Coupon Expired/Invalid!', ToastAndroid.SHORT);
    } else if (coupon && couponerror == null) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Apply Coupon First',
          })
        : ToastAndroid.show('Apply Coupon First', ToastAndroid.SHORT);
    } else if (coupon && couponerror == 'Coupon Applied!') {
      setModalVisible1(true);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <View style={{marginHorizontal: 20, paddingTop: 20}}>
        <Text style={styles.complete_profile}>Payment Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
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
                  style={{width: 50, height: 50}}
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
              onSubmit={values => {
                setCardData(values);
                checkCoupeonDetails();
              }}
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
                  {allSavedCard.length > 0 ? (
                    <>
                      <Carousel
                        //ref={(c) => { this._carousel = c; }}
                        style={{flexGrow: 0}}
                        width={420}
                        height={DIMENSIONS.SCREEN_WIDTH * 0.8}
                        data={allSavedCard}
                        // defaultIndex={focusIndex >= 0 ? focusIndex : 0}
                        renderItem={({item, index}) => {
                          return (
                            <View>
                              <ImageBackground
                                source={getCardType(item.card_number)}
                                resizeMode="contain"
                                style={{
                                  width: DIMENSIONS.SCREEN_WIDTH * 0.9,

                                  height: 210,
                                }}>
                                <View style={styles.cardNumber_position}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontWeight: '600',
                                      fontSize: ms(20),
                                    }}>
                                    {String(item.card_number).replace(
                                      /^(\d{12})(\d{4})$/,
                                      'xxxx xxxx xxxx $2',
                                    )}
                                  </Text>
                                  <View style={styles.text_div}>
                                    <View style={{gap: ms(5), width: ms(100)}}>
                                      <Text
                                        style={{
                                          color: 'gray',
                                          fontWeight: '600',
                                          fontSize: 8,
                                        }}>
                                        Card Holder
                                      </Text>
                                      <Text
                                        style={{
                                          color: '#fff',
                                          fontWeight: '600',
                                          fontSize: 13,
                                        }}>
                                        {String(item.cust_name)}
                                      </Text>
                                    </View>
                                    <View style={{gap: ms(5)}}>
                                      <Text
                                        style={{
                                          fontWeight: '600',
                                          fontSize: 8,
                                          color: 'gray',
                                        }}>
                                        Expires
                                      </Text>
                                      <Text
                                        style={{
                                          color: '#fff',
                                          fontWeight: '600',
                                          fontSize: 13,
                                        }}>
                                        {String(
                                          item.card_exp_month +
                                            '/' +
                                            item.card_exp_year,
                                        )}
                                      </Text>
                                    </View>
                                    <View style={{gap: 5}}>
                                      <Text
                                        style={{
                                          fontWeight: '600',
                                          fontSize: 8,
                                          color: 'gray',
                                        }}>
                                        CVV
                                      </Text>
                                      <Text
                                        style={{
                                          color: '#fff',
                                          fontWeight: '600',
                                          fontSize: 13,
                                        }}>
                                        {/* {String(item.card_cvc)} */}
                                        {item.card_cvc
                                          ? '*'.repeat(
                                              String(item.card_cvc).length,
                                            )
                                          : null}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </ImageBackground>
                              <View
                                style={{
                                  backgroundColor: COLORS.GREEN,
                                  marginLeft: -70,
                                  //height: DIMENSIONS.SCREEN_HEIGHT * 0.05,
                                  alignItems: 'center',
                                  marginTop: DIMENSIONS.SCREEN_HEIGHT * 0.03,
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  padding: 15,
                                  borderRadius: 12,
                                  ...Platform.select({
                                    ios: {
                                      shadowColor: '#000000',
                                      shadowOffset: {width: 0, height: 2},
                                      shadowOpacity: 0.3,
                                      shadowRadius: 4,
                                    },
                                    android: {
                                      elevation: 4,
                                    },
                                  }),
                                }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    setFieldValue(
                                      'cardHolderName',
                                      item.cust_name,
                                    );
                                    setFieldValue(
                                      'cardNumber',
                                      item.card_number.toString() + ' ',
                                    );
                                    setFieldValue(
                                      'validTill',
                                      item.card_exp_month +
                                        '/' +
                                        item.card_exp_year,
                                    );
                                    setFieldValue(
                                      'cvv',
                                      item.card_cvc.toString(),
                                    );
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      fontWeight: '700',
                                      color: COLORS.BLACK,
                                    }}>
                                    {item.status == 1
                                      ? `Make Payment By Default Card`
                                      : 'Make Payment By Save Card'}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        }}
                        // sliderWidth={400}
                        // itemWidth={400}
                        loop={false}
                        onSnapToItem={index => {
                          setCurrentCard(allSavedCard[index]);
                          setFocusedIndex(index);
                        }}
                      />

                      <View style={styles.dotsContainer}>
                        {allSavedCard &&
                          allSavedCard.length > 0 &&
                          allSavedCard.map((item, index) => {
                            if (index === 0 && !currentCard) {
                              return (
                                <View style={[styles.dot, styles.activeDot]} />
                              );
                            } else {
                              return (
                                <View
                                  style={[
                                    styles.dot,
                                    index === focusIndex && styles.activeDot,
                                  ]}
                                />
                              );
                            }
                          })}
                      </View>
                    </>
                  ) : (
                    <ImageBackground
                      source={require('../../../assets/images/visaCard.png')}
                      resizeMode="contain"
                      style={{
                        width: DIMENSIONS.SCREEN_WIDTH * 0.9,
                        height: 210,
                        marginBottom: 50,
                      }}>
                      <View style={styles.cardNumber_position}>
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: 20,
                          }}>
                          {values.cardNumber}
                          {/* {values.cardNumber+'    '+allSavedCard.length} */}
                        </Text>
                        <View style={styles.text_div}>
                          <View style={{gap: 5, width: 100}}>
                            <Text
                              style={{
                                color: 'gray',
                                fontWeight: '600',
                                fontSize: 8,
                              }}>
                              Card Holder
                            </Text>

                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: 13,
                              }}>
                              {values.cardHolderName}
                            </Text>
                          </View>
                          <View style={{gap: 5}}>
                            <Text
                              style={{
                                fontWeight: '600',
                                fontSize: 8,
                                color: 'gray',
                              }}>
                              Expires
                            </Text>

                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: 13,
                              }}>
                              {values.validTill}
                            </Text>
                          </View>
                          <View style={{gap: 5}}>
                            <Text
                              style={{
                                fontWeight: '600',
                                fontSize: 8,
                                color: 'gray',
                              }}>
                              CVV
                            </Text>
                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: 13,
                              }}>
                              {values.cvv
                                ? '*'.repeat(String(values.cvv).length)
                                : null}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ImageBackground>
                  )}

                  {Platform.OS == 'android' ? (
                    <View style={{marginTop: DIMENSIONS.SCREEN_HEIGHT * 0.03}}>
                      <HorizontalLine style={styles.line} />
                    </View>
                  ) : (
                    <View style={{marginVertical: 10}}>
                      <Image
                        source={require('../../../assets/images/dotted.png')}
                        style={{width: mobileW * 0.98}}
                        resizeMode="stretch"
                      />
                    </View>
                  )}

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
                    IconRight={() => <CardNumber />}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                    }}>
                    <Input
                      errors={couponerror}
                      onChangeText={text => {
                        setCoupen(text);
                      }}
                      value={coupon}
                      touched={coupenStates}
                      text="Coupon"
                      mV={10}
                      placeholder="AZVP901AD"
                      bW={1}
                      textWidth={ms(70)}
                      placeholderTextColor={COLORS.HALFBLACK}
                      w="half"
                      // keyboardType="numeric"
                      maxLength={20}
                      colorText={color}
                    />
                    <View
                      style={{
                        backgroundColor: COLORS.GREEN,
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                        alignSelf: 'center',

                        borderRadius: 12,
                        ...Platform.select({
                          ios: {
                            shadowColor: '#000000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                          },
                          android: {
                            elevation: 4,
                          },
                        }),
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          coupenDetail(coupon);
                        }}
                        style={{
                          alignItems: 'center',
                          alignSelf: 'center',
                          backgroundColor: COLORS.GREEN,

                          borderRadius: 12,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            textAlign: 'center',
                            color: COLORS.BLACK,
                          }}>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.bottom_tab}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                        padding: 20,
                        backgroundColor: COLORS.GRAY,
                        borderRadius: 25,
                        ...Platform.select({
                          ios: {
                            shadowColor: '#000000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                          },
                          android: {
                            elevation: 4,
                          },
                        }),
                      }}>
                      <LeftIcon />
                    </TouchableOpacity>

                    <View
                      style={{
                        backgroundColor: COLORS.GREEN,
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                        borderRadius: 12,
                        ...Platform.select({
                          ios: {
                            shadowColor: '#000000',
                            shadowOffset: {width: 0, height: 2},
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible(!modalVisible1);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Confirm Payment</Text>
            <Image
              source={require('../../../assets/images/Master.png')} // Replace with your animation file
              resizeMode="contain"
              style={{
                width: DIMENSIONS.SCREEN_WIDTH * 0.7,

                height: 150,
              }}
            />

            <View style={{flexDirection: 'row'}}>
              <View style={styles.button_one}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible1(false);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.button_one, {marginHorizontal: 15}]}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={handlePaymentSubmit}>
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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

    marginBottom: '10%',
    marginTop: '5%',
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
        shadowOffset: {width: 0, height: 2},
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
    top: mvs(90),
    left: ms(25),
  },
  text_div: {
    position: 'relative',
    top: 35,
    left: 10,
    flexDirection: 'row',
    gap: 25,
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
    width: DIMENSIONS.SCREEN_WIDTH * 0.8,
    alignItems: 'center',
  },
  button_one: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  button: {
    padding: 10,
    elevation: 2,
    borderRadius: 100,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    alignSelf: 'center',
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
  dotsContainer: {
    flexDirection: 'row',
    marginHorizontal: mobileW * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:
      Platform.OS == 'ios'
        ? -(DIMENSIONS.SCREEN_WIDTH * 10) / 100
        : -(DIMENSIONS.SCREEN_WIDTH * 5) / 100,
  },
  activeDot: {
    backgroundColor: COLORS.GREEN, // Customize the active dot color as desired
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#CCCCCC',
    // justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
});
