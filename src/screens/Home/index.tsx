import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity } from 'react-native'
import { Homestyle } from './styles'

export const Home = () => {
    const navigation = useNavigation ()
    return (
        <View style={Homestyle.View}>
            <Text style={Homestyle.Text}>Home</Text>
            <TouchableOpacity style={Homestyle.Button}><Text style={Homestyle.Textbutton}>Cadastrar Pet</Text></TouchableOpacity>
            <TouchableOpacity style={Homestyle.Button}><Text style={Homestyle.Textbutton}>Meus Pets</Text></TouchableOpacity>
        </View>
    )
}