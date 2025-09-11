import React from 'react';
import {Dimensions, Platform} from 'react-native'

const {height, width} = Dimensions.get('window')

export const DIMENSIONS = {
    SCREEN_HEIGHT: height,
    SCREEN_WIDTH: width,
}

export const PLATFORM_IOS = Platform.OS =='ios'
