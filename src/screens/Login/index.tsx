import { useNavigation } from '@react-navigation/native';
import { 
    View, 
    Text, 
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'
import { Loginstyle } from './styles'

export const Login = () => {
    const navigation = useNavigation();

    return (
        <View style={Loginstyle.View}>
            <Text style={Loginstyle.Text}>Login</Text>
            <Image style={{width:250, height:250}} source={{uri:'https://cdn.discordapp.com/attachments/971523395818774569/1089640762683170876/14877551_3500_2_13-removebg-preview_1.png'}}></Image>
            <Text style={Loginstyle.Label}>Email</Text>
            <TextInput style={Loginstyle.Input}></TextInput>
            <Text style={Loginstyle.Label}>Senha</Text>
            <TextInput style={Loginstyle.Input}></TextInput>
            <Text style={Loginstyle.Textinho}>Esqueceu a senha ? =)</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={Loginstyle.ButtonText} >Login</Text>
            </TouchableOpacity>
            <View style={Loginstyle.separator}/>
            <Text style={Loginstyle.Textinho}>Ainda não possui uma conta ? Criar conta </Text>
        </View>
    )
}
