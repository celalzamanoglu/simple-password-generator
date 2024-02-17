import React, { useState } from "react";

import { Splash } from "./src/components";
import { MainScreen } from "./src/screens";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    setTimeout(() => setShowSplash(false), 1700);
    return <Splash />;
  } else {
    return <MainScreen />;
  }
}
