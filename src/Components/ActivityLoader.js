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
          height: DIMENSIONS.SCREEN_WIDTH / 4,
          width: DIMENSIONS.SCREEN_WIDTH / 4,
          // backgroundColor: COLORS.WHITE,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 100,
          marginTop: 'auto',
          marginBottom: 'auto',
          elevation: 10,
        }}>
        {icon ? (
          <Image
            source={require('../../assets/images/logo_one.png')}
            style={{
              height: DIMENSIONS.SCREEN_WIDTH / 5,
              width: DIMENSIONS.SCREEN_WIDTH / 5,
              resizeMode: 'contain',
            }}
          />
        ) : null}
      </View>
    </Modal>
  );
};

export default ActivityLoader;

const styles = StyleSheet.create({});
