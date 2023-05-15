import { StyleSheet } from 'react-native'

export const Homestyle = StyleSheet.create({
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
        fontSize: 35,
        color: "#2C3877",
        marginTop: 20,
    },
    Button: {
        backgroundColor:"#257CFF",
        borderRadius: 8,
        textAlign: 'center',
        marginTop: 20,
        width: 220
    },
})