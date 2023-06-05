import {
  StyleSheet,
  Animated,
  View,
  Dimensions,
  Text,
  Pressable,
  TouchableHighlight,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");

const Pagination = ({
  data,
  scrollX,
  index,
  handleOnNext,
  setisTutorialDone,
  navigation
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.dotcontainer}>
        {data.map((_, idx) => {
          const inputRange = [
            (idx - 1) * width,
            idx * width,
            (idx + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [12, 30, 12],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.1],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#ccc", "#393ec5", "#ccc"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={idx.toString()}
              style={[
                styles.dot,
                { backgroundColor },
                // idx === index && styles.dotActive,
              ]}
            />
          );
        })}
      </View>
      <View
        style={{
          width: width * 0.9,
          marginHorizontal: "5%",
          borderRadius: 100,
          borderWidth: 1,
          borderColor: "#ddd2",
          borderBottomWidth: 0,
          shadowColor: "gray",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 100,
          elevation: 10,
          marginLeft: 5,
          marginRight: 5,
          marginTop: 6,
          overflow: "hidden",
        }}
      >
        <Pressable
          android_ripple={{ color: "#0000080" }}
          style={{
            backgroundColor: index === 4 ? "#393ec5" : "white",
            padding: 15,
            borderRadius: 100,
            width: "100%",
          }}
          onPress={async () => {
            if (index === 4) {
              if (navigation) {
                navigation.goBack()
                return;
              }
              if (setisTutorialDone) {
                setisTutorialDone(true);
                await AsyncStorage.setItem(
                  "isTutorialDone",
                  JSON.stringify({ done: true })
                );
              }
            } else {
              handleOnNext();
            }
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: index === 4 ? "white" : "#3339",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {index === 4 ? "Start" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 25,
    // flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dotcontainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: "#ccc",
    marginBottom: 30,
  },
  dotActive: {
    backgroundColor: "#000",
  },
});
