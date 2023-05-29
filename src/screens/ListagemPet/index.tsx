import { useRoute } from "@react-navigation/native";
import { ListPets } from "../../components/ListPets";
import { ListPetstyle } from './styles'
import { Card, Layout, Text } from "@ui-kitten/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthentication } from "../../config/autentication";

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

  console.log(Pets[0].body)
  return (
    <Layout style={ListPetstyle.View}>
        {
          Pets[0].body.map(i => {
            return(
              <Card>
                <Text>{i.animal}</Text>
              </Card>
            )
          })
        }
    </Layout>
  );
};

export { ListSearchedPets };