/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import COLORS from '../constants/COLORS';
import { DIMENSIONS } from '../constants/DIMENSIONS';
import ActivityLoader from './ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Graph = ({ dataOne, graphType }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [openBox, setOpenBox] = useState(false);
  const [index, setIndex] = useState(-1);
  const [customViewPosition, setCustomViewPosition] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1032);
  const [forLoading, setForLoading] = useState(false);
  const [chartLayout, setChartLayout] = useState(null);
  const getShortMonth = monthName => {
    if (!monthName) return '';
    return monthName.slice(0, 3); // take first 3 letters
  };

  const data = {
    // labels: dataOne?.Date,
    labels:
      graphType == 'Year' ? dataOne?.Date?.map(getShortMonth) : dataOne?.Date,
    datasets: [
      {
        data: dataOne?.Usage,
      },
      {
        data: [0.1],
      },
    ],
  };

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
      <View>
        {forLoading ? <ActivityLoader /> : ''}
        {data.labels != undefined && (
          <Text
            style={{
              color: COLORS.BLACK,
              fontSize: 14,
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            kWh
          </Text>
        )}
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast" //
            bounces={true}
            // style={{ marginLeft: -15 }}
          >
            {data.labels != undefined && (
              <View
                style={{ position: 'relative' }}
                onLayout={e => setChartLayout(e.nativeEvent.layout)}
              >
                <LineChart
                  data={data}
                  width={screenWidth}
                  verticalLabelRotation={45}
                  height={DIMENSIONS.SCREEN_WIDTH * 0.95}
                  withVerticalLines={false}
                  withDots={true}
                  bezier={false}
                  propsForDots={{
                    r: '15',
                    strokeWidth: '2',
                    stroke: 'green',
                  }}
                  chartConfig={{
                    ...chartConfig,
                    labelFontSize: 10,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    strokeWidth: 2,
                    propsForLabels: {
                      fontWeight: '400',
                      color: 'red',
                    },
                  }}
                  onDataPointClick={({ index, value, x, y }) => {

                    setOpenBox(true);
                    setIndex(index);
                    setCustomViewPosition({ x, y });
                  }}
                />
                xe
              </View>
            )}

            {openBox && index >= 0 && (
              <Pressable
                onPress={() => setOpenBox(false)}
                style={{
                  position: 'absolute',
                  left: customViewPosition.x - 40,
                  top: Math.max(customViewPosition.y - 80, 10),
                  padding: 10,
                  backgroundColor: COLORS.GREEN,
                  borderRadius: 10,
                  zIndex: 999,
                }}
              >
                <Text style={{ color: COLORS.BLACK }}>
                  {dataOne.Date[index]}
                </Text>
                <Text style={{ color: COLORS.BLACK, fontWeight: '700' }}>
                  {dataOne.Usage[index]} kWh
                </Text>
              </Pressable>
            )}
          </ScrollView>
        </View>
      </View>
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
// import { StyleSheet, Text, View, ScrollView } from 'react-native';
// import React, { useCallback, useState } from 'react';
// import { LineChart } from 'react-native-gifted-charts';
// import COLORS from '../constants/COLORS';
// import { DIMENSIONS } from '../constants/DIMENSIONS';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';

// const Graph = ({ dataOne, graphType }) => {
//   console.log('Ddddddd', dataOne);
//   const [screenWidth, setScreenWidth] = useState(1032);

//   const getShortMonth = monthName => monthName?.slice(0, 3);

//   // map data for chart
//   // const chartData = dataOne?.Usage?.map((value, i) => ({
//   //   value,
//   //   label:
//   //     graphType === 'Year' ? getShortMonth(dataOne?.Date[i]) : dataOne?.Date,
//   //   index: i,
//   // }));

//   const chartData = dataOne?.Usage?.map((value, i) => {
//   let label = dataOne.Date[i];

//   if (graphType === 'Year') {
//     // Show first 3 letters of the month
//     label = label.slice(0, 3);
//   } else if (graphType === 'Quarter') {
//     // Example: convert month to Q1, Q2, etc.
//     const monthIndex = i % 12; // 0-11
//     if (monthIndex < 3) label = 'Q1';
//     else if (monthIndex < 6) label = 'Q2';
//     else if (monthIndex < 9) label = 'Q3';
//     else label = 'Q4';
//   } else {
//     // For Month view, show full month name
//     label = dataOne.Date[i];
//   }

//   return {
//     value,
//     label,
//     index: i,
//   };
// });
//   const pointWidth = 60; // Width per point
//   const totalWidth = Math.max(screenWidth, chartData?.length * pointWidth);
//   // prepare Y-axis labels
//   const maxY = Math.max(...(dataOne?.Usage || [0]));
//   const step = Math.ceil(maxY / 5);
//   const yAxisLabels = [];
//   for (let i = 0; i <= maxY; i += step) {
//     yAxisLabels.push(i);
//   }

//   useFocusEffect(
//     useCallback(() => {
//       const loadWidth = async () => {
//         const w = await AsyncStorage.getItem('graph_Width');
//         setScreenWidth(Number(w));
//       };
//       loadWidth();
//     }, []),
//   );

//   return (
//     <View>
//       <Text style={styles.kwhText}>kWh</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <LineChart
//           data={chartData}
//           width={totalWidth} // horizontal scroll
//           height={DIMENSIONS.SCREEN_WIDTH * 0.65} // reduced height
//           curved={false} // linear line like chart-kit
//           initialSpacing={10}
//           spacing={pointWidth - 10}
       
//           yAxisTextStyle={{ color: COLORS.BLACK, fontSize: 13 }}
//           xAxisLabelTextStyle={{
//             color: COLORS.BLACK,
//             fontSize: 13,
//             rotation: 45,
//           }}
//           hideRules={false}
//           thickness={2}
//           isAnimated
//           color={COLORS.BLACK}
//           dataPointsColor={COLORS.BLACK}
//           dataPointsRadius={5}
//           onPress={item => console.log('Clicked:', item)}
//           pointerConfig={{
//             pointerStripColor: 'gray',
//             pointerStripWidth: 1,
//             pointerColor: `rgba(0,0,0,1)`,

//             radius: 5,
//             pointerLabelWidth: 100,
//             pointerLabelHeight: 60,
//             pointerLabelComponent: items => {
//               const i = items[0]?.index;
//               if (i === undefined) return null;
//               return (
//                 <View
//                   style={{
//                     backgroundColor: COLORS.GREEN,
//                     padding: 8,
//                     borderRadius: 10,
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text style={{ color: COLORS.BLACK, fontWeight: '500' }}>
//                     {dataOne.Date[i]}
//                   </Text>
//                   <Text style={{ color: COLORS.BLACK, fontWeight: '700' }}>
//                     {dataOne.Usage[i]} kWh
//                   </Text>
//                 </View>
//               );
//             },
//             // pointerLabelComponent: items => {
//             //   const i = items[0]?.index;
//             //   const x = items[0]?.x;
//             //   const y = items[0]?.y;
//             //   if (i === undefined || x === undefined || y === undefined)
//             //     return null;
//             //   return (
//             //     <View
//             //       style={{
//             //         position: 'absolute', // important
//             //         left: x - 40, // adjust horizontal offset
//             //         top: y - 50, // adjust vertical offset to appear above dot
//             //         backgroundColor: COLORS.GREEN,
//             //         padding: 5,
//             //         borderRadius: 10,
//             //         zIndex: 999,
//             //       }}
//             //     >
//             //       <Text style={{ color: COLORS.BLACK }}>{dataOne.Date[i]}</Text>
//             //       <Text style={{ color: COLORS.BLACK, fontWeight: '700' }}>
//             //         {dataOne.Usage[i]} kWh
//             //       </Text>
//             //     </View>
//             //   );
//             // },

//             // pointerLabelComponent: items => {
//             //   const i = items[0]?.index;
//             //   if (i === undefined) return null;
//             //   return (
//             //     <View
//             //       style={{
//             //         backgroundColor: COLORS.GREEN,
//             //         padding: 5,
//             //         borderRadius: 10,
//             //         zIndex: 999,
//             //       }}
//             //     >
//             //       <Text style={{ color: COLORS.BLACK }}>{dataOne.Date[i]}</Text>
//             //       <Text style={{ color: COLORS.BLACK, fontWeight: '700' }}>
//             //         {dataOne.Usage[i]} kWh
//             //       </Text>
//             //     </View>
//             //   );
//             // },
//           }}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   kwhText: {
//     color: COLORS.BLACK,
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     marginBottom: 5,
//   },
// });

// export default Graph;
