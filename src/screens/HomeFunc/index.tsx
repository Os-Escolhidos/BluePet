import { useNavigation } from '@react-navigation/native'
import { HomeFuncstyle } from './styles'
import { Button, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { Image } from 'react-native'

export const HomeFunc = () => {
    const navigation = useNavigation ()
    return (
        <Layout style={HomeFuncstyle.View}>
            <Text category='h1' style={HomeFuncstyle.Text}>Home</Text>

            <Image style={{width:300, height:300}} source={{uri:'https://media.discordapp.net/attachments/971523395818774569/1108392279074414652/cachorro.png'}}></Image>

            <Button size='large' onPress={() => navigation.navigate("CadastroServico")} style={HomeFuncstyle.Button}>CADASTRAR SERVIÇO OU PRODUTO</Button>
            <Button size='large' onPress={() => navigation.navigate("ListagemPet")} style={HomeFuncstyle.Button}>SERVIÇOS E PRODUTOS CADASTRADOS</Button>
            <Button size='large' onPress={() => navigation.navigate("CadastroFunc")} style={HomeFuncstyle.Button}>CADASTRAR FUNCIONÁRIO OU CLIENTE</Button>
            <Button size='large' onPress={() => navigation.navigate("ListagemPet")} style={HomeFuncstyle.Button}>FUNCIONÁRIOS CADASTRADOS</Button>
        </Layout>
    )
}
