import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={10}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="M5.678 8.857 1.821 5l3.857-3.857M2.357 5h7.821"
    />
  </Svg>
)
export { SvgComponent as LeftIcon }