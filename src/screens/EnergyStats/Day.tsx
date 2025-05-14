/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import ButtonSlider from '../../Components/ButtonSlider';
import PriceValidity from '../../Components/PriceValidity';
import {useDispatch, useSelector} from 'react-redux';
import Overusageimage from '../../../assets/svgs/Overusageimage';

import axios from 'axios';
import {
  setBoxTwoDataForDashboard,
  setChargerStatus,
  setGraphData,
  setKwhData,
  setMonthGraphData,
  setOverUsage,
  setQuarterGraphData,
  setRemainingData,
  setWeekGraphData,
  setYearGraphData,
  setSubscriptionStatus,
  setOverModelView,
  setPurchaseData,
  setPackageStatus,
} from '../../redux/action';
import {API} from '../../api/API';
import AnimatedLottieView from 'lottie-react-native';
import {navigationRef} from '../../../App';
import {DIMENSIONS} from '../../constants/DIMENSIONS';

const Day = (props: any) => {
  const {
    getBoxTwoDataForDashboard,
    getUserID,
    getGraphData,
    getSubscriptionCancelStatus,
    getRemainingData,
    getkwhData,
    overusage,
    overModelView,
    getPurchaseData,
  } = useSelector((state: any) => state);
  const {handleRefresh, refresh} = props?.route?.params;
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value: any) => setToggleState(value);
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(true);
  const ScrollRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);
  const fetchGraphData = () => {
    const message = 'No usage data available';
    axios
      .get(`${API}/dailyusagedeviceid/${getUserID}`)
      .then(res => {
        if (res.data.length > 0) {
          dispatch(setGraphData(res.data.Dayusagewithgraph));
          dispatch(setWeekGraphData(res.data.weeklyusagewithgraph));
          dispatch(setMonthGraphData(res?.data.monthlyusagewithgraph));
          dispatch(setQuarterGraphData(res?.data.threemonthusagewithgraph));
          dispatch(setYearGraphData(res?.data.yearlyusagewithgraph));
        } else if (res.data.length == undefined) {
          dispatch(setGraphData(res.data.Dayusagewithgraph));
          dispatch(setWeekGraphData(res.data.weeklyusagewithgraph));
          dispatch(setMonthGraphData(res?.data.monthlyusagewithgraph));
          dispatch(setQuarterGraphData(res?.data.threemonthusagewithgraph));
          dispatch(setYearGraphData(res?.data.yearlyusagewithgraph));
        } else {
          dispatch(setGraphData({message}));
          dispatch(setWeekGraphData({message}));
          dispatch(setMonthGraphData({message}));
          dispatch(setQuarterGraphData({message}));
          dispatch(setYearGraphData({message}));
        }
      })
      .catch(err => {
        console.log('fetchGraphData11', err);
      });
  };

  const remainigUsuageData = () => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${getUserID}`)
      .then(res => {
        console.log('Over Use Data is', res.data);
        if (parseInt(res.data?.kwh_unit_remaining) >= 0) {
          remaingData = res.data?.kwh_unit_remaining;
          dispatch(setRemainingData(res.data?.kwh_unit_remaining));

          dispatch(setOverUsage(false));
          dispatch(setOverModelView(false));
          setRefresh(false);
        } else {
          remaingData = res.data?.kwh_unit_overusage;
          dispatch(setRemainingData(res.data?.kwh_unit_overusage));

          dispatch(setOverUsage(true));
          dispatch(setOverModelView(true));
          setRefresh(false);
        }
      })
      .catch(err => {
        console.log('remainigUsuageData1', err);
        setRefresh(false);
      });
  };

  const dailyUsuagekwh = (userId: string) => {
    axios
      .get(`${API}/dailyusage/${userId}`)
      .then(res => {
        if (res?.data) {
          dispatch(setKwhData(res?.data));
        }
      })
      .catch(err => {
        console.log('dailyUsuagekwh11', err);
      });
  };

  const fetchStatusdata = (userId: string) => {
    axios
      .get(`${API}/chargerstatus/${userId}`)
      .then(res => {
        dispatch(setChargerStatus(res?.data));
      })
      .catch(err => {
        console.log('fetchStatusdata111', err);
      });
  };
  const nav = () => {
    dispatch(setOverModelView(false));
    // dispatch(setOverusageCount(overusage + 1));
    navigationRef.navigate('EnergyOptions');
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: COLORS.CREAM}}>
        <ScrollView
          ref={ScrollRef}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={() => setShowSlider(false)}
          //   onScrollToTop={() => setShowSlider(true)}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              colors={[COLORS.GREEN]}
              onRefresh={handleRefresh}
            />
          }
          onScrollEndDrag={() => setShowSlider(true)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 30,
              marginTop: 10,
            }}>
            <Remaining RemainingFill={10} KWH={400} data={'home'} />
            <TotalUsage data={getkwhData.Totalusedkwhs} location={'Daily'} />
          </View>

          <View style={{marginHorizontal: 20}}>
            {/* {getGraphData.message != 'No usage data available' ? (
              <>
                <Graph dataOne={getGraphData} />
              </>
            ) : (
              <Text
                style={{
                  color: COLORS.BLACK,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  fontSize: 14,
                  marginVertical: 10,
                }}>
                No Graph Data available
              </Text>
            )} */}
            {getGraphData.message !== 'No usage data available' &&
            getGraphData.message !== 'No daily usage data available' ? (
              <Graph dataOne={getGraphData} />
            ) : (
              <Text
                style={{
                  color: COLORS.BLACK,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  fontSize: 14,
                  marginVertical: 10,
                }}>
                No Graph Data available
              </Text>
            )}
            {getPurchaseData?.data != 'Package not found' &&
            getPurchaseData?.data?.old_subscription_status != 'cancel' ? (
              <BoxTwo data={getBoxTwoDataForDashboard.data} />
            ) : null}
          </View>
          <View style={{marginBottom: 120}}>
            {getPurchaseData?.data != 'Package not found' &&
            getPurchaseData?.data?.old_subscription_status != 'cancel' ? (
              getSubscriptionCancelStatus ==
              2 ? null : getSubscriptionCancelStatus == 4 ? null : (
                <PriceValidity data={getBoxTwoDataForDashboard.data} />
              )
            ) : null}
          </View>
        </ScrollView>
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={overModelView}
          onRequestClose={() => {
            dispatch(setOverModelView(false));
            //  setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Overusage</Text>
        
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
                    dispatch(setOverModelView(false));
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
        </Modal> */}
      </View>
      {/* {showSlider && <ButtonSlider dataTwo={getUserID}  />} */}
      {/* <ButtonSlider onToggle={handleToggle}  /> */}
    </>
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

export default Day;
