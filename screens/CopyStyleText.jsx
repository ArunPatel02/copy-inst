import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { styled } from "nativewind";
import { CustomContext } from "../Appcontext";
import { Change } from "../components/FontStyle";
import RenderHtml from "react-native-render-html";
import * as Clipboard from "expo-clipboard";
import { htmlToText } from "html-to-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const CopyStyleText = () => {
  const {
    fontSearch,
    setfontSearch,
    setcreatePostInput,
    updateScreteInput,
    inputRef,
    fontSearchvalue,
    setfontSearchvalue,
  } = useContext(CustomContext);

  const [fontArray, setfontArray] = useState([]);
  const [fontArrayHistory, setfontArrayHistory] = useState([]);

  useEffect(() => {
    if (fontSearch) {
      const result = Change(fontSearch);
      // console.log("this is result", result);
      setfontArray(result);
    }
  }, [fontSearch]);

  useEffect(() => {
    setfontSearch("");
    setfontSearchvalue("");
    AsyncStorage.getItem("fontSearchHistory").then((value) => {
      console.log(
        JSON.parse(value).sort((a, b) => (a.Date < b.Date ? 1 : -1)),
        "result setfontArrayHistory"
      );
      const result = JSON.parse(value);
      if (result) {
        setfontArrayHistory(result.sort((a, b) => (a.Date < b.Date ? 1 : -1)));
      }
    });
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      console.log("this is input ref", inputRef.current);
      setTimeout(() => {
        inputRef.current.focus();
      }, 500);
    }
  }, [inputRef.current]);

  const Listitem = ({ itemText, time }) => {
    return (
      <>
        {itemText !== "" ? (
          <Pressable
            android_ripple={{ color: "#0000080" }}
            activeOpacity={0.7}
            className="px-3 py-4"
            style={styles.hastagBar}
            onPress={async () => {
              setfontSearch(itemText);
              setfontSearchvalue(itemText);
            }}
          >
            <View className="ml-4">
              <Text className="text-[17px] font-normal">{itemText}</Text>
              <Text className="text-[14px] text-gray-400">
                {moment.utc(time).local().startOf("seconds").fromNow()}
              </Text>
            </View>
          </Pressable>
        ) : null}
      </>
    );
  };

  const { width } = useWindowDimensions();
  return (
    <ScrollView>
      <View className="mx-3 mt-3 mb-1">
        <Text className="text-base" style={{ color: "#969595" }}>
          1. Enter English or number in the input field (Any other languages are
          not allowed).
        </Text>
        <Text className="text-base" style={{ color: "#969595" }}>
          2. Press the done button on the keyboard.
        </Text>
        <Text className="text-base" style={{ color: "#969595" }}>
          3. A list of results with fonts applied will be shown below.
        </Text>
        <Text className="text-base" style={{ color: "#969595" }}>
          4. Touch the one you like and it will be inserted to the post.
        </Text>
      </View>
      <View
        className="py-2 px-3 flex flex-row gap-1 items-center border-b-[#969595]"
        style={{ borderBottomWidth: 0.3 }}
      >
        <Entypo name="back-in-time" size={18} color="gray" />
        <Text className="text-base text-[#969595]" style={{ color: "#969595" }}>
          Recent Searches
        </Text>
      </View>
      {fontArray.length && fontSearch
        ? fontArray.map((item, idx) => (
            <TouchableOpacity
              className="w-full h-14 mx-3 border-b-[#969595] flex justify-center"
              style={{ borderBottomWidth: 0.3 }}
              key={idx}
              onPress={async () => {
                const convert = htmlToText(
                  `<p style='width:${width};font-size: 30px'>${item}</p>`
                );
                // console.log(convert);
                // setcreatePostInput((pre) => `${pre} ${convert} `);
                // updateScreteInput(convert);
                Clipboard.setStringAsync(convert);
                const history = await AsyncStorage.getItem("fontSearchHistory");
                if (JSON.parse(history)) {
                  AsyncStorage.setItem(
                    "fontSearchHistory",
                    JSON.stringify([
                      ...JSON.parse(history),
                      { search: fontSearch, Date: new Date() },
                    ])
                  );
                  setfontArrayHistory((pre) => [
                    { search: fontSearch, Date: new Date() },
                    ...pre,
                  ]);
                } else {
                  AsyncStorage.setItem(
                    "fontSearchHistory",
                    JSON.stringify([{ search: fontSearch, Date: new Date() }])
                  );
                  setfontArrayHistory([
                    { search: fontSearch, Date: new Date() },
                  ]);
                }
                // Clipboard.setStringAsync(`${convert}`);
              }}
            >
              <RenderHtml
                contentWidth={width}
                source={{
                  html: `<div style='width:${width};font-size: 16px' onclick>${item}</div>`,
                }}
              />
            </TouchableOpacity>
          ))
        : fontArrayHistory.length
        ? fontArrayHistory.map((_, idx) => (
            <Listitem itemText={_.search} key={idx.toString()} time={_.Date} />
          ))
        : null}
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet?.create({
  hastagBar: {
    borderBottomColor: "#d1cfcf",
    borderBottomWidth: 0.5,
  },
  boxShadow: {
    shadowColor: "#393ec4",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default CopyStyleText;
