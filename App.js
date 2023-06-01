import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { NativeWindStyleSheet } from 'nativewind';
import Appcontext from './Appcontext';
import Alert from './components/Alert';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <Appcontext>
      <StatusBar style="auto" />
      {/* <Alert /> */}
      <Navigation />
    </Appcontext>
  );
}
