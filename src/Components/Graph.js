import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import COLORS from '../constants/COLORS';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import ActivityLoader from './ActivityLoader';
import {useSelector} from 'react-redux';

const Graph = ({dataOne}) => {
  const userGraphData = useSelector(state => state.getGraphData);
console.log(userGraphData,"tt")
  let num = userGraphData && userGraphData.map(item => item?.Usage);
  let numOne = userGraphData && userGraphData.map(item => item?.date);

  const data = {
    //labels: Object.values(dataOne).map(item => item?.date),
    labels: numOne,
    datasets: [
      {
        data: num ? num : [],
      },
    ],
  };

  return (
    <>
      <Text
        style={{
          color: COLORS.BLACK,
          fontSize: 14,
          fontWeight: 'bold',
          marginLeft: 10,
        }}>
        kWh
      </Text>
      <View style={styles.container}>
        {/* {dataOne =={}?<ActivityLoader />:
         */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          <LineChart
            data={data}
            width={DIMENSIONS.SCREEN_WIDTH * 2.1}
            verticalLabelRotation={90}
            height={DIMENSIONS.SCREEN_WIDTH * 0.95}
            withVerticalLines={false}
            bezier
            style={{
              xAxisLabelRotation: 45, // Rotate the labels by 45 degrees
            }}
            chartConfig={{
              ...chartConfig,
              labelFontSize: 10, // Adjust the font size to a smaller value
            }}
          />
        </ScrollView>

        {/* } */}
      </View>
    </>
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
  },
});
export default Graph;