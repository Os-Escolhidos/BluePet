import { StyleSheet } from 'react-native'

export const ListFuncstyle = StyleSheet.create({
    View: {
        display: "flex",
        backgroundColor: "#76BDFF",
        height: "100%",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingTop: "15%",
    },

    Texto: {
        alignSelf: "center",
        fontSize: 35,
        color: "#2C3877",
        marginTop: 20,
    },

    Corpocard: {
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        width: 345,
        height: 188,
    },

    organizacao: {
        display: "flex",
        flexDirection: "column",
    },

    Fotinha: {
        padding: 0,
        marginRight: 22,
        width: 88.8,
        height: 88.8,
        marginTop: 25,
        borderWidth: 2,
        borderColor: '#3299CC',
    },

    
    sla: {
        width: "100%",
    },
    slaa: {
        marginLeft: -8,
        marginTop: "4%",
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 5,
    },

    button: {
        width: 75,
    },

})