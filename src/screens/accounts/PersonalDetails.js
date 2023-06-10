import { View, Text, StyleSheet, SafeAreaView, TextInput, useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import HorizontalLine from '../../Components/HorizontalLine';
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
import { Edit } from '../../../assets/svgs/Edit';
import {Save} from '../../../assets/svgs/Save'
// import { userRegisterData } from '../../redux/action';



const PersonalDetails = ({navigation}) => {
  const userRegisterData = useSelector((state)=> state.userRegisterData)
  const [isEditable, setIsEditable] = useState(false);
   const [name, setName]= useState('');
   const [mail, setMail] =useState('');
   const [number, setNumber]=useState();

  useEffect(() => {
   console.log('data for this User:---------', userRegisterData); 
  //  if (userRegisterData) {
  //   setName(userRegisterData.name);
  //   setNumber(userRegisterData.mobile || '');
  //   setMail(userRegisterData.email || '');
  // }
}, [userRegisterData]);

  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const handleRightButtonClick = () => {
    console.log("ASSSSS--------")
    if (onPress != null) {
      return showRightButton ? <Save /> : null;
    
    }
    return showRightButton ? <Edit /> : null;
  };


  const updatePersonalDetails = async () =>{

    console.log("data")
    setIsEditable(true);
    await fetch(`${API}/personalInfo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name : name,
        mobile : number,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg == "Your Profile Update") {
          PLATFORM_IOS?
          Toast.show({
            type: 'success',
            text1: "Your Profile Update Successful",
            
          }):ToastAndroid.show("Your Profile Update Successful", ToastAndroid.SHORT);

          navigation.navigate('Account');
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
      });
  };


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
      <Header headerName="Personal Details" showRightButton={true}  onPress={handleRightButtonClick}/>
      
      <HorizontalLine style={styles.line} />
      <View style={[styles.mainDiv_container]}>
    
        <Input
          IconLeft={null}
           editable={isEditable}
          bgColor={COLORS.CREAM}
          IconRight={() => (
           <Name/>
          )}
          bR={5}
          bW={0.3}
          bColor={COLORS.LIGHT_GREY}
          text="Name"
          mV={5}
          textWidth={'17%'}
          placeholder=''
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          onChangeText={text => setName(text)}
         value={name}
        />
        <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          editable={isEditable}
          IconRight={() => (
           <Call/>
          )}
          bR={5}
          bW={0.3}
          bColor={COLORS.LIGHT_GREY}
          text="Phone No."
          mV={15}
          textWidth={'27%'}
          placeholder="Eg. +123 (456) 789"
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          onChangeText={text => setNumber(text)}
         value={number}
        />
        <Input
          IconLeft={null}
          editable={false}
          bgColor={COLORS.CREAM}
          IconRight={() => (
           <Message/>
          )}
          bR={5}
          bW={0.3}
          bColor={COLORS.LIGHT_GREY}
          text="Email"
          mV={55}
          textWidth={'20%'}
          placeholder="johndoe@xyz.com"
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
          onChangeText={text => setMail(text)}
         value={number}
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
        <TouchableOpacity onPress={()=>navigation.navigate('deleteAccount')}>
          <Text 
          style={{
            fontWeight: 800,
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
    fontfamily: 'Roboto',
    height: 25,
    color: COLORS.BLACK,
    flexDirection: 'row',
  },

  mainDiv_container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom:40,
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
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 20,
  }
});


export default PersonalDetails