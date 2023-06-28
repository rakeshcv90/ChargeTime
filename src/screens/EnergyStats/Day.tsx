import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import ButtonSlider from '../../Components/ButtonSlider';
import PriceBox from '../../Components/PriceBox';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setOverUsage, setRemainingData } from '../../redux/action';
import { API } from '../../api/API';

const Day = (props: any) => {

  const { getBoxTwoDataForDashboard, getUserID, getGraphData, getChargerStatus, getRemainingData,getkwhData } = useSelector((state: any) => state)

  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value: any) => setToggleState(value);
  const dispatch = useDispatch()
  const [showSlider, setShowSlider] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const ScrollRef = useRef(null);

  useEffect(() => {
    setShowSlider(true);
    console.log(getkwhData)
  }, []);

  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
    remainigUsuageData()
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
        console.log(res.data)
        dispatch(setRemainingData(remaingData));
      })
      .catch(err => {
        console.log(err);
      });
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
          onScrollEndDrag={() => setShowSlider(true)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: 10,
            }}>
             
            <Remaining RemainingFill={10} KWH={400} data={"home"} />
            <TotalUsage data={getkwhData.Totalusedkwhs} />
          </View>

          <View style={{ marginHorizontal: 20, }}>
            <Graph dataOne={getGraphData} />
            <BoxTwo data={getBoxTwoDataForDashboard[0]} />
          </View>
          <View style={{ marginBottom: 120 }}>
            <PriceBox data={getBoxTwoDataForDashboard[0]} />
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