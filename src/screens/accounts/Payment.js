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
  Alert,
  ImageBackground,
  Platform,
  
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
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
import creditCardType,{types as CardType} from 'credit-card-type';
import { FlatList } from 'react-native-gesture-handler';
import { mvs,ms } from 'react-native-size-matters';
import Carousel from "react-native-reanimated-carousel";

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
  const [pagingEnabled, setPagingEnabled]=useState(true);
  const [getCard_Number, setGetCard_Number]=useState('');
  const [creditCard,setCreditCard] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardHolderName:'',
    card_number:'',
    card_cvv:'',
    validTill:'',
    // card_exp_year:'',
  });
  const [cardId, setCardId] = useState('');
  const [savedCard, setSavedCard] = useState('');

  const initialValues = {
    cardHolderName: '',
    cardNumber: '',
    validTill: '',
    cvv: '',
  }
  
const user_ID =getUserID;

  const getCardType = (cardNumber) => {

    const cardType = creditCardType(cardNumber?cardNumber :creditCard)[0]?.type;

    // console.log("Card ...", cardType)

    if (cardType === 'visa') {
      return require('../../../assets/images/Visa.png'); 
    } else if (cardType === 'master') {
      return require('../../../assets/images/Master.png'); 
    } else if (cardType==='american-express') {
      return require('../../../assets/images/Amex.png'); 
    } else if (cardType === 'discover') {
      return require('../../../assets/images/Discover.png'); 
    } else {
      return require('../../../assets/images/visaCard.png');
    }
  }


  useEffect(()=>{

    // console.log("Credit card...",creditCardType(creditCard))
  getCardType(cardDetails?.card_number ?? "")   

  },[creditCard,cardDetails,cardId])

  const handleAddCard = async (values,cb) => {
    let exp_month = values?.validTill?.split('/')[0];
    let exp_year = values?.validTill?.split('/')[1];
    let cust_number= values?.cardNumber.split(" ").join("");
    setGetCard_Number(values?.cardNumber)
    console.log('month is',getUserID);
    try {
 
      const response = await axios.post(`${API}/addcarddetail`, {
        "user_id": getUserID,
          "cust_name":values?.cardHolderName,
          "card_number":cust_number,
          "card_cvc":values?.cvv,
          "card_exp_month":exp_month,
          "card_exp_year":exp_year ,
      })
      if(response.data.msg === 'Your Card Detail Save'){
        cb();
        console.log("card add success")
        setCardDetails({
          cardHolderName:'',
          card_number:'',
          card_cvv:'',
          validTill:'',
          // card_exp_year:'',
        });
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
      else{
        // cb();
        PLATFORM_IOS
        ? Toast.show({
            type: 'success',
            text1: ' Your Card Detail Not Save.',
          })
        : ToastAndroid.show(
            'Your Card Detail Not Save.',
            ToastAndroid.SHORT,
          );
      }
    } catch (error) {
      console.error(error);
    }
   
  };

  const handleGetCard = async () => {

    try {
      const response = await fetch(`${API}/getcarddetails/${user_ID}`);
      const result = await response.json();
       console.log("Result",result[0])
      // const defaultCard = result[0].filter(item =>{ return item.status === 1})    
      //  console.log("-----",defaultCard)
    //  setCardId(defaultCard[0].id);

      if(result[0]?.length > 0)
      {
        // console.log("defaultCard",defaultCard[0])
        setSavedCard(result[0]) 
        
      //  console.log(defaultCard[0].id,"--------")

      }else{
        console.log("iiiiiiiiiiii")
      }
   
    } catch (error) {
      PLATFORM_IOS
      ? Toast.show({
          type: 'success',
          text1: ' Your card details not saved.',
        })
      : ToastAndroid.show(
        ' Your card details not saved.',
          ToastAndroid.SHORT,
        );
    }
  }  
const card_id = cardId;

  const handleDeleteCard = async () => {
    try {
      const response = await fetch(`${API}/deletecard/${savedCard?.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success === "Your card is deleted") {
        setCardDetails({
          cardHolderName:'',
          card_number:'',
          card_cvv:'',
          validTill:'',
          // card_exp_year:'',
        })
        console.log("Card deleted successfully");
        PLATFORM_IOS
        ? Toast.show({
            type: 'success',
            text1: ' Your Card Deleted Successfully.',
          })
        : ToastAndroid.show(
            'Your Card Deleted Successfully.',
            ToastAndroid.SHORT,
          );
      } else {
        // console.log("Error deleting card");
        PLATFORM_IOS
        ? Toast.show({
            type: 'success',
            text1: "Your card is not exist",
          })
        : ToastAndroid.show(
          "Your card is not exist",
            ToastAndroid.SHORT,
          );
      }
    } catch (error) {
      console.error("Error deleting card", error);
    }
  };
  

  const cardTypeImage = getCardType(getCard_Number);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      
  <ScrollView showsVerticalScrollIndicator={false}>

       <Header headerName="Payment Methods" editShow={false} />
       {Platform.OS=='android'? <HorizontalLine style={styles.line} />:<View
              style={{
             
             
              }}>
              <Image source={require('../../../assets/images/dotted.png')} style={{ width: mobileW * 0.97 ,top:Platform.OS=='ios'?-30:2}} />
            </View> }
        <View style={styles.mainDiv_container}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values,{resetForm}) =>{ handleAddCard(values,()=>resetForm({values:initialValues}))
              
              }}
              validationSchema={validationSchema}>
              {({
                values,
                handleChange,
                handleSubmit,
                handleBlur,
                errors,
                touched,
              }) => (
                <>
                {/* {savedCard ?
              <Carousel
              style={{
                width: "100%",
                height: 240,
                alignItems: "center",
                justifyContent: "center",
              }}
              loop
              width={"100%"}
              height={200}
              autoPlay={true}
              data={savedCard}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={(item,index)=>{
                return(
                  <View style={{}}>
                     <ImageBackground
                  source={cardTypeImage}
                  style={{
                    width: DIMENSIONS.SCREEN_WIDTH * 0.9,
                    resizeMode: 'contain',
                    height:mvs(190),
                    // height:200,
                    

                  }}
                >
                   <View style={styles.cardNumber_position}>
                  
                  <Text
                    style={{color: '#fff', fontWeight: '600', fontSize: ms(20) }}>
                    { String(item.item.card_number).replace(/^(\d{12})(\d{4})$/, 'xxxx xxxx xxxx $2') }
                  </Text>
                  <View style={styles.text_div}>
                  <View style={{gap:ms(5), width:ms(100)}}>
                    <Text style={{color: 'gray', fontWeight: '600', fontSize: 8}}>Card Holder</Text>
                  <Text
                    style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                    {String(item.item.cust_name )}
                  </Text>
                  </View>
                  <View style={{gap:ms(5)}}>
                  <Text style={{ fontWeight: '600', fontSize: 8,color:'gray'}}>Expires</Text>
                  <Text
                    style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                    {String(item.item.card_exp_month+'/'+item.item.card_exp_year)}
                  </Text>
                  </View>
                  <View style={{gap:5}}>
                  <Text style={{fontWeight: '600', fontSize: 8,color:'gray'}}>CVV</Text>
                  <Text
                    style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                    {String(item.item.card_cvc)}
                  </Text>
                  </View>
                   </View>
                </View>
                  </ImageBackground>
                  </View>
                )
              }}
            />:null  
              } */}
               {savedCard? <FlatList
               style={{height:mvs(200),flexGrow:0}}
               horizontal={true}
               snapToAlignment='center'
               pagingEnabled={true}
               showsHorizontalScrollIndicator={false}
                data ={savedCard}
                renderItem={(item,index)=>{
                  return(
                    <View style={{}}>
                       <ImageBackground
                    source={cardTypeImage}
                    style={{
                      width: DIMENSIONS.SCREEN_WIDTH * 0.9,
                      resizeMode: 'contain',
                      height:mvs(190),
                      // height:200,
                      

                    }}
                  >
                     <View style={styles.cardNumber_position}>
                    
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: ms(20) }}>
                      { String(item.item.card_number).replace(/^(\d{12})(\d{4})$/, 'xxxx xxxx xxxx $2') }
                    </Text>
                    <View style={styles.text_div}>
                    <View style={{gap:ms(5), width:ms(100)}}>
                      <Text style={{color: 'gray', fontWeight: '600', fontSize: 8}}>Card Holder</Text>
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {String(item.item.cust_name )}
                    </Text>
                    </View>
                    <View style={{gap:ms(5)}}>
                    <Text style={{ fontWeight: '600', fontSize: 8,color:'gray'}}>Expires</Text>
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {String(item.item.card_exp_month+'/'+item.item.card_exp_year)}
                    </Text>
                    </View>
                    <View style={{gap:5}}>
                    <Text style={{fontWeight: '600', fontSize: 8,color:'gray'}}>CVV</Text>
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {String(item.item.card_cvc)}
                      {/* {cardDetails ? '*'.repeat(String(cardDetails.card_cvc).length) : values.cvv} */}
                    </Text>
                    </View>
                     </View>
                  </View>
                    </ImageBackground>
                    </View>
                  )
                }}
                keyExtractor={item=>item.id}
                >
                 
                </FlatList>:null}
               {!savedCard ?
                <View> 
                 <Image
                    source={cardTypeImage}
                    style={{
                      width: DIMENSIONS.SCREEN_WIDTH * 0.9,
                      // resizeMode: 'contain',
                      height:mvs(185),

                    }}
                  />
                   <View style={styles.cardNumber_position}>
                    
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 20 }}>

                      { String(cardDetails.card_number).replace(/^(\d{12})(\d{4})$/, 'xxxx xxxx xxxx $2')}
                    </Text>
                    <View style={styles.text_div}>
                    <View style={{gap:5, width:100}}>
                      <Text style={{color: 'gray', fontWeight: '600', fontSize: 8}}>Card Holder</Text>
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {String(cardDetails.cardHolderName)}
                    </Text>
                    </View>
                    <View style={{gap:5}}>
                    <Text style={{ fontWeight: '600', fontSize: 8,color:'gray'}}>Expires</Text>
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {/* {cardDetails.card_exp_month?String(cardDetails.card_exp_month+'/'+cardDetails.card_exp_year):null} */}
                      {cardDetails.validTill}
                    </Text>
                    </View>
                    <View style={{gap:5}}>
                    <Text style={{fontWeight: '600', fontSize: 8,color:'gray'}}>CVV</Text>
                    <Text
                      style={{color: '#fff', fontWeight: '600', fontSize: 13}}>
                      {String(cardDetails.card_cvv)}
                      {/* {cardDetails ? '*'.repeat(String(cardDetails.card_cvc).length) : values.cvv} */}
                    </Text>
                    </View>
                     </View>
                  </View>
                  </View>:null
                   }

                  <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    // width: '100%',
                    marginHorizontal: 30,
                    marginTop:30,
                    marginBottom:35,
                  }}>
                  <TouchableOpacity
                  onPress={()=> handleGetCard()}
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
                      Make Default
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={()=> handleDeleteCard()}
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
                
                 
                  <HorizontalLine />
                  <Input
                    IconLeft={null}
                    errors={undefined}
                    touched={false}
                    value={values.cardHolderName}
                    onChangeText={(text) => {handleChange('cardHolderName')(text);
                    setSavedCard('')
                    setCardDetails({...cardDetails,['cardHolderName']:text})
                  }}
                    onBlur={handleBlur('cardHolderName')}
                    text="Card Holder Name"
                    IconRight={() => <Admin />}
                    mV={15}
                    placeholder="John Doe"
                    bW={1}
                    textWidth={ms(110)}
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


                      setSavedCard('')
                    setCardDetails({...cardDetails,['card_number']:text})
                      // setCardDetails('');
                      // Remove non-digit characters from the input
                      const cardNumber = text.replace(/\D/g, '');
                      // Insert a space after every fourth digit
                      let formattedCardNumber = '';
                      for (let i = 0; i < cardNumber.length; i += 4) {
                        formattedCardNumber += cardNumber.substr(i, 4) + ' ';
                      }

                      // Remove any trailing space
                      formattedCardNumber = formattedCardNumber.trim();
                      setCreditCard(text)
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
                    textWidth={ms(85)}
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
                          // setCardDetails('');
                          // Remove non-digit characters from the input
                          const validTill = text.replace(/\D/g, '');
                          
                      setSavedCard('')
                      // setCardDetails({...cardDetails,['card_number']:text})
                          // Insert a slash after the second character
                          let formattedValidTill = validTill;
                          if (validTill.length > 2) {
                            formattedValidTill =
                              validTill.slice(0, 2) + '/' + validTill.slice(2);
                              // setCardDetails({...cardDetails,['card_exp_year']:formattedValidTill})
                          } 
                          setCardDetails({...cardDetails,['validTill']:formattedValidTill})

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
                        value={ values.cvv}
                        onChangeText={(text)=>{handleChange('cvv')(text),
                        // setCardDetails('');
                        setSavedCard('')
                        setCardDetails({...cardDetails,['card_cvv']:text})
                      }}
                        onBlur={handleBlur('cvv')}
                        text="CVV"
                        IconRight={null}
                        mV={15}
                        placeholder="***"
                        bW={1}
                        textWidth={ms(38)}
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
                        // marginRight:20,
                      }}>
                      <TouchableOpacity onPress={handleSubmit}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            alignContent:'center',
                            justifyContent:'center',
                            color: COLORS.BLACK,
                          }}>
                          ADD CARD
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
              )}
            </Formik>
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
  width:mobileW,
  height:mobileH,
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
    top: mvs(90),
    left: ms(25),
  },
  text_div:{
    position: 'relative',
    top: 35,
    left: 10,
    flexDirection:'row',
    gap:25
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