import React from "react";
import characters from "./assets/chars";
import Lottie from "lottie-react-native";
import { styles } from "./assets/styles";
import CONSTANTS from "./assets/constants";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { Easing, timing } from "react-native-reanimated";
import { MotiPressable } from "moti/interactions";
import { Slider } from "@miblanchard/react-native-slider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Text, TouchableOpacity, View, Image } from "react-native";
import { TestIds, InterstitialAd, AdEventType } from "react-native-google-mobile-ads";
import { Tooltip } from "react-native-paper";
import { MotiView } from "moti";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function App() {
  const [enableAd, setEnableAd] = React.useState(false);
  const [length, setLength] = React.useState(8);
  const [password, setPassword] = React.useState("Click on Generate button");
  const [showSplash, setShowSplash] = React.useState(true);
  const [useSymbols, setUseSymbols] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Utilization functions
  const copyToClipboard = (password: string) => Clipboard.setString(password);
  const getRandomNumber = (n: number): number => Math.floor(Math.random() * n);

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
  React.useEffect(() => {
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
    let n: number;
    let pw: string = "";

    let includesLetter: boolean = false;
    let includesNumber: boolean = false;
    let includesSymbol: boolean = false;

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

          <MotiPressable
            from={{ rotate: "-0.5deg" }}
            animate={({ hovered, pressed }) => {
              "worklet";

              return {
                rotate: hovered || pressed ? "0.5deg" : "0deg",
              };
            }}
            transition={{
              type: "timing",
              duration: 50,
              easing: Easing.out(Easing.ease),
              repeat: 5,
            }}
            style={styles.generateBtn}
            onPress={generatePassword}
          >
            <Text style={styles.generateTxt}>Generate</Text>
          </MotiPressable>

          <TouchableOpacity
            style={styles.passwordBtn}
            onPress={() => {
              setCopied(false);
              copyToClipboard(password);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1500);
            }}
          >
            <Text style={styles.passwordTxt}>{password}</Text>
            <Octicons name="copy" size={14} color="black" />
          </TouchableOpacity>

          {copied && (
            <MotiView
              from={{ opacity: 0.75 }}
              animate={{ opacity: 0 }}
              transition={{
                type: "timing",
                duration: 1500,
                easing: Easing.out(Easing.ease),
              }}
              style={styles.copiedMsg}
            >
              <Text style={styles.copiedTxt}>Copied!</Text>
            </MotiView>
          )}

          <StatusBar style="auto" />
        </View>
      </View>
    );
  }
}
