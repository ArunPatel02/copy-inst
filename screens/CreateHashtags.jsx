import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button as ReactNativeButton,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CustomContext } from "../Appcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

const CreateHashtags = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    currentHashtagGroupIndex,
    setcurrentHashtagGroupIndex,
    hashtagGroup,
    sethashtagGroup,
    updateAsyncStorage,
  } = useContext(CustomContext);

  useEffect(() => {
    console.log(route.params, "these are params");
    if (route?.params?.updatingIndex || route?.params?.updatingIndex === 0) {
      setcurrentHashtagGroupIndex(route.params.updatingIndex);
    } else {
      setcurrentHashtagGroupIndex(hashtagGroup.length);
      //   setcurrentHashtagGroupIndex(1);
    }
  }, []);

  //   useEffect(() => {
  //     updateAsyncStorage("hashTagsGroups", hashtagGroup);
  //     console.log("this is hastag group", hashtagGroup);
  //   }, [
  //     hashtagGroup[currentHashtagGroupIndex]?.groupName,
  //     hashtagGroup[currentHashtagGroupIndex]?.hashtags,
  //   ]);

  console.log(hashtagGroup, "hashtagGroup", currentHashtagGroupIndex);

  return (
    <SafeAreaView className="flex-1 justify-between pb-2">
      <ScrollView>
        <TextInput
          placeholder="Enter the hashtag group name"
          autoFocus
          cursorColor="#393ec4"
          style={styles.inputStyle}
          value={hashtagGroup[currentHashtagGroupIndex]?.groupName || ""}
          onChangeText={(value) => {
            let tagsArray = [...hashtagGroup];
            if (tagsArray[currentHashtagGroupIndex]) {
              tagsArray[currentHashtagGroupIndex].groupName = value;
            } else {
              tagsArray[currentHashtagGroupIndex] = {
                groupName: value,
                hashtags: [],
              };
            }
            updateAsyncStorage("hashTagsGroups", tagsArray);
            sethashtagGroup(tagsArray);
          }}
        />
        <View className="flex flex-row flex-wrap mb-4 mx-1">
          {hashtagGroup[currentHashtagGroupIndex] &&
          hashtagGroup[currentHashtagGroupIndex]?.hashtags &&
          hashtagGroup[currentHashtagGroupIndex]?.hashtags.length
            ? hashtagGroup[currentHashtagGroupIndex].hashtags.map(
                (item, index) => {
                  console.log("this is each hastags array item", item);
                  return (
                    <View
                      className="bg-white flex flex-row px-3 py-3 rounded-md items-center mx-1"
                      key={index}
                    >
                      <Text className="text-base">{item}</Text>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          let tagsArray = [...hashtagGroup];
                          tagsArray[currentHashtagGroupIndex].hashtags.splice(
                            index,
                            1
                          );
                          sethashtagGroup(tagsArray);
                          updateAsyncStorage("hashTagsGroups", tagsArray);
                        }}
                      >
                        <Text className="text-base font-bold ml-2">X</Text>
                      </TouchableWithoutFeedback>
                    </View>
                  );
                }
              )
            : null}
        </View>
        <Pressable
          style={styles.button}
          android_ripple={{ color: "#0000066", borderless: false }}
          onPress={() =>
            navigation.navigate("addHastag", {
              addTo: "groupHashTag",
              hastagGroupId: currentHashtagGroupIndex,
            })
          }
        >
          <Text style={styles.text}>Add +</Text>
        </Pressable>
        <View className="mx-2">
          <Text className="text-base" style={{ color: "#969595" }}>
            1. Add all the hashtags you use together.
          </Text>
          <Text className="text-base" style={{ color: "#969595" }}>
            2. Click the 'Copy Hashtags' button below to copy and use the
            entered hashtags at once.
          </Text>
          <Text className="text-base mt-4" style={{ color: "#969595" }}>
            * You can change the position of hashtags by
            pressing and holding it.
          </Text>
        </View>
      </ScrollView>
      <View>
        <Button
          label="Copy Hashtags"
          size={"98%"}
          onPress={() => {
            let coppyText = hashtagGroup[currentHashtagGroupIndex].hashtags.join(' ')
            Clipboard.setStringAsync(coppyText);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet?.create({
  inputStyle: {
    // backgroundColor: "white",
    // bg-white mx-2 my-4 text-base px-3 py-4 rounded-lg
    marginHorizontal: 8,
    marginVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 1,
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    elevation: 0,
    backgroundColor: "white",
    width: 100,
    borderColor: "#393ec4",
    borderWidth: 1,
    marginLeft: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    color: "#393ec4",
  },
});

export default CreateHashtags;
