import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <Path
      fill="black"
      d="M28 12H12C10.89 12 10.01 12.89 10.01 14L10 26C10 27.11 10.89 28 12 28H28C29.11 28 30 27.11 30 26V14C30 12.89 29.11 12 28 12ZM28 26H12V20H28V26ZM28 16H12V14H28V16Z"    />
  </Svg>
)
export { SvgComponent as CardNumber }