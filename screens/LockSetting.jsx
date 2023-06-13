import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CustomContext } from "../Appcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import PINCode from "@haskkor/react-native-pincode";

const LockSetting = () => {
  const [currentpostion] = useState(new Animated.Value(0));
  const {
    lockactive,
    setlockactive,
    lockFirstTime,
    setlockFirstTime,
    lockPin,
  } = useContext(CustomContext);
  const navigation = useNavigation();
  const translateValue = 95 - 35 - 12;
  const radioButtonClick = async () => {
    if (!lockactive) {
      if (!lockFirstTime) {
        Animated.timing(currentpostion, {
          toValue: translateValue,
          useNativeDriver: true,
          duration: 300,
        }).start();
        await AsyncStorage.setItem(
          "password",
          JSON.stringify({ pin: lockPin, isPassword: true })
        );
      }
      if (lockFirstTime) {
        navigation.navigate("setPassword");
      }
      console.log("this is called");
    } else {
      Animated.timing(currentpostion, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
      await AsyncStorage.setItem(
        "password",
        JSON.stringify({ pin: lockPin, isPassword: false })
      );
    }
    if (!lockFirstTime) {
      setlockactive((pre) => !pre);
    }
  };
  console.log("this is lockactive --", lockactive, lockFirstTime);

  useEffect(() => {
    console.log("this is lockactive", lockactive, lockFirstTime);
    if (lockactive) {
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
  }, [lockactive]);

  console.log("current", currentpostion);

  return (
    <SafeAreaView>
      <View style={styles.flexContainer}>
        <View>
          <Text style={styles.textItem}>User Password</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.radioButton,
            lockactive ? { backgroundColor: "#393ec5" } : {},
          ]}
          onPress={() => radioButtonClick()}
        >
          <Animated.View
            style={[
              styles.backgroundColorRadio,
              {
                transform: [{ translateX: currentpostion }],
              },
              lockactive ? { backgroundColor: "white" } : {},
            ]}
          >
            {!lockactive ? (
              <FontAwesome5 name="unlock" size={18} color="gray" />
            ) : (
              <FontAwesome5 name="lock" size={18} color="#393ec5" />
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
      {lockactive ? (
        <Pressable
          android_ripple={{ color: "#63606069" }}
          onPress={() => {
            navigation.navigate("setPassword");
          }}
        >
          <View style={styles.flexContainer}>
            <Text style={styles.textItem}>Change Password</Text>
          </View>
        </Pressable>
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
