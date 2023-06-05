import { View, Text } from "react-native";
import React from "react";
import Slider from "./Slider";
import { useNavigation } from "@react-navigation/native";

const HowToUse = () => {
  const navigation = useNavigation();
  return <Slider navigation={navigation} />;
};

export default HowToUse;
