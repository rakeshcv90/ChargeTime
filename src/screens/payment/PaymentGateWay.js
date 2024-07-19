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
  createToken,
  CardForm,
  CardField,
  CardFieldInput,
  CardFormView,
} from '@stripe/stripe-react-native';

import {
  setBasePackage,
  setBoxTwoDataForDashboard,
  setCardDetails,
  setDeviceId,
  setPackageStatus,
  setPlanStatus,
  setPuchaseAllPlans,
  setPurchaseData,
  setSubcriptionCancelStatus,
} from '../../redux/action';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Carousel from 'react-native-snap-carousel';
import {CardNumber} from '../../../assets/svgs/CardNumber';

const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);
const validationSchema = Yup.object().shape({
  // cardHolderName: Yup.string().required('Card Holder Name is required'),
  cardHolderName: Yup.string()
    .required('Card Holder Name is Required')
    .matches(/^[A-Za-z].*/, 'Name must start with a character')
    .min(3, 'Name must contain at least 3 characters'),
  cardNumber: Yup.string()
    .required('Invalid Card Number')
    .min(19, 'Card number must be 16 digits'),

  // .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  validTill: Yup.string()
    .required('Expiry date is Required')
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
    .required('CVV is Required')
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
  // const voucherStatus = route.params.voucherStatus;
  const [voucherStatus, setvoucherStatus] = useState('');
  const [cardData, setCardData] = useState();
  const [cardtype, setcardtype] = useState([]);
  const [creditCard, setCreditCard] = useState('');
  const [complete, setComplete] = useState();
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(true);
  const [couponcode, setCoupencode] = useState(null);

  const {getDataForPayment, getUserID, getEmailDAta} = useSelector(
    state => state,
  );

  useEffect(() => {
    handleGetCard();
    handleAllGetCard();
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [saveCardDetails, setSaveCardDetails] = useState();
  const [loader, setLoader] = useState(false);
  const[desible,setDesible]=useState(false)

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
    setDesible(true)
    const id = await createToken({...cardtype, type: 'Card'});
    console.log('TEST DATA', id);

    if (id?.error) {
      setModalVisible1(false);
      PLATFORM_IOS
        ? Toast.show({
            type: 'success',
            text1: 'Invalid Card!',
          })
        : ToastAndroid.show('Invalid Card!', ToastAndroid.SHORT);
    } else {
      setLoader(true);
      let payload = new FormData();
      // let exp_month = cardData?.validTill?.split('/')[0];
      // let exp_year = cardData?.validTill?.split('/')[1];
      payload.append('kwh_unit', route.params.data.kwh);
      // payload.append('card_number', cardData.cardNumber.replace(/\s/g, ''));
      // payload.append('card_cvc', cardData.cvv);
      // payload.append('card_exp_month', exp_month);
      // payload.append('card_exp_year', exp_year);
      payload.append('item_details', getDataForPayment.package_name);
      payload.append('price', getDataForPayment.total_price);
      payload.append('price_stripe_id', getDataForPayment.price_stripe_id);
      payload.append('user_id', getUserID);
      payload.append('stripeToken', id.token.id);
      payload.append('voucherCode', coupon == null ? '' : coupon);
      payload.append('coupon_id', couponcode == null ? '' : couponcode);
      console.log('PAYLOAD DATA', payload);

      try {
        const response = await axios.post(`${API}/checkout`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('My Test123', response.data.status);
        if (response.data.status == 'Same package already purchased') {
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: response.data.status,
              })
            : ToastAndroid.show(response.data.status, ToastAndroid.SHORT);
          setModalVisible1(false);
          setLoader(false);
          getDeviceIDData();
          setDesible(false)
        } else if (response.data.status == 'success') {
          setModalVisible(true);
          setModalVisible1(false);
          setLoader(false);
          setshow(false);
          setshow1(true);
          setDesible(false)
        } else {
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Invalid Card Details !',
              })
            : ToastAndroid.show('Invalid Card Details !', ToastAndroid.SHORT);
          setModalVisible1(false);
          setLoader(false);
          setDesible(false)
        }
        // if ((response.data.status = 'success')) {
        //   // handleAddCard(values)
        //   setModalVisible(true);
        //   setModalVisible1(false);
        //   setLoader(false);
        //   setshow(false);
        //   setshow1(true);
        // } else if (response.data.message == 'Same package allready purchased') {
        //   PLATFORM_IOS
        //     ? Toast.show({
        //         type: 'success',
        //         text1: response.data.message,
        //       })
        //     : ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        //   setModalVisible2(false);
        //   setLoader(false);
        // } else {
        //   PLATFORM_IOS
        //     ? Toast.show({
        //         type: 'success',
        //         text1: 'Invalid Card Details !',
        //       })
        //     : ToastAndroid.show('Invalid Card Details !', ToastAndroid.SHORT);
        //   setModalVisible1(false);
        //   setLoader(false);
        // }
      } catch (err) {
        setLoader(false);
        console.log('test111111', err);
        setDesible(false)
        if (err.response) {
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: 'Your plan has been canceled in Stripe and the Stripe ID could not be found.',
              })
            : ToastAndroid.show(
                'Your plan has been canceled in Stripe and the Stripe ID could not be found.',
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
    }
  };
  const fetchcarddetails = value => {
    if (value.complete) {
      setComplete(value.complete);
      setcardtype(value);
      console.log('My Card Deatils', value);
    } else {
      setComplete(value.complete);
      setcardtype(null);
    }
  };
  const handleCardSubmit = async () => {
    setLoader(true);
    let payload = new FormData();
    // let exp_month = cardData?.validTill?.split('/')[0];
    // let exp_year = cardData?.validTill?.split('/')[1];
    payload.append('kwh_unit', route.params.data.kwh);
    // payload.append('card_number', cardData.cardNumber.replace(/\s/g, ''));
    // payload.append('card_cvc', cardData.cvv);
    // payload.append('card_exp_month', exp_month);
    // payload.append('card_exp_year', exp_year);
    payload.append('item_details', getDataForPayment.package_name);
    payload.append('price', getDataForPayment.total_price);
    payload.append('price_stripe_id', getDataForPayment.price_stripe_id);
    payload.append('user_id', getUserID);
    payload.append('stripeToken', saveCardDetails.card_id);
    payload.append('voucherCode', coupon == null ? '' : coupon);
    payload.append('coupon_id', couponcode == null ? '' : couponcode);

    try {
      const response = await axios.post(`${API}/checkout`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('My Test', response.data);
      if (response.data.status == 'The package has already been purchased') {
        PLATFORM_IOS
          ? Toast.show({
              type: 'error',
              text1: response.data.status,
            })
          : ToastAndroid.show(response.data.status, ToastAndroid.SHORT);
        setModalVisible2(false);
        setLoader(false);
        getDeviceIDData();
      } else if (response.data.status == 'success') {
        setModalVisible(true);
        setModalVisible2(false);
        setLoader(false);
        setshow(false);
        setshow1(true);
      } else {
        console.log('sdfdsfdsfsdfsdfsdfsdfds',response.data);
        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: 'Invalid Card Details !',
            })
          : ToastAndroid.show('Invalid Card Details !', ToastAndroid.SHORT);
        setModalVisible2(false);
        setLoader(false);
      }
      // if ((response.data.status = 'success')) {
      //   // handleAddCard(values)
      //   setModalVisible(true);
      //   setModalVisible2(false);
      //   setLoader(false);
      //   setshow(false);
      //   setshow1(true);
      // } else if ((response.data.status=='Same package allready purchased')) {
      //   PLATFORM_IOS
      //     ? Toast.show({
      //         type: 'success',
      //         text1: response.data.message,
      //       })
      //     : ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      //   setModalVisible2(false);
      //   setLoader(false);
    } catch (err) {
      console.log('TEsting Data', err);
      setLoader(false);
      if (err.response) {
        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: 'Strip id not found for this Package',
            })
          : ToastAndroid.show(
              'Strip id not found for this Package',
              ToastAndroid.SHORT,
            );
        setModalVisible1(false);
        setLoader(false);
      } else {
        console.log('test111111', err.response.data);
        setModalVisible2(false);
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
            navigationRef.navigate('HomeOne');
          }
          if (route.params.purchageData == 'DOWNGRADE') {
            dispatch(setDeviceId(res.data.message));
            getPlanCurrent();
            getAllPurchasePlan();
            navigationRef.navigate('Home');
          }
          dispatch(setDeviceId(res.data.message));
          getPlanCurrent();
          getAllPurchasePlan();
        } else {
          getPlanCurrent();
          getAllPurchasePlan();
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
        const subCancelStatus = res.data?.message?.subscription_cancel_status;
        if (res.data.data == 'Package not found') {
          dispatch(setBoxTwoDataForDashboard(res?.data));
          dispatch(setPurchaseData(res.data));
        } else if (subCancelStatus == 4 || subCancelStatus == 2) {
          dispatch(
            setSubcriptionCancelStatus(
              subCancelStatus == 2 ? 2 : subCancelStatus == 4 ? 4 : 0,
            ),
          );
          dispatch(setPackageStatus(false))
          dispatch(setBoxTwoDataForDashboard({data: 'Package not found'}));
          dispatch(setPurchaseData({data: 'Package not found'}));
        } else {
          dispatch(setBoxTwoDataForDashboard(res?.data));
          dispatch(
            setSubcriptionCancelStatus(
              subCancelStatus == 1
                ? 1
                : subCancelStatus == 2
                ? 2
                : subCancelStatus == 3
                ? 3
                : subCancelStatus == 4
                ? 4
                : 0,
            ),
          );
          dispatch(setPurchaseData(res?.data));
        }
        dispatch(setPackageStatus(true));
        // navigationRef.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getAllPurchasePlan = userId => {
    axios
      .get(`${API}/allpurchaseplans/${getUserID}`)
      .then(res => {
        dispatch(setPuchaseAllPlans(res?.data));
      })
      .catch(err => {
        console.log('Error-10', err);
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
   // console.log("DSDSD444444",route.params.details.locations[0])
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
          `${API}/couponpricetblvalid/${data}/${route.params.details.locations[0].id}/${route.params.details.locations[0].package_name}`,
        )
        .then(res => {
          setLoader(false);
          console.log('Responser Coupan', res.data);
          if (res.data.couponstatus == 'true') {
            getVoucherDetails(res.data.coupon_id);
            setCoupencode(res.data.coupon_id);
            
          } else {
            setCoupenError('Coupon Expired/Invalid!');
            setCoupenStates(true);
            setColor(false);
          }

          // if (res.data.couponstatus == 'true' && voucherStatus) {
          //   setCoupenError('Coupon Applied!');
          //   setCoupenStates(true);
          //   setColor(true);
          // } else {
          //   setCoupenError('Coupon Expired/Invalid!');
          //   setCoupenStates(true);
          //   setColor(false);
          // }
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
            text1: 'Please Apply Coupon',
          })
        : ToastAndroid.show('Please Apply Coupon', ToastAndroid.SHORT);
    } else if (coupon && couponerror == 'Coupon Applied!') {
      setModalVisible1(true);
    } else if (coupon && couponerror.length == 0) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Apply Coupon',
          })
        : ToastAndroid.show('Please Apply Coupon', ToastAndroid.SHORT);
    } else {
      setModalVisible1(true);
    }
  };
  const checkCoupeonDetails1 = () => {
    if (coupon == null) {
      setModalVisible2(true);
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
            text1: 'Please Apply Coupon',
          })
        : ToastAndroid.show('Please Apply Coupon', ToastAndroid.SHORT);
    } else if (coupon && couponerror == 'Coupon Applied!') {
      setModalVisible2(true);
    } else if (coupon && couponerror.length == 0) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Apply Coupon',
          })
        : ToastAndroid.show('Please Apply Coupon', ToastAndroid.SHORT);
    } else {
      setModalVisible2(true);
    }
  };
  // const updatePacakgeData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API}/packagePlan/${route.params.data.id}`,
  //     );

  //     if (response?.data?.locations.length == 0) {
  //       dispatch(setBasePackage([]));
  //     } else {
  //       dispatch(setBasePackage(response.data.locations));
  //       const datafilter = response.data.locations.filter(item => {
  //         return item.package_name == route.params.data.package_name;
  //       });
  //       console.log('Location Details', datafilter);
  //       if (datafilter[0].coupon_id != undefined) {
  //         // getVoucherDetails(datafilter[0].coupon_id);
  //         // setCoupencode(datafilter[0].coupon_id);
  //         setshow(true);
  //         setshow1(false);
  //       } else {
  //         PLATFORM_IOS
  //           ? Toast.show({
  //               type: 'error',
  //               text1: 'Coupon Not Available',
  //             })
  //           : ToastAndroid.show('Coupon Not Available', ToastAndroid.SHORT);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  const getVoucherDetails = data => {
    axios
      .get(`${API}/couponret/${data}`)
      .then(res => {
       console.log("FSDFSFSFSFSFS",res?.data)
        if(res?.data?.valid==true){
          setCoupenError('Coupon Applied!');
          setCoupenStates(true);
          setColor(true);
          setvoucherStatus(res.data.valid);
        }else{
          setCoupenError('Coupon Expired/Invalid!');
          setCoupenStates(true);
          setColor(false);
          setvoucherStatus(res.data.valid);
        }
        
        //

       
      })
      .catch(err => {
        console.log('ffffffffff', err);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <View style={{marginHorizontal: 20, paddingTop: 20}}>
        <Text style={styles.complete_profile}>Payment Details</Text>
      </View>
      <ScrollView
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={PLATFORM_IOS ? 'position' : undefined}
          contentContainerStyle={{flexGrow: 1}}>
          {/* {loader && <ActivityLoader />} */}
          {loader ? <ActivityLoader /> : ''}

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
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
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.buttonClose,
                      styles.button_one,
                    ]}
                    // style={[styles.button, styles.buttonClose]}
                    onPress={getDeviceIDData}>
                    {/* <Pressable */}

                    {/* > */}
                    <Text style={styles.textStyle}>OK</Text>
                    {/* </Pressable> */}
                  </TouchableOpacity>
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
                  <>
                    {allSavedCard.length > 0 ? (
                      <>
                        <Carousel
                          //ref={(c) => { this._carousel = c; }}
                          // style={{height: DIMENSIONS.SCREEN}}
                          itemWidth={400}
                          sliderWidth={400}
                          enableSnap
                          data={allSavedCard}
                          // defaultIndex={focusIndex >= 0 ? focusIndex : 0}
                          renderItem={({item, index}) => {
                            return (
                              <View>
                                <ImageBackground
                                  source={require('../../../assets/images/visaCard.png')}
                                  resizeMode="contain"
                                  style={{
                                    width: DIMENSIONS.SCREEN_WIDTH * 0.9,

                                    height: mvs(190),
                                  }}>
                                  {item.default_card == 'yes' && (
                                    <View
                                      style={{
                                        position: 'absolute',
                                        top: DIMENSIONS.SCREEN_HEIGHT * 0.02,
                                        left: DIMENSIONS.SCREEN_HEIGHT * 0.05,
                                        //alignSelf: 'center',
                                      }}>
                                      <Text style={{color: 'white'}}>
                                        Default Card
                                      </Text>
                                    </View>
                                  )}

                                  <View style={styles.cardNumber_position}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: ms(20),
                                      }}>
                                      {`xxxx xxxx xxxx ${item.card_number}`}
                                    </Text>
                                    <View style={styles.text_div}>
                                      {/* <View style={{gap: ms(5), width: ms(100)}}>
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
                                    </View> */}
                                      <View style={{gap: ms(5), top: -10}}>
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
                                            `${item.exp_month > 9 ? '' : '0'}${
                                              item.exp_month
                                            }` +
                                              '/' +
                                              item.exp_year,
                                          )}
                                        </Text>
                                      </View>
                                      <View style={{gap: ms(5), top: -10}}>
                                        <Text
                                          style={{
                                            fontWeight: '600',
                                            fontSize: 8,
                                            color: 'gray',
                                          }}>
                                          CVC
                                        </Text>
                                        <Text
                                          style={{
                                            color: '#fff',
                                            fontWeight: '600',
                                            fontSize: 13,
                                          }}>
                                          ***
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </ImageBackground>
                                <View
                                  style={{
                                    backgroundColor: COLORS.GREEN,
                                    marginLeft: -30,

                                    alignItems: 'center',
                                    marginTop: DIMENSIONS.SCREEN_HEIGHT * 0.03,
                                    marginBottom:
                                      DIMENSIONS.SCREEN_HEIGHT * 0.005,
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    padding: 15,
                                    borderRadius: 10,
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
                                      setSaveCardDetails(item);
                                      checkCoupeonDetails1();
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        fontWeight: '700',
                                        color: COLORS.BLACK,
                                      }}>
                                      {item.default_card == 'yes'
                                        ? `Make Payment By Default Card`
                                        : 'Make Payment by Saved Card'}
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
                                  <View
                                    style={[styles.dot, styles.activeDot]}
                                  />
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
                          marginBottom: 10,
                        }}>
                        {allSavedCard.length > 0 ? (
                          <View style={styles.cardNumber_position}>
                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: 20,
                              }}>
                              {values.cardNumber}
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
                                  CVC
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
                        ) : (
                          <View
                            style={{
                              position: 'absolute',
                              top: DIMENSIONS.SCREEN_HEIGHT * 0.12,
                              alignSelf: 'center',
                            }}>
                            <Text style={{color: 'white'}}>
                              No Default/Saved Card Added
                            </Text>
                          </View>
                        )}
                      </ImageBackground>
                    )}

                    {Platform.OS == 'android' ? (
                      <View
                        style={{
                          marginTop:
                            allSavedCard.length > 0
                              ? DIMENSIONS.SCREEN_HEIGHT * 0.2
                              : DIMENSIONS.SCREEN_HEIGHT * 0.05,
                        }}>
                        <HorizontalLine style={styles.line} />
                      </View>
                    ) : (
                      <View style={{marginVertical: 10}}>
                        <Image
                          source={require('../../../assets/images/dotted.png')}
                          style={{width: mobileW * 0.9}}
                          resizeMode="stretch"
                        />
                      </View>
                    )}

                    {/* <Input
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
                      touched={touched.cardNumber}
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
                        for (let cardType in cardPatterns) {
                          if (cardPatterns[cardType].test(text)) {
                            console.lo
                            return cardType;
                          }
                        }

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
                                  validTill.slice(0, 2) +
                                  '/' +
                                  validTill.slice(2);
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
                      </View> */}

                    <CardField
                      postalCodeEnabled={false}
                    
                      placeholders={{
                        number: '4242 4242 4242 4242',
                        cvc: 'CVC',
                      }}
                      cardStyle={{
                        backgroundColor: COLORS.CREAM,
                        textColor: COLORS.BLACK,
                        borderColor: COLORS.HALFBLACK,
                        borderWidth: 1,
                        borderRadius: 10,
                        placeholderColor:COLORS.HALFBLACK          
                      }}
                      style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                      }}
                      onCardChange={cardDetails => {
                        fetchcarddetails(cardDetails);
                      }}
                      onFocus={focusedField => {
                        console.log('focusField', focusedField);
                      }}
                    />
                    {/* {show1 && (
                      <TouchableOpacity
                        onPress={() => {
                          updatePacakgeData();
                        }}
                        style={{
                          alignSelf: 'flex-end',

                          width: DIMENSIONS.SCREEN_WIDTH * 0.3,
                        }}>
                        <Text style={styles.couponText}>Apply Coupon </Text>
                      </TouchableOpacity>
                    )} */}
                    {/* {show && ( */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        marginLeft: 6,
                      }}>
                      <Input
                        errors={couponerror}
                        onChangeText={text => {
                          setCoupen(text);
                          if (text.length <= 0) {
                            setCoupenError('');
                          }
                        }}
                        value={coupon}
                        touched={coupenStates}
                        text="Coupon"
                        placeholder="AZVP901AD"
                        bW={1}
                        textWidth={ms(70)}
                        placeholderTextColor={COLORS.HALFBLACK}
                        w="half"
                        bR={10}
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

                          borderRadius: 10,
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

                            borderRadius: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '700',
                              textAlign: 'center',
                              color: COLORS.BLACK,
                            }}>
                            Validate
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* )} */}
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
                          borderRadius: 10,
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
                            !complete
                              ? PLATFORM_IOS
                                ? Toast.show({
                                    type: 'error',
                                    text1: 'Please fill correct card details',
                                  })
                                : ToastAndroid.show(
                                    'Please fill correct card details',
                                    ToastAndroid.SHORT,
                                  )
                              : checkCoupeonDetails();
                          }}>
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
                  </>
                )}
              </Formik>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}>
        <>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Confirm Payment</Text>
         
              <ImageBackground
                source={require('../../../assets/images/visaCard.png')}
                resizeMode="contain"
                style={{
                  // width: DIMENSIONS.SCREEN_WIDTH * 0.7,

                  // height: 150,
                  width: DIMENSIONS.SCREEN_WIDTH * 0.7,

                  height: mvs(150),
                }}>
                <View style={styles.cardNumber_position1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: ms(15),
                    }}>
                    {`xxxx xxxx xxxx ${cardtype?.last4}`}
                  </Text>
                  <View style={styles.text_div}>
                    <View style={{gap: ms(5)}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 8,
                          color: '#fff',
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
                          `${cardtype?.expiryMonth > 9 ? '' : '0'}${
                            cardtype?.expiryMonth
                          }` +
                            '/' +
                            cardtype?.expiryYear,
                        )}
                      </Text>
                    </View>
                    <View style={{gap: 5}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 8,
                          color: '#fff',
                        }}>
                        CVC
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '600',
                          fontSize: 13,
                        }}>
                        ***
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>

              <View style={{flexDirection: 'row'}}>
                {/* <View style={styles.button_one}> */}
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose, styles.button_one]}
                  onPress={() => {
                    setModalVisible1(false);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                {/* </View> */}
                {/* <View style={[styles.button_one, {marginHorizontal: 15}]}> */}
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonClose,
                    styles.button_one,
                    {marginHorizontal: 15},
                  ]}
                  disabled={desible}
                 onPress={handlePaymentSubmit}
                  >
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
                {/* </View> */}
              </View>
            </View>
          </View>
        </>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}>
        <>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Confirm Payment</Text>
              <ImageBackground
                source={require('../../../assets/images/visaCard.png')}
                resizeMode="contain"
                style={{
                  // width: DIMENSIONS.SCREEN_WIDTH * 0.7,

                  // height: 150,
                  width: DIMENSIONS.SCREEN_WIDTH * 0.7,

                  height: mvs(150),
                }}>
                <View style={styles.cardNumber_position1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: ms(15),
                    }}>
                    {`xxxx xxxx xxxx ${saveCardDetails?.card_number}`}
                  </Text>
                  <View style={styles.text_div}>
                    <View style={{gap: ms(5)}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 8,
                          color: '#fff',
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
                          `${saveCardDetails?.exp_month > 9 ? '' : '0'}${
                            saveCardDetails?.exp_month
                          }` +
                            '/' +
                            saveCardDetails?.exp_year,
                        )}
                      </Text>
                    </View>
                    <View style={{gap: 5}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 8,
                          color: '#fff',
                        }}>
                        CVC
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '600',
                          fontSize: 13,
                        }}>
                        ***
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>

              <View style={{flexDirection: 'row'}}>
                {/* <View style={styles.button_one}> */}
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose, styles.button_one]}
                  onPress={() => {
                    setModalVisible2(false);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                {/* </View> */}
                {/* <View style={[styles.button_one, {marginHorizontal: 15}]}> */}
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonClose,
                    styles.button_one,
                    {marginHorizontal: 15},
                  ]}
                  onPress={handleCardSubmit}>
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
                {/* </View> */}
              </View>
            </View>
          </View>
        </>
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
    left: ms(35),
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
        ? DIMENSIONS.SCREEN_HEIGHT > 930
          ? -(DIMENSIONS.SCREEN_WIDTH * 16) / 100
          : -(DIMENSIONS.SCREEN_WIDTH * 19) / 100
        : -(DIMENSIONS.SCREEN_WIDTH * 17) / 100,
    marginBottom:
      Platform.OS == 'ios'
        ? (DIMENSIONS.SCREEN_WIDTH * 17) / 100
        : -(DIMENSIONS.SCREEN_WIDTH * 15) / 100,
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
  cardNumber_position1: {
    position: 'absolute',
    top: mvs(38),
    left: ms(30),
  },
  couponText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'green',
    fontSize: 15,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
});
