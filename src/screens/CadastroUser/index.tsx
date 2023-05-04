import { useNavigation } from '@react-navigation/native'
import { CadastroUserstyle } from './styles'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React from 'react'

export const CadastroUser = () => {
    const navigation = useNavigation ()
    return (
        <Layout style={CadastroUserstyle.View}>
            
            <Text category='h1' style={CadastroUserstyle.Text}>Cadastrar-se</Text>

            <Text category='h6' style={CadastroUserstyle.Label}>Nome</Text>
            <Input style={CadastroUserstyle.Input}/>

            <Text category='h6' style={CadastroUserstyle.Label}>Email</Text>
            <Input style={CadastroUserstyle.Input}/>

            <Text category='h6' style={CadastroUserstyle.Label}>Senha</Text>
            <Input style={CadastroUserstyle.Input}/>

            <Text category='h6' style={CadastroUserstyle.Label}>Confirmar Senha</Text>
            <Input style={CadastroUserstyle.Input}/>

            <Button size='large' style={CadastroUserstyle.Button} onPress={() => navigation.navigate("Home")}>CADASTRAR</Button>
        
        </Layout>
    )
}