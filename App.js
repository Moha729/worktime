import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { app, database } from './firebase';
import { useState } from 'react';

export default function App() {
  //add new work

  const [addNewDialog, setAddNewDialog] = useState(null)

  return (
    <View style={styles.container}>
      <AppBar />
      <AppBody 
        
        addNewDialog={addNewDialog}
        setAddNewDialog={setAddNewDialog} />
      <StatusBar style="auto" />
    </View>
  );
}

const AppBar = () => {

  return (
    <View style={styles.headerBar}>
      <Text style={[styles.headerText]}>Welcome to Work-Time-App</Text>
    </View>
  )
}

const AppBody = (props) => {

  const addNewDialog = props.addNewDialog
  const setAddNewDialog = props.setAddNewDialog

  return (
    <View style={styles.container}>
      <DataBar 
        addNewDialog={addNewDialog}
        setAddNewDialog={setAddNewDialog} />
      {
        addNewDialog &&
        <AddNewForm />
      }
      <DataItems />
    </View>
  )
}

const DataBar = (props) => {

  const addNewDialog = props.addNewDialog
  const setAddNewDialog = props.setAddNewDialog

  //TO-DO button does not have click effect
  function openAddNewDialog(){
    setAddNewDialog(true)
  }

  return (
    <View style={[styles.tableRow, {paddingBottom: 10}]}>
      <Pressable
        onPress={openAddNewDialog}
        style={styles.defaultButton} > 
          <Text style={styles.buttonText}>Add</Text>
      </Pressable>
      <Text style={[styles.tableCell, {
        fontSize: 20,
        fontWeight: '600'
      }]}>Start</Text>
      <Text style={[styles.tableCell, {
        fontSize: 20,
        fontWeight: '600'
      }]} >End</Text>
      <Text style={[styles.tableCell, {
        fontSize: 20,
        fontWeight: '600'
      }]} >Total</Text>
    </View>
  )
}

const AddNewForm = () => {

  return (
    <View style={styles.tableRow}>
      <TextInput style={[styles.textinput]} />
      <Button
        style={styles.tableCell} 
        title='Go' />
    </View>
  )
}

const DataItems = () => {

  const data = [{key: 1, name: 'say hello'}, {key: 2, name: 'make coffe'}]

  return (
    <View
    style={{width: '100%', maxHeight: '100%', overflow: 'visible'}}
    >
      <FlatList 
        data={data}
        renderItem={(item) => 
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, {
              fontSize: 20,
              fontWeight: '600'
            }]}>{item.item.name}</Text>
            <TextInput 
              defaultValue='Edit'
              style={[styles.tableCell, {
                borderColor: "blue",
                borderWidth: 1
              }]} />
            <TextInput 
              defaultValue='Edit'
              style={[styles.tableCell, {
                borderColor: "blue",
                borderWidth: 1
              }]} />
            <Text style={styles.tableCell}>Total</Text>
          </View>}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBar: {
    paddingTop: 150,
    paddingBottom: 0,

  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 24,
    fontWeight: '900'
    
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableCell: {
    paddingTop: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 1
  },
  textinput: {
    backgroundColor: 'lightblue',
    width: '70%',
    borderColor: "blue",
    borderWidth: 1
  },
  defaultButton: {
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
