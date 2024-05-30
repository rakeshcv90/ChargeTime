/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
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
import {useSelector} from 'react-redux';

const Month = (props: any) => {
  const [showSlider, setShowSlider] = useState(true);
  const ScrollRef = useRef(null);
  useEffect(() => {
    setShowSlider(true);

  }, []);
  const {handleRefresh, refresh} = props?.route?.params
  const {getMonthData, getBoxTwoDataForDashboard, getSubscriptionCancelStatus} = useSelector(
    (state: any) => state,
  );
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value: any) => setToggleState(value);

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
              data={getMonthData?.Totalusedkwhs}
              location={'Monthly'}
            />
          </View>

          <View style={{marginHorizontal: 20}}>
            {getMonthData.message != 'No usage data available' ? (
              <Graph dataOne={getMonthData} />
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
             {getSubscriptionCancelStatus ==
              2 ? null : getSubscriptionCancelStatus == 4 ? null : (<PriceValidity data={getBoxTwoDataForDashboard.data} />
              )}
          </View>
        </ScrollView>
      </View>
      {/* {showSlider && <ButtonSlider />} */}
      {/* <ButtonSlider onToggle={handleToggle}  /> */}
    </>
  );
}
export default Month
