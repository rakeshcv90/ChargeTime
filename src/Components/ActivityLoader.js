import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/COLORS';
import {DIMENSIONS} from '../constants/DIMENSIONS';
import AnimatedLottieView from 'lottie-react-native';

const ActivityLoader = props => {
  const [icon, showIcon] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      showIcon(!icon);
    }, 100);
  }, [icon]);
  const {visible} = props;
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          height: DIMENSIONS.SCREEN_WIDTH / 5,
          width: DIMENSIONS.SCREEN_WIDTH / 5,
          backgroundColor: COLORS.LIGHT_GREY,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 15,
          marginTop: 'auto',
          marginBottom: 'auto',
          // elevation: 10,
        }}>
        {/* <ActivityIndicator size="large" /> */}
        {/* <Image
            source={require('../../assets/images/logo_one.png')}
            style={{
              height: DIMENSIONS.SCREEN_WIDTH / 6,
              width: DIMENSIONS.SCREEN_WIDTH / 6,
              resizeMode: 'contain',
            }}
          /> */}
           <AnimatedLottieView
                // source={{
                //   uri: 'https://assets7.lottiefiles.com/packages/lf20_qgq2nqsy.json',
                // }} // Replace with your animation file
                source={require('../../assets/activityindicater.json')} 
                speed={2}
                autoPlay
                loop
                style={{width: 150, height: 50,}}
              />
      </View>
    </Modal>
  );
};

export default ActivityLoader;

const styles = StyleSheet.create({});
