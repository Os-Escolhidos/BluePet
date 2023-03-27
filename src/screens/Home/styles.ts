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
        marginTop: 40,
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
        marginTop: 20
    }
})