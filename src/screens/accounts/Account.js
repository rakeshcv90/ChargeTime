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
  Platform,
  ToastAndroid,
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
import Toast from 'react-native-toast-message';
import {
  setLogout,
  setPuchaseAllPlans,
  setPurchaseData,
  setSubcriptionCancelStatus,
  setSubscriptionStatus,
  userProfileData,
} from '../../redux/action';
import axios from 'axios';
import {setCardDetails} from '../../redux/action';
import {ScrollView} from 'react-native-gesture-handler';
import {CommonActions} from '@react-navigation/native';

const mobileW = Math.round(Dimensions.get('screen').width);
const mobileH = Math.round(Dimensions.get('screen').height);

const Account = ({navigation}) => {
  const [allSavedCard, setSavedCard] = useState([]);
  const {getUserID, getPackageStatus} = useSelector(state => state);

  // const [getData, setGetData] = useState([]);
  // const [apiResponse, setApiResponse] = useState(null);
  const user_ID = getUserID;

  const dispatch = useDispatch();

  useEffect(() => {
    handleAllGetCard();
    userDetails();
    getPlanCurrent();
    getSubscriptionStatus();
    getAllPurchasePlan()
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
  const getSubscriptionStatus = () => {

    axios
      .get(`${API}/planstatuspauseresume/${getUserID}`)
      .then(res => {
        dispatch(setSubscriptionStatus(res.data.PlanStatus));
      })
      .catch(err => {
        console.log('Error4444', err);
      });
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
    try {
      const res = await axios(`${API}/logout/${user_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.data.message == 'Your account is successfully logout') {
   
        await AsyncStorage.clear();
        await persistor.purge();
        dispatch(setLogout());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Login',
              },
            ],
          }),
        );
      }
    } catch (err) {
      console.log('Error', err);
      await AsyncStorage.clear();
      await persistor.purge();
      dispatch(setLogout());
    }

  };
  const userDetails = async () => {
    // const response = await fetch(`${API}/userexisting/${user_ID}`);
    try {
      const response = await fetch(`${API}/userexisting/${user_ID}`);
      const result = await response.json();

      if (result[0].message === 'sucess') {
        //  setUserData(result);

        dispatch(userProfileData(result));
      }
    } catch (error) {
      console.error('Error222', error);
    }
  };

  const getPlanCurrent = () => {
    // setForLoading(true);
    axios
      .get(`${API}/currentplan/${getUserID}`)
      .then(res => {
        const subCancelStatus = res.data?.data?.subscription_cancel_status;
        console.log('ASDUBASDA', res.data);
        if (res.data.data == 'Package not found') {
          dispatch(setPurchaseData(res.data));
        } else if (subCancelStatus == 4 || subCancelStatus == 2) {
          dispatch(
            setSubcriptionCancelStatus(
              subCancelStatus == 2 ? 2 : subCancelStatus == 4 ? 4 : 0,
            ),
          );
          dispatch(setPurchaseData({data: 'Package not found'}));
        } else {
          dispatch(
            setSubcriptionCancelStatus(
              subCancelStatus == 1
                ? 1
                : subCancelStatus == 2
                ? 2
                : subCancelStatus == 3
                ? 3
                : subCancelStatus == 4
                ? 4
                : 0,
            ),
          );
          dispatch(setPurchaseData(res?.data));
        }
      })
      .catch(err => {
        // setForLoading(false);
        console.log('xcvvcxvcxv33333', err);
      });
  };
  const getAllPurchasePlan=(userId)=>{
    axios
    .get(`${API}/allpurchaseplans/${getUserID}`)
    .then(res => {
    
      dispatch(setPuchaseAllPlans(res?.data));
    })
    .catch(err => {
      console.log('Error-10', err);
    });
  }
  const handleAllGetCard = async () => {
    try {
      const response = await fetch(`${API}/getcarddetails/${user_ID}`);
      const result = await response.json();

      if (result[0]?.length > 0) {
        setSavedCard(result[0].sort((b, a) => a.status - b.status));
        const statusOneObjects = result[0].filter(item => item.status === 1);
        dispatch(setCardDetails(statusOneObjects));
      } else {
        setSavedCard([]);
      }
    } catch (error) {
      console.log('ERROR111', error);
    }
  };
  const handleLinkPress = screen => {

    navigation.navigate(screen, {allSavedCard});
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <View style={styles.main_div}>
        <View style={styles.row}>
          <Text style={styles.heading}>Account</Text>

          <DrawerOpen top={PLATFORM_IOS ? 30 : 30} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {Screen.map((item, index) => {
            if(!getPackageStatus && index == 3) return
            return(
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handleLinkPress(item.link)}>
              <View style={styles.row}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      marginLeft: index == 1 ? 15 : index == 0 ? 18 : 20,

                      width: 25,
                    },
                  ]}
                />
                <Text style={styles.title}>{item.title} </Text>
                <View style={styles.sideImageContainer}>
                  <Image
                    source={item.side_image}
                    style={styles.side_icon}
                    resizeMode="contain"
                  />
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
          )})}
          {/* <View style={styles.row}>
            <Image
              source={require('../../../assets/images/Theme.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>Theme</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Follow System</Text>
            </TouchableOpacity>
          </View> */}
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
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('Setting');
              }}
              style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.text}>Settings</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.ButtonsContainer}>
            <TouchableOpacity
              activeOpacity={0.05}
              style={styles.logoutButton}
              onPress={() => handleLogOut()}>
              <Text style={styles.logoutbuttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: DIMENSIONS.SCREEN_WIDTH * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_div: {
    width: DIMENSIONS.SCREEN_WIDTH * 0.95,
    height: DIMENSIONS.SCREEN_HEIGHT * 0.9,
    marginVertical:
      Platform.OS == 'ios'
        ? DIMENSIONS.SCREEN_HEIGHT * 0.09
        : DIMENSIONS.SCREEN_HEIGHT * 0.03,
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
    justifyContent: 'center',
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
    width: 10,
    height: 15,
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
    marginBottom:25,
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
