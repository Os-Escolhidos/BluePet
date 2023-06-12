import { useNavigation } from '@react-navigation/native';
import { Loginstyle } from './styles'
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import React, { useEffect, useState } from "react";
import { Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const authFirebase = getAuth();
const Login: React.FC = () => {
    const navigation = useNavigation()
    const [secury, setSecury] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const GetDocUsuario = async (usuarioUid) => {
      const collect = doc(collection(db, "usuarios"), usuarioUid);
      const querySnapshot = await getDoc(collect);
      const userData = querySnapshot.data();

      return userData.nivel
  }

    const [value, setValue] = useState({
        email: "",
        senha: "",
      });

    async function Login() {
        if (value.email === "" || value.senha === "") {
          setValue({
            ...value,
          });
          return;
        }
        try {
          await signInWithEmailAndPassword(
            authFirebase,
            value.email,
            value.senha
          ).then(async () => {
            const prevUser = authFirebase.currentUser;
            const nivelUser = await GetDocUsuario(String(prevUser?.uid)).then((res) => res)

            setValue({email: '', senha: ''})

            if (nivelUser === "cliente") {
                navigation.navigate("Home");
            }
            else {
                navigation.navigate("HomeFunc")
            }
        });
        } catch (error: any) {
          console.log(error);
          setErrorMessage(error);
        }
      }

    return (
        <Layout style={Loginstyle.View}>
            <Text category='h1' style={Loginstyle.Text}>Login</Text>

            <Image style={{width:250, height:250}} source={{uri:'https://cdn.discordapp.com/attachments/971523395818774569/1089640762683170876/14877551_3500_2_13-removebg-preview_1.png'}}></Image>

            <Text category='h6' style={Loginstyle.Label}>Email</Text>
            <Input style={Loginstyle.Input} onChangeText={(text) => setValue({ ...value, email: text })} value={value.email} autoCorrect={false}/>

            <Text category='h6' style={Loginstyle.Label}>Senha</Text>
            <Input style={Loginstyle.Input} onChangeText={(text) => setValue({ ...value, senha: text })} secureTextEntry={secury} value={value.senha} placeholder="Senha" autoCapitalize="none" autoCorrect={false}/>

            <Text category='c2' style={Loginstyle.Textinho}>Esqueceu a senha ? =)</Text>

            <Button size='large' onPress={Login} style={Loginstyle.Button}>LOGIN</Button>

            <Layout style={Loginstyle.separator}/>

            <Text category='c2' style={Loginstyle.Textinho}>Ainda não possui uma conta ? Criar conta </Text>
        </Layout>
    )
}
export { Login };