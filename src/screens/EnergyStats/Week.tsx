/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import PriceValidity from '../../Components/PriceValidity';
import ButtonSlider from '../../Components/ButtonSlider';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {API} from '../../api/API';
import {setWeekGraphData} from '../../redux/action';

const Week = (props: any) => {
  const [showSlider, setShowSlider] = useState(true);
  const dispatch = useDispatch();
  const ScrollRef = useRef(null);
  useEffect(() => {
    setShowSlider(true);

  }, []);
  const {handleRefresh, refresh} = props?.route?.params
  const {getWeekGraphData, getBoxTwoDataForDashboard} = useSelector(
    (state: any) => state,
  );
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value: any) => setToggleState(value);

  const fetchWeekGraphData = (userID: string) => {
    axios
      .get(`${API}/weeklyusage/${userID}`)
      .then(res => {
        if (res?.data) {
          dispatch(setWeekGraphData(res?.data));
        }
      })
      .catch(err => {
        console.log(err);
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
            <Remaining RemainingFill={50} KWH={400} />
            <TotalUsage
              data={getWeekGraphData?.Totalusedkwhs}
              location={'Weekly'}
            />
          </View>

          <View style={{marginHorizontal: 20}}>
            {getWeekGraphData.message != 'No usage data available' ? (
              <Graph dataOne={getWeekGraphData} />
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
            <BoxTwo data={getBoxTwoDataForDashboard.data} />
          </View>
          <View style={{marginBottom: 80}}>
            <PriceValidity data={getBoxTwoDataForDashboard.data} />
          </View>
        </ScrollView>
      </View>
      {/* {showSlider && <ButtonSlider />} */}
      {/* <ButtonSlider onToggle={handleToggle}  /> */}
    </>
  );
}

export default Week