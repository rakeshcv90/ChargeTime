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
import React, { useEffect, useRef, useState } from 'react';
import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import ButtonSlider from '../../Components/ButtonSlider';
import PriceValidity from '../../Components/PriceValidity';
import { useDispatch, useSelector } from 'react-redux';
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
import { API } from '../../api/API';
import AnimatedLottieView from 'lottie-react-native';
import { navigationRef } from '../../../App';
import { DIMENSIONS } from '../../constants/DIMENSIONS';

const Day = (props: any) => {
  const dispatch = useDispatch();
  const ScrollRef = useRef(null);
  const getBoxTwoDataForDashboard = useSelector(
    (state: any) => state.getBoxTwoDataForDashboard,
  );
  const getUserID = useSelector((state: any) => state.getUserID);
  const getGraphData = useSelector((state: any) => state.getGraphData);
  const getSubscriptionCancelStatus = useSelector(
    (state: any) => state.getSubscriptionCancelStatus,
  );
  const getRemainingData = useSelector((state: any) => state.getRemainingData);
  const getkwhData = useSelector((state: any) => state.getkwhData);
  const overusage = useSelector((state: any) => state.overusage);
  const overModelView = useSelector((state: any) => state.overModelView);
  const getPurchaseData = useSelector((state: any) => state.getPurchaseData);
  const [toggleState, setToggleState] = useState(false);
  const [showSlider, setShowSlider] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const { handleRefresh, refresh } = props?.route?.params;

  const handleToggle = (value: any) => setToggleState(value);

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
          dispatch(setGraphData({ message }));
          dispatch(setWeekGraphData({ message }));
          dispatch(setMonthGraphData({ message }));
          dispatch(setQuarterGraphData({ message }));
          dispatch(setYearGraphData({ message }));
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
        const remaining = parseFloat(res.data?.kwh_unit_remaining || 0);

        if (remaining >= 0) {
          remaingData = remaining;
          dispatch(setRemainingData(remaining));
          dispatch(setOverUsage(false));
          dispatch(setOverModelView(false));
          setRefresh(false);
        } else {
          const overUsage = parseFloat(res.data?.kwh_unit_overusage || 0);
          remaingData = overUsage;
          dispatch(setRemainingData(overUsage));
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
    setModalVisible(!modalVisible);
    // dispatch(setOverusageCount(overusage + 1));
    navigationRef.navigate('HomeOne');
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: COLORS.CREAM }}>
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
          onScrollEndDrag={() => setShowSlider(true)}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 30,
              marginTop: 10,
            }}
          >
            <Remaining RemainingFill={10} KWH={400} data={'home'} />
            <TotalUsage data={getkwhData.Totalusedkwhs} location={'Daily'} />
          </View>

          <View style={{ marginHorizontal: 20 }}>
            {getGraphData?.message != 'No usage data available' ? (
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
                }}
              >
                No Graph Data available
              </Text>
            )}
            {getPurchaseData?.data != 'Package not found' &&
            getPurchaseData?.data?.old_subscription_status != 'cancel' ? (
              <BoxTwo data={getBoxTwoDataForDashboard.data} />
            ) : null}
          </View>
          <View style={{ marginBottom: 120 }}>
            {getPurchaseData?.data != 'Package not found' &&
            getPurchaseData?.data?.old_subscription_status != 'cancel' ? (
              getSubscriptionCancelStatus ==
              2 ? null : getSubscriptionCancelStatus == 4 ? null : (
                <PriceValidity data={getBoxTwoDataForDashboard.data} />
              )
            ) : null}
          </View>
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={overModelView}
          onRequestClose={() => {
            dispatch(setOverModelView(false));
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Overusage</Text>

              <Overusageimage width={130} height={130} viewBox="0 0 80 80" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: COLORS.BLACK,
                }}
              >
                You have utilized your package, please purchase a new package.
              </Text>
              <View style={styles.button_one}>
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    padding: 10,
                  }}
                  onPress={() => {
                    dispatch(setOverModelView(false));
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={nav}
                >
                  <Text style={styles.textStyle}>Purchase Plan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  },
});

export default Day;
