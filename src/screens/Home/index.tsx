import { useNavigation } from '@react-navigation/native'
import { Homestyle } from './styles'
import { Button, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { Image } from 'react-native'

export const Home = () => {
    const navigation = useNavigation ()
    return (
        <Layout style={Homestyle.View}>
            <Text category='h1' style={Homestyle.Text}>Home</Text>

            <Image style={{width:300, height:300}} source={{uri:'https://cdn.discordapp.com/attachments/971523395818774569/1107623132786855936/11766612_21378450-removebg-preview.png'}}></Image>

            <Button size='large' onPress={() => navigation.navigate("CadastroPet")} style={Homestyle.Button}>CADASTRAR PET</Button>
            <Button size='large' style={Homestyle.Button}>MEUS PETS</Button>
        </Layout>
    )
}



