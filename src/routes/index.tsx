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
        <Screen name="CadastroPet" component={CadastroPet} />
        <Screen name="Login" component={Login} />
        <Screen name="Inicio" component={Inicio} />
        <Screen name="ListagemPet" component={ListSearchedPets} />
        <Screen name="HomeFunc" component={HomeFunc} />
        <Screen name="CadastroServico" component={CadastroServico} />
      </Navigator>
    );
  };
  
  export { AppRoutes };