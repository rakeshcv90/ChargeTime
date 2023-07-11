import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Router from './src/navigation/Router';
// import messaging from '@react-native-firebase/messaging';
// import {Alert, PermissionsAndroid, Platform} from 'react-native';

export const navigationRef = createNavigationContainerRef();

export default function App() {
  // useEffect(() => {
  //   let unsubscribe = null;
  //   const notificationService = async () => {
  //     PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //     );
  //     await messaging().registerDeviceForRemoteMessages();
  //     const token = await messaging().getToken();

  //     if (token?.length > 0) {
  //       console.log('FCM...', token);
  //       messaging().setBackgroundMessageHandler(async remoteMessage => {
  //         console.log('Message handled in the background!', remoteMessage);
  //       });
  //       unsubscribe = messaging().onMessage(async remoteMessage => {
  //         Alert.alert(
  //           'A new FCM message arrived!',
  //           JSON.stringify(remoteMessage),
  //         );
  //       });
  //     }
  //   };
  //   if (Platform.OS === 'android') {
  //     notificationService();
  //   }
  //   if (unsubscribe) {
  //     return unsubscribe;
  //   }
  // }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
      <Toast position="bottom" />
    </>
  );
}
