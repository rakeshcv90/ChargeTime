import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill="white"
      d="M0.999995 10.6667C0.999995 11.4 1.59999 12 2.33333 12H7.66666C8.39999 12 8.99999 11.4 8.99999 10.6667V2.66667H0.999995V10.6667ZM9.66666 0.666667H7.33333L6.66666 0H3.33333L2.66666 0.666667H0.333328V2H9.66666V0.666667Z"
                />
  </Svg>
)
export { SvgComponent as Delete }
