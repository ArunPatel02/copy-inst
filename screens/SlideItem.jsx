import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item }) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <Text style={{ fontSize: 24, color: "#3339", fontWeight: "bold" }}>
          {`${item.title} `}
          <Text style={{ color: "#393ec5" }}>{`${item.price} `}</Text>
          {item.description}
        </Text> */}
        {item.component()}
      </View>
      <Animated.Image
        source={item.img}
        resizeMode="contain"
        style={[
          styles.image,
          //   {
          //     transform: [
          //       {
          //         translateY: translateYImage,
          //       },
          //     ],
          //   },
        ]}
      />
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
  },
  image: {
    flex: 0.425,
    width: "100%",
  },
  content: {
    flex: 0.3,
    alignItems: "center",
    marginHorizontal: "10%",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
});
