import { useNavigation } from '@react-navigation/native'
import { CadastroPetstyle } from './styles'
import "../../config/firebase"
import React, { useEffect, useState } from 'react';
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { Layout, Text, Input, Button } from '@ui-kitten/components/ui';
import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { useAuthentication } from '../../config/autentication';

interface ISendFiles {
  mimeType: string;
  name: string;
  size: number;
  type: string;
  uri: string;
}

interface IFiles {
  id: string;
  url: string;
  type: string;
}

export const CadastroPet = () => {
  const { user } = useAuthentication()
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSelect, setImageSelect] = useState<ISendFiles>();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    nome: "",
    animal: "",
    raca: "",
    tipo: "",
    idade: "",
    sexo: ""
  });
  async function handleRegister() {
    if (value.nome === "" || value.animal === "" || value.raca === "" || value.tipo === "" || value.idade === "" || value.sexo === "") {
      setErrorMessage("É necessário o preenchimento de todos os campos.");
      return;
    }
    try {
      const FotoPet = await UploadSingleImage(imageSelect)
      const refDoc = doc(db, `usuarios`, user.uid)
      await updateDoc(refDoc, {
        pets: arrayUnion({
          nome: value.nome,
          animal: value.animal,
          raca: value.raca,
          tipo: value.tipo,
          idade: value.idade,
          sexo: value.sexo,
          img: {
            id: FotoPet.id,
            url: FotoPet.url
          }
        })
      }).then(() => navigation.navigate("Home"));
    }
    catch (error: any) {
      setErrorMessage(error);
    }
  }

  const pickImage = async () => {
    let result: any = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      videoQuality: 1,
      allowsMultipleSelection: false,
      quality: 1,
    });
    if (result.canceled) {
      return;
    } else {
      setImageSelect(result.assets[0]);
      setLoading(true);
    }
  };

  const UploadSingleImage = async (image: ISendFiles) => {
    const id = uuidv4();
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const imageRef = ref(storage, `images/${id}`);
    const uploadStatus = uploadBytesResumable(imageRef, blob);
    const snapshot = await uploadStatus;
    return {
      id,
      url: await getDownloadURL(snapshot.ref),
    };
  };

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

      <Text category='h6' style={CadastroPetstyle.Label}>idade</Text>
      <Input style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, idade: text })}></Input>

      <Text category='h6' style={CadastroPetstyle.Label}>Sexo</Text>
      <Input style={CadastroPetstyle.TextInput} onChangeText={(text) => setValue({ ...value, sexo: text })}></Input>

      <Button size='large' onPress={pickImage} style={CadastroPetstyle.Button}>ADICIONAR IMAGEM</Button>

      <Button size='large' onPress={handleRegister} style={CadastroPetstyle.Button}>CADASTRAR</Button>
    </Layout>
  )
}