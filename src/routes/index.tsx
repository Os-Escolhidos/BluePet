import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Inicio } from "../screens/Inicio";
import { CadastroUser } from "../screens/CadastroUser";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
    return (
      <Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen name="CadastroUser" component={CadastroUser} />
        <Screen name="Login" component={Login} />
        <Screen name="Inicio" component={Inicio} />
      </Navigator>
    );
  };
  
  export { AppRoutes };