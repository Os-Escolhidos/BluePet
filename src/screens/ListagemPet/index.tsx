import { useRoute } from "@react-navigation/native";
import { ListPets } from "../../components/ListPets";
import { ListPetstyle } from './styles'
import { Card, Layout, Text } from "@ui-kitten/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";

interface pets {
  nome: string
}

const ListSearchedPets = () => {
  /* const route = useRoute<ListPets>(); */

const [ Pets , setPets ] = useState <pets[]>([])

  const findAllPets = useCallback(
    async () => {
      let petsData: any[] = [];
      const collect = collection(db, "pets");
      const queryFilterDate = query(
        collect,
      );
      const querySnapshot = await getDocs(queryFilterDate);
      querySnapshot.forEach((doc) => {
        petsData.push({
          id: doc.id,
          body: doc.data(),
        });
      });
      setPets(petsData);
    },
    [setPets]
  );

  useEffect (() => {
    findAllPets()
  })

  console.log(Pets)

  return (
    <Layout style={ListPetstyle.View}>
      
    </Layout>
  );
};

export { ListSearchedPets };