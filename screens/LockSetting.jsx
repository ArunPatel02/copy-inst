import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
// import PINCode from "@haskkor/react-native-pincode";

const LockSetting = () => {
  const [currentpostion] = useState(new Animated.Value(0));
  const [lockactive, setlockactive] = useState(false);
  const translateValue = 95 - 35 - 12;
  const radioButtonClick = () => {
    if (!lockactive) {
      Animated.timing(currentpostion, {
        toValue: translateValue,
        useNativeDriver: true,
        duration: 300,
      }).start();
    } else {
      Animated.timing(currentpostion, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
    }
    setlockactive((pre) => !pre);
  };

  console.log("current", currentpostion);

  return (
    <SafeAreaView>
      <View style={styles.flexContainer}>
        <View>
          <Text style={styles.textItem}>User Password</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.radioButton}
          onPress={() => radioButtonClick()}
        >
          <Animated.View
            style={[
              styles.backgroundColorRadio,
              {
                transform: [{ translateX: currentpostion }],
              },
            ]}
          >
            {!lockactive ? (
              <FontAwesome5 name="unlock" size={20} color="gray" />
            ) : (
              <FontAwesome5 name="lock" size={20} color="gray" />
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
      {lockactive ? (
        <View style={styles.flexContainer}>
          <View>
            <Text style={styles.textItem}>Change Password</Text>
          </View>
        </View>
      ) : null}
      {/* <PINCode status={'choose'} storePin="1234" /> */}
    </SafeAreaView>
  );
};

export default LockSetting;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#d1cfcf",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  textItem: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
  },
  radioButton: {
    width: 95,
    // height: 45,
    backgroundColor: "gray",
    padding: 6,
    borderRadius: 100,
    // alignItems: "flex-end",
  },
  backgroundColorRadio: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
