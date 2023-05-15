import { useNavigation } from '@react-navigation/native'
import { CadastroPetstyle } from './styles'
import "../../config/firebase"
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Layout, Text, Input, Button } from '@ui-kitten/components/ui';

export const CadastroPet = () => {
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState({
    nome: "",
    animal: "",
    raca: "",
    tipo: "",
    dataNascimento: "",
    sexo: ""
  });
  async function handleRegister() {
    if (value.nome === "" || value.animal === "" || value.raca === "" || value.tipo === "" || value.dataNascimento === "" || value.sexo === "") {
      setErrorMessage("É necessário o preenchimento de todos os campos.");
      return;
    }
    try {
      await addDoc(collection(db, "pets"), {
        nome: value.nome,
        animal: value.animal,
        raca: value.raca,
        tipo: value.tipo,
        dataNascimento: value.dataNascimento,
        sexo: value.sexo
      }).then(() => navigation.navigate("Home"));
    }
    catch (error: any) {
      setErrorMessage(error);
    }
  }

  return (
    <Layout style={CadastroPetstyle.View}>
      <Text category='h1' style={CadastroPetstyle.Text}>Cadastrar Pet</Text>

      {errorMessage ? <Text style={CadastroPetstyle.Erro}>{errorMessage}</Text> : null}

      <Text category='h6' style={CadastroPetstyle.Label}>Nome</Text>
      <Input style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, nome: text })}></Input>

      <Text category='h6' style={CadastroPetstyle.Label}>Animal</Text>
      <Input style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, animal: text })}></Input>

      <Text category='h6' style={CadastroPetstyle.Label}>Raça</Text>
      <Input style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, raca: text })}></Input>

      <Text category='h6' style={CadastroPetstyle.Label}>Tipo</Text>
      <Input style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, tipo: text })}></Input>

      <Text category='h6' style={CadastroPetstyle.Label}>Data Nascimento</Text>
      <Input style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, dataNascimento: text })}></Input>

      <Text category='h6' style={CadastroPetstyle.Label}>Sexo</Text>
      <Input style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, sexo: text })}></Input>

      <Button size='large' onPress={handleRegister} style={CadastroPetstyle.Button}>CADASTRAR</Button>
    </Layout>
  )
}