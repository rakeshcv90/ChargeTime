/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../../constants/COLORS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '../../../App';
import {DIMENSIONS, PLATFORM_IOS} from '../../constants/DIMENSIONS';
import DrawerOpen from '../../Components/DrawerOpen';
// eslint-disable-next-line no-unused-vars
import ActivityLoader from '../../Components/ActivityLoader';
import {persistor} from '../../redux/store';
import {useSelector} from 'react-redux';
import {API} from '../../api/API';
import {useDispatch} from 'react-redux';
import {setLogout, setPurchaseData, userProfileData} from '../../redux/action';
import axios from 'axios';
import {setCardDetails} from '../../redux/action';
import {ScrollView} from 'react-native-gesture-handler';

const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('screen').height);

const Account = ({navigation}) => {
  const [allSavedCard, setSavedCard] = useState([]);
  const getUserID = useSelector(state => state.getUserID);
  // const [getData, setGetData] = useState([]);
  // const [apiResponse, setApiResponse] = useState(null);
  const user_ID = getUserID;

  const dispatch = useDispatch();

  useEffect(() => {
    //  console.log('data for this User:---------', userRegisterData);
    handleAllGetCard();
    userDetails();
    getPlanCurrent();
    // userSubscription();
    //  userSubsEnergy();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
  }, []);
  const handleBackButton = () => {
    return true;
  };
  const Screen = [
    {
      title: 'Personal Details',
      image: require('../../../assets/images/Personal.png'),
      link: 'PersonalDetails',
      side_image: require('../../../assets/images/side.png'),
      // style={styles.side_icon}
    },
    {
      title: 'Security',
      image: require('../../../assets/images/Security.png'),
      link: 'Security',
      side_image: require('../../../assets/images/side.png'),
    },
    {
      title: 'Installation',
      image: require('../../../assets/images/Install.png'),
      link: 'Installation',
      side_image: require('../../../assets/images/side.png'),
    },
    {
      title: 'Payment Methods',
      image: require('../../../assets/images/Payment.png'),
      link: 'Payment',
      side_image: require('../../../assets/images/side.png'),
    },
    {
      title: 'Subscription',
      image: require('../../../assets/images/Subscrip.png'),
      link: 'Subscription',
      side_image: require('../../../assets/images/side.png'),
    },
    // {
    //   // title: 'Theme',
    //   // image: require('../../../assets/images/Theme.png')
    //   link: 'Theme'
    // },
  ];
  const handleLogOut = async () => {
    // await AsyncStorage.clear();
    await AsyncStorage.removeItem('locationID');
    await AsyncStorage.removeItem('isAuthorized');
    await persistor.purge();
    dispatch(setLogout());
    // navigationRef.navigate('LoginStack');
    // navigationRef.reset({
    //   index: 1,
    //   routes: [{name: 'Login'}], // Replace 'Login' with the appropriate initial screen after logout
    // });
    navigationRef.reset({
      index: 2,
      routes: [{name: 'LoginStack'}],
    });
  };
  const userDetails = async () => {
    // const response = await fetch(`${API}/userexisting/${user_ID}`);
    try {
      const response = await fetch(`${API}/userexisting/${user_ID}`);
      const result = await response.json();
      if (result[0].message === 'sucess') {
        console.log('wwwwww', result);
        //  setUserData(result);
        dispatch(userProfileData(result));
        console.log(result);
      } else {
        console.log('iiiiiiiiiiii');
      }
      // setLocationMap(result);
    } catch (error) {
      console.error(error);
    }
  };
  const getPlanCurrent = () => {
    // setForLoading(true);
    axios
      .get(`${API}/currentplan/${getUserID}`)
      .then(res => {
        // setForLoading(false);
        // setModalVisible(false);
        if (res.data.data === 'Package details not found') {
          dispatch(setPurchaseData(res.data));
          console.log('-------------------', res.data);
          // setGetData(res.data);
          // dispatch(setPackageStatus(false));
        } else {
          dispatch(setPurchaseData(res?.data));
          // setGetData(res.data);
        }
      })
      .catch(err => {
        // setForLoading(false);
        console.log(err);
      });
  };
  const handleAllGetCard = async () => {
    try {
      const response = await fetch(`${API}/getcarddetails/${user_ID}`);
      const result = await response.json();
      // console.log("Result", result[0].sort((b, a) => a.status - b.status))
      console.log('handle all card...', result);
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
  const handleLinkPress = screen => {
    navigation.navigate(screen, {allSavedCard});
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <View style={styles.main_div}>
        <View style={styles.row}>
          <Text style={styles.heading}>Account</Text>

          <DrawerOpen top={PLATFORM_IOS ? 30 : 30} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {Screen.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handleLinkPress(item.link)}>
              <View style={styles.row}>
                <Image source={item.image} style={styles.icon} />
                <Text style={styles.title}>{item.title} </Text>
                <View style={styles.sideImageContainer}>
                  <Image source={item.side_image} style={styles.side_icon} />
                </View>
              </View>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: mobileW,
                }}>
                <Image
                  source={require('../../../assets/images/dotted.png')}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{width: mobileW, height: 3}}
                  resizeMode="stretch"
                />
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.row}>
            <Image
              source={require('../../../assets/images/Theme.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>Theme</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Follow System</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addContainer}>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                navigation.navigate('Privacy Policy');
              }}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.text}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.text}>Rate Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Contact');
              }}
              style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.text}>Contact Us</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ButtonsContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleLogOut()}>
              <Text style={styles.logoutbuttonText}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    width: DIMENSIONS.SCREEN_WIDTH * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
  },
  main_div: {
    width: DIMENSIONS.SCREEN_WIDTH * 0.95,
    height: DIMENSIONS.SCREEN_HEIGHT * 0.9,
  },
  heading: {
    color: COLORS.BLACK,
    fontSize: 26,
    //fontWeight: 'bold',
    marginBottom: 40,
    marginLeft: 24,
    marginTop: 30,
  },
  itemContainer: {
    marginBottom: 3,
  },
  title: {
    width: 132,
    height: 20,
    marginLeft: 5,
    //fontFamily: 'Roboto',
    //fontStyle: 'normal',
    // fontweight: 900,
    fontSize: 14,
    lineHeight: 15,
    marginBottom: 20,
    marginTop: 20,
    color: '#000000',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },
  text: {
    // fontFamily: 'Roboto',
    fontSize: 14,
    marginLeft: 10,
    color: 'rgba(0, 0, 0, 1)',
  },
  bullet: {
    marginRight: 5,
    fontSize: 15,
    color: COLORS.BLACK,
  },
  link: {
    color: 'blue',
  },

  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    // left: 50,
    // left: 30,
    width: mobileW - 240,
    marginLeft: (mobileW * 8) / 100,
    borderRadius: 5,
    // marginRight:10,
  },
  buttonText: {
    fontSize: 15,
    color: COLORS.BLACK,
    // marginRight:20,
    textAlign: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 170,
    flex: 1,
    // alignItems: 'flex-end',
  },
  icon: {
    width: 20,
    height: 22,
    marginLeft: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  sideImageContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  side_icon: {
    width: 8,
    height: 8,
    marginLeft: 120,
  },
  dropdown: {
    flex: 1,
    marginLeft: 8,
  },
  addContainer: {
    marginRight: 20,
    marginLeft: 30,
    marginTop: 30,
  },
  ButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (mobileH * 3) / 100,
    bottom: mobileH * 0.001,
  },
  logoutButton: {
    backgroundColor: '#F84E4E',
    padding: 10,
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
  },
  logoutbuttonText: {
    color: 'white',
    fontWeight: '500',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Account;
