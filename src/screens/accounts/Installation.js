import { View, Text,SafeAreaView, ToastAndroid,Button, TextInput,StyleSheet, Modal,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header'
import HorizontalLine from '../../Components/HorizontalLine'
import Input from '../../Components/Input'
import { Install } from '../../../assets/svgs/Install'
import { Location } from '../../../assets/svgs/Location'
import { useSelector } from 'react-redux';
import COLORS from '../../constants/COLORS';
// import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {DIMENSIONS, PLATFORM_IOS} from '../../constants/DIMENSIONS';
import { API } from '../../api/API'
import axios from 'axios';
import { FONTS } from '../../constants/FONTS'
import { navigationRef } from '../../../App'
import { ms } from 'react-native-size-matters';
import { userProfileData as updatePersionalDetail } from '../../redux/action';




const Installation = () => {
  // const getCompleteData = useSelector((state)=> state.getCompleteData)
    const userProfileData = useSelector((state)=> state.userProfileData)

  const getUserID = useSelector((state)=> state.getUserID)
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
  const [locationId, setLocationId] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [forLoading,setForLoading] = useState(false)
  
  useEffect(() => {
    console.log('data for this User:---------', userProfileData); 
    setAddLineTwo(userProfileData[0]?.pwa_add2);
    setAddLineOne(userProfileData[0]?.pwa_add1);
    // console.log('userrrrrrrrr',location)
    fetchOptions();
 }, [userProfileData]);
const user_id= getUserID;
//  const {navigation, route} = props;
//  const { user_id} = route?.params;



 
 const fetchOptions = async () => {
   try {
     const response = await fetch(`${API}/locations`);
     const result = await response.json();
// console.log(result,'ttt');
     setLocationMap(result);
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
const PlanCancel = async () => {
  try {
    const response = await fetch(`${API}/plancancel/${user_id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
    })
    const result = await response.json();
console.log(result,'ttt');
    if(result.message == 'Plan Cancelled Successfully'){
      InstalltionUpdate();
      PLATFORM_IOS
      ? Toast.show({
          type: 'success',
          text1: ' Your current plan has been cancelled.',
        })
      : ToastAndroid.show(
          'Your current plan has been cancelled.',
          ToastAndroid.SHORT,
        );

        // InstalltionUpdate();
    }
  } catch (error) {
    console.error(error);
  }
};
const InstalltionUpdate = async () => {
    
  setForLoading(true)
  if(locationId&& 
    addlineone&&
    addlinetwo&&
    newZipcode&&
    newState){
  try {
    await fetch(`${API}/installation/${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body:JSON.stringify({
      pwa_add1:addlineone,
      pwa_add2:addlinetwo,
      pwa_choice:locationId,
      }),
    })
      .then(res => res.json())
      .then(data => {

        console.log(data, 'fff');

        if (data) {
          const updatedData = [{
            ...userProfileData[0],
          name: name,
            mobile: number,
            location : locationId,
          }];
          console.log(updatedData,"------")
          dispatch(updatePersionalDetail(updatedData));
          PLATFORM_IOS
            ? Toast.show({
                type: 'success',
                text1: 'Profile has benn updated successfully.',
              })
            : ToastAndroid.show(
                'Profile has benn updated successfully.',
                ToastAndroid.SHORT,
              );
          navigationRef.navigate('Account');
          setForLoading(false)
        } else {
          PLATFORM_IOS
            ? Toast.show({
                type: 'error',
                text1: 'Profile Not Updated',
                // position: 'bottom',
              })
            : ToastAndroid.show('Profile Not Updated', ToastAndroid.SHORT);
            setForLoading(false)
        }
      });
  } catch (err) {
    console.log(err);
    setForLoading(false)
  }}
};

  const handleOk = () => {
  
    PlanCancel();
    console.log('Confirmed');
    setIsEditable(false)
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Perform cancel logic here
    console.log('Cancelled');
    setIsEditable(false)
    setModalVisible(false);
  };

  const onPress = ()=>{
    console.log("onpress..",isModalVisible)
    setModalVisible(true);
  }
  const enableEdit =()=>{
    console.log("enable edit",isEditable)
    setIsEditable(true)
  }
  const ConfirmModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
            Change Location Base?
            </Text>
            <Text style={styles.selectedEmail}>Doing so will cancel your current plan. {'\n'}Are you sure?</Text>
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
     <Header headerName="Installation" editShow={true} onPress={onPress} enableEdit ={enableEdit} editButton={isEditable} />
    <HorizontalLine style={styles.line}/>
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
                labelField="location"
                valueField="location"
                editable={isEditable}
                // placeholder={!isFocus ? userRegisterData[0]?.location : selectedValue}
                // placeholder={isFocus ? userRegisterData[0]?.location : selectedValue}
                keyboardAvoiding
                searchPlaceholder="Search..."
                value={selectedValue ? selectedValue: userProfileData[0]?.location}
                // onFocus={() => setIsFocus(false)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => handleSelect(item.id, item)}
              />
            </View>
            <Input
          IconLeft={null}

          bgColor={COLORS.CREAM}
          editable={isEditable}
          IconRight={() => (
           <Location/>
          )}
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
            fontSize:12,
          }}
        />
         <Input
          IconLeft={null}
        
          bgColor={COLORS.CREAM}
          editable={isEditable}
          IconRight={() => (
           <Location/>
          )}
          bR={3}
          bW={0.4}
          bColor={COLORS.LIGHT_GREY}
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
            fontSize:12,
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
                />
              </View>
            </View>            
          </View>

          {isModalVisible ?  <ConfirmModal /> :null}

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainDiv_signup: {
    paddingTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    borderColor:COLORS.GREEN,
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
    marginRight:20,
    marginLeft:20,
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.CREAM,
    left: 11,
    zIndex: 999,
    paddingHorizontal: 6,
    fontSize: 14,
    fontWeight:'500',
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
  marginLeft:10,
  marginRight:10,
  paddingTop: 10,
  marginTop:10,
  paddingBottom:100 ,
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