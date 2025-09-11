import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import WaveAnimation from './WaveAnimation';
import Wave from 'react-native-waveview';
import { TouchableHighlight } from 'react-native-gesture-handler';
import COLORS from '../constants/COLORS';
import { DIMENSIONS } from '../constants/DIMENSIONS';

const WaveLinearGradient = (props) => {
    return (
    //   <LinearGradient
    //     colors={['rgba(177, 211, 79, 0.7) 0%', 'rgb(177, 211, 79) 0%']}
    //     start={{ x: 1, y: 2 }}
    //     end={{ x: 0, y: 1 }}
    //     style={{
    //       width: '100%',
    //       height: props.RemainingFill ? `${props.RemainingFill}%` : '1%',
    //       flexDirection: 'column-reverse',
    //       background: linear-gradient('180deg', '#B1D34F 0%', '#50AC3D 100%')
    //     }}
    //   >
    //     <View style={{ marginBottom: 30, marginLeft: 30 }}>   background: linear-gradient(180deg, #B1D34F 0%, #50AC3D 100%)
    //       <WaveAnimation />
    //       <Text
    //         style={{
             
    //           fontWeight: '800',
    //           fontSize: 16,
    //           lineHeight: 20,
    //           color: COLORS.BLACK,
    //         }}
    //       >
            
    //         {props.KWH ? props.KWH + ' kWh' : 0 + ' kWh'}
    //       </Text>
    //       <Text
    //         style={{
              
    //           fontWeight: '400',
    //           fontSize: 10,
    //           lineHeight: 12,
    //           color: 'rgba(61, 61, 61, 0.6)',
    //         }}
    //       >
    //         Units Left To Be Used
    //       </Text>
    //     </View>
    //   </LinearGradient>
      <View style={_styles.container} >
    
    <Wave
        // ref={ref=>this._waveRect = ref}
        style={_styles.wave}
        // H={50}
        waveParams={[
            {A: 25, T: 350, fill: COLORS.GREEN},
            {A: 35, T: 240, fill: COLORS.GREEN},
            {A: 45, T: 200, fill: COLORS.GREEN },
        ]}
        animated={true}
    />
    

    <View style={_styles.container} >
    {/* <Wave
        style={_styles.waveBall}
        H={70}
        waveParams={[
            {A: 10, T: 180, fill: COLORS.GREEN},
            {A: 15, T: 140, fill: COLORS.GREEN},
            {A: 20, T: 100, fill: COLORS.GREEN},
        ]}
        animated={true}
    /> */}
</View>
</View>
    );
  };
  
  export default WaveLinearGradient;

  const _styles = StyleSheet.create({
    container: {
        // flex: 1,
        // marginVertical: 10,
        // marginHorizontal: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderWidth: StyleSheet.hairlineWidth,
        
    },
    wave: {
        width: 500,
        aspectRatio: 1,
        overflow: 'hidden',
        // backgroundColor: 'white',
    },
    // waveBall: {
    //     width: 350,
    //     aspectRatio: 1,
    //     borderRadius: 20,
    //     // overflow: 'hidden',
    // }
});