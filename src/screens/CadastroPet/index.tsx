import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { CadastroPetstyle } from './styles'
import "../../config/firebase"
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const CadastroPet = () => {
    const navigation = useNavigation ()
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
        <View style={CadastroPetstyle.View}>
            <Text style={CadastroPetstyle.Text}>Cadastrar Pet</Text>
            {errorMessage ? <Text style={CadastroPetstyle.Erro}>{errorMessage}</Text> : null}
            <Text style={CadastroPetstyle.Label}>Nome</Text>
            <TextInput style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, nome: text })}></TextInput>
            <Text style={CadastroPetstyle.Label}>Animal</Text>
            <TextInput style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, animal: text })}></TextInput>
            <Text style={CadastroPetstyle.Label}>Raça</Text>
            <TextInput style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, raca: text })}></TextInput>
            <Text style={CadastroPetstyle.Label}>Tipo</Text>
            <TextInput style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, tipo: text })}></TextInput>
            <Text style={CadastroPetstyle.Label}>Data Nascimento</Text>
            <TextInput style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, dataNascimento: text })}></TextInput>
            <Text style={CadastroPetstyle.Label}>Sexo</Text>
            <TextInput style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, sexo: text })}></TextInput>
            <TouchableOpacity onPress={handleRegister}><Text style={CadastroPetstyle.Textbutton}>Cadastrar</Text></TouchableOpacity>
        </View>
    )
}