import { Pressable, StyleSheet, Text, View, Animated, Vibration } from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import { CustomContext } from "../Appcontext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

const LockHomeScreen = () => {
  const [pin, setpin] = useState([]);
  console.log(pin, "this is pin");
  const [confirmPinWrong, setconfirmPinWrong] = useState(false);
  const { lockPin, setlockFirstTime, isScreenLock, setisScreenLock } =
    useContext(CustomContext);

  const anim = useRef(new Animated.Value(0));

  const shake = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: -10,
          duration: 15,
        }),
        Animated.timing(anim.current, {
          toValue: 10,
          duration: 15,
        }),
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 15,
        }),
      ]),
      { iterations: 3 }
    ).start();
  }, []);
  return (
    <>
      {isScreenLock ? (
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
                Please enter a Password
              </Text>
              {confirmPinWrong ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#000",
                    textAlign: "center",
                    marginTop: 2,
                    color: "red",
                  }}
                >
                  Wrong Password!
                </Text>
              ) : null}
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
              </Animated.View>
            </View>
          </View>
          <View style={styles.numpad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "back"].map((_, index) => (
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
                    disabled={_ === ""}
                    style={{
                      padding: _ === "cancel" || _ === "back" ? 20 : 20,
                      paddingHorizontal:
                        _ === "cancel" || _ === "back" ? 15 : 30,
                      borderRadius: 30,
                      //   backgroundColor : "red"
                    }}
                    android_ripple={{ color: "#63606069" }}
                    onPress={() => {
                      if (_ !== "cancel" && _ !== "back") {
                        if (pin.length === 4) {
                          return;
                        }
                        let data = [...pin];
                        data.push(_);
                        setpin(data);
                        setconfirmPinWrong(false);
                        if (data.length === 4) {
                          console.log("this is last");
                          if (data.toString() === lockPin.toString()) {
                            setTimeout(() => {
                              setisScreenLock(false);
                              setpin([]);
                            }, 100);
                          } else {
                            //
                            setconfirmPinWrong(true);
                            Vibration.vibrate(100)
                            shake();
                            setTimeout(() => {
                              setpin([]);
                            }, 500);
                          }
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
                        <FontAwesome5 name="backspace" size={20} color="gray" />
                      ) : (
                        _
                      )}
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </SafeAreaView>
      ) : null}
    </>
  );
};

export default LockHomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100000,
    backgroundColor: "white",
  },
  contnet: {
    // flex: 0.64,
    height: "64%",
    justifyContent: "center",
    alignItems: "center",
  },
  numpad: {
    // flex: 0.36,
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
