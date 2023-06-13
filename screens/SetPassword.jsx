import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Pressable,
  Animated,
  Vibration,
} from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomContext } from "../Appcontext";
import { FontAwesome5 } from "@expo/vector-icons";

const SetPassword = () => {
  const [pin, setpin] = useState([]);
  const [confirmpin, setconfirmpin] = useState([]);
  console.log(pin, "this is pin");
  const [confirmPinWrong, setconfirmPinWrong] = useState(false);
  const [confirmScreen, setconfirmScreen] = useState(false);
  const { lockactive, setlockactive, lockPin, setlockPin, setlockFirstTime } =
    useContext(CustomContext);

  const navigation = useNavigation();

  const anim = useRef(new Animated.Value(0));
  // setlockactive(false);
  const shake = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(anim.current, {
          toValue: -10,
          duration: 15,
        }),
        // shift element to the right by 2 units
        Animated.timing(anim.current, {
          toValue: 10,
          duration: 15,
        }),
        // bring the element back to its original position
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 15,
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 3 }
    ).start();
  }, []);

  return (
    <>
      {!confirmScreen ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.contnet}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#0008",
                  textAlign: "center",
                }}
              >
                Enter Password
              </Text>
              {confirmPinWrong ? (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#000",
                      textAlign: "center",
                      marginTop: 2,
                    }}
                  >
                    Password do not match.
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#000",
                      textAlign: "center",
                      marginTop: 2,
                    }}
                  >
                    Please try again from the beginning.
                  </Text>
                </>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#000",
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  Please enter a Password
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 180,
                  marginTop: 60,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 25,
                    height: pin[0] || pin[0] === 0 ? 25 : 3,
                    borderRadius: 20,
                    backgroundColor: "#393ec5",
                  }}
                ></View>
                <View
                  style={{
                    width: 25,
                    height: pin[1] || pin[1] === 0 ? 25 : 3,
                    borderRadius: 20,
                    backgroundColor: "#393ec5",
                  }}
                ></View>
                <View
                  style={{
                    width: 25,
                    height: pin[2] || pin[2] === 0 ? 25 : 3,
                    borderRadius: 20,
                    backgroundColor: "#393ec5",
                  }}
                ></View>
                <View
                  style={{
                    width: 25,
                    height: pin[3] || pin[3] === 0 ? 25 : 3,
                    borderRadius: 20,
                    backgroundColor: "#393ec5",
                  }}
                ></View>
              </View>
            </View>
          </View>
          <View style={styles.numpad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "cancel", 0, "back"].map(
              (_, index) => (
                <View key={index.toString()} style={styles.numpadButtons}>
                  <View
                    style={{
                      // backgroundColor: "red",
                      // padding: 20,
                      // paddingHorizontal: _ === "cancel" || _ === "back" ? 15 : 30,
                      borderRadius: 30,
                      overflow: "hidden",
                    }}
                  >
                    <Pressable
                      style={{
                        padding: _ === "cancel" || _ === "back" ? 20 : 20,
                        paddingHorizontal:
                          _ === "cancel" || _ === "back" ? 15 : 30,
                        borderRadius: 30,
                        //   backgroundColor : "red"
                      }}
                      android_ripple={{ color: "#63606069" }}
                      onPress={() => {
                        if (_ === "cancel") {
                          navigation.goBack();
                        }
                        if (_ !== "cancel" && _ !== "back") {
                          if (pin.length === 4) {
                            return;
                          }
                          let data = [...pin];
                          data.push(_);
                          setpin(data);
                          if (data.length === 4) {
                            console.log("this is last");
                            // setconfirmScreen(true);
                            setconfirmpin([]);
                            setTimeout(() => {
                              setconfirmScreen(true);
                            }, 500);
                          }
                        }
                        if (_ === "back") {
                          let data = [...pin];
                          data.pop();
                          console.log("this is after pop", data);
                          setpin(data);
                        }
                      }}
                    >
                      <Text
                        style={
                          _ === "cancel" || _ === "back"
                            ? {
                                fontSize: 16,
                                fontWeight: "400",
                                color: "gray",
                              }
                            : {
                                fontSize: 18,
                                fontWeight: "600",
                              }
                        }
                      >
                        {_ === "back" ? (
                          <FontAwesome5
                            name="backspace"
                            size={20}
                            color="gray"
                          />
                        ) : (
                          _
                        )}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )
            )}
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.contnet}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#0008",
                  textAlign: "center",
                }}
              >
                Enter Password
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#000",
                  textAlign: "center",
                  marginTop: 2,
                }}
              >
                Please enter it again to confirm
              </Text>
              <Animated.View
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 180,
                    marginTop: 60,
                    alignItems: "center",
                  },
                  { transform: [{ translateX: anim.current }] },
                ]}
              >
                <View
                  style={{
                    width: 25,
                    height: confirmpin[0] || confirmpin[0] === 0 ? 25 : 3,
                    borderRadius: 20,
                    backgroundColor: "#393ec5",
                  }}
                ></View>
                <View
                  style={{
                    width: 25,
                    height: confirmpin[1] || confirmpin[1] === 0 ? 25 : 3,
                    borderRadius: 20,
                    backgroundColor: "#393ec5",
                  }}
                ></View>
                <View
                  style={{
                    width: 25,
                    height: confirmpin[2] || confirmpin[2] === 0 ? 25 : 3,
                    borderRadius: 20,
                    backgroundColor: "#393ec5",
                  }}
                ></View>
                <View
                  style={{
                    width: 25,
                    height: confirmpin[3] || confirmpin[3] === 0 ? 25 : 3,
                    borderRadius: 20,
                    backgroundColor: "#393ec5",
                  }}
                ></View>
              </Animated.View>
            </View>
          </View>
          <View style={styles.numpad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "cancel", 0, "back"].map(
              (_, index) => (
                <View key={index.toString()} style={styles.numpadButtons}>
                  <View
                    style={{
                      // backgroundColor: "red",
                      // padding: 20,
                      // paddingHorizontal: _ === "cancel" || _ === "back" ? 15 : 30,
                      borderRadius: 30,
                      overflow: "hidden",
                    }}
                  >
                    <Pressable
                      style={{
                        padding: _ === "cancel" || _ === "back" ? 20 : 20,
                        paddingHorizontal:
                          _ === "cancel" || _ === "back" ? 15 : 30,
                        borderRadius: 30,
                        //   backgroundColor : "red"
                      }}
                      android_ripple={{ color: "#63606069" }}
                      onPress={async () => {
                        if (_ === "cancel") {
                          navigation.goBack();
                        }
                        if (_ !== "cancel" && _ !== "back") {
                          let data = [...confirmpin];
                          if (data.length === 4) {
                            return;
                          }
                          data.push(_);
                          setconfirmpin(data);
                          if (data.length === 4) {
                            // setconfirmScreen(true);
                            let pindata = [...pin];
                            if (data.toString() === pindata.toString()) {
                              await AsyncStorage.setItem(
                                "password",
                                JSON.stringify({ pin: pin, isPassword: true })
                              );
                              setlockactive(true);
                              setlockPin(pin);
                              setlockFirstTime(false);
                              navigation.goBack();
                            } else {
                              //
                              setpin([]);
                              setconfirmPinWrong(true);
                              Vibration.vibrate(100);
                              shake();
                              setTimeout(() => {
                                setconfirmScreen(false);
                              }, 500);
                            }
                          }
                        }
                        if (_ === "back") {
                          let data = [...confirmpin];
                          data.pop();
                          console.log("this is after pop", data);
                          setconfirmpin(data);
                        }
                      }}
                    >
                      <Text
                        style={
                          _ === "cancel" || _ === "back"
                            ? {
                                fontSize: 16,
                                fontWeight: "400",
                                color: "gray",
                              }
                            : {
                                fontSize: 18,
                                fontWeight: "600",
                              }
                        }
                      >
                        {_ === "back" ? (
                          <FontAwesome5
                            name="backspace"
                            size={20}
                            color="gray"
                          />
                        ) : (
                          _
                        )}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default SetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contnet: {
    flex: 0.64,
    justifyContent: "center",
    alignItems: "center",
  },
  numpad: {
    flex: 0.36,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 5,
  },
  numpadButtons: {
    width: "26%",
    alignItems: "center",
  },
});
