import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Keyboard, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TextInput, View, ScrollView } from "react-native";
// import icon from "./components/icons/trashIcon.png";
import Task from "./components/Task";

const trashIcon = 'https://img.icons8.com/ios/96/000000/delete-trash.png';
const copyIcon = 'https://img.icons8.com/ios/50/000000/copy.png';
// import { useKeyboard } from 'react-native-community/hooks'

export default function App() {
  // const keyboard = useKeyboard()
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };


  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy);
  };

  const dublicateAll = (index) => {
    setTaskItems([
      ...taskItems.slice(0, index),
      ...taskItems.slice(index + 1)
    ]);
  }

   const removeAllTasks = () => {
      let clearList = []
      setTaskItems(clearList);
  };

  return (
    <View style={styles.container}>
      {/* Today's tasks */}

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Задачи на сегодня</Text>
        <ScrollView style={styles.items}>
          {/* {Tasks} */}

          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>

            );
          })}
        </ScrollView>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={"Write a task"} value={task} onChangeText={(text) => setTask(text)}></TextInput>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWraper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeAllTasks()}>
          <View style={styles.addWraper}>
            <Text style={styles.addText}>
              <Image style={styles.icons} source={{ uri: trashIcon }} />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dublicateAll()}>
          <View style={styles.addWraper}>
            <Text style={styles.addText}>
              <Image style={styles.icons} source={{ uri: copyIcon }} />
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#E8EAED",
    flexDirection: "column",
    height: "96%",
    marginTop: 30,
  },
  tasksWrapper: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "auto",
    paddingTop: 80,
    paddingHorizontal: 20,
    height: "90%",
    overflow: "scroll",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    marginBottom: 10,
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },

  addWraper: {
    width: 45,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },

  addText: {
    fontWeight: "bold",
  },

  icons: {
    width: 25,
    height: 25,
  }
});
