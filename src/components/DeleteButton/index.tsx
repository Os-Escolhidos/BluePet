                    /* Agora não é mais um botão, se quiser usar isso aqui vai ter que copiar e colar onde quiser o botão de delete e ai fazer as mudanças de acordo */

import { DeleteButton } from './styles'
import { View, ViewProps } from 'react-native/types';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc } from 'firebase/firestore';
import { database,db } from '../../config/firebase';
import {
    child,
    onValue,
    push,
    ref,
    remove,
    runTransaction,
  } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/native";
import { convertTypeAcquisitionFromJson } from 'typescript'

const authFirebase = getAuth();
export const ButtonD = () => {
    const navigation = useNavigation()
    const [deleteFocus, setIsDeleteFocused] = useState(false);

    const deletePet = async (id: string) => {
        await deleteDoc(doc(db, "post", id));
        navigation.navigate("Home");
    };
                                                 
    const deletepet = async (idComment: string) => {
        await remove(
          ref(database, `Passa a rota aqui`)                             
        );
      };

    return (
        <Button size='large' /* onPress={() => deletepet(comovocechamou.id)} */ style={DeleteButton.Button}>
            Delete
        </Button>
    );
};