import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, RefreshControl } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database, db } from "../../config/firebase";
import { Avatar, Button, Card, Layout, Text } from "@ui-kitten/components/ui";
import { ListFuncstyle } from './styles'
import { ScrollView } from "react-native";



interface User {
  id: string;
  name: string;
  email: string;
  estado: string;
  img: {
    id: string;
    url: string;
  };
}

const ListSearchedFunc = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [refreshing, setRefreshing] = useState(false);



  const findEmployeeUsers = useCallback(async () => {
    setUsers([]);
    let usersData: User[] = [];
    const usersCollection = collection(db, 'usuarios');
    const querySnapshot = await getDocs(query(usersCollection, where('nivel', '==', 'funcionario')));

    querySnapshot.forEach((doc) => {
      usersData.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        estado: doc.data().estado,
        img: doc.data().img,
      });
    });

    setUsers(usersData);
  }, [setUsers]);


  const banido = useCallback(async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'usuarios', userId));
      console.log('Funcionário excluído com sucesso!');
      // Atualize a lista de funcionários após a exclusão
      findEmployeeUsers();
    } catch (error) {
      console.error('Erro ao excluir o funcionário:', error);
    }
  }, [findEmployeeUsers]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUsers([])
    findEmployeeUsers()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    findEmployeeUsers();
  }, [findEmployeeUsers]);

  return (
    <Layout style={ListFuncstyle.View}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text  style={ListFuncstyle.Texto}>Usuários Funcionários</Text>
        {users && users.map((user) => (
          <Card style={ListFuncstyle.Corpocard}>
            <View key={user.id} style={ListFuncstyle.organizacao}>
              {user.img?.url &&
                <Image
                  style={ListFuncstyle.Fotinha}
                  source={{ uri: user.img.url }}
                />}
              <ScrollView>
                <View style={ListFuncstyle.Textoneh}>
                  <Text>Nome: {user.name}</Text>
                  <Text>Email: {user.email}</Text>
                  <Text>Estado: {user.estado}</Text>
                </View>
              </ScrollView>
            </View>
              <View style={ListFuncstyle.slaa}>
                <Button
                  style={ListFuncstyle.button}
                  appearance='outline'
                  status='info'
                  size='tiny'
                /* onPress={() => handleSelectedUser(index)} */
                >
                  UPDATE
                </Button>
                <Button
                  style={ListFuncstyle.button}
                  appearance='outline'
                  status='danger'
                  size='tiny'
                  onPress={() => banido(user.id)}
                >
                  DELETE
                </Button>
              </View>
          </Card>
        ))}
      </ScrollView>
    </Layout>
  );
};

export { ListSearchedFunc };
