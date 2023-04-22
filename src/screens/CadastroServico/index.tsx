import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { CadastroServicostyle } from './styles'
import { TextInputMask } from 'react-native-masked-text';

export const CadastroServico = () => {
    const navigation = useNavigation ()
    return (
        <View style={CadastroServicostyle.View}>
            <Text style={CadastroServicostyle.Text}>Cadastrar Servico</Text>
            <Text style={CadastroServicostyle.Label}>Nome</Text>
            <TextInput style={CadastroServicostyle.TextInput}></TextInput>
            <Text style={CadastroServicostyle.Label}>Animal</Text>
            <TextInput style={CadastroServicostyle.TextInput}></TextInput>
            <Text style={CadastroServicostyle.Label}>Raça</Text>
            <TextInput style={CadastroServicostyle.TextInput}></TextInput>
            <Text style={CadastroServicostyle.Label}>Tipo</Text>
            <TextInput style={CadastroServicostyle.TextInput}></TextInput>
            <Text style={CadastroServicostyle.Label}>Data Nascimento</Text>
            <TextInputMask 
            type={'datetime'}
            options={{
                format: 'YYYY/MM/DD'
              }}
            style={CadastroServicostyle.TextInput}></TextInputMask>
            <Text style={CadastroServicostyle.Label}>Genero</Text>
            <TextInput style={CadastroServicostyle.TextInput}></TextInput>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}><Text style={CadastroServicostyle.Textbutton}>Cadastrar</Text></TouchableOpacity>
        </View>
    )
}