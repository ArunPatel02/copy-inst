import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { styled, withExpoSnack } from "nativewind";
import Button from "../components/Button";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CustomContext } from "../Appcontext";
import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomListGroupHastags from "../components/BottomListGroupHastags";

const CreatePost = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    createPostInput,
    setcreatePostInput,
    postList,
    setpostList,
    isUpdating,
    setisUpdating,
    cursor,
    setcursor,
    ref,
    setvisible,
    setshowhastagBottomModal3,
    hashtagGroup,
  } = useContext(CustomContext);

  useEffect(() => {
    if (route?.params?.updatingIndex || route?.params?.updatingIndex === 0) {
      // console.log("this is route params", route.params);
      setisUpdating({ state: true, index: route.params.updatingIndex });
    } else {
      setcreatePostInput("");
      setisUpdating({ state: false, index: postList.length });
    }
  }, []);

  // console.log(isUpdating);

  return (
    <>
      <BottomListGroupHastags navigation={navigation} />
      <SafeAreaView className="flex-1 justify-between pb-2">
        <ScrollView>
          <TextInput
            placeholder="Please Enter Your Content"
            autoFocus
            multiline
            cursorColor="#393ec4"
            style={styles.inputStyle}
            value={`${createPostInput}`}
            onChangeText={(value) => {
              console.log(value, "this is value");
              setcreatePostInput((pre) => `${value}`);
            }}
            onSelectionChange={(e) => {
              console.log(e.nativeEvent.selection);
              setcursor(e.nativeEvent.selection);
            }}
            ref={ref}
          />
          <View className="mx-2">
            <Text className="text-base" style={{ color: "#969595" }}>
              1. Fill in the above field.
            </Text>
            <Text className="text-base" style={{ color: "#969595" }}>
              2. Click the 'Convert & Copy' button below.
            </Text>
            <Text className="text-base" style={{ color: "#969595" }}>
              3. Go to instagram app abd paste it.
            </Text>
          </View>
        </ScrollView>
        <View>
          <View className="w-full flex flex-row gap-2 pl-2">
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex-grow flex flex-row justify-center items-center rounded-lg bg-white py-2"
              style={styles.boxShadow}
              onPress={() => navigation.navigate("addHastag")}
            >
              <Fontisto name="hashtag" size={16} color="#A353F4" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex-grow flex flex-row justify-center items-center rounded-lg bg-white py-2"
              style={styles.boxShadow}
              onPress={() => {
                console.log(hashtagGroup.length)
                if (hashtagGroup.length) {
                  setshowhastagBottomModal3(true);
                } else {
                  setvisible((pre) => ({ ...pre, show: true }));
                }
              }}
            >
              <Fontisto name="hashtag" size={16} color="#A353F4" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex-grow flex flex-row justify-center items-center rounded-lg bg-white py-2"
              style={styles.boxShadow}
              onPress={() => navigation.navigate("addStyleText")}
            >
              <FontAwesome name="font" size={16} color="#A353F4" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex-grow flex flex-row justify-center items-center rounded-lg bg-white py-2"
              style={styles.boxShadow}
              onPress={() => navigation.navigate("emoticons")}
            >
              <Fontisto name="hashtag" size={16} color="#A353F4" />
            </TouchableOpacity>
          </View>
          <Button
            label="Convert & Copy"
            size={"98%"}
            onPress={async () => {
              Clipboard.setStringAsync(`${createPostInput}`);
              let allposts = [];
              if (isUpdating.state) {
                allposts = [...postList];
                allposts[isUpdating.index] = {
                  postText: `${createPostInput}`,
                  Date: new Date(),
                };
              } else {
                allposts = [
                  ...postList,
                  {
                    postText: `${createPostInput}`,
                    Date: new Date(),
                  },
                ];
                setisUpdating({ state: true, index: isUpdating.index });
              }

              AsyncStorage.setItem("allPosts", JSON.stringify(allposts));
              setpostList(allposts);
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet?.create({
  inputStyle: {
    backgroundColor: "white",
    // bg-white mx-2 my-4 text-base px-3 py-4 rounded-lg
    marginHorizontal: 8,
    marginVertical: 16,
    borderRadius: 8,
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

export default withExpoSnack(CreatePost);
