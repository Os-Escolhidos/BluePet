import { StyleSheet } from 'react-native'

export const Loginstyle = StyleSheet.create({
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
    Textinho: {
        marginTop: 10,
        color: "#2C3877",
        alignItems:"flex-start",
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
        width: 220
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: 280,
    },

})