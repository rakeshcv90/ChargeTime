import {
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
};
const PauseModal: FC<Props> = ({paused, setPaused, cancel1, cancel2}) => {
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
    navigationRef.current?.navigate('Home');
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
          <Text style={styles.modalText}>
            Account is {cancel1 || cancel2? 'Cancelled' : 'Paused'}
          </Text>
          {/* <AnimatedLottieView
          source={{
            uri: 'https://assets6.lottiefiles.com/private_files/lf30_mf7q9oho.json',
          }} // Replace with your animation file
          autoPlay
          loop
          style={{width: 50, height: 50}}
        /> */}
          <Overusageimage width={130} height={130} viewBox="0 0 80 80" />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: COLORS.BLACK,
            }}>
            {cancel1
              ? `You don't have a plan can use Remaining usage until its over`
              : cancel2
              ? `Purchase a plan to check again`
              : 'Your Subscription has been paused. Please resume it'}
          </Text>
          <View style={styles.button_one}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                padding: 10,
              }}
              onPress={() => {
                setPaused(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose, {padding: 5}]}
              onPress={cancel1 || cancel2 ? postSubscriptionStatus : plan}>
              <Text style={styles.textStyle}>
                {cancel1 || cancel2 ? 'Purchase Plan' : 'Resume'}
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
    width: '80%',
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
