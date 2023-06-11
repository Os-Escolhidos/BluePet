import { useNavigation, useRoute } from "@react-navigation/native";
import { ListPets } from "../../components/ListPets";
import { ListPetstyle } from './styles'
import { Avatar, Button, Card, Layout, Text } from "@ui-kitten/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { database, db } from "../../config/firebase";
import { useAuthentication } from "../../config/autentication";
import { ImageBackground, View, Image, RefreshControl } from 'react-native';
import { ScrollView } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { Input } from "@ui-kitten/components/ui";

interface Ipets {
  id: string;
  body: {
    animal: string;
    idade: string;
    nome: string;
    raca: string;
    tipo: string;
    sexo: string;
    img: {
      url: string;
    }
  }[]
}

const ListSearchedPets = () => {
  const [Pets, setPets] = useState<Ipets[]>([]);
  const { user } = useAuthentication();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [openedMenu, setOpenedMenu] = useState<boolean[]>([]);
  const [editingPetData, setEditingPetData] = useState<any>({});

  const findAllPets = useCallback(async () => {
    setPets([]);
    let petsData: any[] = [];
    const collect = collection(db, `usuarios`);
    const queryFilterDate = query(collect, where("id", "==", String(user?.uid)));
    const querySnapshot = await getDocs(queryFilterDate);
    querySnapshot.forEach((doc) => {
      petsData.push({
        id: doc.id,
        body: doc.data().pets,
      });
    });
    setPets(petsData);
  }, [setPets, user]);

  const deleteDog = async (idUser: any, iddog: any) => {
    const refDatabase = doc(collection(db, "usuarios"), idUser);
    const querySnapshot = await getDoc(refDatabase);
    const userData = querySnapshot.data();
    const gruposArray = userData?.pets || [];
    const updatedGruposArray = gruposArray.filter((item: any) => item.nome !== iddog);
    await updateDoc(refDatabase, {
      pets: updatedGruposArray,
    });
    findAllPets();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPets([]);
    findAllPets();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const updatePet = async (nomePet: string, updatedPetData: any) => {
    console.log(nomePet);
    try {
      const petRef = collection(db, "usuarios");
      const queryBuilder = query(petRef, where("id", "==", String(user?.uid)));
      const querySnapshot = await getDocs(queryBuilder);

      querySnapshot.forEach(async (doc) => {
        const petsUser = doc.data().pets;
        const findPetIndex = Object.keys(petsUser).findIndex((key) => petsUser[key].nome === nomePet);

        if (findPetIndex !== -1) {
          const updatedPets = [...petsUser];
          updatedPets[findPetIndex] = {
            ...updatedPets[findPetIndex],
            nome: updatedPetData.body.nome,
            animal: updatedPetData.body.animal,
            raca: updatedPetData.body.raca,
            idade: updatedPetData.body.idade,
            tipo: updatedPetData.body.tipo,
            sexo: updatedPetData.body.sexo,
          };

          await updateDoc(doc.ref, { pets: updatedPets });
        }
      });onRefresh();
    } catch (error) {
      console.error("Erro ao atualizar o pet:", error);
    }
  };


  const handleSelectedUser = (index: number) => {
    const updatedMenuState = [...openedMenu];
    updatedMenuState[index] = !updatedMenuState[index];

    if (updatedMenuState[index]) {
      // Modo de edição ativado - atribuir valores iniciais do pet selecionado
      const selectedPet = Pets[0]?.body[index];
      setEditingPetData({
        id: selectedPet.id,
        body: {
          nome: selectedPet.nome,
          animal: selectedPet.animal,
          raca: selectedPet.raca,
          idade: selectedPet.idade,
          tipo: selectedPet.tipo,
          sexo: selectedPet.sexo,
        },
      });
    } else {
      // Modo de edição desativado - limpar dados de edição
      setEditingPetData({});
    }

    setOpenedMenu(updatedMenuState);
  };


  useEffect(() => {
    findAllPets();
  }, [user?.uid]);

  return (
    <Layout style={ListPetstyle.View}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={ListPetstyle.sla}>
        {Pets &&
          Pets[0]?.body?.map((i, index) => {
            return (
              <Card style={ListPetstyle.Corpocard} key={i.nome}>
                {openedMenu[index] ? (
                  // Modo de edição - renderizar campos de edição
                  <View>
                    <ScrollView>
                      <View>
                        <Input
                          label="Nome"
                          value={editingPetData?.body?.nome || ""}
                          onChangeText={(text) =>
                            setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, nome: text } })
                          }
                        />
                        <Input
                          label="Animal"
                          value={editingPetData?.body?.animal || ""}
                          onChangeText={(text) =>
                            setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, animal: text } })
                          }
                        />
                        <Input
                          label="Raça"
                          value={editingPetData?.body?.raca || ""}
                          onChangeText={(text) =>
                            setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, raca: text } })
                          }
                        />
                        <Input
                          label="Idade"
                          value={editingPetData?.body?.idade || ""}
                          onChangeText={(text) =>
                            setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, idade: text } })
                          }
                        />
                        <Input
                          label="Porte"
                          value={editingPetData?.body?.tipo || ""}
                          onChangeText={(text) =>
                            setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, tipo: text } })
                          }
                        />
                        <Input
                          label="Sexo"
                          value={editingPetData?.body?.sexo || ""}
                          onChangeText={(text) =>
                            setEditingPetData({ ...editingPetData, body: { ...editingPetData?.body, sexo: text } })
                          }
                        />
                      </View>
                      <View style={ListPetstyle.organizacao2}>
                        <Button
                          style={ListPetstyle.button}
                          appearance="outline"
                          status="info"
                          size="tiny"
                          onPress={() => updatePet(i.nome, editingPetData)}
                        >
                          Confirmar
                        </Button>

                        {/* Adicione um botão para cancelar a edição */}
                        <Button
                          style={ListPetstyle.button}
                          appearance="outline"
                          status="danger"
                          size="tiny"
                          onPress={() => handleSelectedUser(index)}
                        >
                          Cancelar
                        </Button>
                      </View>
                    </ScrollView>
                  </View>
                ) : (
                  // Modo de exibição - renderizar informações estáticas
                  <>
                    <View style={ListPetstyle.organizacao}>
                      <Image style={ListPetstyle.Fotinha} source={{ uri: i.img.url }} />
                      <View>
                        <Text>Nome: {i.nome}</Text>
                        <Text>Animal: {i.animal}</Text>
                        <Text>Raça: {i.raca}</Text>
                        <Text>Idade: {i.idade}</Text>
                        <Text>Porte: {i.tipo}</Text>
                        <Text>Sexo: {i.sexo}</Text>
                      </View>
                    </View>

                    <View style={ListPetstyle.slaa}>
                      <Button
                        style={ListPetstyle.button}
                        appearance="outline"
                        status="info"
                        size="tiny"
                        onPress={() => handleSelectedUser(index)}
                      >
                        EDITAR
                      </Button>
                      <Button
                        style={ListPetstyle.button}
                        appearance="outline"
                        status="danger"
                        size="tiny"
                        onPress={() => {
                          deleteDog(user?.uid, i.nome);
                        }}
                      >
                        DELETE
                      </Button>
                    </View>
                  </>
                )}
              </Card>
            );
          })}
      </ScrollView>
    </Layout>
  );
};

export { ListSearchedPets };
