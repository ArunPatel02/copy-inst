import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Button = ({ label, size, ...rest }) => {
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
          colors={["#3E40C9", "#A353F4"]}
          style={styles.gradient}
        >
          <Text style={styles.text}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet?.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  button: {
    height: 50,
    width: "80%",
    // shadowColor: "gray",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: 600,
  },
});

export default Button;
