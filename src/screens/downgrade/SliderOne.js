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
import BoxOne from '../../Components/BoxOne';
import BoxTwo from '../../Components/BoxTwo';
import BoxThree from '../../Components/BoxThree';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import BoxFive from '../../Components/BoxFive';
import Remaining from '../../Components/Remaining';
import PriceBox from '../../Components/PriceBox';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API} from '../../api/API';
import ActivityLoader from '../../Components/ActivityLoader';
import AnimatedLottieView from 'lottie-react-native';

export default function SliderOne(props) {
  const [forLoading, setForLoading] = useState(false);
  const [data, setData] = useState([]);

  const {getUserID, getPurchaseData} = useSelector(state => state);

  useEffect(() => {
    getPlanCurrent();
  }, []);

  const getPlanCurrent = () => {
    setForLoading(true);
    axios
      .get(`${API}/currentplan/${getUserID}`)
      .then(res => {
        setForLoading(false);

        setData(res.data);
      })
      .catch(err => {
        setForLoading(false);
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {forLoading ? <ActivityLoader /> : ''}

        <View style={styles.managing_width}>
          <BoxTwo data={props.route.params.item} />
          {getPurchaseData[0].energy_plan.toLowerCase() ===
            props.route.params.item.package_name.toLowerCase() && (
            <Remaining RemainingFill={50} KWH={400} data={'energy'} />
          )}
          {getPurchaseData[0].energy_plan.toLowerCase() ===
            props.route.params.item.package_name.toLowerCase() && (
            <View style={{marginBottom: 20}}>
              <PriceBox data={getPurchaseData[0]} />
            </View>
          )}
          <View
            style={{
              marginBottom:
                getPurchaseData[0].energy_plan.toLowerCase() ===
                props.route.params.item.package_name.toLowerCase()
                  ? 20
                  : null,
            }}>
            <BoxOne data={props.route.params.item} />
          </View>

          {getPurchaseData[0].energy_plan.toLowerCase() !==
            props.route.params.item.package_name.toLowerCase() && (
            <BoxFive
              data={props.route.params.item}
              purchageData={props.route.params.purchageData}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
    // backgroundColor: COLORS.CREAM, flex: 1,
    paddingVertical: PLATFORM_IOS ? 0 : 0,
    marginVertical: PLATFORM_IOS ? 0 : 0,
    // backgroundColor:"red"
    // marginTop:20,
    //   paddingTop:20
    // marginBottom:20
  },
});
