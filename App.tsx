import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Slider } from "@miblanchard/react-native-slider";
import { getStatusBarHeight } from "react-native-safearea-height";
import { MaterialIcons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Octicons } from "@expo/vector-icons";

export default function App() {
  const [length, setLength] = useState(8);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("Click on Generate button");

  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const symbols = ["!", "@", "#", "$", "%", "&", "*", "_", "-", ".", "?"];

  const generatePassword = () => {
    let pw: string = "";
    for (let i = 0; i < length; i++) {
      const coinFlip = Math.floor(Math.random() * 3);
      if (coinFlip === 1) {
        pw += letters[Math.floor(Math.random() * letters.length)];
      } else if (coinFlip === 2 && useSymbols) {
        pw += symbols[Math.floor(Math.random() * symbols.length)];
      } else {
        pw += numbers[Math.floor(Math.random() * numbers.length)];
      }
    }
    setPassword(pw);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="lock" size={120} color="black" style={styles.lockIcon} />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Simple</Text>
          <Text style={styles.title}>Password Generator</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.len}>Length: {length}</Text>

        <Slider
          value={length}
          onValueChange={(value: number) => setLength(value)}
          minimumValue={4}
          maximumValue={16}
          step={1}
          containerStyle={styles.slider}
        />

        <View style={styles.checkBoxContainer}>
          <Text style={styles.checkBoxContainerTxt}>Include special characters: </Text>
          <BouncyCheckbox
            disableText
            fillColor="#000000"
            isChecked={useSymbols}
            onPress={(isChecked: boolean) => {
              setUseSymbols(isChecked);
            }}
          />
        </View>

        <TouchableOpacity style={styles.generateBtn} onPress={generatePassword}>
          <Text style={styles.generateTxt}>Generate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.passwordBtn}>
          <Text style={styles.passwordTxt}>{password}</Text>
          <Octicons name="copy" size={14} color="black" style={styles.copyIcon} />
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0e6",
    alignItems: "center",

    padding: 5,
    paddingTop: getStatusBarHeight(),
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  lockIcon: {
    margin: 20,
  },
  titleWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "500",

    marginBottom: 5,
  },
  content: {
    flex: 1,
    backgroundColor: "#faf0e6",
    alignItems: "center",
  },
  len: {
    fontSize: 20,
  },
  slider: {
    width: 220,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 20,
  },
  checkBoxContainerTxt: {
    fontSize: 20,
  },
  generateBtn: {
    width: 300,
    alignItems: "center",

    borderWidth: 0.5,
    borderRadius: 10,

    backgroundColor: "black",
  },
  generateTxt: {
    fontSize: 22,

    padding: 5,

    color: "white",
  },
  passwordBtn: {
    width: 300,
    flexDirection: "row",
    justifyContent: "center",

    borderWidth: 0.5,
    borderRadius: 5,

    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: -10,
    marginTop: 20,

    backgroundColor: "#faebd7",
  },
  passwordTxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  copyIcon: {},
});
