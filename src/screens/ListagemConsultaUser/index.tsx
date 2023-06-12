import { useNavigation, useRoute } from "@react-navigation/native";
import { ListPets } from "../../components/ListPets";
import { ListPetstyle } from './styles'
import { Avatar, Button, Card, Layout, Text } from "@ui-kitten/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { database, db } from "../../config/firebase";
import { useAuthentication } from "../../config/autentication";
import { ImageBackground, View, Image, RefreshControl } from 'react-native';
import { ScrollView } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { Input } from "@ui-kitten/components/ui";

interface Iconsultas {
  id: String;
  body: {
    data: String;
    horario: String;
    doencas: String;
    tratamentos: String;
    preco: String;
    responsavel: String;
  }[]
}

const ListSearchedConsultas = () => {

  const [Consultas, setConsultas] = useState<Iconsultas[]>([])
  const { user } = useAuthentication()
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [editingConsultaId, setEditingConsultaId] = useState<string | null>(null);
  const [editingConsultaData, setEditingConsultaData] = useState<any>(null);
  const [openedMenu, setOpenedMenu] = useState(Array(Consultas?.length).fill(false));



  const findAllConsultas = useCallback(
    async () => {
      setConsultas([]);
      let consultasData: any[] = [];
      const collect = collection(db, `usuarios`);
      const queryFilterDate = query(
        collect, where("id", "==", String(user?.uid))
      );
      const querySnapshot = await getDocs(queryFilterDate);
      querySnapshot.forEach((doc) => {
        consultasData.push({
          id: doc.id,
          body: doc.data().consultas,
        });
      });
      setConsultas(consultasData);
    },
    [setConsultas, user]
  );
  

  const DeleteConsulta = async (idUser: any, idconsulta: any) => {
    const refDatabase = doc(collection(db, "usuarios"), idUser);
    const querySnapshot = await getDoc(refDatabase)
    const userData = querySnapshot.data();
    const gruposArray = userData?.consultas || [];
    const updatedGruposArray = gruposArray.filter((item: any) => item.data !== idconsulta);
    await updateDoc(refDatabase, {
      consultas: updatedGruposArray
    });
    findAllConsultas();
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setConsultas([])
    findAllConsultas()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleSelectedUser = (index: number) => {
    const updatedMenuState = [...openedMenu];
    updatedMenuState[index] = !updatedMenuState[index];
    console.log(index)
    setOpenedMenu(updatedMenuState)
  }

  useEffect(() => {
    findAllConsultas()
  }, [user?.uid])

  return (
    <Layout style={ListPetstyle.View}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={ListPetstyle.sla}>

        {
          Consultas && Consultas[0]?.body?.map((i, index) => {
            return (
              <Card style={ListPetstyle.Corpocard}>
                {openedMenu[index] ? (
                  // Modo de edição - renderizar campos de edição
                  <View style={ListPetstyle.slaaa}>
                    <Input
                      label="Data"
                      value={editingConsultaData?.body?.data || ''}
                      onChangeText={(text) =>
                        setEditingConsultaData({ ...editingConsultaData, body: { ...editingConsultaData?.body, data: text } })
                      }
                    />
                  
                  </View>
                ) : (
                  // Modo de exibição - renderizar informações estáticas
                  <View style={ListPetstyle.organizacao}>
                    <View>
                      <Text>Data: {i.data}</Text>
                      <Text>Horário: {i.horario}</Text>
                      <Text></Text>
                      <Text>RETORNO</Text>
                      <Text></Text>
                      <Text>Doenças Encontradas: {i.doencas}</Text>
                      <Text>Tratamentos realizados: {i.tratamentos}</Text>
                      <Text>Custo: {i.preco}</Text>
                      <Text>Responsável: {i.responsavel}</Text>
                    </View>
                  </View>
                )}
                <View style={ListPetstyle.slaa}>
                  <Button
                    style={ListPetstyle.button}
                    appearance='outline'
                    status='danger'
                    size='tiny'
                    onPress={() => { DeleteConsulta(user?.uid, i.data) }}
                  >
                    DELETE
                  </Button>
                </View>
              </Card>
            )
          })
        }
      </ScrollView>
    </Layout>

  );
};

export { ListSearchedConsultas };
