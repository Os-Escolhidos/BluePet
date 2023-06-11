import { ListServstyle } from './styles'
import { Button, Card, Layout, Text } from "@ui-kitten/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { RefreshControl, ScrollView, View } from 'react-native';

interface Iservico {
  body: {
    nome: String;
    descricao: String;
    preco: Number;
  }[]
}

const ListSearchedServicos = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [servicos, setServicos] = useState<Iservico[]>([])

  const findAllServicos = useCallback(
    async () => {
      let servicosData: any[] = [];
      const collect = collection(db, `servicos`);
      const queryFilterDate = query(
        collect
      );
      const querySnapshot = await getDocs(queryFilterDate);
      querySnapshot.forEach((doc) => {
        servicosData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setServicos(servicosData);
    },
    [setServicos]
  );

  const SaiFora = useCallback(async (servId: string) => {
    try {
      await deleteDoc(doc(db, 'servicos', servId));
      console.log('Serviço/Produto excluído com sucesso!');
      // Atualize a lista de funcionários após a exclusão
      findAllServicos();
    } catch (error) {
      console.error('Erro ao excluir o Serviço/Produto:', error);
    }
  }, [findAllServicos]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setServicos([])
    findAllServicos()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);


  useEffect(() => {
    findAllServicos()
  })

  return (
    <Layout style={ListServstyle.View}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text style={ListServstyle.Texto}>Produtos/Serviços</Text>
        {
          servicos && servicos?.map((i: any) => {
            return (
              <Card style={ListServstyle.Corpocard}>
                <View key={i.id} style={ListServstyle.organizacao}>
                  <ScrollView>
                    <View style={ListServstyle.Textoneh}>
                      <Text category='h4' style={ListServstyle.Textotitules}> {i.nome}</Text>
                      <Text>Descrição:</Text>
                      <Text>{i.descricao}</Text>
                    </View>
                  </ScrollView>
                </View>
                <View style={ListServstyle.slaa}>
                  <Text style={ListServstyle.slaaa}>Preço: R${i.preco}</Text>
                  <Button
                    style={ListServstyle.button}
                    appearance='outline'
                    status='info'
                    size='tiny'
                  /* onPress={() => handleSelectedUser(index)} */
                  >
                    UPDATE
                  </Button>
                  <Button
                    style={ListServstyle.button}
                    appearance='outline'
                    status='danger'
                    size='tiny'
                    onPress={() => SaiFora(i.id)}
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

export { ListSearchedServicos };