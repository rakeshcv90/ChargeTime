/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import COLORS from '../constants/COLORS';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import ActivityLoader from './ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Graph = ({dataOne}) => {
  const [isLoading, setIsLoading] = useState(true);
  // let num = (dataOne || []).map(item => (item?.Usage === undefined || item?.Usage === [] || item?.Usage === '') ? [0, 0, 0] : item?.Usage);
  // let numOne = (dataOne || []).map(item => (item?.date === undefined || item?.date === [] || item?.date === '') ? ["sun", "mon", "tues"] : item?.date);
  // let convertedData = dataOne?.Usage?.map(item => item / 10);
  const [openBox, setOpenBox] = useState(false);
  const [index, setIndex] = useState(-1);
  const [customViewPosition, setCustomViewPosition] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1032);
  const [forLoading, setForLoading] = useState(false);

  const data = {
    labels: dataOne.Date,
    datasets: [
      {
        // data: convertedData,
        data: dataOne?.Usage,
      },
      {
        data: [0.1], // min
      },
    ],
    // dataOne.Usage
  };
  // useFocusEffect(() => {
  //   getWidth();
  // });
  useFocusEffect(
    useCallback(() => {
      getWidth();
    }, []),
  );
  const getWidth = async () => {
    let data = await AsyncStorage.getItem('graph_Width');

    setScreenWidth(data);
  };
  return (
    <TouchableWithoutFeedback onPress={() => console.log('first')}>
      <>
        {forLoading ? <ActivityLoader /> : ''}
        {data.labels != undefined && (
          <Text
            style={{
              color: COLORS.BLACK,
              fontSize: 14,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            kWh
          </Text>
        )}
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginLeft: -15}}>
            {data.labels != undefined && (
              <LineChart
                data={data}
                width={screenWidth}
                verticalLabelRotation={45}
                height={DIMENSIONS.SCREEN_WIDTH * 0.95}
                withVerticalLines={false}
                bezier
                // style={{
                //   xAxisLabelRotation: 75, // Rotate the labels by 45 degrees
                // }}
                chartConfig={{
                  ...chartConfig,
                  labelFontSize: 10, // Adjust the font size to a smaller value
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // line color
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                onDataPointClick={({dataset, index, value, x, y}) => {
                  setOpenBox(!openBox);
                  setIndex(index);
                  setCustomViewPosition(x);
                }}
              />
            )}
            {openBox &&
              dataOne.Usage.map(
                (val, i) =>
                  i === index && (
                    <TouchableOpacity
                      onPress={() => setOpenBox(false)}
                      style={{
                        backgroundColor: COLORS.GREEN,
                        borderRadius: 30,
                        flex: 1,
                        position: 'absolute',
                        bottom: DIMENSIONS.SCREEN_WIDTH / 2,
                        padding: 10,
                        paddingHorizontal: 20,
                        left: customViewPosition - 50,
                      }}>
                      <Text style={{color: COLORS.BLACK, textAlign: 'center'}}>
                        {dataOne.Date[i]}
                      </Text>
                      <Text style={{color: COLORS.BLACK, textAlign: 'center'}}>
                        {
                          <Text style={{fontWeight: '700'}}>
                            {dataOne.Usage[i]}
                          </Text>
                        }{' '}
                        kWh
                      </Text>
                    </TouchableOpacity>
                  ),
              )}
          </ScrollView>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

const chartConfig = {
  backgroundColor: COLORS.CREAM,
  backgroundGradientFrom: COLORS.CREAM,
  backgroundGradientTo: COLORS.CREAM,
  decimalPlaces: 0,
  color: () => COLORS.GREEN,
  //   style: {
  //     borderRadius: 16,
  //   },
  strokeWidth: 2,
  propsForLabels: {
    fontWeight: '400',
    color: 'red', // Change label color here
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
});
export default Graph;
