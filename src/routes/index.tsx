import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Inicio } from "../screens/Inicio";

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
    return (
      <Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Login" component={Login} />
        <Screen name="Inicio" component={Inicio} />
      </Navigator>
    );
  };
  
  export { AppRoutes };