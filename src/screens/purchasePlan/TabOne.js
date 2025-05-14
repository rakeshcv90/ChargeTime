/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
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
import PurchseButton from '../../Components/PurchseButton';
import {PLATFORM_IOS} from '../../constants/DIMENSIONS';
import { useSelector } from 'react-redux';

export default function TabOne(props) {


  const {getLocationID, getBasePackage, getPackageStatus} = useSelector(
    state => state,
  );

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{backgroundColor: COLORS.CREAM, flex: 1,
   
  }}>
   
    <View style={styles.managing_width}>
 
    
      <InstallationBase data={props?.item || getBasePackage[props?.route?.params.index]} />
      <BoxTwo data={props?.item ||getBasePackage[props?.route?.params.index]} />
      <PurchseButton data={props?.item || getBasePackage[props?.route?.params.index]} />
      {/* <InstallationBase data={props?.item || props?.route?.params?.item} />
      <BoxTwo data={props?.item ||props?.route?.params?.item} />
      <PurchseButton data={props?.item || props?.route?.params?.item} />  */}
        
    </View>
    </ScrollView>
 
  );
}
const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.CREAM,
    flex: 1,
    paddingVertical: PLATFORM_IOS ? 20 : 0,
    // marginTop:20,
    paddingTop: 20,
  },
});
