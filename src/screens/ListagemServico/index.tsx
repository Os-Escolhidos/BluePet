import { ListServstyle } from './styles'
import { Button, Card, Input, Layout, Text } from "@ui-kitten/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
  const [servicos, setServicos] = useState<Iservico[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editedNome, setEditedNome] = useState('');
  const [editedDescricao, setEditedDescricao] = useState('');
  const [editedPreco, setEditedPreco] = useState(0);


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

  const handleUpdate = useCallback(async (servicoId: string) => {
    try {
      const servicoRef = doc(db, 'servicos', servicoId);
      const updatedData = {
        nome: editedNome,
        descricao: editedDescricao,
        preco: editedPreco,
      };
      await updateDoc(servicoRef, updatedData);
      console.log('Serviço/Produto atualizado com sucesso!');
      setEditMode(false);
      // Atualize a lista de serviços/produtos após a atualização
      findAllServicos();
    } catch (error) {
      console.error('Erro ao atualizar o Serviço/Produto:', error);
    }
  }, [editedNome, editedDescricao, editedPreco, findAllServicos]);


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
          servicos && servicos.map((servico: any) => {
            return (
              <Card style={ListServstyle.Corpocard} key={servico.id}>
                <View style={ListServstyle.organizacao}>
                  <ScrollView>
                    <View style={ListServstyle.Textoneh}>
                      {!editMode ? (
                        <>
                          <Text category='h4' style={ListServstyle.Textotitules}>{servico.nome}</Text>
                          <Text>Descrição:</Text>
                          <Text>{servico.descricao}</Text>
                        </>
                      ) : (
                        <>
                          <ScrollView>
                            <Input
                              label='Nome'
                              value={editedNome}
                              onChangeText={setEditedNome}
                            />
                            <Input
                              label='Descrição'
                              value={editedDescricao}
                              onChangeText={setEditedDescricao}
                            />
                          </ScrollView>
                        </>
                      )}
                    </View>
                  </ScrollView>
                </View>
                <View style={ListServstyle.slaa}>
                  {!editMode ? (
                    <>
                      <Text category='h6' style={ListServstyle.slaaa}>R${servico.preco}</Text>
                        <Button
                          style={ListServstyle.button}
                          appearance='outline'
                          status='info'
                          size='small'
                          onPress={() => setEditMode(true)}
                        >
                          EDITAR
                        </Button>
                        <Button
                          style={ListServstyle.button}
                          appearance='outline'
                          status='danger'
                          size='small'
                          onPress={() => SaiFora(servico.id)}
                        >
                          DELETE
                        </Button>
                    </>
                  ) : (
                    <>
                      <Input
                        label='Preço'
                        value={editedPreco.toString()}
                        keyboardType='numeric'
                        onChangeText={(text) => setEditedPreco(parseFloat(text))}
                      />
                      <Button
                        style={ListServstyle.button}
                        appearance='outline'
                        status='info'
                        size='tiny'
                        onPress={() => handleUpdate(servico.id)}
                      >
                        SAVE
                      </Button>
                      <Button
                        style={ListServstyle.button}
                        appearance='outline'
                        status='danger'
                        size='tiny'
                        onPress={() => setEditMode(false)}
                      >
                        CANCEL
                      </Button>
                    </>
                  )}
                </View>
              </Card>
            );
          })
        }

      </ScrollView>
    </Layout>
  );
};

export { ListSearchedServicos };