import { Layout } from '@ui-kitten/components';
import { PgUserstyle } from './styles'
import React, { useCallback, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { collection } from 'firebase/firestore';
import { useAuthentication } from '../../config/autentication';

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

const authFirebase = getAuth();
const PgUser: React.FC = () => {
    const navigation = useNavigation()
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
            body: doc.data(),
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
        <Layout style={PgUserstyle.View}>
            
        </Layout>
    )
}
export { PgUser };