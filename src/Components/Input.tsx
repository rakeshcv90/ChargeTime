import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Image,
  TextStyle,
  StyleProp,
  useColorScheme,
} from 'react-native';
import COLORS from '../constants/COLORS';
import {PLATFORM_IOS, DIMENSIONS} from '../constants/DIMENSIONS';
import {Eye} from '../../assets/images/Eye';

export type Props = TextInputProps & {
  mV?: number;
  mH?: number;
  IconLeft: any;
  IconRight?: any;
  text: string;
  errors: any | undefined;
  touched: any | undefined;
  pasButton?: () => void;
  bgColor: string;
  bColor?: string;
  bR?: number;
  bW?: number;
  passwordInput?: boolean | false;
  netherland_vat?: boolean | false;
  passwordInputIcon?: boolean | false;
  textWidth?: any;
  w?: 'half' | 'full';
};
const Input: FC<Props> = ({...Props}) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    const label = Props.text.trim();
    const averageCharWidth = label.length > 25 ? 6 : 8; // Adjust this value according to your font and styling
    const textWidth = label.length * averageCharWidth;
    setLabelWidth(textWidth);
  }, [Props.text]);
  return (
    <View
      style={{
        width:
          Props.w === 'full'
            ? DIMENSIONS.SCREEN_WIDTH * 0.9
            : Props.w === 'half'
            ? DIMENSIONS.SCREEN_WIDTH * 0.4
            : DIMENSIONS.SCREEN_WIDTH * 0.9,
        marginVertical: Props.mV,
        alignSelf: 'center',
      }}>
      <View
        style={[
          styles.input,
          {
            height: 50,
            marginHorizontal: Props.mH,
            backgroundColor: Props.bgColor,
            borderColor: Props.bColor ? Props.bColor : COLORS.HALFBLACK,
            borderRadius: Props.bR ? Props.bR : 5,
            borderWidth: Props.bW ? Props.bW : 0,
          },
        ]}>
        {Props.IconLeft && <Props.IconLeft />}
        <View
          style={{
            marginHorizontal: 5,
            width: '80%',
            justifyContent: PLATFORM_IOS ? 'center' : 'flex-end',
            height: 50,
            paddingTop: 5,
            paddingBottom: PLATFORM_IOS ? 25 : 0,
          }}>
          <Text
            style={{
              left: 10,
              right: 0,
              alignItems: 'center',
              fontSize: 12,
              color: COLORS.BLACK,
              position: 'relative',
              top: PLATFORM_IOS ? -6 : 3,
              backgroundColor: COLORS.CREAM,
              borderWidth: 1,
              borderColor: COLORS.CREAM,
              borderRadius: Props.bgColor != COLORS.WHITE ? 10 : 0,
              marginHorizontal: 5,
              width: labelWidth,
              textAlign: 'center',
            }}>
            {Props.text}
          </Text>
          {Props.netherland_vat ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: isDark ? COLORS.BLACK : COLORS.BLACK,
                  marginRight: 5,
                }}>
                BEO
              </Text>
              <TextInput
                {...Props}
                importantForAutofill="no"
                // scrollEnabled={false}
                // onScroll={undefined}
                style={{
                  color: isDark ? COLORS.BLACK : COLORS.BLACK,
                  flex: 1,
                  // paddingBottom: 20
                }}
              />
            </View>
          ) : (
            <TextInput
              {...Props}
              importantForAutofill="no"
              // scrollEnabled={false}
              // onScroll={undefined}
              style={{
                color: isDark ? COLORS.BLACK : COLORS.BLACK,
                // paddingBottom: 20
              }}
            />
          )}
        </View>
        <View style={{width: '20%', alignItems: 'center', paddingLeft: 30}}>
          {Props.IconRight && <Props.IconRight />}
          {Props.passwordInput && (
            <TouchableOpacity onPress={Props.pasButton}>
              {Props.passwordInputIcon ? (
                <Image source={require('../../assets/images/passwod.png')} />
              ) : (
                <Eye />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {Props.errors && Props.touched && (
        <Text style={{color: 'red', fontSize: 11, textAlign: 'center'}}>
          {Props.errors}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10,
  },
});

export default memo(Input);

// import React, {FC, memo} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TextInputProps,
//   TouchableOpacity,
//   Image,
//   TextStyle,
//   StyleProp,
//   useColorScheme,
// } from 'react-native';
// import COLORS from '../constants/COLORS';
// import {PLATFORM_IOS, DIMENSIONS} from '../constants/DIMENSIONS';
// import {Eye} from "../../assets/images/Eye"

// export type Props = TextInputProps & {
//   mV?: number;
//   mH?: number;
//   IconLeft: any;
//   IconRight?: any;
//   text: string;
//   errors: any | undefined;
//   touched: any | undefined;
//   pasButton?: () => void;
//   bgColor: string;
//   bColor?: string;
//   bR?: number;
//   bW?: number;
//   passwordInput?: boolean | false;
//   passwordInputIcon?: boolean | false;
//   textWidth?: any;
//   w?: 'half' | 'full';

// };
// const Input: FC<Props> = ({...Props}) => {
//   const theme = useColorScheme();
//   const isDark = theme === 'dark';
//   return (
//     <View
//       style={{
//         width:
//           Props.w === 'full'
//             ? DIMENSIONS.SCREEN_WIDTH * 0.8
//             : Props.w === 'half'
//             ? DIMENSIONS.SCREEN_WIDTH * 0.4
//             : DIMENSIONS.SCREEN_WIDTH * 0.9,
//         marginVertical: Props.mV,
//         alignSelf: 'center',

//       }}>
//       <View
//         style={[
//           styles.input,
//           {
//             height: 50,
//             marginHorizontal: Props.mH,
//             backgroundColor: Props.bgColor,
//             borderColor: Props.bColor ? Props.bColor : COLORS.HALFBLACK,
//             //borderRadius: Props.bR ? Props.bR : 50,
//             borderWidth: Props.bW ? Props.bW : 0,
//             paddingBottom: PLATFORM_IOS ? 5 : 10,
//             borderRadius:5
//                  },
//         ]}>
//         {Props.IconLeft && <Props.IconLeft />}
//         <View
//           style={{
//             marginHorizontal: 5,
//             width: '80%',
//             justifyContent: PLATFORM_IOS ? 'center' : 'flex-end',
//             height: 50,
//             paddingTop: 5,
//             paddingBottom: PLATFORM_IOS ? 25 : 5,
//           }}>
//           <Text
//             style={{
//               fontSize: 12,
//               color: COLORS.BLACK,
//               position: 'relative',
//               top: PLATFORM_IOS ? -8 : 3,
//               backgroundColor: COLORS.CREAM,
//               width: Props.textWidth ? Props.textWidth : '30%',
//               paddingLeft: 10,
//               fontWeight:"500"
//               // borderWidth: 1,
//               // borderColor: COLORS.WHITE,
//               // borderRadius: Props.bgColor != COLORS.WHITE ? 10 : 0,
//               // textAlign: 'center',
//             }}>
//             {Props.text}
//           </Text>
//           <TextInput
//             {...Props}
//             // scrollEnabled={false}
//             // onScroll={undefined}
//             style={
//               {
//                 color: isDark ? COLORS.BLACK : COLORS.BLACK,
//                 // paddingBottom: PLATFORM_IOS?0: 13
//                 // backgroundColor:"red"
//               }
//             }
//           />
//         </View>
//         <View style={{width: '20%', alignItems: 'center', paddingLeft: 30}}>
//           {Props.IconRight && <Props.IconRight />}
//           {Props.passwordInput && (
//             <TouchableOpacity onPress={Props.pasButton}>
//               {Props.passwordInputIcon ? (
//                 <Image source={require('../../assets/images/passwod.png')} />

//               ) : (
//                   <Eye />
//               )}
//             </TouchableOpacity>
//           )}

//         </View>
//       </View>
//       {Props.errors && Props.touched && (
//         <Text style={{color: 'red', fontSize: 11, textAlign: 'center'}}>
//           {Props.errors}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     alignItems: 'center',
//     alignSelf: 'center',
//     flexDirection: 'row',
//     padding: 10,
//   },
// });

// export default memo(Input);
