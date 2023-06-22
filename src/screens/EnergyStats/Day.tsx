import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
 import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import ButtonSlider from '../../Components/ButtonSlider';
import PriceBox from '../../Components/PriceBox';
import { useSelector } from 'react-redux';

const Day = (props:any) => {
  const {getkwhData} =useSelector((state:any) => state)
  const {getBoxTwoDataForDashboard,getUserID,getGraphData,getChargerStatus} = useSelector((state:any) => state)
  
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value:any) => setToggleState(value);
  
  const [showSlider, setShowSlider] = useState(true);
  const ScrollRef = useRef(null);
  
  useEffect(() => {
    setShowSlider(true);
  }, []);

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
             
            <Remaining RemainingFill={50} KWH={400} data={"home"} />
            <TotalUsage data={getkwhData.Totalusedkwhs} />
          </View>
          
          <View style={{marginHorizontal: 20,}}>
          <Graph dataOne={getGraphData} />
          <BoxTwo data={getBoxTwoDataForDashboard[0]} />
          </View>
          <View style={{marginBottom:120}}>
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