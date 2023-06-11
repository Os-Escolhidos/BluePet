import { useNavigation } from '@react-navigation/native'
import { AgendarConsultastyle } from './styles'
import "../../config/firebase"
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Layout, Text, Input, Button, Datepicker } from '@ui-kitten/components/ui';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native';

export const AgendarConsulta = () => {
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime)

    console.log(fDate + ' (' + fTime + ')')
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const [value, setValue] = useState({
    data: "",
    horario:""
  });
  async function handleRegister() {
    if (value.data === "" || value.horario === "") {
      setErrorMessage("É necessário o preenchimento de todos os campos.");
      return;
    }
    try {
      await addDoc(collection(db, "consultas"), {
        data: value.data,
        horario: value.horario,
      }).then(() => navigation.navigate("HomeFunc"));
    }
    catch (error: any) {
      setErrorMessage(error);
    }
  }

  const handleDateSelect = (nextDate) => {
    const formattedDate = nextDate.toLocaleDateString(); // Format the date as desired
    setValue({ ...value, data: formattedDate });
    setDate(nextDate);
  };

  return (
    <Layout style={AgendarConsultastyle.View}>
      <Text category='h1' style={AgendarConsultastyle.Text}>Agendar Consulta</Text>

      {errorMessage ? <Text style={AgendarConsultastyle.Erro}>{errorMessage}</Text> : null}

      <Text category='h6' style={AgendarConsultastyle.Label}>Data</Text>
      <Datepicker date={date} onSelect={handleDateSelect}></Datepicker>

      <Text category='h6' style={AgendarConsultastyle.Label}>Horário</Text>
      <Input style={AgendarConsultastyle.TextInput} onChangeText={(text) => setValue({ ...value, horario: text })}></Input>

      <Button size='large' onPress={handleRegister} style={AgendarConsultastyle.Button}>AGENDAR</Button>
    </Layout>
  )
}