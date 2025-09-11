import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={32}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        fill="#3A72DE"
        d="M13.347 5.333 13.333 0h-2.666v5.333H5.333V0H2.667v5.333h-.014C1.333 5.32 0 6.653 0 7.987v7.32L4.667 20v4h6.666v-4L16 15.32V7.987c0-1.334-1.333-2.667-2.653-2.654Z"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export { SvgComponent as OnlineCharge }