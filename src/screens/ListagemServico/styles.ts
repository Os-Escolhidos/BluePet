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
    Texto: {
        alignSelf: "center",
        fontSize: 35,
        color: "#2C3877",
        marginTop: 38,
    },

    Corpocard: {
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        width: 345,
        height: 188,
    },

    Textoneh: {
        height: 100,
    },

    Textotitules: {
        display: "flex",
        marginLeft: -5,
        justifyContent: "flex-start",
    },


    organizacao: {
        display: "flex",
        flexDirection: "row",
    },

    Fotinha: {
        padding: 0,
        marginRight: 29,
        width: 90,
        height: 90,
        marginTop: 25,
        borderWidth: 2,
        borderColor: '#3299CC',
    },

    
    sla: {
        width: "100%",
    },
    slaa: {
        marginLeft: -8,
        marginTop: "8%",
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 8,
    },
    slaaa: {
        marginTop: "2%",
    },

    button: {
        width: 75,
    },
})