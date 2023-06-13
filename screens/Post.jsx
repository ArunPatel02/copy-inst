import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PostSvg from "../assets/post.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeWindStyleSheet, styled, withExpoSnack } from "nativewind";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { CustomContext } from "../Appcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native";
import moment from "moment/moment";
import { FontAwesome5 } from "@expo/vector-icons";
import BottomListPost from "../components/BottomListPost";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Post = () => {
  const navigation = useNavigation();
  const {
    postList,
    setpostList,
    setcreatePostInput,
    updateAsyncStorage,
    timeAgo,
    showhastagBottomModal7,
    setshowhastagBottomModal7,
  } = useContext(CustomContext);
  // console.log("this is navi", navigation);
  // useEffect(() => {
  //   AsyncStorage.getItem("allPosts").then((res) => {
  //     const value = JSON.parse(res);
  //     console.log("post values", value);
  //     if (value) {
  //       setpostList(value);
  //     }
  //   });
  // }, []);

  const [typeOfDate, settypeOfDate] = useState(1);
  const sortList = (type) => {
    if (type == 1) {
      settypeOfDate(1);
      let value = [...postList];
      value.sort((a, b) => (a.Date < b.Date ? 1 : -1));
      setpostList(value);
    }
    if (type === 2) {
      settypeOfDate(2);
      let value = [...postList];
      value.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
      setpostList(value);
    }
  };

  const Listitem = ({ itemText, time, idx }) => {
    const [avatar, setavatar] = useState("");

    // console.log([...String(itemText)]);

    useEffect(() => {
      // console.log(itemText)
      let first = false;
      let second = false;
      let char = "";
      [...String(itemText)].map((item) => {
        if (item !== " " && !first && item !== "\n") {
          // console.log(item, "this is item", !first);
          first = true;
          char = item;
        } else {
          if (first && !second) {
            second = true;
            if (item !== " " && item !== "\n") {
              char = char + item;
            }
            // console.log(char, "this is char");
            setavatar(char);
          }
        }
      });

      // console.log("time" , timeAgo(new Date()) )
    }, [typeOfDate]);

    const [timeAgoStr, settimeAgoStr] = useState("");

    useEffect(() => {
      settimeAgoStr(moment.utc(time).local().startOf("seconds").fromNow());
      // setInterval(() => {
      //   settimeAgoStr(moment.utc(time).local().startOf("seconds").fromNow());
      // }, 1000);
    }, []);

    // console.log(avatar, "this is avatar");

    return (
      <>
        {
          <TouchableHighlight
            underlayColor={"#f5f5f5"}
            activeOpacity={0.7}
            className="px-3 py-4"
            style={styles.hastagBar}
            onPress={async () => {
              navigation.navigate("createPost", {
                updatingIndex: idx,
              });
              setcreatePostInput(`${itemText}`);
            }}
          >
            <View className="flex flex-row items-center">
              <View
                className="w-[52px] h-[52px] bg-white flex justify-center items-center rounded-full"
                style={styles.boxShadow}
              >
                <Text className="text-2xl text-[#393ec4] font-bold">
                  {avatar}
                </Text>
              </View>
              <View className="ml-4">
                <Text
                  className="text-[17px] font-normal h-fit overflow-hidden"
                  style={{ maxHeight: 100 }}
                >
                  {itemText}
                </Text>
                <Text className="text-[14px] mt-1 text-gray-400">
                  {timeAgoStr}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        }
      </>
    );
  };

  const deletItem = async (index) => {
    // console.log(route.params);
    let tagsArray = [...postList];
    if (tagsArray[index]) {
      tagsArray.splice(index, 1);
    }
    setpostList(tagsArray);
    updateAsyncStorage("allPosts", tagsArray);
  };

  const duplicateItem = async (index) => {
    // console.log(route.params);
    let tagsArray = [...postList];
    if (tagsArray[index]) {
      tagsArray.splice(index, 0, { ...tagsArray[index], Date: new Date() });
    }
    setpostList(tagsArray);
    updateAsyncStorage("allPosts", tagsArray);
  };

  return (
    <View className="bg-[#f5f5f5]">
      {postList.length ? (
        <>
          <BottomListPost typeOfDate={typeOfDate} sortList={sortList} />
          <Pressable
            android_ripple={{ color: "#63606069" }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              borderBottomColor: "#00000061",
              borderBottomWidth: 0.2,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              setshowhastagBottomModal7(true);
            }}
          >
            <FontAwesome5
              name="sort-amount-down-alt"
              size={18}
              color="#4f4f4f"
              style={{ marginRight: 10, opacity: 0.6 }}
            />
            <Text
              style={{
                fontSize: 16,
                color: "#4f4f4f",
                paddingVertical: 10,
                borderBottomColor: "#0001",
                borderBottomWidth: 0.2,
              }}
            >
              Sort by {typeOfDate === 1 ? "updated" : "creation"} time
            </Text>
          </Pressable>

          <SwipeListView
            useFlatList={true}
            numColumns={1}
            contentContainerStyle={{ marginTop: 10, position: "relative" }}
            data={postList}
            renderItem={(data, rowMap) => (
              <Listitem
                itemText={data.item.postText}
                time={typeOfDate === 1 ? data.item.Date : data.item.createdDate}
                idx={data.index}
                key={data.index.toString()}
              />
            )}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  alignItems: "center",
                  // backgroundColor: "#DDD",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // paddingLeft: 15,
                }}
              >
                {/* <TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => duplicateItem(data.index)}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: "blue",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 90,
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <MaterialCommunityIcons
                    name="content-duplicate"
                    size={25}
                    color="white"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "white",
                      marginTop: 5,
                    }}
                  >
                    Duplicate
                  </Text>
                </TouchableOpacity>
                {/* </TouchableOpacity> */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => deletItem(data.index)}
                  style={{
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 90,
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <MaterialIcons name="delete" size={30} color="white" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "white",
                      marginTop: 5,
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={90}
            rightOpenValue={-90}
          />
          {/* <ScrollView className="mb-16">
            {postList.map((item, index) => (
              <Listitem itemText={item.postText} idx={index} key={index} />
            ))}
          </ScrollView> */}
        </>
      ) : (
        <SafeAreaView>
          <PostSvg width={"100%"} height={"55%"} style={{ marginTop: 10 }} />
          <View>
            <Text className="mt-8 text-center text-xl font-medium text-[#b0b0b0]">
              Write your first post for Instagram.
            </Text>
          </View>
          <Button
            label="New post"
            onPress={() => navigation.navigate("createPost")}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  hastagBar: {
    borderBottomColor: "#d1cfcf",
    backgroundColor: "#f5f5f5",
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

export default Post;
