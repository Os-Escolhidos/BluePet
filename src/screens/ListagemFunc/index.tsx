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



interface Ifunc {
  body: {
    nome: String;
    email: String;
    img: {
      url: String;
    }
  }[]
}

const ListSearchedPets = () => {

  const [Func, setFunc] = useState<Ifunc[]>([])
  const { user } = useAuthentication()
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);


  const findAllFunc = useCallback(
    async () => {
      setFunc([]);
      let funcData: any[] = [];
      const collect = collection(db, `funcionarios`);
      const queryFilterDate = query(
        collect, where("id", "==", String(user?.uid))
      );
      const querySnapshot = await getDocs(queryFilterDate);
      querySnapshot.forEach((doc) => {
        funcData.push({
          id: doc.id,
          body: doc.data().pets,
        });
      });
      setFunc(funcData);
    },
    [setFunc, user]
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
    findAllFunc();
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setFunc([])
    findAllFunc()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    findAllPets()
  }, [user?.uid])

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={ListPetstyle.sla}>
      <Layout style={ListPetstyle.View}>

        {
          Pets && Pets[0]?.body?.map(i => {
            return (
              <Card style={ListPetstyle.Corpocard}>
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
                <View style={ListPetstyle.slaa}>
                  <Button
                    style={ListPetstyle.button}
                    appearance='outline'
                    status='info'
                    size='tiny'
                  >
                    INFO
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

      </Layout>
    </ScrollView>
  );
};

export { ListSearchedPets };