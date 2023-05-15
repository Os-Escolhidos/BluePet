import { useNavigation } from '@react-navigation/native';
import { Loginstyle } from './styles'
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import React from 'react';
import { Image } from 'react-native'

export const Login = () => {
    const navigation = useNavigation();

    return (
        <Layout style={Loginstyle.View}>
            <Text category='h1' style={Loginstyle.Text}>Login</Text>

            <Image style={{width:250, height:250}} source={{uri:'https://cdn.discordapp.com/attachments/971523395818774569/1089640762683170876/14877551_3500_2_13-removebg-preview_1.png'}}></Image>

            <Text category='h6' style={Loginstyle.Label}>Email</Text>
            <Input style={Loginstyle.Input}/>

            <Text category='h6' style={Loginstyle.Label}>Senha</Text>
            <Input style={Loginstyle.Input}/>

            <Text category='c2' style={Loginstyle.Textinho}>Esqueceu a senha ? =)</Text>

            <Button size='large' onPress={() => navigation.navigate("Home")} style={Loginstyle.Button}>LOGIN</Button>

            <Layout style={Loginstyle.separator}/>

            <Text category='c2' style={Loginstyle.Textinho}>Ainda não possui uma conta ? Criar conta </Text>
        </Layout>
    )
}
