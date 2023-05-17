import { StyleSheet } from 'react-native'

export const CadastroServicostyle = StyleSheet.create({
    View: {
        display: "flex",
        backgroundColor: "#76BDFF",
        height: "100%",
        width:"100%",
        alignSelf: "center",
        alignItems:"center",
        justifyContent:"center",
    },
    Text: {
        alignSelf: "center",
        fontSize: 50,
        color: "#2C3877",
    },
    Label: {
        color: "#2C3877",
        marginTop: 20,
    },
    TextInput: {
        width: 288,
        height: 35,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 8
    },
    Button: {
        backgroundColor:"#257CFF",
        borderRadius: 8,
        textAlign: 'center',
        marginTop: 40,
        width: 220
    },
    Erro: {
        alignSelf: "center",
        fontSize: 15,
        color: "red",
    },
})