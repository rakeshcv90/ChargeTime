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
  import { PLATFORM_IOS } from '../../constants/DIMENSIONS';
import BoxFive from '../../Components/BoxFive';
  
  export default function SliderOne(props) {
    
    return (
      // <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      //   <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.managing_width}>
            <BoxTwo data={props.route.params.item}/>
            <BoxOne data={props.route.params.item}  />
            
            <BoxFive data={props.route.params.item}  />
            
          </View>
      //   </ScrollView>
      // </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    managing_width: {
      paddingHorizontal: 20,
      backgroundColor: COLORS.CREAM, flex: 1,
      paddingVertical: PLATFORM_IOS? 20:0,
      // marginTop:20,
      paddingTop:20
    },
    
    
  });
  