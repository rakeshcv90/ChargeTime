import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import PriceBox from '../../Components/PriceBox';
import ButtonSlider from '../../Components/ButtonSlider';
import {useSelector} from 'react-redux';

export default function Week() {
  const [showSlider, setShowSlider] = useState(true);
  const ScrollRef = useRef(null);
  useEffect(() => {
    setShowSlider(true);
    console.log("WEWEEWE FILE CHECK", getWeekGraphData)
  }, []);
  const {getWeekGraphData, getBoxTwoDataForDashboard} = useSelector(
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
          //   onScrollToTop={() => setShowSlider(true)}
          onScrollEndDrag={() => setShowSlider(true)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: 10,
            }}>
            <Remaining RemainingFill={50} KWH={400} />
            <TotalUsage data={getWeekGraphData?.Totalusedkwhs} />
          </View>

          <View style={{marginHorizontal: 20}}>
            {getWeekGraphData.Date.length >= 1 ? (
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
            <BoxTwo data={getBoxTwoDataForDashboard[0]} />
          </View>
          <View style={{marginBottom: 80}}>
            <PriceBox data={getBoxTwoDataForDashboard[0]} />
          </View>
        </ScrollView>
      </View>
      {/* {showSlider && <ButtonSlider />} */}
      {/* <ButtonSlider onToggle={handleToggle}  /> */}
    </>
  );
}
