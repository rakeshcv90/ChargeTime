import 'react-native-gesture-handler';
import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Router from './src/navigation/Router';
import Maintainence from './src/Components/Maintainence';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidStyle, EventType} from '@notifee/react-native';
import {useEffect, useState} from 'react';
import {PLATFORM_IOS} from './src/constants/DIMENSIONS';
import axios from 'axios';
import {API} from './src/api/API';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import codePush from 'react-native-code-push';
import {View, Text, ActivityIndicator, } from 'react-native';

import {
  setBasePackage,
  setChargerStatus,
  setOverModelView,
  setOverUsage,
  setRemainingData,
  setSubscriptionStatus,
  userProfileData,
  setMaintainence,
  setMyLocation,
  setIsAuthorized,
} from './src/redux/action';

import {Modal, PermissionsAndroid} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {persistor} from './src/redux/store';
export const navigationRef = createNavigationContainerRef();

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const App = ({navigation}) => {
  const {maintainence} = useSelector(state => state);
  const [token1, setToken] = useState('');
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();

  //For Ios also use before use code Push (appcenter login)
  //appcenter codepush release-react -a rakeshrao/TRO-ChargeTIme -d Production

  //For Android
  //appcenter codepush release-react -a rakeshrao/TRO-ChargeTimeAndroid -d Production
  const publishableKey =
    'pk_live_51LCrEBJPfbfzje02kM4bLe9H6mEIVNkpZwxrcNSNOA8TO0WyfSAcZhjPsCgG7pYuwdE1QjFzmd3bew2A2ch3lqCE00NG2kiGDs';

  useEffect(() => {
    // setLoginMessage();
    let unsubscribe = null;
    let token = 0;
    let count = 0;
    const notificationService = async () => {
      if (Platform.OS == 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        await messaging().registerDeviceForRemoteMessages();
        token = await messaging().getToken();
      } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          // await messaging().registerDeviceForRemoteMessages();
          token = await messaging().getToken();
        }
        await notifee.requestPermission();
      }

      if (token?.length > 0) {
        console.log('FCM....aaaaa', token);
        setToken(token);
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          onDisplayNotification(remoteMessage);
        });

        unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
          if (remoteMessage) {
            // const notification = remoteMessage.notification;
            //onOpenNotification(notification)

            onDisplayNotification(remoteMessage);
            // this.removeDeliveredNotification(notification.notificationId)
          }
        });
        unsubscribe = messaging().getInitialNotification(remoteMessage => {
          if (remoteMessage) {
            // const notification = remoteMessage.notification;
            //onOpenNotification(notification)

            onDisplayNotification(remoteMessage);
            // this.removeDeliveredNotification(notification.notificationId)
          }
        });
        // const initialNotification = await notifee.getInitialNotification();

        unsubscribe = messaging().onMessage(async remoteMessage => {
          onDisplayNotification(remoteMessage);
        });
      }
    };
    async function setCategories() {
      await notifee.setNotificationCategories([
        {
          id: 'post',
          actions: [
            {
              title: 'Contact Us',
              id: 'contact',
            },
          ],
        },
        {
          id: '90',
          actions: [
            {
              id: 'Upgrade',
              title: 'Upgrade your package',
            },
            {
              id: 'Cancel',
              title: 'Cancel',
            },
          ],
        },
        {
          id: '100',
          actions: [
            {
              id: 'Upgrade',
              title: 'Yes',
            },
            {
              id: 'Cancel',
              title: 'No',
            },
          ],
        },
      ]);
    }

    async function onDisplayNotification(data) {
      const notificationId = '';
      const getUserID = await AsyncStorage.getItem('userId');

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      const message = data?.data?.message;
      const notification_id = data?.data?.notification_id;
      if (notification_id === 'Em-004') {
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,
          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
          },
        });
        axios
          .post(`${API}/charger_ON/${getUserID}`)
          .then(res => {
            dispatch(setChargerStatus(res?.data));
          })
          .catch(err => {
            console.log(err);
          });
      } else if (notification_id === 'Em-006') {
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,
          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
          },
        });
        axios
          .post(`${API}/charger_OFF/${getUserID}`)
          .then(res => {
            dispatch(setChargerStatus(res?.data));
          })
          .catch(err => {
            console.log(err);
          });
      } else if (notification_id === 'Tr-001') {
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,

          ios: {
            categoryId: '90',
          },
          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
            actions: [
              {
                title: 'Upgrade your package',
                icon: 'https://my-cdn.com/icons/snooze.png',
                pressAction: {
                  id: 'Upgrade',
                },
              },
              {
                title: 'Cancel',
                icon: 'https://my-cdn.com/icons/snooze.png',
                pressAction: {
                  id: 'Cancel',
                },
              },
            ],
          },
        });
      } else if (notification_id === 'Tr-002') {
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,

          ios: {
            categoryId: '100',
          },
          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
            actions: [
              {
                title: 'Yes',
                icon: 'https://my-cdn.com/icons/snooze.png',
                pressAction: {
                  id: 'Upgrade',
                },
              },
              {
                title: 'No',
                icon: 'https://my-cdn.com/icons/snooze.png',
                pressAction: {
                  id: 'Cancel',
                },
              },
            ],
          },
        });
        let remaingData;
        axios
          .get(`${API}/remainingusage/${getUserID}`)
          .then(res => {
            if (parseInt(res.data?.kwh_unit_remaining) > 0) {
              remaingData = res.data?.kwh_unit_remaining;
              dispatch(setRemainingData(res.data?.kwh_unit_remaining));
              dispatch(setOverUsage(false));
            } else {
              remaingData = res.data?.kwh_unit_overusage;
              dispatch(setRemainingData(res.data?.kwh_unit_overusage));
              dispatch(setOverUsage(true));
            }
            console.log('first', res.data);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (notification_id === 'Em-001') {
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,

          ios: {
            categoryId: 'post',
          },
          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
            actions: [
              {
                title: 'Contact Us',
                icon: 'https://my-cdn.com/icons/snooze.png',
                pressAction: {
                  id: 'contact',
                },
              },
            ],
          },
        });
      } else if (notification_id === 'notification_id') {
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,

          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
          },
        });
        if (data.data.message === 'Your subscription is paused!') {
          console.log('hello');
          dispatch(setSubscriptionStatus(1));
        } else {
          dispatch(setSubscriptionStatus(0));
          console.log('byyyyyy');
        }
      } else if (notification_id === 'Event') {
        notifee.displayNotification({
          title: data.data.message,
          //body: data.data.message,

          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
            //style:{ type: AndroidStyle.BIGPICTURE, picture: require('./assets/images/car_one.png') }
          },
        });

        try {
          const response = await fetch(`${API}/userexisting/${getUserID}`);

          const result = await response.json();

          if (result[0].message === 'sucess') {
            //  setUserData(result);

            dispatch(userProfileData(result));
          }
        } catch (error) {
          console.error('Error222', error);
        }
      } else if (notification_id === 'Price') {
        console.log(data);
        notifee.displayNotification({
          title: data.data.message,
          //body: data.data.message,
          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
          },
        });

        try {
          const response = await axios.get(
            `${API}/packagePlan/${data.data.booking_id}`,
          );

          if (response?.data?.locations.length == 0) {
            dispatch(setBasePackage([]));
          } else {
            dispatch(setBasePackage(response.data.locations));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else if (notification_id === 'Maintaince') {
        dispatch(setMyLocation(data.data.message));
        dispatch(setMaintainence(true));
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,

          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
          },
        });
      } else if (notification_id === 'Active') {
        dispatch(setMaintainence(false));
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,

          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
          },
        });
      } else if (notification_id === 'Deleted') {
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,

          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
          },
        });
        DeleteAccount();
      } else {
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,

          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
          },
        });
      }
      notifee.onBackgroundEvent(async ({type, detail}) => {
        if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction.id == 'Upgrade'
        ) {
          console.log(
            'User pressed an action with the id: ',
            detail.pressAction.id,
          );
          navigationRef.navigate('EnergyOptions');
        } else if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction.id == 'contact'
        ) {
          console.log(
            'User pressed an action with the id: ',
            detail.pressAction.id,
          );
          navigationRef.navigate('Contact');
        } else if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction.id == 'Cancel'
        ) {
          console.log(
            'User pressed an action with the id: ',
            detail.pressAction.id,
          );
        }
      });
      notifee.onForegroundEvent(({type, detail}) => {
        if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction.id == 'Upgrade'
        ) {
          console.log(
            'User pressed an action with the id: ',
            detail.pressAction.id,
          );
          navigationRef.navigate('EnergyOptions');
        } else if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction.id == 'contact'
        ) {
          console.log(
            'User pressed an action with the id: ',
            detail.pressAction.id,
          );
          navigationRef.navigate('Contact');
        }
        // else if (
        //   type === EventType.ACTION_PRESS &&
        //   detail.pressAction.id == 'contact'
        // ) {
        //   console.log(
        //     'User pressed an action with the id: ',
        //     detail.pressAction.id,
        //   );
        //   navigationRef.navigate('Contact');
        // }
      });
    }

    if (Platform.OS === 'android') {
      notificationService();
      //setCategories();
    } else {
      notificationService();
      setCategories();
    }
    if (unsubscribe) {
      return unsubscribe;
    }
  }, []);
  useEffect(() => {
    codePush.sync(
      {
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
       // installMode: codePush.InstallMode.MANUAL,
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
  }, []);
  const codePushStatusDidChange = syncStatus => {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for update.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Download packaging....');
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('Awaiting user action....');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update');
        setProgress(false);
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('codepush status up to date');
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        console.log('update cancel by user');
        setProgress(false);
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed and will be applied on restart.');
        setProgress(false);
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('An unknown error occurred');
        setProgress(false);
        break;
    }
  };
  const codePushDownloadDidProgress = progress => {
    setProgress(progress);
  };
  const showProgressView = () => {
    return (
      <Modal visible={true} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 16,
            }}>
            <Text style={{color:'black'}}>In Progress.......</Text>

            <View style={{alignItems: 'center'}}>
              <Text style={{marginTop: 16,color:'black'}}>{`${(
                Number(progress?.receivedBytes) / 1048576
              ).toFixed(2)}MB/${(
                Number(progress?.totalBytes) / 1048576
              ).toFixed(2)}`}</Text>
              <ActivityIndicator style={{marginVertical: 8}} color={'blue'} />
              <Text style={{color:'black'}}>
                {(
                  (Number(progress?.receivedBytes) /
                    Number(progress?.totalBytes)) *
                  100
                ).toFixed(0)}
                %
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // const setLoginMessage = async () => {
  //   AsyncStorage.setItem('LoginMessage', 'null');
  // };
  // useEffect(() => {
  //   remainigUsuageData();
  // }, []);
  // const remainigUsuageData = async () => {
  //   let remaingData;
  //   const getUserID = await AsyncStorage.getItem('userId');
  //   axios
  //     .get(`${API}/remainingusage/${getUserID}`)
  //     .then(res => {
  //       if (parseInt(res.data?.kwh_unit_remaining) > 0) {
  //         dispatch(setOverModelView(false));
  //       } else {
  //         remaingData = res.data?.kwh_unit_overusage;
  //         dispatch(setOverModelView(true));
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  const DeleteAccount = async () => {
    await AsyncStorage.clear();
    dispatch(setIsAuthorized(false));
    await persistor.purge();
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'LoginStack',
          },
        ],
      }),
    );
    // navigationRef.navigate('Login');
  };
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
      <Maintainence isVisible={maintainence} />
      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      ></StripeProvider>
      <Toast />
      {!!progress ? showProgressView() : null}
    </>
  );
};
export default codePush(codePushOptions)(App);
