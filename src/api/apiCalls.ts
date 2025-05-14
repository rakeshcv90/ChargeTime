import axios from 'axios';
import {API_URL} from './API_URL';
import {ToastAndroid} from 'react-native';
import {PLATFORM_IOS} from '../constants/DIMENSIONS';
import Toast from 'react-native-toast-message';

const Message = (message: string, type: string) =>
  PLATFORM_IOS
    ? Toast.show({
        type,
        text1: message,
      })
    : ToastAndroid.show(message, ToastAndroid.SHORT);

export const apiCalls = {
  getStripeKey: async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL.getStripekey)
        .then(({data, status, statusText}) => {
          if (status == 200) {
            console.log('asdfdsfdsfgdgdf', data?.data?.STRIPE_KEY);
            resolve(data?.data?.STRIPE_KEY);
          }
        })
        .catch(err => {
          console.log('Stripe API err', err,API_URL.getStripekey);
          resolve('pk_test_51LCrEBJPfbfzje02cGGuiKfWFTikU4sHdU7XN13cr0EzRRHRThNfecBFmI9wIzZ3WRaLJbA5IACZ5tU1kO3dpCUw007mxAvgeb');
          Message('Stripe API Error3','error')
        });
    });
  },
};
