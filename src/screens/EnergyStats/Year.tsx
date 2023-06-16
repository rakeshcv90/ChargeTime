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

export default function Year() {
  const [showSlider, setShowSlider] = useState(true);
  const ScrollRef = useRef(null);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  const {getYearData} =  useSelector((state:any) => state)
  
 
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
            <TotalUsage data={getYearData?.Totalusedkwhs} />
          </View>
          
          <View style={{marginHorizontal: 20,}}>
          <Graph dataOne={getYearData.Usage} />
          <BoxTwo />
          </View>
          <PriceBox />
        </ScrollView>
      </View>
      {showSlider && <ButtonSlider />}
    </>
  );
}