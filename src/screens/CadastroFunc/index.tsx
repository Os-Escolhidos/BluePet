import { useNavigation } from '@react-navigation/native'
import { CadastroFuncstyle } from './styles'
import { Button, IndexPath, Input, Layout, Select, SelectItem, Text } from '@ui-kitten/components'
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

const CadastroFunc: React.FC = () => {
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
    const [photoError, setPhotoError] = useState("");
    const [photoErrorstyle, setPhotoErrorstyle] = useState(false);

    const data = [
        'cliente',
        'funcionario'
    ];
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    const displayValue = data[selectedIndex.row];
    const renderOption = (title, index) => (
        <SelectItem key={index} title={title} />
    );

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
        nivel: data[selectedIndex.row]
    });
    async function handleRegister() {
        setPasswordErroStyle(false);
        setErrorMessage("");
        if (password !== confirmPassword) {
            setPasswordMessageErro("Senhas diferentes");
            setPasswordErroStyle(true);
            return;
        }
        if (value.nome === "" || value.email === "" || value.senha === "") {
            setErrorMessage("É necessário o preenchimento de todos os campos.");
            return;
        }
        if (value.nivel === 'funcionario' && !imageSelect) {
            setPhotoError("É necessário selecionar uma foto")
            setPhotoErrorstyle(true);
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
                    }).then(() => navigation.navigate("HomeFunc"))
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
            <Layout style={CadastroFuncstyle.View}>

                <Text category='h1' style={CadastroFuncstyle.Text}>Cadastrar Funcionário</Text>

                <Text category='h6' style={CadastroFuncstyle.Label}>Nome</Text>
                <Input style={CadastroFuncstyle.Input} value={value.nome} onChangeText={(text) => setValue({ ...value, nome: text })} />

                <Text category='h6' style={CadastroFuncstyle.Label}>Email</Text>
                <Input style={CadastroFuncstyle.Input} value={value.email} onChangeText={(text) => setValue({ ...value, email: text })} />

                <Text category='h6' style={CadastroFuncstyle.Label}>Telefone</Text>
                <Input style={CadastroFuncstyle.Input} value={value.telefone} onChangeText={(text) => setValue({ ...value, telefone: text })} />

                <Text category='h6' style={CadastroFuncstyle.Label}>CPF</Text>
                <Input style={CadastroFuncstyle.Input} value={value.cpf} onChangeText={(text) => setValue({ ...value, cpf: text })} />

                <Text category='h6' style={CadastroFuncstyle.Label}>Estado</Text>
                <Input style={CadastroFuncstyle.Input} value={value.estado} onChangeText={(text) => setValue({ ...value, estado: text })} />

                <Text category='h6' style={CadastroFuncstyle.Label}>Cidade</Text>
                <Input style={CadastroFuncstyle.Input} value={value.cidade} onChangeText={(text) => setValue({ ...value, cidade: text })} />

                <Text category='h6' style={CadastroFuncstyle.Label}>Bairro</Text>
                <Input style={CadastroFuncstyle.Input} value={value.bairro} onChangeText={(text) => setValue({ ...value, bairro: text })} />

                <Text category='h6' style={CadastroFuncstyle.Label}>Número</Text>
                <Input style={CadastroFuncstyle.Input} value={value.numero} onChangeText={(text) => setValue({ ...value, numero: text })} />

                <Text category='h6' style={CadastroFuncstyle.Label}>Nivel</Text>
                <Select style={CadastroFuncstyle.Input} value={displayValue} selectedIndex={selectedIndex} onSelect={(index) => {
                    setSelectedIndex(index as IndexPath);
                    setValue({ ...value, nivel: data[(index as IndexPath).row] });
                    setPhotoErrorstyle(false);
                }}>
                    {data.map(renderOption)}
                </Select>

                <Text category='h6' style={CadastroFuncstyle.Label}>Senha</Text>
                <Input secureTextEntry={secury} style={CadastroFuncstyle.Input} value={password} placeholder="Senha" onChangeText={(text) => { setPassword(text), setValue({ ...value, senha: text }); }} />

                {passwordErroStyle ? (
                    <Text style={CadastroFuncstyle.erro}>{passwordMessageErro}</Text>
                ) : null}

                <Text category='h6' style={CadastroFuncstyle.Label}>Confirmar Senha</Text>
                <Input secureTextEntry={secury} style={CadastroFuncstyle.Input} value={confirmPassword} placeholder="Confirmação de Senha" onChangeText={(text) => setConfirmPassword(text)} />

                {passwordErroStyle ? (
                    <Text style={CadastroFuncstyle.erro}>{passwordMessageErro}</Text>
                ) : null}

                <Button size='large' onPress={pickImage} style={CadastroFuncstyle.Button}>ADICIONAR IMAGEM</Button>

                {photoErrorstyle ? (
                    <Text style={CadastroFuncstyle.erro}>{photoError}</Text>
                ) : null}

                <Button size='large' style={CadastroFuncstyle.Button} onPress={handleRegister}>CADASTRAR</Button>

            </Layout>
        </ScrollView>
    )
}

export { CadastroFunc };
