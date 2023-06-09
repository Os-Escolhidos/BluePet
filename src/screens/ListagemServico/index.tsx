import { ListServstyle } from './styles'
import { Card, Layout, Text } from "@ui-kitten/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

interface Iservico {
  body: {
    nome: String;
    descricao: String;
    preco: Number;
  }[]
}

const ListSearchedServicos = () => {

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

  useEffect(() => {
    findAllServicos()
  })
  
  return (
    <Layout style={ListServstyle.View}>
        {
          servicos && servicos?.map((i:any) => {
            return(
              <Card>
                <Text>{i.nome}</Text>
                <Text>{i.descricao}</Text>
                <Text>{i.preco}</Text>
              </Card>
            )
          })
        }
    </Layout>
  );
};

export { ListSearchedServicos };