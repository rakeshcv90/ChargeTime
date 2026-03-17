/* eslint-disable prettier/prettier */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
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
import {DIMENSIONS, PLATFORM_IOS} from '../../constants/DIMENSIONS';
import BoxFive from '../../Components/BoxFive';
import Remaining from '../../Components/Remaining';
import PriceBox from '../../Components/PriceBox';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API} from '../../api/API';
import ActivityLoader from '../../Components/ActivityLoader';
import AnimatedLottieView from 'lottie-react-native';
import {
  setPackageStatus,
  setPlanStatus,
  setPurchaseData,
  setSubcriptionCancelStatus,
} from '../../redux/action';
import RemainingHorizontal from '../../Components/RemainingHorizontal';
import PurchseButton from '../../Components/PurchseButton';

export default function SliderOne(props) {
  const [forLoading, setForLoading] = useState(false);
  const [planStatus, setPlanStatuss] = useState(false);
  // const [schedulePackageName, setSchedulePackageName] = useState('');

  const dispatch = useDispatch();
  // const {
  //   getUserID,
  //   getPurchaseData,
  //   getSubscriptionCancelStatus,
  //   getBasePackage,
  //   subscriptionStatus
  // } = useSelector(state => state);

  const getUserID = useSelector(state => state.getUserID);
const getPurchaseData = useSelector(state => state.getPurchaseData);
const getSubscriptionCancelStatus = useSelector(state => state.getSubscriptionCancelStatus);
const getBasePackage = useSelector(state => state.getBasePackage);
const subscriptionStatus = useSelector(state => state.subscriptionStatus);

  useEffect(() => {
    getPlanCurrent();
  }, []);
  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
    fetchData();
    getPlanCurrent();
  };
  const getPlanCurrent = () => {
    axios
      .get(`${API}/currentplan/${getUserID}`)
      .then(res => {
        const subCancelStatus = res.data?.message?.subscription_cancel_status;

        if (res.data.data == 'Package not found') {
          dispatch(setPurchaseData(res.data));
        } else if (subCancelStatus == 4 || subCancelStatus == 2) {
          dispatch(
            setSubcriptionCancelStatus(
              subCancelStatus == 2 ? 2 : subCancelStatus == 4 ? 4 : 0,
            ),
          );
          dispatch(setPackageStatus(false));
          dispatch(setPurchaseData({data: 'Package not found'}));
        } else {
          dispatch(
            setSubcriptionCancelStatus(
              subCancelStatus == 1
                ? 1
                : subCancelStatus == 2
                ? 2
                : subCancelStatus == 3
                ? 3
                : subCancelStatus == 4
                ? 4
                : 0,
            ),
          );
          dispatch(setPurchaseData(res?.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  let purchageData =
    getPurchaseData.data != 'Package not found'
      ? getBasePackage[props?.route?.params.index]?.kwh >
        getPurchaseData?.data?.kwh
        ? 'UPGRADE'
        : getBasePackage[props?.route?.params.index]?.kwh <
          getPurchaseData?.data?.kwh
        ? 'DOWNGRADE'
        :subscriptionStatus==1?'PAUSED SUBSCRIPTION': `Renewal Date: \n${getPurchaseData?.data?.End_validity}`
      : '';

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      {forLoading ? <ActivityLoader /> : ''}

      <View style={styles.managing_width}>
      

        <BoxTwo
          data={props?.item || getBasePackage[props?.route?.params.index]}
        />

        {getPurchaseData?.data != 'Package not found' &&
        getPurchaseData?.data?.old_subscription_status != 'cancel'
          ? getPurchaseData.data.energy_plan.toLowerCase() ===
              props.route.params.item.package_name.toLowerCase() && (
              <RemainingHorizontal
                RemainingFill={50}
                KWH={400}
                data={'energy'}
              />
            )
          : null}
      

        {getPurchaseData?.data != 'Package not found' &&
        getPurchaseData?.data?.old_subscription_status != 'cancel'
          ? getPurchaseData.data.energy_plan.toLowerCase() ===
              props.route.params.item.package_name.toLowerCase() && (
              <View style={{marginBottom: 5}}>
                <PriceBox data={getPurchaseData.data} />
              </View>
            )
          : null}
        <View
          style={{
            marginTop:
              getPurchaseData?.data != 'Package not found' &&
              getPurchaseData?.data?.old_subscription_status != 'cancel'
                ? getPurchaseData.data.energy_plan.toLowerCase() ===
                  props.route.params.item.package_name.toLowerCase()
                  ? 0
                  : Platform.OS == 'android'
                  ? -15
                  : 0
                : 0,
       
          }}>
          <InstallationBase
            data={props?.item || getBasePackage[props?.route?.params.index]}
          />
        </View>

        {getPurchaseData.data != 'Package not found' &&
        getPurchaseData?.data?.old_subscription_status == 'cancel' ? (
          <PurchseButton data={getBasePackage[props?.route?.params.index]} />
        ) : (
          <>
            {getPurchaseData.data != 'Package not found' &&
              getPurchaseData.data.energy_plan.toLowerCase() !==
                props.route.params.item.package_name.toLowerCase() && (
                <BoxFive
                  data={
                    props?.item || getBasePackage[props?.route?.params.index]
                  }
                  purchageData={purchageData}
                  disabled={
                    false
                 
                  }
                />
              )}
            {getPurchaseData.data != 'Package not found' &&
              getPurchaseData.data.energy_plan.toLowerCase() ===
                props.route.params.item.package_name.toLowerCase() && (
                <BoxFive
                  data={
                    props?.item || getBasePackage[props?.route?.params.index]
                  }
                  purchageData={purchageData}
                  disabled
                />
              )}
          </>
        )}
 
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
  
    marginBottom: DIMENSIONS.SCREEN_HEIGHT * 0.02,
  
  },
});
