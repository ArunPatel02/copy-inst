import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SlideItem from "./SlideItem";
import Pagination from "./Pagination";

const { width } = Dimensions.get("window");

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

const Slider = ({ setisTutorialDone, navigation }) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const flatListRef = useRef(null);

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const handleOnNext = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: index + 1,
      });
    }
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={Slides}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        snapToInterval={width}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />
      <Pagination
        data={Slides}
        scrollX={scrollX}
        index={index}
        handleOnNext={handleOnNext}
        setisTutorialDone={setisTutorialDone}
        navigation={navigation}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
