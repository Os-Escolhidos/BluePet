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
    },
    Label: {
        fontSize: 18,
        color: "#2C3877",
        marginTop: 15,
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
    Textbutton: {
        backgroundColor:"#257CFF",
        color:"#fff",
        width: 200,
        height: 35,
        borderRadius: 8,
        borderColor: 'gray', 
        borderWidth: 1,
        fontSize: 18,
        textAlign: 'center',
        padding: 3,
        marginTop: 15
    }
})