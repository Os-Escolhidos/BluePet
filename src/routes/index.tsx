import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Inicio } from "../screens/Inicio";
import { CadastroUser } from "../screens/CadastroUser";
import { CadastroPet } from "../screens/CadastroPet";
import { Home } from "../screens/HomeUser";
import { ListSearchedPets } from "../screens/ListagemPet"
import { ListSearchedServicos } from "../screens/ListagemServico"
import { HomeFunc } from "../screens/HomeFunc";
import { CadastroServico } from "../screens/CadastroServico";
import { CadastroFunc } from "../screens/CadastroFunc";
import { AgendarConsulta } from "../screens/AgendarConsulta";

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
        <Screen name="CadastroFunc" component={CadastroFunc} />
        <Screen name="CadastroPet" component={CadastroPet} />
        <Screen name="Login" component={Login} />
        <Screen name="Inicio" component={Inicio} />
        <Screen name="ListagemPet" component={ListSearchedPets} />
        <Screen name="ListagemServico" component={ListSearchedServicos} />
        <Screen name="HomeFunc" component={HomeFunc} />
        <Screen name="CadastroServico" component={CadastroServico} />
        <Screen name="AgendarConsulta" component={AgendarConsulta} />
      </Navigator>
    );
  };
  
  export { AppRoutes };