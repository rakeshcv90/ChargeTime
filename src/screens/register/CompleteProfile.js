import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import COLORS from '../../constants/COLORS';
import {SignUp} from '../../../assets/images/SignUp';

const mobileW = Math.round(Dimensions.get('screen').width);

export default function CompleteProfile({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView>
        <View style={styles.mainDiv_signup}>
          <SignUp />
          {/* <Image
          style={styles.signup_img}
          source={require('../../assets/images/signUp.png')}
        /> */}
        </View>
        <View style={styles.mainDiv_container}>
          <View style={[styles.mainDiv_complete_profile, styles.shadowProp]}>
            <Text style={styles.complete_profile}>Complete your profile</Text>
            <Text style={[styles.label_name,styles.forPaddingTOP]}>Installation Location</Text>
            <TextInput style={styles.complete_placeholder} placeholder='Vandenberg Space Force Base' />
            <Text style={styles.label_name}>Address Line 1</Text>
            <TextInput style={styles.complete_placeholder} placeholder='Eg. Connauticut House' />
            <Text style={styles.label_name}>Address Line 2</Text>
            <TextInput style={styles.complete_placeholder} placeholder='Appart Street Number-3,Block' />
            <View style={styles.mainDiv_state_ZIP}>
              <View style={styles.zip_state_view}>
                <Text style={styles.label_name}>ZIP Code</Text>
                <TextInput
                  style={[
                    styles.complete_placeholder,
                    styles.state_placeholder,
                  ]}
                  placeholder='1100000'
                />
              </View>
              <View style={styles.zip_state_view}>
                <Text style={styles.label_name}>State</Text>

                <TextInput
                  style={[
                    styles.complete_placeholder,
                    ,
                    styles.state_placeholder,
                  ]}
                  placeholder='CA'
                />
              </View>
            </View>
           
          </View>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            paddingVertical:20
          }}>
          <TouchableOpacity
            //onPress={() => navigation.navigate('VerifyEmail')}
            style={styles.create_profile_Touchable}
            >
            <Text style={{color: COLORS.WHITE, fontSize: 15, fontWeight: '800'}}>
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
    paddingTop: 50,
    backgroundColor: COLORS.WHITE,
    width: mobileW,
  },
  mainDiv_complete_profile: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.GRAY,
    paddingTop: 20,
    paddingBottom: 25,
  },
  shadowProp: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {width: -4, height: 4},
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 5,
  },
  complete_profile: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 800,
    color: COLORS.BLACK,
  },
  complete_placeholder: {
    backgroundColor: `rgba(86, 84, 84, 0.1)`,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  mainDiv_state_ZIP: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  zip_state_view: {
    display: 'flex',
    //flexDirection:'row',
    justifyContent: 'space-between',
  },
  state_placeholder: {
    width: 150,
  },
  forPaddingTOP:{
paddingTop:20
  },
  label_name:{
    paddingVertical:10,
    fontWeight: 500,
fontSize: 14,
color:COLORS.BLACK
  },
  create_profile_Touchable:{
    marginTop: 20,
    backgroundColor: '#B1D34F',
    alignItems: 'center',
    padding: 13,
    borderRadius: 30,
    width: 200,
  }
});
