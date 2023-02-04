import { useState } from "react";
import characters from "./assets/chars";
import { styles } from "./assets/styles";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Clipboard from "@react-native-clipboard/clipboard";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

export default function App() {
  const [length, setLength] = useState(8);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("Click on Generate button");

  const adUnitId =
    Platform.OS === "ios" ? "ca-app-pub-4615432502114571~1919243833" : "ca-app-pub-4615432502114571~4365729180";

  const getRandomNumber = (n: number): number => Math.floor(Math.random() * n);
  const copyToClipboard = (password: string) => Clipboard.setString(password);

  const generatePassword = () => {
    let pw: string = "";
    let n: number;

    let includesSymbol: boolean = false;
    let includesNumber: boolean = false;
    let includesLetter: boolean = false;

    for (let i = 0; i < length; i++) {
      n = getRandomNumber(8);
      if (n === 1 && !characters.symbols.includes(pw.charAt(i - 1)) && i > 2 && useSymbols) {
        pw += characters.symbols[getRandomNumber(characters.symbols.length)];
        includesSymbol = true;
      } else if ((n === 3 || n === 4) && i > 0) {
        pw += characters.numbers[getRandomNumber(characters.numbers.length)];
        includesNumber = true;
      } else {
        pw += characters.letters[getRandomNumber(characters.letters.length)];
        includesLetter = true;
      }
    }

    (useSymbols && includesSymbol && includesLetter && includesNumber) ||
    (!useSymbols && !includesSymbol && includesLetter && includesNumber)
      ? setPassword(pw)
      : generatePassword();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="lock" size={120} color="black" style={styles.lockIcon} />
        <View style={styles.titleWrapper}>
          <Text style={styles.brandName}>Simple</Text>
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

        <TouchableOpacity style={styles.passwordBtn} onPress={() => copyToClipboard(password)}>
          <Text style={styles.passwordTxt}>{password}</Text>
          <Octicons name="copy" size={14} color="black" style={styles.copyIcon} />
        </TouchableOpacity>

        <BannerAd
          unitId={TestIds.BANNER}
          size={"300x50"}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <StatusBar style="auto" />
      </View>
    </View>
  );
}
