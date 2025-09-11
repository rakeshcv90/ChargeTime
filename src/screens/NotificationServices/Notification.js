/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import messaging from '@react-native-firebase/messaging';
import {navigationRef} from '../../../App';
import {Alert} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {

    getFcmToken();
  }
}
const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token ----------', token);
    navigateToAnotherScreen(token);
  } catch (error) {
    console.log('error in creating token');
  }
};

const navigateToAnotherScreen = token => {
  console.log('---++++++-----', token);
  // Replace 'AnotherScreen' with the name of the screen you want to navigate to
  navigationRef.navigate('Login', {fcmToken: token});
  //   notificationListeners();
};

export async function notificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', remoteMessage);
    console.log('A new FCM message arrived!', remoteMessage);
  });
  // handle bsckgraound notification
  messaging().setBackgroundMessageHandler(remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    navigationRef.navigate('Home');
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigationRef.navigate('Home');
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //   setLoading(false);
    });
  return unsubscribe;
}
