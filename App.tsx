import { StyleSheet } from 'react-native';
import { registerRootComponent } from "expo";
import "./src/config/firebase";
import { AppRoutes } from "./src/routes/index";
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout
        style={{
          flex: 1,
        }}
      >
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </Layout>
    </ApplicationProvider>
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