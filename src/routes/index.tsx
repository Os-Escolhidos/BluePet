/* import React from "react";
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
import { useAuthentication } from "../hooks";
import { ListSearchedFunc } from "../screens/ListagemFunc";

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
    <Screen name="ListagemFunc" component={ListSearchedFunc} />   
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
      <Screen name="HomeFunc" component={HomeFunc} />
    </Navigator>)
  );
};

export { AppRoutes }; */
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
import { ListSearchedFunc } from "../screens/ListagemFunc";
import { AgendarConsulta } from "../screens/AgendarConsulta";
import { ListSearchedConsultas } from "../screens/ListagemConsultaUser";
import { ListSearchedConsultasFunc } from "../screens/ListagemConsultaFunc";
import { PgUser } from "../screens/PaginaUsuario";

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
        <Screen name="ListagemFunc" component={ListSearchedFunc} />   
        <Screen name="ListagemConsultasUser" component={ListSearchedConsultas} />
        <Screen name="AgendarConsulta" component={AgendarConsulta} />
        <Screen name="ListagemConsultaFunc" component={ListSearchedConsultasFunc} />
        <Screen name="PaginaUsuario" component={PgUser} />
      </Navigator>
    );
  };
  
  export { AppRoutes };
