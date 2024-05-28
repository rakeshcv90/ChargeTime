/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Dolllar} from '../../assets/images/Dollar';
import {navigationRef} from '../../App';
import COLORS from '../constants/COLORS';
import axios from 'axios';
import {API} from '../api/API';
import {useSelector} from 'react-redux';
import {DIMENSIONS} from '../constants/DIMENSIONS';

const BoxFive = ({data, purchageData, disabled}) => {
  const {getUserID, getSubscriptionCancelStatus} = useSelector(state => state);

  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  let payload = new FormData();
  const forDownUpgrade = async () => {
    payload.append('energy_price', data.totalSalexTax);
    payload.append('selectedEnergyPlan', data.package_name);
    try {
      const response = await axios.post(
        `${API}/upgrade_downgrade/${getUserID}`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.data.status !== 'No') {
        navigationRef.navigate('DownGradeData', {
          dataOne: data,
          purchageData: purchageData,
          message: response.data.message,
        });
      } else {
        setMessage(response.data.message);
        setModalVisible(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ShowModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Error!!!</Text> */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: COLORS.BLACK,
              }}>
              {message}
            </Text>
            <View style={styles.button_one}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <View
        style={[
          styles.mainDiv_purchage_dollar,
          styles.shadowProp,
          {
            flexDirection:
              purchageData == 'UPGRADE' || getSubscriptionCancelStatus == 1
                ? 'row-reverse'
                : 'row',
          },
        ]}>
        <View>
          <TouchableOpacity
            disabled={disabled}
            style={[
              styles.btn_purchage,
              {
                backgroundColor: disabled
                  ? COLORS.RED
                  : purchageData == 'UPGRADE'
                  ? COLORS.GREEN
                  : COLORS.RED,
              },
            ]}
            onPress={() => forDownUpgrade()}>
            <Text
              style={[
                styles.purchage_text,
                {color: disabled ? COLORS.WHITE : COLORS.WHITE},
              ]}>
              {getSubscriptionCancelStatus == 1
                ? purchageData?.replace('Renewal', 'Cancelled')
                : purchageData}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dollar_div}>
          {/* <Image source={require('../../assets/images/price.png')} style={{width:18,height:18}}resizeMode='contain'/> */}
          <Dolllar />
          <Text style={styles.per_month}>${data?.total_price}/ month</Text>
        </View>
      </View>
      <ShowModal />
    </>
  );
};

export default BoxFive;
const styles = StyleSheet.create({
  managing_width: {},
  shadowProp: {
    backgroundColor: 'white',
  },
  mainDiv_installation: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  install_touchable: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    paddingVertical: 10,
  },
  img_width: {
    marginLeft: 20,
  },
  installation_text: {
    fontWeight: 700,
    fontSize: 12,
    paddingLeft: 10,
  },
  location_div: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREEN,
    borderStyle: 'dotted',
  },
  force_base: {
    fontWeight: 400,
    fontSize: 14,
    paddingLeft: 10,
  },
  mainDiv_state_zip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.GRAY,
  },
  state_div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainDiv_plan_details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems:'center',
    paddingVertical: 10,
  },
  kwh_mieq_text: {
    fontWeight: 800,
    fontSize: 16,
    paddingTop: 8,
  },
  second_main_div_kwh: {
    flexDirection: 'column',
    alignItems: 'center',
    // alignSelf: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
  mainDiv_purchage_dollar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    marginTop:
      Platform.OS == 'android'
        ? DIMENSIONS.SCREEN_HEIGHT * 0.01
        : DIMENSIONS.SCREEN_HEIGHT * 0.02,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: 'rgba(1, 0, 0, 0.25)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 4,
  },
  dollar_div: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DIMENSIONS.SCREEN_WIDTH * 0.35,
  },
  per_month: {
    fontWeight: 500,
    fontSize: 15,
    color: COLORS.BLACK,
    paddingLeft: 2,
  },
  btn_purchage: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    borderRadius: 12,
  },
  purchage_text: {
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'capitalize',
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

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: DIMENSIONS.SCREEN_WIDTH * 0.8,
  },
  button_one: {
    // marginLeft: 80,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    borderRadius: 30,
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
});
