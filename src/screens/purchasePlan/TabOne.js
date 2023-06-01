import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Charging} from '../../../assets/images/Charging';
import COLORS from '../../constants/COLORS';
import BoxOne from '../../Components/BoxOne';
import BoxTwo from '../../Components/BoxTwo';
import BoxThree from '../../Components/BoxThree';

export default function TabOne() {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.managing_width}>
          <BoxOne />
          <BoxTwo />
          <BoxThree />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  managing_width: {
    paddingHorizontal: 20,
   
  },
  
});
