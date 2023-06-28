import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Charging} from '../../../assets/images/Charging';
import COLORS from '../../constants/COLORS';
import InstallationBase from '../../Components/InstallationBase';
import BoxTwo from '../../Components/BoxTwo';
// import PurchseButton from '../../Components/PurchseButton';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import BoxFive from '../../Components/BoxFive';
import Remaining from '../../Components/Remaining';
import PriceBox from '../../Components/PriceBox';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API} from '../../api/API';
import ActivityLoader from '../../Components/ActivityLoader';
import AnimatedLottieView from 'lottie-react-native';
import {setPlanStatus, setPurchaseData} from '../../redux/action';

export default function SliderOne(props) {
  const [forLoading, setForLoading] = useState(false);
  const [planStatus, setPlanStatus] = useState(false);
  // const [schedulePackageName, setSchedulePackageName] = useState('');
  const dispatch = useDispatch();
  const {getUserID, getPurchaseData, getPlanStatus} = useSelector(
    state => state,
  );

  useEffect(() => {
    getPlanCurrent();
    console.log('getPlanStatus', getPlanStatus);
  }, []);
  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
    fetchData();
    getPlanCurrent()
  };
  const getPlanCurrent = () => {
    axios
      .get(`${API}/currentplan/${getUserID}`)
      .then(res => {
        console.log('PLADSAADSASDAD', res.data)
        dispatch(setPurchaseData(res.data));
        PlanStatus();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const PlanStatus = () => {
    setForLoading(true);
    axios
      .get(`${API}/planstatus/${getUserID}`)
      .then(res => {
        const name = res.data.subscriptions.filter(
          item => item.subscription_status == 'scheduled',
        );
        if (name.length != 0) {
          dispatch(setPlanStatus(name[0]));
          setForLoading(false);
        } else {
          dispatch(setPlanStatus([]));
          setForLoading(false);
        }
        console.log('STATUSSSS', getPlanStatus);
      })
      .catch(err => {
        console.log(err);
        setForLoading(false);
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      {forLoading ? <ActivityLoader /> : ''}

      <View style={styles.managing_width}>
        <BoxTwo data={props.route.params.item} />
        {getPurchaseData.data.energy_plan.toLowerCase() ===
          props.route.params.item.package_name.toLowerCase() && (
          <Remaining RemainingFill={50} KWH={400} data={'energy'} />
        )}
        {getPurchaseData.data.energy_plan.toLowerCase() ===
          props.route.params.item.package_name.toLowerCase() && (
          <View style={{marginBottom: 20}}>
            <PriceBox data={getPurchaseData.data} />
          </View>
        )}
        <View
          style={{
            marginBottom:
              getPurchaseData.data.energy_plan.toLowerCase() ===
              props.route.params.item.package_name.toLowerCase()
                ? 20
                : null,
          }}>
          <InstallationBase data={props.route.params.item} />
        </View>

        {getPurchaseData.data.energy_plan.toLowerCase() !==
          props.route.params.item.package_name.toLowerCase() && (
          <BoxFive
            data={props.route.params.item}
            purchageData={props.route.params.purchageData}
            disabled={
              getPlanStatus.length != 0
                ? getPlanStatus.toLowerCase() ==
                  props.route.params.item.package_name.toLowerCase()
                  ? true
                  : false
                : false
            }
          />
        )}
        {!forLoading &&
          getPlanStatus.length !== 0 &&
          getPlanStatus.item_name.toLowerCase() ==
            props.route.params.item.package_name.toLowerCase() && (
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                marginTop: 15,
                color: COLORS.RED,
                lineHeight: 20,
              }}>
              {/* {planStatus.message} */}
              This package is already purchased, and it will be activated at the end of your billing cycle.
            </Text>
          )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
    // backgroundColor: COLORS.CREAM, flex: 1,
    paddingVertical: PLATFORM_IOS ? 0 : 0,
    marginVertical: PLATFORM_IOS ? 0 : 0,
    // backgroundColor:"red"
    // marginVertical: 10,
    //   paddingTop:20
    // marginBottom:20
  },
});
