import { StatusBar } from 'expo-status-bar';
import { BackHandler, StyleSheet, Text, View, Alert as reactNativeAlert } from 'react-native';
import Navigation from './Navigation';
import { NativeWindStyleSheet } from 'nativewind';
import Appcontext from './Appcontext';
import Alert from './components/Alert';
import Slider from './screens/Slider';
import { useCallback, useEffect, useState } from 'react';
import { } from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [isTutorialDone, setisTutorialDone] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const item = await AsyncStorage.getItem("isTutorialDone")
        console.log(item, "this is item")
        if (item) {
          setisTutorialDone(true)
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <Appcontext setAppIsReady={setAppIsReady}>
      <StatusBar style="auto" />
      {/* <Alert /> */}
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {!isTutorialDone ? <Slider setisTutorialDone={setisTutorialDone} isTutorialDone={isTutorialDone} /> :
          <Navigation />}
      </View>
    </Appcontext>
  );
}
