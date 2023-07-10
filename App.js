import { TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/Screens/Navigation/Navigation";

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </TouchableWithoutFeedback>
  );
}
