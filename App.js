import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { app, database } from './firebase';

export default function App() {
  //add new work

  return (
    <View style={styles.container}>
      <AppBar />
      <AppBody />
      <StatusBar style="auto" />
    </View>
  );
}

const AppBar = () => {

  return (
    <View style={styles.appBar}>
      <Text>Welcome to Work-Time-App</Text>
    </View>
  )
}

const AppBody = () => {

  return (
    <View>
      <DataBar />
      <AddNewForm />
      <DataItems />
    </View>
  )
}

const DataBar = () => {

  return (
    <View style={styles.tableRow}>
      <Button 
        style={styles.tableCell}
        title='Add new' />
      <Text style={styles.tableCell}>Start</Text>
      <Text style={styles.tableCell} >End</Text>
      <Text style={styles.tableCell} >Total</Text>
    </View>
  )
}

const AddNewForm = () => {

  return (
    <View style={styles.tableRow}>
      <TextInput style={[styles.textinput, styles.tableCell]} />
      <Button
        style={styles.tableCell} 
        title='Go' />
    </View>
  )
}

const DataItems = () => {

  const data = [{key: 1, name: 'say hello'}, {key: 2, name: 'make coffe'}]

  return (
    <View>
      <FlatList 
        data={data}
        renderItem={(item) => 
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.item.name}</Text>
            <Text style={styles.tableCell}>Edit</Text>
            <Text style={styles.tableCell}>Edit</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    marginTop: 500
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableCell: {
    padding: 20
  },
  textinput: {
    backgroundColor: 'lightblue',
    width: '70%'
  }
});
