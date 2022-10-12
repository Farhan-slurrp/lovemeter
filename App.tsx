import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import SingleEntry from "./src/components/SingleEntry";

export default function App() {
  // const [isCalculated, setIsCalculated]: [boolean, Dispatch<SetStateAction<boolean>>] =
  //   useState<boolean>(false);
  const [lovePercentage, setLovePercentage]: [
    null | number,
    Dispatch<SetStateAction<null | number>>
  ] = useState<null | number>(null);
  const [guyName, setGuyName] = useState<string>("");
  const [girlName, setGirlName] = useState<string>("");
  const [isGuyNameFilled, setIsGuyNameFilled] = useState<boolean>(true);
  const [isGirlNameFilled, setIsGirlNameFilled] = useState<boolean>(true);

  const calculateLovePercentage = async () => {
    if (!guyName || !girlName) {
      if (!guyName) {
        setIsGuyNameFilled(false);
      } else {
        setIsGirlNameFilled(false);
      }
      return;
    }

    type alphabetOpts = {
      [key: string]: number;
    };

    let text = `${guyName.toLowerCase().replace(/\s/g, "")}loves${girlName
      .toLowerCase()
      .replace(/\s/g, "")}`;
    let textsObj: alphabetOpts = {};
    let textArray: Number[] = [];

    // make objects of each letter
    for (let i = 0; i < text.length; i++) {
      if (!(text[i] in textsObj)) {
        textsObj[text[i]] = 1;
      } else {
        textsObj[text[i]] += 1;
      }
    }

    // turn object to array
    for (let k in textsObj) {
      textArray.push(textsObj[k]);
    }

    // make new array, pop every first element and last element of old array
    while (textArray.length > 2) {
      let oldArray: any[] = [...textArray];
      let newArray = [];
      while (oldArray.length > 1) {
        let firstElem = oldArray.shift();
        let lastElement = oldArray.pop();
        newArray.push(firstElem! + lastElement!);
      }
      if (oldArray.length == 1) {
        newArray.push(oldArray.pop());
      }
      textArray = newArray
        .join("")
        .split("")
        .map((e) => Number(e));
    }

    const currPercentage = Number(textArray.join("").slice(0, 2));
    const x = setInterval(() => {
      setLovePercentage(Math.floor(Math.random() * currPercentage));
    }, 10);
    setTimeout(async () => {
      await clearInterval(x);
      setLovePercentage(currPercentage);
    }, 1000);
  };

  if (lovePercentage) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LOVEMETER &hearts;</Text>
        <Text style={styles.resultTitle}>Love Percentage:</Text>
        <Pressable
          style={{
            marginVertical: 30,
            width: 200,
            borderRadius: 100,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: lovePercentage > 50 ? "green" : "red",
          }}
          onPress={calculateLovePercentage}
        >
          <Text style={styles.resultText}>{lovePercentage}%</Text>
        </Pressable>
        <Pressable
          style={{
            marginVertical: 30,
            width: 80,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
          }}
          onPress={() => setLovePercentage(null)}
        >
          <Text
            style={{
              fontWeight: "700",
              color: "white",
              padding: 10,
              fontSize: 12,
              borderColor: "white",
            }}
          >
            BACK
          </Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOVEMETER &hearts;</Text>
      <SingleEntry imageSource={require("./assets/guy-profpict.jpg")} />
      <TextInput
        style={{
          height: 40,
          width: "80%",
          margin: 12,
          borderWidth: 1,
          borderColor: isGuyNameFilled ? "#cfd1cf" : "red",
          padding: 10,
        }}
        onChangeText={(e) => {
          setIsGuyNameFilled(true);
          setGuyName(e);
        }}
        value={guyName}
        placeholder="Enter Guy Name"
        keyboardType="default"
      />
      <Pressable style={styles.button} onPress={calculateLovePercentage}>
        <Text style={styles.buttonText}>Hitung</Text>
      </Pressable>
      <TextInput
        style={{
          height: 40,
          width: "80%",
          margin: 12,
          borderWidth: 1,
          borderColor: isGirlNameFilled ? "#cfd1cf" : "red",
          padding: 10,
        }}
        onChangeText={(e) => {
          setIsGirlNameFilled(true);
          setGirlName(e);
        }}
        value={girlName}
        placeholder="Enter Girl Name"
        keyboardType="default"
      />
      <SingleEntry imageSource={require("./assets/girl-profpict.jpg")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "center",
    paddingTop: 80,
  },
  title: {
    color: "#fc036b",
    fontWeight: "700",
    fontSize: 25,
    marginBottom: 50,
  },
  button: {
    marginVertical: 30,
    width: 100,
    borderRadius: 50,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
    fontSize: 18,
    borderColor: "white",
    paddingVertical: 34,
    paddingHorizontal: 15,
    borderRadius: 45,
    borderWidth: 1,
  },
  resultTitle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
    padding: 20,
    fontSize: 30,
    color: "gray",
    borderRadius: 50,
    fontWeight: "700",
  },
  resultText: {
    fontWeight: "700",
    color: "white",
    fontSize: 28,
    borderColor: "white",
  },
});
