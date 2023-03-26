import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { CadastroUser } from "../screens/CadastroUser";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
    return (
      <Navigator
        initialRouteName="CadastroUser"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen name="CadastroUser" component={CadastroUser} />
        <Screen name="Login" component={Login} />
      </Navigator>
    );
  };
  
  export { AppRoutes };