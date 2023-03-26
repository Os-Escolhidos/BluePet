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
        width: "288px",
        height: "35px",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderColor: 'gray', 
        borderWidth: 1,
    },
    Textbutton: {
        backgroundColor:"#257CFF",
        color:"#fff",
        width: "200px",
        height: "35px",
        borderRadius: 8,
        borderColor: 'gray', 
        borderWidth: 1,
        fontSize: 18,
        textAlign: 'center',
        padding: '3px',
        marginTop: '15px'
    }
})