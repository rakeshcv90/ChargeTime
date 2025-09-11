import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={34}
    fill="none"
    {...props}>
    <G filter="url(#a)">
      <Path
        fill="#F84E4E"
        d="M20.387 15.653v-7.32c0-1.333-1.347-2.68-2.667-2.666V.333h-2.667v5.334H9.72V.333H7.053V3.64l12.68 12.667.654-.654Zm-2.347 2.36L5.987 5.933l-.014.014-4.28-4.28L0 3.333l4.48 4.48c-.04.174-.093.347-.093.52v7.307l4.666 4.693v4h6.667v-4l.64-.64 5.96 5.974L24 23.96l-5.96-5.947Z"
      />
    </G>
  </Svg>
);
export {SvgComponent as NoCharge};