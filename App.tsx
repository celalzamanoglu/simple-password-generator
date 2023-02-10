import { useEffect, useState } from "react";
import characters from "./assets/chars";
import { styles } from "./assets/styles";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Text, TouchableOpacity, View, Image } from "react-native";
import { TestIds, InterstitialAd, AdEventType } from "react-native-google-mobile-ads";
import CONSTANTS from "./assets/constants";
import { Tooltip } from "react-native-paper";
import Lottie from "lottie-react-native";

export default function App() {
  const [length, setLength] = useState(8);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("Click on Generate button");
  const [enableAd, setEnableAd] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Utilization functions
  const getRandomNumber = (n: number): number => Math.floor(Math.random() * n);
  const copyToClipboard = (password: string) => Clipboard.setString(password);

  // Google AdMob configurations
  const adUnitId = Platform.OS === "ios" ? CONSTANTS.AdMob.IosID : CONSTANTS.AdMob.AndroidID;

  // AsyncStorage adjustments to follow "Generate" button press count
  // for __DEV__ gCountNum % 5 === 0  ? show Interstitial Ad
  // for production gCountNum % 10 === 0  ? show Interstitial Ad
  const adjustGenerateCount = async () => {
    const gCount = await AsyncStorage.getItem("G_COUNTER");
    if (gCount === null) {
      AsyncStorage.setItem("G_COUNTER", "1");
    } else {
      // turn it into number and adjust the number
      let gCountNum = Number(gCount);
      gCountNum += 1;

      // if mod5 === 0 let the ad run when generate button pressed
      gCountNum % 5 === 0 ? setEnableAd(true) : setEnableAd(false);

      // turn it into str again and store it in AsyncStorage
      let gCountStr = gCountNum.toString();
      AsyncStorage.setItem("G_COUNTER", gCountStr);
    }
  };

  // Load Ad on render and every generate button press
  // Disabled untill AdMob approves the app
  /*
  useEffect(() => {
    if (enableAd) {
      // Safety timeout for quick presses
      setTimeout(() => {}, 2000);

      const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ["fashion", "clothing"],
      });

      // Listen for Ad Load and show when loaded
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        interstitial.show();
      });

      // Start loading the interstitial straight away
      interstitial.load();

      // Unsubscribe from events on unmount
      return unsubscribe;
    }
  }, [password]);
  */

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

    // Validation for each case
    (useSymbols && includesSymbol && includesLetter && includesNumber) ||
    (!useSymbols && !includesSymbol && includesLetter && includesNumber)
      ? setPassword(pw)
      : generatePassword();

    adjustGenerateCount();
  };

  if (showSplash) {
    return (
      <View style={styles.splash}>
        <Lottie
          source={require("./assets/lottiesplash.json")}
          autoPlay
          loop={false}
          speed={1.5}
          onAnimationFinish={() => setShowSplash(!showSplash)}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("./assets/icon.png")} style={styles.image} />
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

          <Tooltip title="Copied!">
            <TouchableOpacity style={styles.passwordBtn} onPress={() => copyToClipboard(password)}>
              <Text style={styles.passwordTxt}>{password}</Text>
              <Octicons name="copy" size={14} color="black" />
            </TouchableOpacity>
          </Tooltip>

          <StatusBar style="auto" />
        </View>
      </View>
    );
  }
}
