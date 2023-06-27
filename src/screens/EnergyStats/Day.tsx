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
import { setRemainingData } from '../../redux/action';
import { API } from '../../api/API';

const Day = (props: any) => {
  const { getkwhData } = useSelector((state: any) => state)
  const { getBoxTwoDataForDashboard, getUserID, getGraphData, getChargerStatus, getRemainingData } = useSelector((state: any) => state)

  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value: any) => setToggleState(value);
  const dispatch = useDispatch()
  const [showSlider, setShowSlider] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const ScrollRef = useRef(null);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const remainigUsuageData = () => {
    let remaingData;

    axios
      .get(`${API}/remainingusage/${getUserID}`)
      .then(res => {
        if (res.data?.kwh_unit_remaining >= 0) {
          remaingData = res.data?.kwh_unit_remaining;
        } else {
          remaingData = res.data?.kwh_unit_overusage;
        }
        console.log('first', res.data);
        dispatch(setRemainingData(remaingData));
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

            <Remaining RemainingFill={getRemainingData / 10} KWH={400} data={"home"} />
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