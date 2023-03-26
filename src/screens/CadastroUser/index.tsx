import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { CadastroUserstyle } from './styles'

export const CadastroUser = () => {
    const navigation = useNavigation ()
    return (
        <View style={CadastroUserstyle.View}>
            <Text style={CadastroUserstyle.Text}>Cadastrar-se</Text>
            <TextInput style={CadastroUserstyle.TextInput} placeholder="Nome:"></TextInput>
            <TextInput style={CadastroUserstyle.TextInput} placeholder="E-mail:"></TextInput>
            <TextInput style={CadastroUserstyle.TextInput} placeholder="CPF:"></TextInput>
            <TextInput style={CadastroUserstyle.TextInput} placeholder="Telefone:"></TextInput>
            <TouchableOpacity style={CadastroUserstyle.Button} onPress={() => navigation.navigate("Home")}><Text style={CadastroUserstyle.Textbutton}>Cadastrar</Text></TouchableOpacity>
        </View>
    )
}