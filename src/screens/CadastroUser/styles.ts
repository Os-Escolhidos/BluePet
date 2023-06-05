import { StyleSheet } from 'react-native'

export const CadastroUserstyle = StyleSheet.create({
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
        marginTop: 40
    },
    Label: {
        color: "#2C3877",
        marginTop: 20,
    },
    Input: {
        width: 288,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "gray"
    },
    Button: {
        backgroundColor:"#257CFF",
        borderRadius: 8,
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 30,
        width: 220
    },
    InputSenha: {
        width: 288,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: "gray"
    },
})