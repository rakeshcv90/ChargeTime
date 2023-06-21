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
import { useDispatch } from 'react-redux';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import { getCompleteData } from '../../redux/action';

import ActivityLoader from '../../Components/ActivityLoader';


const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('window').height);

export default function CompleteProfile(props) {
  const dispatch =useDispatch();
  const {navigation, route} = props;
  const {email, user_id} = route?.params;

  const [locationMap, setLocationMap] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [newState, setState] = useState('');
  const [newZipcode, setZipCode] = useState('');
  const [addlineone, setAddLineOne] = useState('');
  const [addlinetwo, setAddLineTwo] = useState('');
  const [value, setValue] = useState(null);
  const [locationId, setLocationId] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [forLoading,setForLoading] = useState(false)
  useEffect(() => {
    fetchOptions();
  }, []);
  const fetchOptions = async () => {
    try {
      const response = await fetch(`${API}/locations`);
      const result = await response.json();

      setLocationMap(result);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLabel = () => {
    
    return <Text style={styles.label}>Installation</Text>;
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
  const CompleteProfileFunction = async () => {
    
    setForLoading(true)
    if(locationId&& 
      addlineone&&
      addlinetwo&&
      newZipcode&&
      newState){
    try {
      await fetch(`${API}/completeProfile/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId: locationId,
          addlineone: addlineone,
          addlinetwo: addlinetwo,
          newZipcode: newZipcode,
          newState: newState,
        }),
      })
        .then(res => res.json())
        .then(data => {

          
          dispatch(getCompleteData(data));

          

          if (data.success !== false) {
            
            PLATFORM_IOS
              ? Toast.show({
                  type: 'success',
                  text1: 'Profile added successfully.',
                })
              : ToastAndroid.show(
                  'Profile added successfully.',
                  ToastAndroid.SHORT,
                );
            navigation.navigate('Login');
            setForLoading(false)
          } else {
            PLATFORM_IOS
              ? Toast.show({
                  type: 'error',
                  text1: 'Profile already in use',
                  // position: 'bottom',
                })
              : ToastAndroid.show('Profile already in use', ToastAndroid.SHORT);
              setForLoading(false)
          }
        });
    } catch (err) {
      console.log(err);
      setForLoading(false)
    }}else{
      PLATFORM_IOS
      ? Toast.show({
          type: 'success',
          text1: 'Please fill required fields..',
        })
      : ToastAndroid.show(
          'Please fill required fields..',
          ToastAndroid.SHORT,
        );
        setForLoading(false)
    }
  };

  // console.log(locationMap,"locationMap")
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
      {forLoading?<ActivityLoader /> :""}
        <View style={styles.mainDiv_signup}>
          <Image
            source={require('../../../assets/images/res.png')}
            resizeMode="contain"
            style={{width: mobileW, height: mobileH / 5}}
          />
        </View>
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
                placeholder={!isFocus ? 'Installation' : selectedValue}
                keyboardAvoiding
                searchPlaceholder="Search..."
                value={selectedValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => handleSelect(item.id, item)}
              />
            </View>
            

            <Input
              IconLeft={null}
              errors={undefined}
              touched={false}
              value={addlineone}
              onChangeText={values => setAddLineOne(values)}
              //onBlur={handleBlur('name')}

              text="Address Line 1"
              IconRight={() => <Address />}
              mV={15}
              placeholder="Eg. Connauticut House"
              bW={1}
              textWidth={'45%'}
              placeholderTextColor={COLORS.BLACK}
            />

            <Input
              IconLeft={null}
              errors={undefined}
              touched={false}
              value={addlinetwo}
              onChangeText={values => setAddLineTwo(values)}
              text="Address Line 2"
              IconRight={() => <Address />}
              mV={15}
              placeholder="Appart Street Number-3,Block"
              bW={1}
              textWidth={'45%'}
              placeholderTextColor={COLORS.BLACK}
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
                  placeholderTextColor={COLORS.BLACK}
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
                  placeholderTextColor={COLORS.BLACK}
                  w="half"
                  editable={false}
                />
              </View>
            </View>
          </View>
          <View>
            {/* <DropDownPicker
      //  items={locationMap?.map((option) => {
      //   return console.log({label:option.location},'op')
      // })}
        defaultValue={selectedValue}
        placeholder="Select an option"
        containerStyle={{ height: 40, width: 200 }}
        style={{ backgroundColor: "red" }}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: 'red' }}
        onChangeItem={(item) => setSelectedValue(item.value)}
        keyExtractor={(item) => item.value.toString()}
      /> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',

              // paddingVertical: 20,
            }}>
            <TouchableOpacity
              onPress={CompleteProfileFunction}
              style={styles.create_profile_Touchable}>
              <Text
                style={{color: COLORS.BLACK, fontSize: 14, fontWeight: '700'}}>
                CREATE PROFILE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  },

  mainDiv_complete_profile: {
    // paddingHorizontal: 20,
    backgroundColor: COLORS.CREAM,
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
  complete_profile: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.BLACK,
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
    gap: 5,
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
    borderRadius: 30,
    width: '100%',
  },
  postCodeContainer: {
    backgroundColor: COLORS.CREAM,
    paddingVertical: 10,
    width: DIMENSIONS.SCREEN_WIDTH * 0.92,
    alignSelf: 'center',
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    // backgroundColor:'black',
    paddingHorizontal: 8,
    // color:"#fff"
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.CREAM,
    left: 11,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: COLORS.CREAM
  },
  dropdownContainer: {
    backgroundColor: COLORS.CREAM, // Set your desired background color here
  },
});
