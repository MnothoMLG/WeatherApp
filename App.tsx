import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContextProvider from './AppContext';
import AppContainer from './navigation';


export default function App() {
  return (
      <AppContextProvider>  
        <AppContainer />
      </AppContextProvider>
  );
}

