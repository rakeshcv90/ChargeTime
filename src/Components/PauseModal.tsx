import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../constants/COLORS';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import {useDispatch, useSelector} from 'react-redux';
import Overusageimage from '../../assets/svgs/Overusageimage';
import { navigationRef } from '../../App';

const PauseModal = () => {
  const dispatch = useDispatch();
  const {subscriptionStatus} = useSelector((state: any) => state);
  const nav = () => {
    // setModalVisible(!modalVisible);
    // dispatch(setOverusageCount(overusage + 1));
    navigationRef.navigate('HomeOne');
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={subscriptionStatus == '1'}
      onRequestClose={() => {
        // dispatch(setOverModelView(false));
        //  setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Overusage</Text>
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
            You have utilized your package, please purchase a new package.
          </Text>
          <View style={styles.button_one}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                padding: 10,
              }}
              onPress={() => {
                //dispatch(setOverusageCount(overusage + 1));
                //   setModalVisible(false);
                // dispatch(setOverModelView(false));
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={nav}>
              <Text style={styles.textStyle}>Purchase Plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
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
    // marginLeft: 80,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
