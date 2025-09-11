import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Line = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={320}
    height={2}
    fill="none"
    {...props}
  >
    <Path stroke="#B1D34F" strokeDasharray="2 2" d="M0 1h320" />
  </Svg>
)
export default Line;