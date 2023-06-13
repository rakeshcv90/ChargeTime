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
             
            <Remaining RemainingFill={50} KWH={400} />
            <TotalUsage data={getkwhData} />
          </View>
          
          <View style={{marginHorizontal: 20,}}>
          <Graph dataOne={props.route.params} />
          <BoxTwo />
          </View>
          <PriceBox />
        </ScrollView>
      </View>
      {showSlider && <ButtonSlider />}
    </>
  );
};

const styles = StyleSheet.create({});

export default Day;