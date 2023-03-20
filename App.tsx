import React from "react";
import { MotiView } from "moti";
import characters from "./assets/chars";
import LottieView from "lottie-react-native";
import { styles } from "./assets/styles";
import CONSTANTS from "./assets/constants";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";
import { Slider } from "@miblanchard/react-native-slider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Clipboard from "@react-native-clipboard/clipboard";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Text, TouchableOpacity, View, Image, Pressable } from "react-native";
// import mobileAds, {
//   AdsConsent,
//   AdsConsentStatus,
//   TestIds,
//   InterstitialAd,
//   AdEventType,
//   MaxAdContentRating,
// } from "react-native-google-mobile-ads";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function App() {
  const [enableAd, setEnableAd] = React.useState(false);
  const [length, setLength] = React.useState(8);
  const [password, setPassword] = React.useState("Click on Generate button");
  const [showSplash, setShowSplash] = React.useState(true);
  const [answered, setAnswered] = React.useState(true); // set to true for no ads, should
  const [useSymbols, setUseSymbols] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [restartAnimation, setRestartAnimation] = React.useState(1);

  // Utilization functions
  const copyToClipboard = (password: string) => Clipboard.setString(password);
  const getRandomNumber = (n: number): number => Math.floor(Math.random() * n);

  // Google AdMob configurations
  /*
  const adUnitId = Platform.OS === "ios" ? CONSTANTS.AdMob.IosID : CONSTANTS.AdMob.AndroidID;

  AsyncStorage adjustments to follow "Generate" button press count
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

  
  React.useEffect(() => {
    // Ask for tracking permission
    const getTrackingPermission = async () => {
      const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      console.log("RESULT " + result);
      if (result === RESULTS.DENIED) {
        // The permission has not been requested, so request it.
        await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      }
      setAnswered(true);
      const adapterStatuses = await mobileAds().initialize();
      console.log(adapterStatuses);
    };

    getTrackingPermission();

    // Load Ad on render and every generate button press
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

    // adjustGenerateCount();
  };

  if (showSplash) {
    return (
      <View style={styles.splash}>
        <LottieView
          source={require("./assets/lottiesplash.json")}
          autoPlay
          key={restartAnimation}
          loop={false}
          speed={1.5}
          onAnimationFinish={() => {
            if (answered) {
              setShowSplash(false);
            } else {
              setRestartAnimation(getRandomNumber(1000));
            }
          }}
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
          <View style={styles.lenWrapper}>
            <Text style={styles.len}>Length</Text>
            <Text style={styles.lenNum}>{length}</Text>
          </View>

          <Slider
            value={length}
            onValueChange={(value: number) => setLength(value)}
            minimumValue={4}
            maximumValue={16}
            step={1}
            containerStyle={styles.slider}
          />

          <View style={styles.checkBoxContainer}>
            <Text style={styles.checkBoxContainerTxt}>Include special characters </Text>
            <BouncyCheckbox
              disableText
              fillColor="#000000"
              isChecked={useSymbols}
              onPress={(isChecked: boolean) => {
                setUseSymbols(isChecked);
              }}
            />
          </View>

          <Pressable style={styles.generateBtn} onPress={generatePassword}>
            <Text style={styles.generateTxt}>Generate</Text>
          </Pressable>

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
              from={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                type: "timing",
                duration: 2000,
                easing: Easing.back(0.7),
              }}
              style={styles.copiedMsg}
            >
              <AntDesign name="checkcircleo" color={CONSTANTS.colors.secondary} size={22} />
              <Text style={styles.copiedTxt}>Password copied to the clipboard!</Text>
            </MotiView>
          )}

          <StatusBar style="auto" />
        </View>
      </View>
    );
  }
}
