import React, { useState } from 'react';
import { View, TextInput, StyleSheet ,Button, SafeAreaView ,TouchableOpacity, Text} from 'react-native';
import Input from '../../Components/Input';
import COLORS from '../../constants/COLORS';
import { DIMENSIONS } from '../../constants/DIMENSIONS';
import HorizontalLine from '../../Components/HorizontalLine';
import Header from '../../Components/Header';
import { Eye} from '../../../assets/svgs/Eye';
// import Button from '../../Components/Button';

const DeleteAccountScreen = () => {


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.CREAM, flex: 1 }}>
    <Header headerName="Account Delete Request" />
    <HorizontalLine style={styles.line} />
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      /> */}
      <Input
          IconLeft={null}
          bgColor={COLORS.CREAM}
          bR={5}
          bW={0.3}
          bColor={COLORS.BLACK}
          text="Reason"
          mV={19}
          textWidth={'20%'}
          multiline
          maxLength={5}
          placeholder="Please let us know the reason for the account closure request."
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '100',
          }}
        />
     <Input
          IconLeft={null}
          autoFocus
          bgColor={COLORS.CREAM}
          IconRight={() => (
                     <Eye/>
                    )}
          bR={5}
          bW={0.3}
          bColor={COLORS.BLACK}
          text="Password"
          mV={19}
          textWidth={'27%'}
          placeholder="Enter password to verify..."
          placeholderTextColor={COLORS.BLACK}
          style={{
            color: COLORS.BLACK,
            fontFamily: 'Roboto',
            fontWeight: '200',
          }}
        />
       <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // width: '100%',
                  marginHorizontal: 20,
                }}>
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    marginLeft:200,
                    backgroundColor: '#F84E4E',
                    alignItems: 'center',
                    padding: 13,
                    borderRadius: 10,
                    width: '50%',
                  }}>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    DELETE ACCOUNT
                  </Text>
                </TouchableOpacity>
              </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,  
    // justifyContent: 'center',
  },
  line: {
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  button:{
    backgroundColor:COLORS.RED,
  }
});

export default DeleteAccountScreen;
