import { useNavigation } from '@react-navigation/native'
import { CadastroUserstyle } from './styles'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import "../../config/firebase"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from '../../config/firebase';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile, } from 'firebase/auth'
import { ScrollView } from "react-native";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { uuidv4 } from "@firebase/util";

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

const CadastroUser: React.FC = () => {
    const navigation = useNavigation()
    const [password, setPassword] = useState("");
    const [passwordErroStyle, setPasswordErroStyle] = useState(false);
    const auth = getAuth();
    const [passwordMessageErro, setPasswordMessageErro] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [secury, setSecure] = useState(true);
    const [imageSelect, setImageSelect] = useState<ISendFiles>();
    const [loading, setLoading] = useState(false);

    const erroLogs = (valueOfError: any) => {
        let erroLog = "";
        if (true) {
            return (erroLog = "ERRO");
        }
    }

    const [value, setValue] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        cpf: "",
        estado: "",
        cidade: "",
        bairro: "",
        numero: "",
        img: null,
        nivel: "cliente"
    });
    async function handleRegister() {
        setPasswordErroStyle(false);
        setErrorMessage("");
        if (password !== confirmPassword) {
            setPasswordMessageErro("Senhas diferentes");
            setPasswordErroStyle(true);
            return;
        }
        if (value.nome === "" || value.email === "" || value.senha === "" || value.telefone === "" || value.cpf === "" || value.estado === "" || value.cidade === "" || value.bairro === "" || value.numero === "") {
            setErrorMessage("É necessário o preenchimento de todos os campos.");
            return;
        }
        try {
            if (imageSelect) {
                const Foto = await UploadSingleImage(imageSelect);
                value.img = {
                  id: Foto.id,
                  url: Foto.url,
                };
              }
            await createUserWithEmailAndPassword(auth, value.email, value.senha)
                .then(async (result) => {
                    const prevUser = auth.currentUser;
                    const usersRef = doc(db, "usuarios", String(prevUser?.uid));
                    await setDoc(usersRef, {
                        id: String(prevUser?.uid),
                        name: value.nome,
                        email: value.email,
                        telefone: value.telefone,
                        cpf: value.cpf,
                        estado: value.estado,
                        cidade: value.cidade,
                        bairro: value.bairro,
                        numero: value.numero,
                        nivel: value.nivel,
                        img: value.img
                    }).then(() => navigation.navigate("Login"))
                })
                .catch((err) => console.log(err));
        }
        catch (error: any) {
            error = erroLogs(error.code);
            setErrorMessage(error);
        }
    };

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
        <ScrollView>

            <Layout style={CadastroUserstyle.View}>

                <Text category='h1' style={CadastroUserstyle.Text}>Cadastrar-se</Text>

                <Text category='h6' style={CadastroUserstyle.Label}>Nome</Text>
                <Input style={CadastroUserstyle.Input} value={value.nome} onChangeText={(text) => setValue({ ...value, nome: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>Email</Text>
                <Input style={CadastroUserstyle.Input} value={value.email} onChangeText={(text) => setValue({ ...value, email: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>Telefone</Text>
                <Input style={CadastroUserstyle.Input} value={value.telefone} onChangeText={(text) => setValue({ ...value, telefone: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>CPF</Text>
                <Input style={CadastroUserstyle.Input} value={value.cpf} onChangeText={(text) => setValue({ ...value, cpf: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>Estado</Text>
                <Input style={CadastroUserstyle.Input} value={value.estado} onChangeText={(text) => setValue({ ...value, estado: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>Cidade</Text>
                <Input style={CadastroUserstyle.Input} value={value.cidade} onChangeText={(text) => setValue({ ...value, cidade: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>Bairro</Text>
                <Input style={CadastroUserstyle.Input} value={value.bairro} onChangeText={(text) => setValue({ ...value, bairro: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>Número</Text>
                <Input style={CadastroUserstyle.Input} value={value.numero} onChangeText={(text) => setValue({ ...value, numero: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>Senha</Text>
                <Input secureTextEntry={secury} style={CadastroUserstyle.Input} value={password} placeholder="Senha" onChangeText={(text) => { setPassword(text), setValue({ ...value, senha: text }); }} />

                {passwordErroStyle ? (
                    <Text>{passwordMessageErro}</Text>
                ) : null}

                <Text category='h6' style={CadastroUserstyle.Label}>Confirmar Senha</Text>
                <Input secureTextEntry={secury} style={CadastroUserstyle.Input} value={confirmPassword} placeholder="Confirmação de Senha" onChangeText={(text) => setConfirmPassword(text)} />

                {passwordErroStyle ? (
                    <Text>{passwordMessageErro}</Text>
                ) : null}

                <Button size='large' onPress={pickImage} style={CadastroUserstyle.Button}>ADICIONAR IMAGEM</Button>

                <Button size='large' style={CadastroUserstyle.Button} onPress={handleRegister}>CADASTRAR</Button>

            </Layout>

        </ScrollView>
    )
}

export { CadastroUser };
