import { View, Text } from "react-native";
import React from "react";
import Slider from "./Slider";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import SlideItem from "./SlideItem";

const Slides = [
  {
    id: 1,
    img: require("../assets/app_guide/posts.png"),
    component: () => (
      <Text
        style={{
          fontSize: 30,
          color: "#3339",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Manage your{" "}
        <Text style={{ color: "#393ec5", fontWeight: "bold" }}>posts</Text> for
        instagram!
      </Text>
    ),
  },
  {
    id: 2,
    img: require("../assets/app_guide/emoticons.png"),
    component: () => (
      <Text
        style={{
          fontSize: 30,
          color: "#3339",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Use <Text style={{ color: "#393ec5" }}>emoticons</Text> on your posts!
      </Text>
    ),
  },
  {
    id: 3,
    img: require("../assets/app_guide/fonts.png"),
    component: () => (
      <Text
        style={{
          fontSize: 30,
          color: "#3339",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Use pretty <Text style={{ color: "#393ec5" }}>fonts</Text> on your
        posts!
      </Text>
    ),
  },
  {
    id: 4,
    img: require("../assets/app_guide/a_post.png"),
    component: () => (
      <Text
        style={{
          fontSize: 30,
          color: "#3339",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        You can use <Text style={{ color: "#393ec5" }}>new line</Text> on your
        instagram!
      </Text>
    ),
  },
  {
    id: 5,
    img: require("../assets/app_guide/hashtag_groups.png"),
    component: () => (
      <Text
        style={{
          fontSize: 30,
          color: "#3339",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <Text style={{ color: "#393ec5" }}>#hashtags</Text> in groups!
      </Text>
    ),
  },
];

const { width, height } = Dimensions.get("screen");

const HowToUse = () => {
  const navigation = useNavigation();
  return (
    <>
      <Slider navigation={navigation} />
      {/* <View style={{ flex: 1 }}>
        <Carousel
          loop
          width={width}
          height={height}
          data={Slides}
          // scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item, index }) => <SlideItem item={item} />}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          pagingEnabled={true}
          // snapEnabled
        />
      </View> */}
    </>
  );
};

export default HowToUse;
