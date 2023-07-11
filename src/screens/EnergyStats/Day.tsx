/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet, ScrollView, RefreshControl, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import ButtonSlider from '../../Components/ButtonSlider';
import PriceBox from '../../Components/PriceBox';
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
} from '../../redux/action';
import {API} from '../../api/API';
import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import Toast from 'react-native-toast-message';

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
    console.log("DAY GRAPH", getGraphData)
     // Fetch data every 15 minutesh
    // fetchGraphData();
    // fetchWeekGraphData(getUserID);
    // fetchMonthGraphData(getUserID);
    // fetchQuarterGraphData(getUserID);
    // fetchYearGraphData(getUserID);
    // fetchBoxTwoDashboardData(getUserID);
    // fetchStatusdata(getUserID);
    // console.log(getkwhData)
  }, []);
  const fetchGraphData = () => {
    axios
      .get(`${API}/dailyusagegraph/${getUserID}`)
      .then(res => {
        fetchGraphDataInterval(getUserID);
        // dispatch(setGraphData(res?.data));
        // console.log("---------" , res?.data);

        // navigation.navigate('DrawerStack');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
    remainigUsuageData();
    // setInterval(() => {
      fetchGraphDataInterval(getUserID)
      fetchGraphData();
      // dailyUsuagekwh(getUserID);
    // }, 3000);
    fetchGraphData()
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
        console.log(err);
      });
  };

  //day data start
  // const fetchGraphData = (userID: string) => {
  //   axios
  //     .get(`${API}/dailyusagegraph/${userID}`)
  //     .then(res => {
  //       console.log("GRAPH.........", res.data)
  //       dispatch(setGraphData(res?.data));

  //       dailyUsuagekwh(userID);
  //       // navigation.navigate('DrawerStack');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  const fetchGraphDataInterval = (userId : string) => {
    console.log(userId, 'object--------');
    const message = 'No usage data available';
    axios
      .get(`${API}/time_period/${userId}`)
      .then(res => {
        console.log('DAY GRAPH after interval ', res.data);
        dispatch(setGraphData(res?.data));

        dailyUsuagekwh(userId);
        // navigation.navigate('DrawerStack');
      })
      .catch(err => {
        dispatch(setGraphData({message}));
        console.log(err);
      });
  };
  
  const dailyUsuagekwh = (userId: string) => {
    axios
      .get(`${API}/dailyusage/${userId}`)
      .then(res => {
        if (res?.data) {
          console.log(res.data, 'TOALASD');
          dispatch(setKwhData(res?.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // //day data end

  // //week data start
  // const fetchWeekGraphData = (userID: string) => {
  //   axios
  //     .get(`${API}/weeklyusage/${userID}`)
  //     .then(res => {
  //       if (res?.data) {
  //         dispatch(setWeekGraphData(res?.data));
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // const fetchMonthGraphData = (userID: string) => {
  //   axios
  //     .get(`${API}/monthlyusage/${userID}`)
  //     .then(res => {
  //       if (res?.data) {
  //         dispatch(setMonthGraphData(res?.data));
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // const fetchQuarterGraphData = (userID: string) => {
  //   axios
  //     .get(`${API}/threemonthusage/${userID}`)
  //     .then(res => {
  //       if (res?.data) {
  //         dispatch(setQuarterGraphData(res?.data));
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // const fetchYearGraphData = (userID: string) => {
  //   axios
  //     .get(`${API}/yearlyusage/${userID}`)
  //     .then(res => {
  //       if (res?.data) {
  //         dispatch(setYearGraphData(res?.data));
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // const fetchBoxTwoDashboardData = (userId: string) => {
  //   axios
  //     .get(`${API}/currentplan/${userId}`)
  //     .then(res => {
  //       dispatch(setBoxTwoDataForDashboard(res?.data));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // const fetchStatusdata = (userId: string) => {
  //   axios
  //     .get(`${API}/chargerstatus/${userId}`)
  //     .then(res => {
  //       dispatch(setChargerStatus(res?.data));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
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

          <View style={{marginHorizontal: 20, }}>
            {getGraphData.message != 'No usage data available' ? (
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
                  No Graph Data Available
                </Text>
              
            ) }
            <BoxTwo data={getBoxTwoDataForDashboard[0]} />
          </View>
          <View style={{marginBottom: 50}}>
            <PriceBox data={getBoxTwoDataForDashboard.data} />
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
