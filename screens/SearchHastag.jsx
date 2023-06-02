import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { CustomContext } from "../Appcontext";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchHastag = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    hashtagSearch,
    setcreatePostInput,
    sethashtagSearch,
    updateScreteInput,
    currentHashtagGroupIndex,
    setcurrentHashtagGroupIndex,
    hashtagGroup,
    sethashtagGroup,
    updateAsyncStorage,
  } = useContext(CustomContext);
  const [recentSearch, setrecentSearch] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("hashtaSearchHistory").then((value) => {
      console.log(JSON.parse(value), "result");
      const result = JSON.parse(value);
      if (result) setrecentSearch(result);
    });
  }, []);

  // console.log(recentSearch.length, "recent search");

  // console.log()

  const Listitem = ({ itemText, isNew }) => {
    return (
      <>
        {itemText !== "" ? (
          <Pressable
            android_ripple={{ color: "#0000080" }}
            activeOpacity={0.7}
            className="px-3 py-4"
            style={styles.hastagBar}
            onPress={async () => {
              const hasStr = String(itemText)
                .replaceAll(" ", "")
                .replaceAll("#", "");
              console.log(route.params?.addTo);
              if (route.params?.addTo === "groupHashTag") {
                let tagsArray = [...hashtagGroup];
                if (tagsArray[currentHashtagGroupIndex]) {
                  tagsArray[currentHashtagGroupIndex].hashtags.push(
                    `#${hasStr}`
                  );
                } else {
                  tagsArray[currentHashtagGroupIndex] = {
                    groupName: "",
                    hashtags: [`#${hasStr}`],
                    Date: new Date(),
                  };
                }
                sethashtagGroup(tagsArray);
                updateAsyncStorage("hashTagsGroups", tagsArray);
              } else {
                updateScreteInput(`#${hasStr}`);
              }
              navigation.goBack();
              sethashtagSearch("");
              if (isNew) {
                AsyncStorage.setItem(
                  "hashtaSearchHistory",
                  JSON.stringify([...recentSearch, hasStr])
                );
              }
            }}
          >
            <View className="flex flex-row items-center">
              <View
                className="w-[52px] h-[52px] bg-white flex justify-center items-center rounded-full"
                style={styles.boxShadow}
              >
                <Fontisto name="hashtag" size={16} color="#393ec4" />
              </View>
              <View className="ml-4">
                <Text className="text-[17px] font-normal">
                  {String(itemText).replaceAll(" ", "").replaceAll("#", "")}
                </Text>
                <Text className="text-[14px] text-gray-400">
                  Tap to use this hashtag.
                </Text>
              </View>
            </View>
          </Pressable>
        ) : null}
      </>
    );
  };

  return (
    <>
      <View
        className="py-2 px-3 flex flex-row gap-1 items-center border-b-[#d1cfcf]"
        style={{ borderBottomWidth: 0.4 }}
      >
        {hashtagSearch ? (
          <EvilIcons name="search" size={18} color="gray" />
        ) : (
          <Entypo name="back-in-time" size={18} color="gray" />
        )}
        <Text className="text-base text-[#969595]" style={{ color: "#969595" }}>
          {hashtagSearch ? "Search Results" : "Recent Searches"}
        </Text>
      </View>
      <ScrollView>
        <Listitem itemText={hashtagSearch} isNew={true} />
        {!hashtagSearch && recentSearch.length
          ? recentSearch?.map((item, index) => (
              <Listitem itemText={item} key={`recent${index}`} />
            ))
          : hashtagSearch && recentSearch.length
          ? recentSearch
              ?.filter((item) => item.includes(hashtagSearch))
              ?.map((item, index) => (
                <Listitem itemText={item} key={`filter${index}`} />
              ))
          : null}
      </ScrollView>
    </>
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

export default SearchHastag;
