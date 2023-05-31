import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Chip = ({ label, size, ...rest }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        {...rest}
        style={[styles.button, size ? { width: size } : {}]}
        activeOpacity={0.8}
      >
        <LinearGradient
          start={[0.0, 0.7]}
          end={[1.0, 0.7]}
          locations={[0.0, 1.0]}
          colors={rest.active ? ["#3E40C9", "#A353F4"] : ["#ffff", "#ffff"]}
          style={styles.gradient}
        >
          <Text
            style={[
              styles.text,
              rest.active ? { color: "white" } : { color: "gray" },
            ]}
          >
            {label}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet?.create({
  container: {
    display : "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  gradient: {
    // flex: 1,
    display : "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    borderRadius: 100,
    // paddingVertical: 10,
  },
  button: {
    // height: 40,
    // width: "80%",
    // shadowColor: "gray",
    // paddingVertical : 20,
    // height : 60
},
text: {
    paddingHorizontal: 20,
    color: "white",
    fontSize: 16,
    fontWeight: 400,
  },
});

export default Chip;
