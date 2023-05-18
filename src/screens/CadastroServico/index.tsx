import { useNavigation } from '@react-navigation/native'
import { CadastroServicostyle } from './styles'
import "../../config/firebase"
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Layout, Text, Input, Button } from '@ui-kitten/components/ui';

export const CadastroServico = () => {
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState({
    nome: "",
    descricao: "",
    preco: ""
  });
  async function handleRegister() {
    if (value.nome === "" || value.descricao === "" || value.preco === "" ) {
      setErrorMessage("É necessário o preenchimento de todos os campos.");
      return;
    }
    try {
      await addDoc(collection(db, "servicos"), {
        nome: value.nome,
        descricao: value.descricao,
        preco: value.preco,
      }).then(() => navigation.navigate("HomeFunc"));
    }
    catch (error: any) {
      setErrorMessage(error);
    }
  }

  return (
    <Layout style={CadastroServicostyle.View}>
      <Text category='h1' style={CadastroServicostyle.Text}>Cadastrar Serviço ou Produto</Text>

      {errorMessage ? <Text style={CadastroServicostyle.Erro}>{errorMessage}</Text> : null}

      <Text category='h6' style={CadastroServicostyle.Label}>Nome</Text>
      <Input style={CadastroServicostyle.TextInput} onChangeText={(text) => setValue({ ...value, nome: text })}></Input>

      <Text category='h6' style={CadastroServicostyle.Label}>Descrição</Text>
      <Input style={CadastroServicostyle.TextInput} onChangeText={(text) => setValue({ ...value, descricao: text })}></Input>

      <Text category='h6' style={CadastroServicostyle.Label}>Preço</Text>
      <Input style={CadastroServicostyle.TextInput} onChangeText={(text) => setValue({ ...value, preco: text })}></Input>

      <Button size='large' onPress={handleRegister} style={CadastroServicostyle.Button}>CADASTRAR</Button>
    </Layout>
  )
}