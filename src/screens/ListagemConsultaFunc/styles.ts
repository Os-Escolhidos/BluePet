import { StyleSheet } from 'react-native'

export const ListServstyle = StyleSheet.create({
    View: {
        display: "flex",
        backgroundColor: "#76BDFF",
        height: "100%",
        width:"100%",
        alignSelf: "center",
        alignItems:"center",
        justifyContent:"center", 
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    Label: {
        color: "#2C3877",
        marginTop: 20,
    },
    Corpocard: {
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        width: 345,
        height: 300,
    },
})