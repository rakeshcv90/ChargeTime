/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import ButtonSlider from '../../Components/ButtonSlider';
import PriceValidity from '../../Components/PriceValidity';
import {useDispatch, useSelector} from 'react-redux';
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
} from '../../redux/action';
import {API} from '../../api/API';

const Day = (props: any) => {
  const {
    getBoxTwoDataForDashboard,
    getUserID,
    getGraphData,
    getChargerStatus,
    getRemainingData,
    getkwhData,
  } = useSelector((state: any) => state);

  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value: any) => setToggleState(value);
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const ScrollRef = useRef(null);

  useEffect(() => {
    setShowSlider(true);
  }, []);
  const fetchGraphData = () => {
    axios
      .get(`${API}/dailyusagedeviceid/${getUserID}`)
      .then(res => {
        dispatch(setGraphData(res.data.Dayusagewithgraph));
        dispatch(setWeekGraphData(res.data.weeklyusagewithgraph));
        dispatch(setMonthGraphData(res?.data.monthlyusagewithgraph));
        dispatch(setQuarterGraphData(res?.data.threemonthusagewithgraph));
        dispatch(setYearGraphData(res?.data.yearlyusagewithgraph));
      })
      .catch(err => {
        console.log("fetchGraphData11",err);
      });
  };
  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
    remainigUsuageData();
    dailyUsuagekwh(getUserID);
    fetchGraphData();
    fetchStatusdata(getUserID);
  };

  const remainigUsuageData = () => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${getUserID}`)
      .then(res => {
        if (res.data?.kwh_unit_remaining >= 0) {
          remaingData = res.data?.kwh_unit_remaining;
          dispatch(setOverUsage(false));
        } else {
          remaingData = res.data?.kwh_unit_overusage;
          dispatch(setOverUsage(true));
        }
        console.log(res.data);
        dispatch(setRemainingData(remaingData));
      })
      .catch(err => {
        console.log("remainigUsuageData1",err);
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
        console.log("dailyUsuagekwh11",err);
      });
  };

  const fetchStatusdata = (userId: string) => {
    axios
      .get(`${API}/chargerstatus/${userId}`)
      .then(res => {
        dispatch(setChargerStatus(res?.data));
      })
      .catch(err => {
        console.log("fetchStatusdata111",err);
      });
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
            {getGraphData.message != 'No usage data available' ? (
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
            )}
            <BoxTwo data={getBoxTwoDataForDashboard[0]} />
          </View>
          <View style={{marginBottom: 120}}>
            <PriceValidity data={getBoxTwoDataForDashboard.data} />
          </View>
        </ScrollView>
      </View>
      {/* {showSlider && <ButtonSlider dataTwo={getUserID}  />} */}
      {/* <ButtonSlider onToggle={handleToggle}  /> */}
    </>
  );
};

const styles = StyleSheet.create({});

export default Day;
