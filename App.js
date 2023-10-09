import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { app, database } from './firebase';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'

export default function App() {
  //add new work

  /*Functionality 
    add new work / firebase
      start with onPressedAddNew
    read 
    update
      two hooks
  */


  const [addNewDialog, setAddNewDialog] = useState(null)

  const [name, setName] = useState('')

  const [values, loading, error] = useCollection(collection(database, "work"))

  const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id}))

  return (
    <View style={styles.container}>
      <AppBar />
      <AppBody         
        addNewDialog={addNewDialog}
        setAddNewDialog={setAddNewDialog}
        name={name}
        setName={setName}
        data={data} />
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

  const name = props.name
  const setName = props.setName

  const data = props.data

  return (
    <View style={styles.container}>
      <DataBar 
        addNewDialog={addNewDialog}
        setAddNewDialog={setAddNewDialog} />
      {
        addNewDialog &&
        <AddNewForm
          addNewDialog={addNewDialog}
          setAddNewDialog={setAddNewDialog}
          name={name}
          setName={setName} />
      }
      <DataItems data={data} />
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

const AddNewForm = (props) => {

  const addNewDialog = props.addNewDialog
  const setAddNewDialog = props.setAddNewDialog

  const name = props.name
  const setName = props.setName

  async function addNewWorkToDatabase(){
    //save text
    alert('text/name is: '+name)
    await addDoc(collection(database, "work"), {
      name: name
    })
    setName('')
    alert('now name is: '+name)
    setAddNewDialog(null)
  }

  return (
    <View style={styles.tableRow}>
      <TextInput 
        onChangeText={(txt) => setName(txt)}
        style={[styles.textinput]} />
      <Pressable
        onPress={() => addNewWorkToDatabase()}
        style={
          {
            backgroundColor: "purple",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12
          }}>
            <Text style={styles.buttonText}>add</Text>
          </Pressable>
    </View>
  )
}

const DataItems = (props) => {

  const data = props.data

  //const data = [{key: 1, name: 'say hello'}, {key: 2, name: 'make coffe'}]

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
            <View style={styles.tableRow}>
              <TextInput 
                defaultValue='Edit'
                style={[styles.tableCell, {
                  borderColor: "blue",
                  borderWidth: 1
                }]} />
                <Pressable
                  onPress={() => addNewWorkToDatabase()}
                  style={
                    {
                      backgroundColor: "purple",
                      borderRadius: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 12
                    }}>
                  <Text style={styles.buttonText}>add</Text>
                </Pressable>
            </View>
            <View style={styles.tableRow}>
              <TextInput 
                defaultValue='Edit'
                style={[styles.tableCell, {
                  borderColor: "blue",
                  borderWidth: 1
                }]} />
                <Pressable
                  onPress={() => addNewWorkToDatabase()}
                  style={
                    {
                      backgroundColor: "purple",
                      borderRadius: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 12
                    }}>
                  <Text style={styles.buttonText}>add</Text>
                </Pressable>
            </View>

            <Text style={styles.tableCell}>Total</Text>
          </View>}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FF9C8',
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
    backgroundColor: "purple",
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
