import * as React from 'react';
import {Path, Svg} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <Path
      fill="#1C1B1F"
      d="m6.875 15.3-6.6-6.6a.883.883 0 0 1-.213-.325A1.083 1.083 0 0 1 0 8c0-.133.021-.258.063-.375A.888.888 0 0 1 .275 7.3l6.6-6.6a.976.976 0 0 1 .688-.287.931.931 0 0 1 .712.287c.2.183.304.413.313.688A.925.925 0 0 1 8.3 2.1L3.4 7h11.175c.283 0 .521.096.713.288.192.192.288.43.287.712a.97.97 0 0 1-.287.713.963.963 0 0 1-.713.287H3.4l4.9 4.9c.183.183.28.417.288.7a.868.868 0 0 1-.288.7c-.183.2-.417.3-.7.3a.988.988 0 0 1-.725-.3Z"
    />
  </Svg>
);
export {SvgComponent as BackButton};
