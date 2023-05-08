import { useNavigation } from '@react-navigation/native'
import { CadastroUserstyle } from './styles'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import "../../config/firebase"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile, } from 'firebase/auth'



export const CadastroUser = () => {
    const navigation = useNavigation()
    const [password, setPassword] = useState("");
    const [passwordErroStyle, setPasswordErroStyle] = useState(false);
    const auth = getAuth();
    const [passwordMessageErro, setPasswordMessageErro] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const erroLogs = (valueOfError: any) => {
        let erroLog = "";
        if (true) {
            return (erroLog = "ERRO");
        }
    }



    const [value, setValue] = useState({
        nome: "",
        email: "",
        senha: ""
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
        try {
            await createUserWithEmailAndPassword(auth, value.email, value.senha)
                .then(async (result) => {
                    const prevUser = auth.currentUser;
                    const usersRef = doc(db, "usuarios", String(prevUser?.uid));
                    await setDoc(usersRef, {
                        id: String(prevUser?.uid),
                        name: value.nome,
                        email: value.email,
                    })
                })
                .catch((err) => console.log(err));
            }
            catch (error: any) {
                error = erroLogs(error.code);
                setErrorMessage(error);
            }
            if (true) {
                () => navigation.navigate("Home")
            }
        };


        return (
            <Layout style={CadastroUserstyle.View}>

                <Text category='h1' style={CadastroUserstyle.Text}>Cadastrar-se</Text>

                <Text category='h6' style={CadastroUserstyle.Label}>Nome</Text>
                <Input style={CadastroUserstyle.Input} value={value.nome} onChangeText={(text) => setValue({ ...value, nome: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>Email</Text>
                <Input style={CadastroUserstyle.Input} value={value.email} onChangeText={(text) => setValue({ ...value, email: text })} />

                <Text category='h6' style={CadastroUserstyle.Label}>Senha</Text>
                <Input style={CadastroUserstyle.Input} value={password} placeholder={"Senha"} onChangeText={(text) => { setPassword(text), setValue({ ...value, senha: text }); }} />

                {passwordErroStyle ? (
                    <Text>{passwordMessageErro}</Text>
                ) : null}

                <Text category='h6' style={CadastroUserstyle.Label}>Confirmar Senha</Text>
                <Input style={CadastroUserstyle.Input} value={confirmPassword} placeholder={"Confirmação de Senha"} onChangeText={(text) => setConfirmPassword(text)} />

                {passwordErroStyle ? (
                    <Text>{passwordMessageErro}</Text>
                ) : null}

                <Button size='large' style={CadastroUserstyle.Button} onPress={handleRegister}>CADASTRAR</Button>

            </Layout>
        )
    }