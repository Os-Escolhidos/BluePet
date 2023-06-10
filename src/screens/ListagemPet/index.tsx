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



interface Ipets {
  id: String;
  body: {
    animal: String;
    idade: String;
    nome: String;
    raca: String;
    tipo: String;
    sexo: String;
    img: {
      url: String;
    }
  }[]
}

const ListSearchedPets = () => {

  const [Pets, setPets] = useState<Ipets[]>([])
  const { user } = useAuthentication()
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [editingPetData, setEditingPetData] = useState<any>(null);
  const [openedMenu, setOpenedMenu] = useState(Array(Pets?.length).fill(false));



  const findAllPets = useCallback(
    async () => {
      setPets([]);
      let petsData: any[] = [];
      const collect = collection(db, `usuarios`);
      const queryFilterDate = query(
        collect, where("id", "==", String(user?.uid))
      );
      const querySnapshot = await getDocs(queryFilterDate);
      querySnapshot.forEach((doc) => {
        petsData.push({
          id: doc.id,
          body: doc.data().pets,
        });
      });
      setPets(petsData);
    },
    [setPets, user]
  );
  

  const DeleteDog = async (idUser: any, iddog: any) => {
    const refDatabase = doc(collection(db, "usuarios"), idUser);
    const querySnapshot = await getDoc(refDatabase)
    const userData = querySnapshot.data();
    const gruposArray = userData?.pets || [];
    const updatedGruposArray = gruposArray.filter((item: any) => item.nome !== iddog);
    await updateDoc(refDatabase, {
      pets: updatedGruposArray
    });
    findAllPets();
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPets([])
    findAllPets()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const startEditing = async (nome: string) => {
    try {
      const petRef = doc(collection(db, "usuarios"), user?.uid);
      const petSnapshot = await getDoc(petRef);
      if (petSnapshot.exists()) {
        const userData = petSnapshot.data();
        const petsData = userData?.pets || [];
        const editingPet = petsData.find((pet: any) => pet.nome === nome);
        if (editingPet) {
          setEditingPetData(editingPet);
          setEditingPetId(editingPet.nome);
        } else {
          console.error("O pet não foi encontrado no banco de dados.");
        }
      }
    } catch (error) {
      console.error("Erro ao obter os dados do pet:", error);
    }
  };



  const updatePet = async (petId: string, updatedPetData: any) => {
    try {
      const petRef = doc(collection(db, "usuarios"), user?.uid, "pets", petId);
      await updateDoc(petRef, { body: updatedPetData });
      setEditingPetData(null);
      setEditingPetId(null);
      console.log("Pet atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o pet:", error);
    }
  };


  const handleSelectedUser = (index: number) => {
    const updatedMenuState = [...openedMenu];
    updatedMenuState[index] = !updatedMenuState[index];
    console.log(index)
    setOpenedMenu(updatedMenuState)
  }

  useEffect(() => {
    findAllPets()
  }, [user?.uid])

  return (
    <Layout style={ListPetstyle.View}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={ListPetstyle.sla}>

        {
          Pets && Pets[0]?.body?.map((i, index) => {
            return (
              <Card style={ListPetstyle.Corpocard}>
                {openedMenu[index] ? (
                  // Modo de edição - renderizar campos de edição
                  <View style={ListPetstyle.slaaa}>
                    <Input
                      label="Nome"
                      value={editingPetData?.body?.nome || ''}
                      onChangeText={(text) =>
                        setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, nome: text } })
                      }
                    />
                    
                    <Button></Button>
                    <Button
                      style={ListPetstyle.button}
                      appearance='outline'
                      status='info'
                      size='tiny'
                      onPress={() => updatePet(editingPetId, editingPetData)}>
                      Confirmar
                    </Button>

                    {/* Adicione um botão para cancelar a edição */}
                    <Button
                      style={ListPetstyle.button}
                      appearance='outline'
                      status='danger'
                      size='tiny'
                      onPress={() => handleSelectedUser(index)}
                    >
                      Cancelar
                    </Button>
                  </View>
                ) : (
                  // Modo de exibição - renderizar informações estáticas
                  <View style={ListPetstyle.organizacao}>
                    <Image
                      style={ListPetstyle.Fotinha}
                      source={{ uri: i.img.url }}
                    />
                    <View>
                      <Text>Nome: {i.nome}</Text>
                      <Text>Animal: {i.animal}</Text>
                      <Text>Raça: {i.raca}</Text>
                      <Text>Idade: {i.idade}</Text>
                      <Text>Porte: {i.tipo}</Text>
                      <Text>Sexo: {i.sexo}</Text>
                    </View>
                  </View>
                )}
                <View style={ListPetstyle.slaa}>
                  <Button
                    style={ListPetstyle.button}
                    appearance='outline'
                    status='info'
                    size='tiny'
                    onPress={() => handleSelectedUser(index)}
                  >
                    UPDATE
                  </Button>
                  <Button
                    style={ListPetstyle.button}
                    appearance='outline'
                    status='danger'
                    size='tiny'
                    onPress={() => { DeleteDog(user?.uid, i.nome) }}
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

export { ListSearchedPets };



{/* <Input
                        label="Animal"
                        value={editingPetData?.body?.animal || ''}
                        onChangeText={(text) =>
                          setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, animal: text } })
                        }
                      />
                      <Input
                        label="Raça"
                        value={editingPetData?.body?.raca || ''}
                        onChangeText={(text) =>
                          setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, raca: text } })
                        }
                      />
                      <Input
                        label="Idade"
                        value={editingPetData?.body?.idade || ''}
                        onChangeText={(text) =>
                          setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, idade: text } })
                        }
                      />
                      <Input
                        label="Porte"
                        value={editingPetData?.body?.tipo || ''}
                        onChangeText={(text) =>
                          setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, tipo: text } })
                        }
                      />
                      <Input
                        label="Sexo"
                        value={editingPetData?.body?.sexo || ''}
                        onChangeText={(text) =>
                          setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, sexo: text } })
                        }
                      /> */}

                    {/* Adicione um botão para confirmar a atualização */}