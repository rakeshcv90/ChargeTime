/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-undef */
/* eslint-disable keyword-spacing */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  SafeAreaView,
  ToastAndroid,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header';
import HorizontalLine from '../../Components/HorizontalLine';
import Input from '../../Components/Input';
import {Location} from '../../../assets/svgs/Location';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../constants/COLORS';
// import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {DIMENSIONS, PLATFORM_IOS} from '../../constants/DIMENSIONS';
import {API} from '../../api/API';
import axios from 'axios';
import {navigationRef} from '../../../App';
import {ms} from 'react-native-size-matters';
import {
  getLocationID as updatedLocationId,
  setBasePackage,
  userProfileData as updatePersionalDetail,
  setPurchaseData,
  setPackageStatus,
  setPuchaseAllPlans,
} from '../../redux/action';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
// import {setBasePackage as setUpdateBasePackage} from '../../redux/action';
import ActivityLoader from '../../Components/ActivityLoader';
const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);

const Installation = () => {
  // const getCompleteData = useSelector((state)=> state.getCompleteData)
  const userProfileData = useSelector(state => state.userProfileData);
  const getBasePackage = useSelector(state => state.getBasePackage);
  const getPurchaseData = useSelector(state => state.getPurchaseData);
  const getUserID = useSelector(state => state.getUserID);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [locationMap, setLocationMap] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [newState, setState] = useState('');
  const [newZipcode, setZipCode] = useState('');
  const [addlineone, setAddLineOne] = useState();
  const [addlinetwo, setAddLineTwo] = useState();
  const [value, setValue] = useState(null);
  //  const [location, setLocation] = useState();
  const [locationId, setLocationId] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [forLoading, setForLoading] = useState(false);
  const [apiData, setApiData] = useState(getBasePackage || []);
  const [loader, setLoader] = useState(false);

  const [showButton, setShowButton] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setAddLineTwo(userProfileData[0]?.pwa_add2);
    setAddLineOne(userProfileData[0]?.pwa_add1);
    getPlanCurrent;

    fetchOptions();
  }, [userProfileData]);

  useEffect(() => {
    getPlanCurrent();
    getAllPurchasePlan();
  }, []);
  const user_id = getUserID;

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

  const fetchData = async () => {
    //  loginData = await AsyncStorage.getItem('loginDataOne');

    try {
      const response = await axios.get(`${API}/packagePlan/${ locationId == undefined
                  ? userProfileData[0]?.pwa_choice
                  : locationId}`);

      if (response?.data?.locations.length == 0) {
        dispatch(setBasePackage([]));
        // setIsLoading(true);
        // setShowPackage(true);
      } else {
        setApiData(response?.data?.locations);
        dispatch(setBasePackage(response.data.locations));
        // setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // setIsLoading(false);
    }
  };
  const getPlanCurrent = () => {
    // setForLoading(true);
    axios
      .get(`${API}/currentplan/${getUserID}`)
      .then(res => {
        setForLoading(false);
        setModalVisible(false);

        if (res.data.data == 'Package not found') {
          dispatch(setPurchaseData(res.data));

          dispatch(setPackageStatus(false));
        } else {
          dispatch(setPurchaseData(res?.data));
          // setGetData(res.data);
        }
      })
      .catch(err => {
        setForLoading(false);
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
  const PlanCancel = async () => {
    // InstalltionUpdate();

    setIsFocus(true);
    setLoader(true);
    try {
      const response = await fetch(`${API}/plancancel/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (result.message == 'Plan Cancelled Successfully') {
        setIsFocus(false);
        getPlanCurrent();
        InstalltionUpdate();
        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: ' Your current plan has been canceled.',
            })
          : ToastAndroid.show(
              'Your current plan has been canceled.',
              ToastAndroid.SHORT,
            );
        setLoader(false);
        setShowButton(false);
      } else {
        InstalltionUpdate();
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
      setShowButton(false);
    }
  };
  const InstalltionUpdate = async () => {
    if (addlineone.trim().length <= 0) {
      PLATFORM_IOS
        ? Toast.show({
            type: 'error',
            text1: 'Please Enter Address Line 1',
          })
        : ToastAndroid.show('Please Enter Address Line 1', ToastAndroid.SHORT);
    }
    // else if(addlinetwo.trim().length<=0){
    //   PLATFORM_IOS
    //   ? Toast.show({
    //       type: 'error',
    //       text1: 'Please Enter Address Line 2',
    //     })
    //   : ToastAndroid.show('Please Enter Address Line 2', ToastAndroid.SHORT);

    // }
    else {
      if (
        (locationId == undefined &&
          addlineone &&
          newZipcode == '' &&
          newState == '') ||
        (locationId && addlineone && newZipcode && newState)
      ) {
        setForLoading(true);
        setLoader(true);
        try {
          const res = await fetch(`${API}/installation/${user_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pwa_add1: addlineone,
              pwa_add2: addlinetwo,
              pwa_state:
                newState.length == 0 ? userProfileData[0]?.pwa_state : newState,
              pwa_zip:
                newZipcode.length == 0
                  ? userProfileData[0]?.pwa_zip
                  : newZipcode,
              location:
                selectedValue.length == 0
                  ? userProfileData[0]?.location
                  : selectedValue,
              pwa_choice:
                locationId == undefined
                  ? userProfileData[0]?.pwa_choice
                  : locationId,
            }),
          });
          const response = await res.json();
          console.log('zxccxdc111', response);
          setLoader(false);
          if (response.msg == 'Your Profile Update') {
            setModalVisible(false);
            setIsEditable(false);
            dispatch(
              updatedLocationId(
                locationId == undefined
                  ? userProfileData[0]?.pwa_choice
                  : locationId,
              ),
            );

            if (response) {
              const updatedData = [
                {
                  ...userProfileData[0],
                  pwa_add1: addlineone,
                  pwa_add2: addlinetwo,
                  pwa_state:
                    newState.length == 0
                      ? userProfileData[0]?.pwa_state
                      : newState,
                  pwa_zip:
                    newZipcode.length == 0
                      ? userProfileData[0]?.pwa_zip
                      : newZipcode,
                  location:
                    selectedValue.length == 0
                      ? userProfileData[0]?.location
                      : selectedValue,
                  pwa_choice:
                    locationId == undefined
                      ? userProfileData[0]?.pwa_choice
                      : locationId,
                },
              ];

              dispatch(updatePersionalDetail(updatedData));

              dispatch(updatedLocationId( locationId == undefined
                ? userProfileData[0]?.pwa_choice
                : locationId,));

              fetchData();
              setForLoading(false);
              setLoader(false);
              PLATFORM_IOS
                ? Toast.show({
                    type: 'success',
                    text1: 'Profile has been updated successfully.',
                  })
                : ToastAndroid.show(
                    'Profile has been updated successfully.',
                    ToastAndroid.SHORT,
                  );

              setForLoading(false);
              setLoader(false);
              setShowButton(false);
            } else {
              PLATFORM_IOS
                ? Toast.show({
                    type: 'error',
                    text1: 'Profile Not Updated',
                    // position: 'bottom',
                  })
                : ToastAndroid.show('Profile Not Updated', ToastAndroid.SHORT);
              setForLoading(false);
              setLoader(false);
              setShowButton(false);
            }
          }
        } catch (err) {
          console.log(err);
          setForLoading(false);
          setLoader(false);
          setShowButton(false);
        }
      } else {
        console.log('Test1', locationId);
        console.log('Test2', addlineone);
        console.log('Test3', newZipcode);
        console.log('Test4', newState);
      }
    }
  };

  const handleOk = () => {
    console.log('testbw');
    PlanCancel();

    setIsEditable(false);
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Perform cancel logic here

    setIsEditable(false);
    setModalVisible(false);
  };

  const onPress = () => {
    console.log('Xzc', selectedValue, userProfileData[0]?.location);
    if (getPurchaseData.data == 'Package not found') {
      InstalltionUpdate();
      console.log('Test12');
    } else if (selectedValue.length == 0) {
      InstalltionUpdate();
      console.log('Test13');
    } else if (selectedValue == userProfileData[0]?.location) {
      InstalltionUpdate();
      console.log('Test14');
    } else if (selectedValue != userProfileData[0]?.location) {
      setModalVisible(true);
      console.log('Test15');
    } else {
      setModalVisible(true);
      console.log('Test16');
    }

    if (getPurchaseData.data !== 'Package not found') {
      //setModalVisible(true);
    } else if (selectedValue != ' ' && addlineone != ' ' && addlinetwo != ' ') {
      setModalVisible(false);
      setIsEditable(false);
      InstalltionUpdate();
    } else {
      setModalVisible(false);
      setIsEditable(false);
    }
  };
  const enableEdit = () => {
    setIsEditable(true);
  };
  const ConfirmModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Change Location Base?</Text>
            <Text style={styles.selectedEmail}>
              Changing your Installation will cancel your current subscription.
              Contact your service representative for more information {'\n'}Are
              you sure?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel()}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => {
                  handleOk();
                }}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <Header
        headerName="Installation"
        editShow={true}
        onPress={onPress}
        // enableEdit={enableEdit}
        // editButton={isEditable}
      />
      {Platform.OS === 'android' ? (
        <HorizontalLine style={styles.line} />
      ) : (
        <View>
          <Image
            source={require('../../../assets/images/dotted.png')}
            style={{width: mobileW * 0.99}}
            resizeMode="stretch"
          />
        </View>
      )}
      <ActivityLoader visible={loader} />
      <View style={styles.mainDiv_container}>
        <View style={styles.postCodeContainer}>
          {renderLabel()}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={locationMap}
            search
            maxHeight={ms(500)}
            disable={!isEditable}
            labelField="location"
            valueField="location"
            // placeholder={!isFocus ? userRegisterData[0]?.location : selectedValue}
            // placeholder={isFocus ? userRegisterData[0]?.location : selectedValue}
            keyboardAvoiding
            searchPlaceholder="Search..."
            value={selectedValue ? selectedValue : userProfileData[0]?.location}
            // onFocus={() => setIsFocus(false)}
            // onBlur={() => setIsFocus(false)}
            onChange={item => handleSelect(item.id, item)}
            itemTextStyle={{color: 'black'}}
          />
        </View>
        <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          editable={isEditable}
          IconRight={() => <Location />}
          bR={3}
          bW={0.3}
          bColor={COLORS.BLACK}
          text="Address Line"
          mV={15}
          textWidth={ms(85)}
          value={isEditable ? addlineone : userProfileData[0]?.pwa_add1}
          onChangeText={values => setAddLineOne(values)}
          // placeholder={userRegisterData[0]?.pwa_add1}
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            // fontFamily: FONTS.ROBOTO_REGULAR,
            fontWeight: '100',
            fontSize: 12,
          }}
        />
        <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          editable={isEditable}
          IconRight={() => <Location />}
          bR={3}
          bW={0.4}
          bColor={COLORS.BLACK}
          text="Address Line 2"
          mV={10}
          textWidth={ms(95)}
          value={isEditable ? addlinetwo : userProfileData[0]?.pwa_add2}
          onChangeText={values => setAddLineTwo(values)}
          // placeholder={userRegisterData[0]?.pwa_add2}
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            // fontFamily: 'Roboto',
            fontWeight: '200',
            fontSize: 12,
          }}
        />
        <View style={styles.mainDiv_state_ZIP}>
          <View style={styles.zip_state_view}>
            <Input
              IconLeft={null}
              errors={undefined}
              touched={false}
              editable={false}
              //     value={values.name}
              //     onChangeText={handleChange('name')}
              // onBlur={handleBlur('name')}
              value={newZipcode}
              text="ZIP Code"
              IconRight={null}
              mV={15}
              placeholder={userProfileData[0]?.pwa_zip}
              bW={0.3}
              textWidth={ms(68)}
              // value={newZipcode}
              placeholderTextColor={COLORS.BLACK}
              w="half"
              bgColor={COLORS.LIGHTGRAY}
            />
          </View>
          <View style={styles.zip_state_view}>
            <Input
              IconLeft={null}
              errors={undefined}
              touched={false}
              editable={false}
              value={newState}
              // editable={isEditable}
              //     value={values.name}
              //     onChangeText={handleChange('name')}
              // onBlur={handleBlur('name')}

              text="State"
              IconRight={null}
              mV={15}
              placeholder={userProfileData[0]?.pwa_state}
              bW={0.3}
              textWidth={ms(45)}
              placeholderTextColor={COLORS.BLACK}
              w="half"
              bgColor={COLORS.LIGHTGRAY}
            />
          </View>
        </View>
      </View>
      {showButton && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginVertical: (DIMENSIONS.SCREEN_HEIGHT * 1) / 100,
            marginRight: (DIMENSIONS.SCREEN_HEIGHT * 1) / 100,
          }}>
          <TouchableOpacity
            onPress={() => {
              setAddLineTwo(userProfileData[0]?.pwa_add2);
              setAddLineOne(userProfileData[0]?.pwa_add1);
              setSelectedValue(userProfileData[0]?.location);

              setShowButton(false);

              setTimeout(() => {
                setIsEditable(false);
              }, 100);
            }}
            style={{
              width: DIMENSIONS.SCREEN_WIDTH * 0.3,
              height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,

              alignSelf: 'flex-end',
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
            <Text
              style={{
                color: COLORS.BLACK,
                fontSize: 17,
                fontWeight: '700',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress()}
            style={{
              width: DIMENSIONS.SCREEN_WIDTH * 0.3,
              height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
              backgroundColor: '#B1D34F',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
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
            <Text
              style={{
                color: COLORS.BLACK,
                fontSize: 17,
                fontWeight: '700',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!showButton && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginVertical: (DIMENSIONS.SCREEN_HEIGHT * 1) / 100,
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsEditable(true);
              setShowButton(true);
            }}
            style={{
              width: DIMENSIONS.SCREEN_WIDTH * 0.3,
              height: (DIMENSIONS.SCREEN_HEIGHT * 5) / 100,
              backgroundColor: '#B1D34F',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: (DIMENSIONS.SCREEN_HEIGHT * 2) / 100,
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
            <Text
              style={{
                color: COLORS.BLACK,
                fontSize: 17,
                fontWeight: '700',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isModalVisible ? <ConfirmModal /> : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainDiv_signup: {
    paddingTop: 20,
  },
  dropdown: {
    height: 50,
    // borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.GREEN,
    // backgroundColor:'black',
    paddingHorizontal: 8,
    // color:"#fff"
  },
  postCodeContainer: {
    backgroundColor: COLORS.CREAM,
    paddingVertical: 10,
    width: DIMENSIONS.SCREEN_WIDTH * 0.92,
    alignSelf: 'center',
    // marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 28,
  },
  modalContent: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.CREAM,
    left: 11,
    zIndex: 999,
    paddingHorizontal: 6,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.GRAY,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedEmail: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '30%',
  },
  okButton: {
    backgroundColor: '#B1D34F',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: '400',
  },

  // signup_img: {
  //   width: mobileW,
  //   // height: mobileH * 0.45,
  // },
  mainDiv_container: {
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    marginTop: 10,
    paddingBottom: 100,
    borderRadius: 4,
    border: 14,
  },
  line: {
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 5,
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
    shadowColor: Platform.OS === 'android' ? 'black' : 'rgba(0,0,0,.555)', // Shadow color
    shadowOffset: {
      width: 6, // Horizontal offset
      height: 4, // Vertical offset
    },
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 4, // Shadow radius
    elevation: Platform.OS === 'android' ? 8 : 0,
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
    paddingVertical: 10,
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
export default Installation;
