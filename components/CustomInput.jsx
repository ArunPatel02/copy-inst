import { StyleSheet, TextInput } from "react-native";
import React from "react";

const CustomInput = () => {
  return (
    <TextInput
      placeholder="Please Enter Your Content"
      autoFocus
      cursorColor="#393ec4"
      style={styles.inputStyle}
    />
  );
};

const styles = StyleSheet?.create({
  inputStyle: {
    backgroundColor: "white",
    // bg-white mx-2 my-4 text-base px-3 py-4 rounded-lg
    marginHorizontal: 8,
    marginVertical: 16,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default CustomInput;
