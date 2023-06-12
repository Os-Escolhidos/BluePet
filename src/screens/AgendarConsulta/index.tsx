import { useNavigation } from '@react-navigation/native'
import { AgendarConsultastyle } from './styles'
import "../../config/firebase"
import React, { useState } from 'react';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Layout, Text, Input, Button, Datepicker } from '@ui-kitten/components/ui';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native';
import { AndroidMode } from '@react-native-community/datetimepicker';
import { useAuthentication } from '../../config/autentication';
import { uuidv4 } from "@firebase/util";

export const AgendarConsulta = () => {
  const { user } = useAuthentication()
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');
  const [data, setData] = useState({
    horario: "",
    dia: ""
  })

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setText('Data: '+ fDate + '\n' + 'Horário: ' + fTime)

    setData({
      horario: fTime,
      dia: fDate
    })
    console.log(fDate + ' (' + fTime + ')')
    if (Platform.OS === 'android') {
      setShow(false);
    }
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const hidePicker = () => {
    setShow(false);
  };

  const [value, setValue] = useState({
    data: "",
    horario:""
  });
  async function handleRegister() {
    if (data.dia === "" || data.horario === "") {
      setErrorMessage("É necessário o preenchimento de todos os campos.");
      return;
    }
    try {
      const refDoc = doc(db, `usuarios`, String(user.uid))
      const consultaRef = collection(db, `consultas`)
      const uid = uuidv4()
      await addDoc (consultaRef, {
        idCli: String(user.uid),
        id: uid,
        data: data.dia,
        horario: data.horario,
        email: user?.email
      })
       await updateDoc(refDoc, {
        consultas: arrayUnion({
        id: uid,
        data: data.dia,
        horario: data.horario
      })
      }).then(() => navigation.navigate("Home"));
    }
    catch (error: any) {
      setErrorMessage(error);
    }
  }

  return (
    <Layout style={AgendarConsultastyle.View}>
      <Text category='h1' style={AgendarConsultastyle.Text}>Agendar Consulta</Text>

      {errorMessage ? <Text style={AgendarConsultastyle.Erro}>{errorMessage}</Text> : null}

      <Button style={AgendarConsultastyle.Button} onPress={() => showMode('date')}>DATA</Button>

      <Button style={AgendarConsultastyle.Button} onPress={() => showMode('time')}>HORÁRIO</Button>

      <Text category='h6' style={AgendarConsultastyle.Label}>{text}</Text>

      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
          onHide={hidePicker}
        />
      )}

      <Button size='large' onPress={handleRegister} style={AgendarConsultastyle.Button}>AGENDAR</Button>
    </Layout>
  )
}