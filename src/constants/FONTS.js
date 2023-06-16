import React from 'react';
import {PLATFORM_IOS} from './DIMENSIONS';

export const FONTS = {
  ROBOTO_BLACK: PLATFORM_IOS ? 'System' : 'Roboto-Black.ttf',
  ROBOTO_REGULAR: PLATFORM_IOS ? 'System' : 'Roboto-Regular.ttf',
  ROBOTO_ITALIC: PLATFORM_IOS ? 'System' : 'Roboto-Italic.ttf',
  ROBOTO_BOLD: PLATFORM_IOS ? 'System' : 'Roboto-Bold.ttf',
  ROBOTO_MEDIUM: PLATFORM_IOS ? 'System' : 'Roboto-Medium.ttf',
  ROBOTO_LIGHT: PLATFORM_IOS ? 'System' : 'Roboto-Light.ttf',
  MONTSERRAT_REGULAR: PLATFORM_IOS ? 'System' : 'Montserrat-Regular.ttf',
  MONTSERRAT_BOLD: PLATFORM_IOS ? 'System' : 'Montserrat-Bold.ttf',
  MONTSERRAT_ITALIC: PLATFORM_IOS ? 'System' : 'Montserrat-Italic.ttf',
};