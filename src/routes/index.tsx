import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Inicio } from "../screens/Inicio";
import { CadastroUser } from "../screens/CadastroUser";
import { CadastroPet } from "../screens/CadastroPet";
import { Home } from "../screens/HomeUser";
import { ListSearchedPets } from "../screens/ListagemPet"
import { HomeFunc } from "../screens/HomeFunc";
import { CadastroServico } from "../screens/CadastroServico";
import { CadastroFunc } from "../screens/CadastroFunc";
import { useAuthentication } from "../hooks";

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  const { user } = useAuthentication()
  return (user ? (<Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Home" component={Home} />
    <Screen name="CadastroFunc" component={CadastroFunc} />
    <Screen name="CadastroPet" component={CadastroPet} />
    <Screen name="ListagemPet" component={ListSearchedPets} />
    <Screen name="HomeFunc" component={HomeFunc} />
    <Screen name="CadastroServico" component={CadastroServico} />
  </Navigator>) :
    (<Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Inicio" component={Inicio} />
      <Screen name="Login" component={Login} />
      <Screen name="CadastroUser" component={CadastroUser} />
    </Navigator>)
  );
};

export { AppRoutes };