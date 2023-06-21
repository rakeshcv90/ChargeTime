import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import COLORS from '../constants/COLORS';
import {DIMENSIONS} from '../constants/DIMENSIONS';


const Graph = ({ dataOne }) => {
  let num = (dataOne || []).map(item => (item?.Usage === undefined || item?.Usage === [] || item?.Usage === '') ? [0, 0, 0] : item?.Usage);
  let numOne = (dataOne || []).map(item => (item?.date === undefined || item?.date === [] || item?.date === '') ? ["sun", "mon", "tues"] : item?.date);

  const data = {
    labels: numOne.length ? numOne : ["sun", "mon", "tues"],
    datasets: [
      {
        data: num.length ? num : [0, 0, 0],
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={data}
            width={DIMENSIONS.SCREEN_WIDTH * 2.4}
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
          />
        </ScrollView>
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