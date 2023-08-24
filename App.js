import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Router from './src/navigation/Router';
import Maintainence from './src/Components/Maintainence';
import { useSelector } from 'react-redux';
export const navigationRef = createNavigationContainerRef();

export default function App() {
  const {maintainence} = useSelector((state) => state)

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
      <Maintainence isVisible={maintainence} />
      <Toast position="bottom" />
    </>
  );
}
