import { useNavigation } from '@react-navigation/native';
import { 
    View, 
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
import { Iniciostyle } from './styles'

export const Inicio = () => {
    const navigation = useNavigation();

    return (
        <View style={Iniciostyle.View}>
            <Text style={Iniciostyle.Text}>BluePet</Text>
            <Image style={{width:300, height:300}} source={{uri:'https://cdn.discordapp.com/attachments/880808991612076063/1089638715099451472/13586806_34._1.png'}}></Image>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={Iniciostyle.ButtonText} >Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("")}>
                <Text style={Iniciostyle.ButtonText} >Criar Conta</Text>
            </TouchableOpacity>
        </View>
    )
}