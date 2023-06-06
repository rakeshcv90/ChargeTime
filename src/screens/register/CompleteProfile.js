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
} from 'react-native';
import COLORS from '../../constants/COLORS';
import {SignUp} from '../../../assets/images/SignUp';
import Input from '../../Components/Input';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API} from '../../api/API';
import DropDownPicker from 'react-native-dropdown-picker'
import { Installation } from '../../../assets/images/Installation';
import { Address } from '../../../assets/images/Address';

const mobileW = Math.round(Dimensions.get('screen').width);

export default function CompleteProfile(props) {
  // useEffect(() => {
  //   console.log(email, 'hhh');
  // }, [email]);
  // const {navigation, route} = props;
  // const {email} = route?.params;
  const [locationMap, setLocationMap] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch(`${API}/locations`);
      
      console.log(response.data.customers,'data')
      setLocationMap(data);
    } catch (error) {
      console.error(error);
    }
  };

  
  console.log(locationMap,"locationMap")
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView>
        <View style={styles.mainDiv_signup}>
          <Image
            source={require('../../../assets/images/signupp.png')}
            resizeMode="stretch"
            style={{alignSelf: 'center', width: mobileW}}
          />
        </View>
        <View style={styles.mainDiv_container}>
          <View style={styles.mainDiv_complete_profile}>
            <Text style={styles.complete_profile}>Complete your profile</Text>
            
            <Input
              IconLeft={null}
              errors={undefined}
              touched={false}
              //     value={values.name}
              //     onChangeText={handleChange('name')}
              // onBlur={handleBlur('name')}

              text="Installation"
              IconRight={() => (
                <Installation />
              )}
              mV={15}
              placeholder="Vandenberg Space Force Base"
              bW={1}
              textWidth={'28%'}
              placeholderTextColor={COLORS.BLACK}
            />
            
            <Input
              IconLeft={null}
              errors={undefined}
              touched={false}
              //     value={values.name}
              //     onChangeText={handleChange('name')}
              // onBlur={handleBlur('name')}

              text="Address Line 1"
              IconRight={() => (
                <Address />
              )}
              mV={15}
              placeholder="Eg. Connauticut House"
              bW={1}
              textWidth={'37%'}
              placeholderTextColor={COLORS.BLACK}
            />
            
            <Input
              IconLeft={null}
              errors={undefined}
              touched={false}
              //     value={values.name}
              //     onChangeText={handleChange('name')}
              // onBlur={handleBlur('name')}

              text="Address Line 2"
              IconRight={() => (
                <Address />
              )}
              mV={15}
              placeholder="Appart Street Number-3,Block"
              bW={1}
              textWidth={'37%'}
              placeholderTextColor={COLORS.BLACK}
            />
            <View style={styles.mainDiv_state_ZIP}>
              <View style={styles.zip_state_view}>
                
                <Input
                  IconLeft={null}
                  errors={undefined}
                  touched={false}
                  //     value={values.name}
                  //     onChangeText={handleChange('name')}
                  // onBlur={handleBlur('name')}

                  text="ZIP Code"
                  IconRight={null}
                  mV={15}
                  placeholder="1100000"
                  bW={1}
                  textWidth={'60%'}
                  placeholderTextColor={COLORS.BLACK}
                  w="half"
                />
              </View>
              <View style={styles.zip_state_view}>
                <Input
                  IconLeft={null}
                  errors={undefined}
                  touched={false}
                  //     value={values.name}
                  //     onChangeText={handleChange('name')}
                  // onBlur={handleBlur('name')}

                  text="State"
                  IconRight={null}
                  mV={15}
                  placeholder="CA"
                  bW={1}
                  textWidth={'40%'}
                  placeholderTextColor={COLORS.BLACK}
                  w="half"
                />
              </View>
            </View>
          </View>
          <View>
            <DropDownPicker
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
      />
            </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',

              // paddingVertical: 20,
            }}>
            <TouchableOpacity
              //onPress={() => navigation.navigate('VerifyEmail')}
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
    backgroundColor: '#B1D34F',
    alignItems: 'center',
    padding: 13,
    borderRadius: 30,
    width: '100%',
  },
});
