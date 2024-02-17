import React, { useState, FC } from "react";
import { View } from "react-native";

import LottieView from "lottie-react-native";

import { getRandomNumber } from "../../utils";
import styles from "./styles";

export const Splash: FC = () => {
  const [answered, setAnswered] = useState(true); // set to true for no ads, should
  const [restartAnimation, setRestartAnimation] = useState(1);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={styles.splash}>
      <LottieView
        source={require("../../assets/lottie/lottiesplash.json")}
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
};
