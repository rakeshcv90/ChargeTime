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
  import InstallationBase from '../../Components/InstallationBase';
  import BoxTwo from '../../Components/BoxTwo';
  import PurchseButton from '../../Components/PurchseButton';
  
  export default function TabTwo() {
    return (
      <SafeAreaView style={{backgroundColor: COLORS.CREAM, flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.managing_width}>
            <InstallationBase />
            <BoxTwo />
            <PurchseButton />
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
  