import { ListServstyle } from './styles'
import { Button, Card, Input, Layout, Modal, Text } from "@ui-kitten/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthentication } from '../../config/autentication';
import { ScrollView } from 'react-native';

interface Iconsulta {
    body: {
        data: String;
        horario: String;
        email: String;
    }[]
}

const ListSearchedConsultasFunc = () => {

    const [consultas, setConsultas] = useState<Iconsulta[]>([])
    const [visible, setVisible] = React.useState(false);
    const { user } = useAuthentication()
    const [errorMessage, setErrorMessage] = useState("");
    const [openedMenu, setOpenedMenu] = useState(Array(consultas?.length).fill(false));

    const findAllConsultas = useCallback(
        async () => {
            let consultasData: any[] = [];
            const collect = collection(db, `consultas`);
            const queryFilterDate = query(
                collect
            );
            const querySnapshot = await getDocs(queryFilterDate);
            querySnapshot.forEach((doc) => {
                consultasData.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setConsultas(consultasData);
        },
        [setConsultas]
    );

    const [value, setValue] = useState({
        doencas: "",
        tratamentos: "",
        preco: "",
        responsavel: ""
    });
    async function handleRegister(dados: any) {
        if (value.doencas === "" || value.tratamentos === "" || value.preco === "" || value.responsavel === "") {
            setErrorMessage("É necessário o preenchimento de todos os campos.");
            return;

        }
        try {
            const consultaRef = collection(db, `consultas`)
            const queryConsultaBuilder = query(consultaRef, where("id", "==", String(dados.id)))
            const querySnaphshot = await getDocs(queryConsultaBuilder)
            querySnaphshot.forEach(async (res) => {
                await setDoc(res.ref, {
                    doencas: value.doencas || "",
                    tratamentos: value.tratamentos || "",
                    preco: value.preco || "",
                    resposavel: value.responsavel || ""
                }, { merge: true })
                const clienteId = res.data().idCli
                const refCliente = doc(db, `usuarios`, clienteId)
                const getCliente = await getDoc(refCliente)
                const consultas = getCliente.data().consultas
                const findConsulta = Object.keys(consultas).findIndex((key) => consultas[key].id === dados.id);
                if (findConsulta !== -1) {
                    console.log(findConsulta)
                    const updateConsulta = [...consultas];
                    updateConsulta[findConsulta] = {
                        ...updateConsulta[findConsulta],
                        doencas: value.doencas || "",
                        tratamentos: value.tratamentos || "",
                        preco: value.preco || "",
                        resposavel: value.responsavel || ""
                    };
                    console.log(updateConsulta)
                    await updateDoc(getCliente.ref, { consultas: updateConsulta }).then(() => setVisible(false));
                }
            })
        }
        catch (error: any) {
            setErrorMessage(error);
        }
    }

    useEffect(() => {
        findAllConsultas()
    })

    const handleSelectedUser = (index: number) => {
        const updatedMenuState = [...openedMenu];
        updatedMenuState[index] = !updatedMenuState[index];
        setVisible(true)
        setOpenedMenu(updatedMenuState)
    }

    return (
        <ScrollView>
        <Layout style={ListServstyle.View}>
            {
                consultas && consultas?.map((i: any, index) => {
                    return (
                        <Card key={i.data} style={ListServstyle.Corpocard}>
                            <Text>Data: {i.data}</Text>
                            <Text>Horário: {i.horario}</Text>
                            <Text></Text>
                            <Text>RETORNO</Text>
                            <Text></Text>
                            <Text>Doenças Encontradas: {i.doencas}</Text>
                            <Text>Tratamentos realizados: {i.tratamentos}</Text>
                            <Text>Custo: {i.preco}</Text>
                            <Text>Responsável: {i.responsavel}</Text>
                            <Button style={ListServstyle.Button} onPress={() => handleSelectedUser(index)}>EMITIR FICHA MÉDICA</Button>
                            {openedMenu[index] ? (
                                <Modal
                                    visible={visible}
                                    onBackdropPress={() => setVisible(false)}
                                    style={ListServstyle.backdrop}
                                >
                                    <Card disabled={true}>
                                        <Text category='h6' style={ListServstyle.Label}>Doença Encontrada</Text>
                                        <Input style={ListServstyle.TextInput} onChangeText={(text) => setValue({ ...value, doencas: text })}></Input>

                                        <Text category='h6' style={ListServstyle.Label}>Tratamento Realizado</Text>
                                        <Input style={ListServstyle.TextInput} onChangeText={(text) => setValue({ ...value, tratamentos: text })}></Input>

                                        <Text category='h6' style={ListServstyle.Label}>Custo</Text>
                                        <Input style={ListServstyle.TextInput} onChangeText={(text) => setValue({ ...value, preco: text })}></Input>

                                        <Text category='h6' style={ListServstyle.Label}>Responsável</Text>
                                        <Input style={ListServstyle.TextInput} onChangeText={(text) => setValue({ ...value, responsavel: text })}></Input>

                                        <Button style={ListServstyle.Button} onPress={() => handleRegister(i)}>ENVIAR</Button>
                                    </Card>
                                </Modal>
                            ) : null}
                        </Card>
                    )
                })
            }

        </Layout>
        </ScrollView>
    );
};

export { ListSearchedConsultasFunc };