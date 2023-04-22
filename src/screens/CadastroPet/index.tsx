import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { CadastroPetstyle } from './styles'
import { TextInputMask } from 'react-native-masked-text';
import React from 'react';

export const CadastroPet = () => {
    const navigation = useNavigation ()
    return (
        <View style={CadastroPetstyle.View}>
            <Text style={CadastroPetstyle.Text}>Cadastrar Pet</Text>
            <Text style={CadastroPetstyle.Label}>Nome</Text>
            <TextInput style={CadastroPetstyle.TextInput}></TextInput>
            <Text style={CadastroPetstyle.Label}>Animal</Text>
            <TextInput style={CadastroPetstyle.TextInput}></TextInput>
            <Text style={CadastroPetstyle.Label}>Raça</Text>
            <TextInput style={CadastroPetstyle.TextInput}></TextInput>
            <Text style={CadastroPetstyle.Label}>Tipo</Text>
            <TextInput style={CadastroPetstyle.TextInput}></TextInput>
            <Text style={CadastroPetstyle.Label}>Data Nascimento</Text>
            <TextInputMask 
            type={'datetime'}
            options={{
                format: 'YYYY/MM/DD'
              }}
            style={CadastroPetstyle.TextInput}></TextInputMask>
            <Text style={CadastroPetstyle.Label}>Sexo</Text>
            <TextInput style={CadastroPetstyle.TextInput}></TextInput>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}><Text style={CadastroPetstyle.Textbutton}>Cadastrar</Text></TouchableOpacity>
        </View>
    )
}