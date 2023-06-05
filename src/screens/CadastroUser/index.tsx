import { useNavigation } from '@react-navigation/native'
import { CadastroUserstyle } from './styles'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import "../../config/firebase"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile, } from 'firebase/auth'
import { ScrollView } from "react-native";




const CadastroUser: React.FC = () => {
    const navigation = useNavigation()
    const [password, setPassword] = useState("");
    const [passwordErroStyle, setPasswordErroStyle] = useState(false);
    const auth = getAuth();
    const [passwordMessageErro, setPasswordMessageErro] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [secury, setSecure] = useState(true);

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
        cep: "",
        numero: "",
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
        if (value.nome === "" || value.email === "" || value.senha === "" || value.telefone === "" || value.cpf === "" || value.cep === "" || value.numero === "") {
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
                        telefone: value.telefone,
                        cpf: value.cpf,
                        cep: value.cep,
                        numero: value.numero,
                        nivel: value.nivel
                    }).then(() => navigation.navigate("Login"))
                })
                .catch((err) => console.log(err));
        }
        catch (error: any) {
            error = erroLogs(error.code);
            setErrorMessage(error);
        }
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

            <Text category='h6' style={CadastroUserstyle.Label}>CEP</Text>
            <Input style={CadastroUserstyle.Input} value={value.cep} onChangeText={(text) => setValue({ ...value, cep: text })} />

            <Text category='h6' style={CadastroUserstyle.Label}>Numero</Text>
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

            <Button size='large' style={CadastroUserstyle.Button} onPress={handleRegister}>CADASTRAR</Button>

        </Layout>

    </ScrollView>
    )
}

export { CadastroUser };
