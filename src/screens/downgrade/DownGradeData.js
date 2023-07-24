/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ForDownGrade from '../../Components/ForDownGrade';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';

export default function DownGradeData({route}) {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView>
        <View
          style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 20}}>
          <ForDownGrade
            dataOne={route.params.data}
            purchageData={route.params.purchageData}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
