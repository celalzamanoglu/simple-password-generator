import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Pressable } from "react-native";

import { Slider } from "@miblanchard/react-native-slider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Octicons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

import { copyToClipboard, generatePassword } from "../../utils/functions";
import { CONSTANTS as $c } from "../../utils/constants";

import styles from "./styles";

/* AdMob imports
import mobileAds, {
  AdsConsent,
  AdsConsentStatus,
  TestIds,
  InterstitialAd,
  AdEventType,
  MaxAdContentRating,
} from "react-native-google-mobile-ads"
import { 
  check, request, PERMISSIONS, RESULTS 
} from "react-native-permissions";
*/

export const MainScreen = () => {
  /* AdMob state controls
  const [enableAd, setEnableAd] = useState(false);
  const [answered, setAnswered] = useState(true); // set to true for no ads, should
  */

  const [password, setPassword] = useState("Click on Generate button");
  const [length, setLength] = useState(8);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  /* Google AdMob configurations
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

  const onPressHandler = () => {
    const pw: string = generatePassword(useSymbols, length);
    setPassword(pw);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/images/icon.png")} style={styles.image} />
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

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxContainerText}>Include special characters </Text>
          <BouncyCheckbox
            disableText
            fillColor="#000000"
            isChecked={useSymbols}
            onPress={(isChecked: boolean) => {
              setUseSymbols(isChecked);
            }}
          />
        </View>

        <Pressable style={styles.generateButton} onPress={onPressHandler}>
          <Text style={styles.generateTxt}>Generate</Text>
        </Pressable>

        <TouchableOpacity
          style={styles.passwordButton}
          onPress={() => {
            setCopied(false);
            copyToClipboard(password);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1500);
          }}
        >
          <Text style={styles.passwordText}>{password}</Text>
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
            <AntDesign name="checkcircleo" color={$c.colors.secondary} size={22} />
            <Text style={styles.copiedText}>Password copied to the clipboard!</Text>
          </MotiView>
        )}

        <StatusBar style="auto" />
      </View>
    </View>
  );
};
