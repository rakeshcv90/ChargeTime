import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import COLORS from '../constants/COLORS';
import LinearGradient from 'react-native-linear-gradient';
import {DIMENSIONS, PLATFORM_IOS} from '../constants/DIMENSIONS';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {API} from '../api/API';
import {
  setOverUsage,
  setOverusageCount,
  setRemainingData,
} from '../redux/action';
import AnimatedLottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';
import {navigationRef} from '../../App';


const RemainingHorizontal = ({...props}) => {
  const dispatch = useDispatch();
  const [totalAllowed, setTotalAllowed] = useState(0);
  const {getRemainingData, getUserID, overusage, overusageCount} = useSelector(
    (state: any) => state,
  );


  const [modalVisible, setModalVisible] = useState(false);
  const [x, setX] = useState<number>(0);
  // setUpdateIntervalForType(SensorTypes.gyroscope, 200); // defaults to 100ms
  useFocusEffect(
    // overusage && setModalVisible(true);
    useCallback(() => {
      remainigUsuageData();
    }, []),
  );

  const remainigUsuageData = () => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${getUserID}`)
      .then(res => {
        setTotalAllowed(res.data?.total_kwhunit);
        if (parseInt(res.data?.kwh_unit_remaining) > 0) {
          remaingData = res.data?.kwh_unit_remaining;
          dispatch(setOverUsage(false));
          dispatch(setOverusageCount(0));
        } else {
          remaingData = res.data?.kwh_unit_overusage;
          dispatch(setOverUsage(true));
   
          if (overusageCount < 1) {
            setModalVisible(true);
            dispatch(setOverusageCount(overusage + 1));
          }
        }

        dispatch(setRemainingData(remaingData));
      })
      .catch(err => {
        console.log(err);
      });
  };
  const nav = () => {
    setModalVisible(!modalVisible);
    dispatch(setOverusageCount(overusage + 1));
    navigationRef.navigate('HomeOne');
  };
  const OverusageModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // dispatch(setOverModelView(false));
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Overusage</Text>
            <AnimatedLottieView
              source={{
                uri: 'https://assets6.lottiefiles.com/private_files/lf30_mf7q9oho.json',
              }} // Replace with your animation file
              autoPlay
              loop
              style={{width: 50, height: 50}}
            />
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
                  dispatch(setOverusageCount(overusage + 1));
                  setModalVisible(false);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={()=>{nav}}>
                <Text style={styles.textStyle}>Purchase Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <View
        style={{
          backgroundColor: '#F5F5F5',
          width: DIMENSIONS.SCREEN_WIDTH * 0.9,
          height: DIMENSIONS.SCREEN_WIDTH * 0.35,
          marginVertical: DIMENSIONS.SCREEN_HEIGHT * 0.00,
          flexDirection: 'row',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 5,
          borderWidth: 0,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <View
          style={{
            backgroundColor: '#F5F5F5',
            width: DIMENSIONS.SCREEN_WIDTH * 0.45,
            height: DIMENSIONS.SCREEN_WIDTH * 0.3,
            marginTop: DIMENSIONS.SCREEN_HEIGHT * 0.025,
            flexDirection: 'column-reverse',
            marginRight: -1,
            
          }}>
          {overusage ? (
            <>
              <View
              style={{
                width: '100%',
                height: `${100 - 20}%`,
                // height: `${30 - 20}%`,
               // zIndex: -1,
                backgroundColor: PLATFORM_IOS?'rgba(248, 84, 84, 1)':'rgba(248, 98, 98, 1)',
                // flexDirection: 'column-reverse',
              }}
            />
              <AnimatedLottieView
                source={require('../../assets/red_wave.json')} // Replace with your animation file
                autoPlay
                loop
                style={{
                  marginBottom:
                (getRemainingData / totalAllowed) * 100 <= 30 ? -1 : -1,
                zIndex: -1,
                width: `100%`,
                // height: `80.4%`,
              }}
              />
            
            </>
          ) : (
            <>
            <View
              // colors={['#AFD35E', '#AFD35E']}
              // start={{x: 0, y: 0}}
              // end={{x: 0, y: 1}}
              style={{
                width: '100%',
                backgroundColor: '#AFD35E',
                // borderRadius: 10,
                height: `${(getRemainingData / totalAllowed) * 100 - 20}%`,
                // height: `${30 - 20}%`,
                zIndex: -1,
                // flexDirection: 'column-reverse',
              }}
            />
              <AnimatedLottieView
                source={require('../../assets/wave.json')} // Replace with your animation file
                autoPlay
                loop
                style={{
                    marginBottom:
                  (getRemainingData / totalAllowed) * 100 <= 30 ? -1 : -1,
                  zIndex: -1,
                  width: `100%`,
                  // height: `80.4%`,
                }}
              />
            </>
          )}
        </View>
        <View
          style={{position: 'absolute', right: '50%', top: '40%', zIndex: 10}}>
          <View
            style={{
              top: '40%',
              alignItems: 'center',
              position: 'absolute',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontWeight: '800',
                fontSize: 16,
                lineHeight: 20,
                color: overusage ? COLORS.WHITE : COLORS.BLACK,
              }}>
              {' '}
              {getRemainingData ? getRemainingData : 0}
              {' kWh'}
            </Text>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 10,
                lineHeight: 12,
                color: overusage ? COLORS.WHITE : 'rgba(61, 61, 61, 0.9)',
              }}>
           {overusage ? 'Units Used' : 'Units Left To Be Used'}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#F5F5F5',
            width: DIMENSIONS.SCREEN_WIDTH * 0.453,
            height: DIMENSIONS.SCREEN_WIDTH * 0.3,
            marginTop: DIMENSIONS.SCREEN_HEIGHT * 0.025,
            flexDirection: 'column-reverse',
          }}>
          {overusage ? (
            <>
           <View
              style={{
                width: '100%',
                height: `${100 - 20}%`,
                // height: `${30 - 20}%`,
               // zIndex: -1,
                backgroundColor: PLATFORM_IOS?'rgba(248, 84, 84, 1)':'rgba(248, 98, 98, 1)',
                // flexDirection: 'column-reverse',
              }}
            />
              <AnimatedLottieView
                source={require('../../assets/red_wave.json')} // Replace with your animation file
                autoPlay
                loop
                style={{
                  marginBottom:
                (getRemainingData / totalAllowed) * 100 <= 30 ? -1 : -1,
                zIndex: -1,
                width: `100%`,
                // height: `80.4%`,
              }}
              />
            </>
          ) : (
            <>
    
              <View
                // colors={['#AFD35E', '#AFD35E']}
                // start={{x: 0, y: 0}}
                // end={{x: 0, y: 1}}
                style={{
                  width: '100%',
                  backgroundColor: '#AFD35E',
                  // borderRadius: 10,
                  height: `${(getRemainingData / totalAllowed) * 100 - 20}%`,
                  // height: `${30 - 20}%`,
                  zIndex: -1,
                  // flexDirection: 'column-reverse',
                }}
              />
              <AnimatedLottieView
                source={require('../../assets/wave.json')} // Replace with your animation file
                autoPlay
                loop
                style={{
                  marginBottom:
                  (getRemainingData / totalAllowed) * 100 <= 30 ? -1 : -1,
                  zIndex: -1,
                  width: `100%`,
                  // height: `80.4%`,
                }}
              />
            </>
          )}
        </View>
      </View>
      {/* <OverusageModal /> */}
    </>
  );
};

export default RemainingHorizontal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
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
});
