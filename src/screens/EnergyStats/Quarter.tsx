import { View, Text,ScrollView } from 'react-native'
import React, { useEffect,useRef,useState } from 'react'

import COLORS from '../../constants/COLORS';
import Remaining from '../../Components/Remaining';
import TotalUsage from '../../Components/TotalUsuage';
import Graph from '../../Components/Graph';
import BoxTwo from '../../Components/BoxTwo';
import PriceBox from '../../Components/PriceBox';
import ButtonSlider from '../../Components/ButtonSlider';
import { useSelector } from 'react-redux';

export default function Quarter() {
  const [showSlider, setShowSlider] = useState(true);
  const ScrollRef = useRef(null);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  const {getQuarterData,getBoxTwoDataForDashboard} =  useSelector((state:any) => state)
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value:any) => setToggleState(value);
  
 
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
            <TotalUsage data={getQuarterData?.Totalusedkwhs} />
          </View>
          
          <View style={{marginHorizontal: 20,}}>
          <Graph dataOne={getQuarterData.Usage} />
          <BoxTwo />
          </View>
          <View style={{marginBottom:80}}>
          <PriceBox data={getBoxTwoDataForDashboard[0]} />
          </View>
        </ScrollView>
      </View>
      {/* {showSlider && <ButtonSlider />} */}
      {/* <ButtonSlider onToggle={handleToggle}  /> */}
    </>
  );
}