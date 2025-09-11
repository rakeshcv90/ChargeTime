import {
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import COLORS from '../constants/COLORS';
import {DIMENSIONS, PLATFORM_IOS} from '../constants/DIMENSIONS';
import {useDispatch, useSelector} from 'react-redux';
import Overusageimage from '../../assets/svgs/Overusageimage';
import {navigationRef} from '../../App';
import axios from 'axios';
import {API} from '../api/API';
import Toast from 'react-native-toast-message';
import {setSubscriptionStatus} from '../redux/action';
import ActivityLoader from './ActivityLoader';

type Props = {
  paused: boolean;
  setPaused: Function;
  cancel1?: boolean;
  cancel2?: boolean;
  cancel1Stripe?: boolean;
  cancel2Stripe?: boolean;
};
const PauseModal: FC<Props> = ({
  paused,
  setPaused,
  cancel1,
  cancel2,
  cancel1Stripe,
  cancel2Stripe,
}) => {
  const dispatch = useDispatch();
  const {subscriptionStatus, getUserID} = useSelector((state: any) => state);
  const [isLoading, setIsLoading] = useState(false);

  const postSubscriptionStatus = async () => {
    try {
      const res = await axios({
        url: `${API}/subscription_resume/${getUserID}`,
      });
      if (res.data) {
        PLATFORM_IOS
          ? Toast.show({
              type: 'success',
              text1: res.data.subscription,
            })
          : ToastAndroid.show(res.data.subscription, ToastAndroid.SHORT);
        getSubscriptionStatus();
      }
    } catch (error) {
      console.log('dddd1111', error);
    }
  };
  const getSubscriptionStatus = async () => {
    try {
      const response = await fetch(`${API}/planstatuspauseresume/${getUserID}`);
      const res = await response.json();
      dispatch(setSubscriptionStatus(res.PlanStatus));
      setPaused(res.PlanStatus == '1' ? true : false);
    } catch (error) {
      console.log('Error-7', error);
    }
  };
  const plan = () => {
    setPaused(false);
    navigationRef?.navigate('EnergyOptions');
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={paused}
      onRequestClose={() => {
        // dispatch(setOverModelView(false));
        //  setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              setPaused(false);
            }}
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
              marginTop: -10,
            }}>
            <Image
              source={require('../../assets/images/close.png')}
              style={{width: 12, height: 12}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.modalText}>
            Account{' '}
            {cancel1 || cancel2 || cancel1Stripe || cancel2Stripe
              ? 'is Cancelled'
              : 'Paused'}
          </Text>
          {
            <Image
              source={
                cancel1 || cancel2 || cancel1Stripe || cancel2Stripe
                  ? require('../../assets/images/CancelModalImage.png')
                  : require('../../assets/images/PauseModalImage.png')
              }
              resizeMode="contain"
              style={{width: 70, height: 70}}
            />
          }
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: COLORS.BLACK,
              marginTop: 10,
              textAlign: 'center',
              lineHeight: 20,
            }}>
            {cancel1
              ? `You don’t have a plan. You can use your remaining credits until its over.`
              : cancel2
              ? `You don't have a plan, Purchase a plan to continue using Charger`
              : cancel1Stripe
              ? `Your account has been cancelled due to a declined payment. Please update your payment information to reinstate your account. You can use the charger until your usage quota limit is reached.`
              : cancel2Stripe
              ? `Your account has been cancelled due to a declined payment. Please update your payment information to reinstate your account.`
              : `You don’t have a plan. You can use your remaining credits until its over.`}
          </Text>
          <View style={styles.button_one}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                padding: 10,
              }}
              onPress={() => {
                setPaused(false);
                navigationRef.navigate('DrawerStack', {
                  screen: 'EnergyStats',
                });
              }}>
              <Text style={styles.textStyle}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose, {padding: 5}]}
              onPress={() => {
                if (cancel1 || cancel2 || cancel1Stripe || cancel2Stripe)
                  plan();
                else postSubscriptionStatus();
              }}>
              <Text style={styles.textStyle}>
                {cancel1 || cancel2 || cancel1Stripe || cancel2Stripe
                  ? 'Purchase Plan'
                  : 'Resume Subscription'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 15,
    paddingVertical: 25,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: DIMENSIONS.SCREEN_WIDTH * 0.8,
  },
  button_one: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.GREEN,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 24,
    color: '#000000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
export default PauseModal;
