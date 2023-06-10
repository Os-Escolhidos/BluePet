import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native'
import { Iniciostyle } from './styles'
import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';

export const Inicio = () => {
    const navigation = useNavigation();

    return (
        <Layout style={Iniciostyle.View}>

            <Text style={Iniciostyle.Text} category='h1'>BluePet</Text>

            <Image style={{width:300, height:300}} source={{uri:'https://cdn.discordapp.com/attachments/880808991612076063/1089638715099451472/13586806_34._1.png'}}></Image>

            <Button size='large' style={Iniciostyle.Button} onPress={() => navigation.navigate("Login")}>LOGIN</Button>
            <Button size='large' style={Iniciostyle.Button} onPress={() => navigation.navigate("CadastroUser")}>CRIAR CONTA</Button>
            <Button size='large' style={Iniciostyle.Button} onPress={() => navigation.navigate("HomeFunc")}>HOME FUNCIONÁRIO</Button>
            
        </Layout>
    )
}