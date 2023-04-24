import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from "expo";
import "./src/config/firebase";
import { AppRoutes } from "./src/routes/index";

import { NavigationContainer } from "@react-navigation/native";
import React from 'react';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
registerRootComponent(App);