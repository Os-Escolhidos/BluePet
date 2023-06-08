import { useRoute } from "@react-navigation/native";
import { ListPets } from "../../components/ListPets";
import { ListPetstyle } from './styles'
import { Avatar, Card, Layout, Text } from "@ui-kitten/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthentication } from "../../config/autentication";
import { ImageBackground, View } from 'react-native';
import { ScrollView } from "react-native";






interface Ipets {
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

  const findAllPets = useCallback(
    async () => {
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

  useEffect(() => {
    findAllPets()
  }, [user?.uid])

  return (
      <Layout style={ListPetstyle.View}>
        <ScrollView>
        {
          Pets && Pets[0]?.body?.map(i => {
            return (
              <Card style={ListPetstyle.Corpocard}>
                <View style={ListPetstyle.organizacao}>
                  <Avatar
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
              </Card>
            )
          })
        }
        </ScrollView>
      </Layout>
  );
};

export { ListSearchedPets };