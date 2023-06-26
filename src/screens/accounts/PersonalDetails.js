import { View, Text, StyleSheet, SafeAreaView,ToastAndroid, TextInput, useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import HorizontalLine from '../../Components/HorizontalLine';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import Header from '../../Components/Header';
import { State, TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Image } from 'react-native-svg';
import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import { DIMENSIONS } from '../../constants/DIMENSIONS';
import { Call } from '../../../assets/svgs/Call';
import { Message } from '../../../assets/svgs/Message';
import {Name} from '../../../assets/svgs/Name';
import { API } from '../../api/API';
import { navigationRef } from '../../../App';
import { FONTS } from '../../constants/FONTS';
import { useDispatch } from 'react-redux';
import { mvs,ms } from 'react-native-size-matters';


import { userProfileData as updatePersionalDetail } from '../../redux/action';



const PersonalDetails = () => {
  const userProfileData = useSelector((state)=> state.userProfileData)
  const getUserID = useSelector((state)=> state.getUserID)
  const [isEditable, setIsEditable] = useState(false);
   const [name, setName]= useState(userProfileData[0]?.name ??'');
   const [number, setNumber]=useState(userProfileData[0]?.mobile ?? '');
   const [error, setError] = useState('');
  //  const [userData, setUserData] = useState([]);
   const user_ID = getUserID;

   const dispatch =useDispatch();


  useEffect(() => {
   setName( userProfileData[0]?.name)
   setNumber( userProfileData[0]?.mobile)
  
}, [userProfileData]);


  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const onPress = ()=>{
    updatePersonalDetails();
  }
  const enableEdit =()=>{
    console.log("enable edit",isEditable)
    setIsEditable(true)
  }

 
  const updatePersonalDetails = async () =>{

    console.log("data")

    console.log(name, "--------");
    console.log(number, "------------")
    console.log(user_ID, "------------")
    // setIsEditable(true);
    await fetch(`${API}/personalInfo/${user_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pwa_name : name,
        pwa_mobile : number,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg == "Your profile has been succesfully updated") {
          const updatedData = [{
            ...userProfileData[0],
          name: name,
            mobile: number,
          }];
          console.log(updatedData,"------")
          // if (updatedData) {
          //   dispatch(userProfileData(updatedData));
          // } else {
          //   console.log('updatedData is not defined or has an incorrect value');
          // }
          dispatch(updatePersionalDetail(updatedData));
          PLATFORM_IOS?
          Toast.show({
            type: 'success',
            text1: "Your Profile Updated Successfully",
            
          }):ToastAndroid.show("Your Profile Updated Successfully", ToastAndroid.SHORT);
          setIsEditable(false)
          // navigationRef.navigate('Account');
          // navigation.navigate('Home');
        } else {
          PLATFORM_IOS?
          Toast.show({
            type: 'error',
            text1: "Your Profile Not Updated",
            
          }):ToastAndroid.show("Your Profile Not Updated", ToastAndroid.SHORT);

        }

      })
      .catch(error => {
        console.error(error);
      })
  };
  const handleInputChange = (text) => {
    // Remove any non-digit characters from the input
    const cleanedText = text.replace(/\D/g, '');
    if (cleanedText !== text) {
      setError('Mobile number should contain digits only');
    } else {
      setError('');
    }
    // Limit the length of the input to 10 characters
    const limitedText = cleanedText.slice(0, 10);
    // if (limitedText >= 10){
    // setError('Mobile number should contain 10 digits only');
    // }else {
    //   setError('');
    // }
    // Update the state with the validated input
    setNumber(limitedText);
  };


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
     <Header headerName="Personal Details" editShow={true} onPress={onPress} enableEdit ={enableEdit} editButton={isEditable} />
      
      <HorizontalLine style={styles.line} />
      <View style={[styles.mainDiv_container]}>
   
        <Input
          IconLeft={null}
           editable={isEditable}
          bgColor={COLORS.CREAM}
          IconRight={() => (
           <Name/>
          )}
          bR={3}
          bW={0.4}
          bColor={COLORS.BLACK}
          text="Name"
          mV={5}
          textWidth={ms(50)}
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          onChangeText={name => setName(name)}
          value={name}
        />
        <View>
        <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          editable={isEditable}
          IconRight={() => (
           <Call/>
          )}
          bR={3}
          bW={0.4}
          bColor={COLORS.BLACK}
          text="Phone No."
          mV={15}
          textWidth={ms(70)}
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          onChangeText={(text)=>{handleInputChange(text);
          setNumber(number)
          }}
         value={ number }
       />
         {error && <Text style={{ color: 'red' }}>{error}</Text>}
         </View>
        <Input
          IconLeft={null}
          editable={false}
          bgColor={COLORS.CREAM}
          IconRight={() => (
           <Message/>
          )}
          bR={3}
          bW={0.4}
          bColor={COLORS.BLACK}
          text="Email"
          mV={55}
          textWidth={ms(50)}
          value={ userProfileData[0]?.email}
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
        />
        {/* <Text style={[styles.textdata,styles.forPaddingTOP]}>Phone No.</Text>
            <TextInput
              style={[
                styles.textinput,
                {color: isDark ? COLORS.BLACK : COLORS.BLACK},
              ]}
              placeholder="Eg. +123 (456) 789"
              placeholderTextColor={{color: 'black'}}
            />
             <Text style={[styles.textdata,styles.forPaddingTOP]}>Email</Text>
            <TextInput
              style={[
                styles.textinput,
                {color: isDark ? COLORS.BLACK : COLORS.BLACK},
              ]}
              placeholder="Eg. johndoe@xyz.com"
              placeholderTextColor={{color: 'black'}}
            />  */}
            
      </View>
      <View style={styles.bottom}>
        <Text>Want to delete account?{' '}</Text>
        
        <TouchableOpacity onPress={()=>navigationRef.navigate('deleteAccount')}>
          <Text 
          style={{
            fontWeight: 'bold',
            font: 14,
            height: 25,
          }}
          >Request here.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  bottom: {
    marginTop: 400,
    marginLeft: 70,
    font: 14,
    // fontfamily: FONTS.MONTSERRAT_REGULAR,
    height: 25,
    color: COLORS.BLACK,
    flexDirection: 'row',
  },

  mainDiv_container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginLeft: 20,
    // marginRight: 30,
    marginTop: 20,
    marginBottom:40,
    width: DIMENSIONS.SCREEN_WIDTH * 0.9,
     height:DIMENSIONS.SCREEN_HEIGHT * 0.9,
  // fontfamily: "Roboto",
  // color: "#000000",
  // fontSize: 24,
  // fontWeight: 700,
  // width: 300,
  // lineHeight: 26,
  // letterspacing: 0.5,
  height: 30,
  },
  textdata: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.BLACK,
  },

  textinput: {
    backgroundColor: COLORS.BROWN,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 50 : 50,
  },
  forPaddingTOP: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: Platform.OS === 'android' ? 'black' : "rgba(0,0,0,.555)",
    shadowOffset: {
      width: 8,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  line: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 2,
    paddingBottom:20,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 20,
  }
});


export default PersonalDetails