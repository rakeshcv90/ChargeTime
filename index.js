/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */

import {AppRegistry, PermissionsAndroid, Platform} from 'react-native';
import App, {navigationRef} from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
// import {store, persistor} from './files/redux/store';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {useEffect, useState} from 'react';
import { PLATFORM_IOS } from './src/constants/DIMENSIONS';

const AppRedux = () => {
  const [token1, setToken] = useState('');
  useEffect(() => {
    let unsubscribe = null;
    let token = 0;
    let count = 0
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
          await messaging().registerDeviceForRemoteMessages();
          token = await messaging().getToken();
        }
        await notifee.requestPermission();
      }

      if (token?.length > 0) {
        console.log('FCM....', token);
        setToken(token);
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          onDisplayNotification(remoteMessage);
        });

        unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
          console.log(
            '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',
            remoteMessage,
          );
          if (remoteMessage) {
            // const notification = remoteMessage.notification;
            //onOpenNotification(notification)

            onDisplayNotification(remoteMessage);
            // this.removeDeliveredNotification(notification.notificationId)
          }
        });

        const initialNotification = await notifee.getInitialNotification();

        if (initialNotification) {
          console.log(
            'Notification caused application to open',
            initialNotification.pressAction,
          );
          console.log(
            'Press action used to open the app',
            initialNotification.pressAction,
          );
        }
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
              id: 'like',
              title: 'Like Post',
            },
            {
              id: 'dislike',
              title: 'Dislike Post',
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
      console.log('fgfgfgfgf', data);
      // // let channelId = ''
      // //  channelId = await notifee.createChannel({
      // //     id: 'fcm_fallback_notification_channel',
      // //     name: 'Default Channel',
      // //   });
      // //   console.log("asdfghjk ", channelId)
      // // notifee.requestPermission();
      // const channelIdd = await notifee.getChannels();
      // let channelIds = '';
      // channelIds = !PLATFORM_IOS && channelIdd[0].id;
      // console.log('DSSDADSDSADSSDASAD', channelIdd.length, channelIds, count);
      // notifee.displayNotification({
      //   title: 'data?.data?.title',
      //   body: 'data.data.message',

      //   ios: {
      //     categoryId: '90',
      //   },
      //   android: {
      //     channelId: channelIds,
      //     smallIcon: 'custom_notification_icon',
      //     largeIcon: require('./assets/ic_launcher.png'),
      //     actions: [
      //       {
      //         title: 'Upgrade your package',
      //         pressAction: {
      //           id: 'Upgrade',
      //         },
      //       },
      //       {
      //         title: 'Cancel',
      //         pressAction: {
      //           id: 'Cancel',
      //         },
      //       },
      //     ],
      //   },
      // });
      // count++
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      const message = data?.data?.message;
      if (message === 'Charger is turned on') {
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
      } else if (message === 'Charger is turned off') {
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
      } else if (message === 'You have used 90% of the subscribed package') {
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
      } else if (
        message ===
        'You have consumed 100% of your package quota. Upgrade your package?'
      ) {
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
      } else {
        notifee.displayNotification({
          title: data?.data?.title,
          body: data.data.message,

          // ios: {
          //   categoryId: 'post',
          // },
          android: {
            channelId: channelId,
            smallIcon: 'custom_notification_icon',
            largeIcon: require('./assets/ic_launcher.png'),
            // actions: [
            //   {
            //     title: 'Upgrade your package',
            //     pressAction: {
            //       id: 'Upgrade',
            //     },
            //   },
            //   {
            //     title: 'Cancel',
            //     pressAction: {
            //       id: 'Cancel',
            //     },
            //   },
            // ],
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
          detail.pressAction.id == 'Contact'
        ) {
          console.log(
            'User pressed an action with the id: ',
            detail.pressAction.id,
          );
          navigationRef.navigate('Contact');
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
          detail.pressAction.id == 'Contact'
        ) {
          console.log(
            'User pressed an action with the id: ',
            detail.pressAction.id,
          );
          navigationRef.navigate('Contact');
        }
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
  // useEffect(() => {
  //   return notifee.onForegroundEvent(({ type, detail }) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         console.log('User dismissed notification', detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         console.log('User pressed notification', detail.notification);
  //         break;
  //     }
  //   });
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppRedux);
