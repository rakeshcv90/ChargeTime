import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {Dolllar} from '../../assets/images/Dollar';
import {navigationRef} from '../../App';
import COLORS from '../constants/COLORS';
import axios from 'axios';
import {API} from '../api/API';
import {useSelector} from 'react-redux';

const BoxFive = ({data, purchageData}) => {
  const {getUserID} = useSelector(state => state);
  let payload = new FormData();
  const forDownUpgrade = async () => {
    payload.append('energy_price', data.totalSalexTax);
    payload.append('selectedEnergyPlan', data.package_name);
    try {
      const response = await axios.get(
        `${API}/upgrade_downgrade/${getUserID}`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('IPDOWSDJa', response.data.status);
      if (response.data.status !== 'No') {
        navigationRef.navigate('DownGradeData', {
          data: data,
          purchageData: purchageData,
          message: response.data.message
        });
      } else {
        Alert.alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={[
        styles.mainDiv_purchage_dollar,
        styles.shadowProp,
        {flexDirection: purchageData == 'UPGRADE' ? 'row-reverse' : 'row'},
      ]}>
      <View>
        <TouchableOpacity
          style={[
            styles.btn_purchage,
            {
              backgroundColor:
                purchageData == 'UPGRADE' ? COLORS.GREEN : COLORS.RED,
            },
          ]}
          onPress={() => forDownUpgrade()}>
          <Text style={styles.purchage_text}>{purchageData}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dollar_div}>
        {/* <Image source={require('../../assets/images/price.png')} /> */}
        <Dolllar />
        <Text style={styles.per_month}>${data?.total_price} /month</Text>
      </View>
    </View>
  );
};

export default BoxFive;
const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
    // paddingVertical:15
  },
  shadowProp: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 8 : 0,
  },
  mainDiv_installation: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  install_touchable: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    paddingVertical: 10,
  },
  img_width: {
    marginLeft: 20,
  },
  installation_text: {
    fontWeight: 700,
    fontSize: 12,
    paddingLeft: 10,
  },
  location_div: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREEN,
    borderStyle: 'dotted',
  },
  force_base: {
    fontWeight: 400,
    fontSize: 14,
    paddingLeft: 10,
  },
  mainDiv_state_zip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.GRAY,
  },
  state_div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainDiv_plan_details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems:'center',
    paddingVertical: 10,
  },
  kwh_mieq_text: {
    fontWeight: 800,
    fontSize: 16,
    paddingTop: 8,
  },
  second_main_div_kwh: {
    flexDirection: 'column',
    alignItems: 'center',
    // alignSelf: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
  mainDiv_purchage_dollar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: 'rgba(1, 0, 0, 0.25)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 4,
  },
  dollar_div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  per_month: {
    fontWeight: 500,
    fontSize: 20,
    color: COLORS.BLACK,
    paddingLeft: 7,
  },
  btn_purchage: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    borderRadius: 12,
  },
  purchage_text: {
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.WHITE,
  },
});
