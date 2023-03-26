import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { CadastroUserstyle } from './styles'

export const CadastroUser = () => {
    const navigation = useNavigation ()
    return (
        <View style={CadastroUserstyle.View}>
            <Text style={CadastroUserstyle.Text}>Cadastrar-se</Text>
            <Text style={CadastroUserstyle.Label}>Nome</Text>
            <TextInput style={CadastroUserstyle.TextInput}></TextInput>
            <Text style={CadastroUserstyle.Label}>Email</Text>
            <TextInput style={CadastroUserstyle.TextInput}></TextInput>
            <Text style={CadastroUserstyle.Label}>Senha</Text>
            <TextInput style={CadastroUserstyle.TextInput}></TextInput>
            <Text style={CadastroUserstyle.Label}>Confirmar Senha</Text>
            <TextInput style={CadastroUserstyle.TextInput}></TextInput>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}><Text style={CadastroUserstyle.Textbutton}>Cadastrar</Text></TouchableOpacity>
        </View>
    )
}