import { Avatar, Button, Input, Layout, Text } from '@ui-kitten/components';
import { PgUserstyle } from './styles';
import React, { useCallback, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { useAuthentication } from '../../config/autentication';
import { RefreshControl, ScrollView, View, Image, Alert } from 'react-native';
import { db } from '../../config/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  estado: string;
  cidade: string;
  bairro: string;
  numero: string;
  img: {
    id: string;
    url: string;
  };
}

const authFirebase = getAuth();

const PgUser: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [refreshing, setRefreshing] = useState(false);

  const findUserInfo = useCallback(async () => {
    const collect = collection(db, 'usuarios');
    const queryFilterId = query(collect, where("id", "==", String(user?.uid)));
    const querySnapshot = await getDocs(queryFilterId);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data() as User;
      setUserData(userData);
      setName(userData.name);
      setEmail(userData.email);
      setCpf(userData.cpf);
      setTelefone(userData.telefone);
      setEstado(userData.estado);
      setCidade(userData.cidade);
      setBairro(userData.bairro);
      setNumero(userData.numero);
    }
  }, [user]);

  const confirmDelete = useCallback(() => {
    Alert.alert(
      'Excluir usuário',
      'Tem certeza de que deseja excluir o usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => banido(user?.uid) }
      ]
    );
  }, [banido, user?.uid]);

  const banido = useCallback(async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'usuarios', userId));
      console.log('Usuário excluído com sucesso!');
      navigation.navigate('Inicio'); // Navegar para a tela de login após excluir
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
    }
  }, [navigation]);

  const handleUpdate = useCallback(async () => {
    try {
      const userRef = doc(db, 'usuarios', user?.uid);
      const updatedData = {
        name,
        email,
        cpf,
        telefone,
        estado,
        cidade,
        bairro,
        numero,
      };
      await updateDoc(userRef, updatedData);
      console.log('Usuário atualizado com sucesso!');
      setEditMode(false);
      await findUserInfo(); // Buscar novamente as informações atualizadas do usuário
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
    }
  }, [name, email, cpf, telefone, estado, cidade, bairro, numero, user, findUserInfo]);
  

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    findUserInfo();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    findUserInfo();
  }, [user?.uid]);

  if (!userData) {
    return null; // Renderizar um componente de carregamento ou mensagem enquanto as informações são buscadas
  }

  return (
    <Layout style={PgUserstyle.View}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
        <View style={PgUserstyle.slaaaaa}>
          <View>
            {!editMode && (
              <>
                <Text category='h1' style={PgUserstyle.slaaa}>{userData.name}</Text>
                {userData.img ? (
                  <Image
                    style={PgUserstyle.Fotinha}
                    source={{ uri: userData.img.url }}
                  />
                ) : (
                  <Avatar />
                )}
                <Text category='h6'>Email: {userData.email}</Text>
                <Text category='h6'>CPF: {userData.cpf}</Text>
                <Text category='h6'>Telefone: {userData.telefone}</Text>
                <Text category='h6'>Estado: {userData.estado}</Text>
                <Text category='h6'>Cidade: {userData.cidade}</Text>
                <Text category='h6'>Bairro: {userData.bairro}</Text>
                <Text category='h6'>Número: {userData.numero}</Text>

                <View style={PgUserstyle.slaa}>
                  <View style={PgUserstyle.slaaaa}>
                    <Button
                      style={PgUserstyle.button}
                      appearance='filled'
                      status='info'
                      size='small'
                      onPress={() => setEditMode(true)}
                    >
                      EDITE
                    </Button>

                    <Button
                      style={PgUserstyle.button}
                      appearance='filled'
                      status='danger'
                      size='small'
                      onPress={confirmDelete}
                    >
                      DELETE
                    </Button>
                  </View>
                </View>
              </>
            )}
            {editMode && (
              <>
                <Text category='h1' style={PgUserstyle.slaaa}>Edit User</Text>
                <Input
                  label='Name'
                  value={name}
                  onChangeText={setName}
                />
                <Input
                  label='Email'
                  value={email}
                  onChangeText={setEmail}
                />
                <Input
                  label='CPF'
                  value={cpf}
                  onChangeText={setCpf}
                />
                <Input
                  label='Telefone'
                  value={telefone}
                  onChangeText={setTelefone}
                />
                <Input
                  label='Estado'
                  value={estado}
                  onChangeText={setEstado}
                />
                <Input
                  label='Cidade'
                  value={cidade}
                  onChangeText={setCidade}
                />
                <Input
                  label='Bairro'
                  value={bairro}
                  onChangeText={setBairro}
                />
                <Input
                  label='Número'
                  value={numero}
                  onChangeText={setNumero}
                />
                <View style={PgUserstyle.slaa}>
                  <View style={PgUserstyle.slaaaa}>
                    <Button
                      style={PgUserstyle.button}
                      appearance='filled'
                      status='info'
                      size='small'
                      onPress={handleUpdate}
                    >
                      SAVE
                    </Button>
                    <Button
                      style={PgUserstyle.button}
                      appearance='filled'
                      status='danger'
                      size='small'
                      onPress={() => setEditMode(false)}
                    >
                      CANCEL
                    </Button>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>

        <Button size='medium' onPress={() => navigation.navigate("ListagemPet")} style={PgUserstyle.Button}>MEUS PETS</Button>
      </ScrollView>
    </Layout>
  );
}

export { PgUser };
