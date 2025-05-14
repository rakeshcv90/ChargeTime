/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import COLORS from '../../constants/COLORS';
import {SignUp} from '../../../assets/images/SignUp';
import Input from '../../Components/Input';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API} from '../../api/API';
import {Installation} from '../../../assets/images/Installation';
import {Address} from '../../../assets/images/Address';
import {Dropdown} from 'react-native-element-dropdown';
import {DIMENSIONS, PLATFORM_IOS} from '../../constants/DIMENSIONS';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {getCompleteData, setUserRegisterData} from '../../redux/action';

import ActivityLoader from '../../Components/ActivityLoader';
import AnimatedLottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import * as Yup from 'yup';

const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);

const validationSchema = Yup.object().shape({
  addressone: Yup.string()
    .required('Please fill the required fields.')
    .trim('Addres Line 1 cannot include leading and trailing spaces')
    .strict(true)
    .min(3, 'Please Enter Full Address,'),
});

export default function CompleteProfile(props) {
  const dispatch = useDispatch();
  const {navigation, route} = props;
  const {email, user_id} = route?.params;
  const [locationMap, setLocationMap] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [newState, setState] = useState('');
  const [newZipcode, setZipCode] = useState('');
  // const [addlineone, setAddLineOne] = useState('');
  // const [addlinetwo, setAddLineTwo] = useState('');
  const [value, setValue] = useState(null);
  const [locationId, setLocationId] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [forLoading, setForLoading] = useState(false);
  const {userRegisterData} = useSelector(state => state);
  const [modalVisible, setModalVisible] = useState(false);
  // const [nameError, setNameError] = useState(false);

  useEffect(() => {
    fetchOptions();
  }, []);
  const fetchOptions = async () => {
    try {
      const response = await fetch(`${API}/locations`);
      const result = await response.json();
      const sortData = result.sort(function (a, b) {
        if (a.location < b.location) {
          return -1;
        }
        if (a.location > b.location) {
          return 1;
        }
        return 0;
      });
      setLocationMap(sortData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLabel = () => {
    return <Text style={styles.label}>Installation Location</Text>;
  };

  const handleSelect = (id, item) => {
    console.log();
    setIsFocus(false);
    setSelectedValue(item.location);
    setLocationId(id);
    axios
      .get(`${API}/completePro/${id}`)
      .then(res => {
        setState(res.data.locations.state);
        setZipCode(res.data.locations.ZIP_code);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const CompleteProfileFunction = async value => {
    setForLoading(true);
    try {
      const payload = new FormData();
      payload.append('locationId', locationId);
      payload.append('addlineone', value.addressone);
      payload.append('addlinetwo', value.addresstwo);
      payload.append('newZipcode', newZipcode);
      payload.append('newState', newState);
      payload.append('pwa_email', userRegisterData.email);
      payload.append('pwa_mobile', userRegisterData.mobile);
      payload.append('pwa_password', userRegisterData.password);
      payload.append('pwa_name', userRegisterData.name);
      payload.append('lname', userRegisterData.lname);

      const res = await axios({
        url: `${API}/completeProfile`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: payload,
        // data: JSON.stringify({
        //   locationId: locationId,
        //   addlineone: addlineone,
        //   addlinetwo: addlinetwo,
        //   newZipcode: newZipcode,
        //   newState: newState,
        //   pwa_email: userRegisterData.email,
        //   pwa_mobile: userRegisterData.mobile,
        //   pwa_password: userRegisterData.password,
        //   pwa_name: userRegisterData.name,
        // }),
      });

      // .then(res => res.json())
      if (res.data) {
        dispatch(getCompleteData(res.data));
        dispatch(setUserRegisterData([]));

        if (res.data.success !== false) {
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Profile added successfully.',
              })
            : ToastAndroid.show(
                'Profile added successfully.',
                ToastAndroid.SHORT,
              );
          AsyncStorage.setItem('LoginMessage', 'null1');

          // setModalVisible(true)
          setTimeout(async () => {
            // setModalVisible(false)
            navigation.navigate('Login');
          }, 3000);

          setForLoading(false);
        } else {
         
          setForLoading(false);
        }
      }
    } catch (err) {
      setForLoading(false);
    }

  };

  const OverusageModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // dispatch(setOverModelView(false));
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AnimatedLottieView
              source={require('../../Components/Welcome.json')} // Replace with your animation file
              autoPlay
              loop
              style={{
                marginBottom: 10,

                zIndex: -1,
                width: `100%`,
                // height: `80.4%`,
              }}
            />
            {/* <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: COLORS.BLACK,
              }}>
              You have utilized your package, please purchase a new package.
            </Text> */}
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        // scrollEnabled={false}
        keyboardShouldPersistTaps="handled">
        {/* <KeyboardAvoidingView behavior="position"> */}
        {forLoading ? <ActivityLoader /> : ''}
        <Image
          source={require('../../../assets/images/res.png')}
          resizeMode="contain"
          style={{width: mobileW, height: mobileH / 5}}
        />
        <View style={styles.mainDiv_container}>
          <View style={styles.mainDiv_complete_profile}>
            <Text style={styles.complete_profile}>Complete your profile</Text>

            <View style={styles.postCodeContainer}>
              {renderLabel()}
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={locationMap}
                search
                maxHeight={300}
                labelField="location"
                valueField="location"
                placeholder="Installation"
                keyboardAvoiding
                searchPlaceholder="Search..."
                value={selectedValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => handleSelect(item.id, item)}
                itemTextStyle={{color: 'black'}}
              />
              {!selectedValue && (
                <Text style={{color: 'red', alignSelf: 'center', fontSize: 12}}>
                  Installation Location cannot be blank.
                </Text>
              )}
              <Formik
                initialValues={{
                  addressone: '',
                  addresstwo: '',
                }}
                enableReinitialize={true}
                onSubmit={(values, action) => CompleteProfileFunction(values)}
                validationSchema={validationSchema}>
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  errors,
                  touched,
                  setFieldValue,
                  setFieldTouched,
                  setFieldError,
                  resetForm,
                }) => (
                  <>
                    <Input
                      IconLeft={null}
                      errors={errors.addressone}
                      touched={touched.addressone}
                      value={values.addressone}
                      // onChangeText={values => {
                      //   setAddLineOne(values);
                      // }}
                      onChangeText={handleChange('addressone')}
                      text="Address Line 1 *"
                      IconRight={() => <Address />}
                      mV={20}
                      placeholder="Eg. Connecticut House"
                      bW={1}
                      textWidth={'45%'}
                      placeholderTextColor={COLORS.HALFBLACK}
                    />

                    <Input
                      IconLeft={null}
                      errors={errors.addresstwo}
                      touched={touched.addresstwo}
                      value={values.addresstwo}
                      // onChangeText={values => setAddLineTwo(values)}
                      onChangeText={handleChange('addresstwo')}
                      text="Address Line 2"
                      IconRight={() => <Address />}
                      mV={0}
                      placeholder="Apart Street Number-3,Block"
                      bW={1}
                      textWidth={'45%'}
                      placeholderTextColor={COLORS.HALFBLACK}
                    />
                    <View style={styles.mainDiv_state_ZIP}>
                      <View style={styles.zip_state_view}>
                        <Input
                          IconLeft={null}
                          errors={undefined}
                          touched={false}
                          value={newZipcode}
                          //     onChangeText={handleChange('name')}
                          // onBlur={handleBlur('name')}

                          text="ZIP Code"
                          IconRight={null}
                          mV={15}
                          placeholder="1100000"
                          bW={1}
                          textWidth={'70%'}
                          placeholderTextColor={COLORS.HALFBLACK}
                          w="half"
                          editable={false}
                        />
                      </View>
                      <View style={styles.zip_state_view}>
                        <Input
                          IconLeft={null}
                          errors={undefined}
                          touched={false}
                          value={newState}
                          //     onChangeText={handleChange('name')}
                          // onBlur={handleBlur('name')}

                          text="State"
                          IconRight={null}
                          mV={15}
                          placeholder="CA"
                          bW={1}
                          textWidth={'50%'}
                          placeholderTextColor={COLORS.HALFBLACK}
                          w="half"
                          editable={false}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={selectedValue == '' ? true : false}
                        style={styles.create_profile_Touchable}>
                        <Text
                          style={{
                            color: COLORS.BLACK,
                            fontSize: 14,
                            fontWeight: '700',
                          }}>
                          Create Profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
          <View></View>
 
        </View>
      
      </ScrollView>
      <OverusageModal />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainDiv_signup: {
    paddingTop: 20,
  },
  signup_img: {
    width: mobileW,
    // height: mobileH * 0.45,
  },
  mainDiv_container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 30,
  },

  mainDiv_complete_profile: {
    // paddingHorizontal: 20,
    backgroundColor: COLORS.CREAM,
    // paddingTop: 20,
    paddingBottom: 25,
    borderRadius: 15,
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: Platform.OS === 'android' ? 'black' : 'rgba(0,0,0,.555)', // Shadow color
    shadowOffset: {
      width: 6, // Horizontal offset
      height: 4, // Vertical offset
    },
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 4, // Shadow radius
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  complete_profile: {
    // textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.BLACK,
  },
  complete_placeholder: {
    backgroundColor: 'rgba(86, 84, 84, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  mainDiv_state_ZIP: {
    // display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    marginLeft:4,
    marginRight:4
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
    paddingVertical: 10,
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.BLACK,
  },
  create_profile_Touchable: {
    marginTop: 10,

    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    padding: 13,
    borderRadius: 10,

    width: '100%',
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
  postCodeContainer: {
    backgroundColor: COLORS.CREAM,
    paddingVertical: 10,
    width: DIMENSIONS.SCREEN_WIDTH * 0.92,
    alignSelf: 'center',
    marginTop: 20,
  },
  dropdown: {
    height: 55,
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 5,
    // backgroundColor:'black',
    paddingHorizontal: 8,
    // color:"#fff"
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.CREAM,
    // left: 11,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    color: COLORS.BLACK,
    marginLeft: 15,
    lineHeight: 16,
    fontWeight: '500',
    // letterSpacing: 0.4
  },
  selectedTextStyle: {
    fontSize: 15,
    marginTop: -10,
    color: COLORS.BLACK,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    // height: 40,
    fontSize: 14,
    backgroundColor: COLORS.CREAM,
    borderColor: 'COLORS.GREEN',
  },
  dropdownContainer: {
    backgroundColor: COLORS.CREAM, // Set your desired background color here
    borderColor: COLORS.GREEN,

    // Set your desired background color here
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.HALFBLACK,
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: DIMENSIONS.SCREEN_WIDTH * 0.8,
  },
});
