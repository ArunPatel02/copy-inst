import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import hashtagImg from "../assets/hashtag.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled, withExpoSnack } from "nativewind";
import Button from "../components/Button";
import BottomList from "../components/BottomList";
import { useContext, useEffect } from "react";
import { CustomContext } from "../Appcontext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomListExtractPost from "../components/BottomListExtractPost";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

const Hashtag = () => {
  const {
    showhastagBottomModal,
    setshowhastagBottomModal,
    hashtagGroup,
    sethashtagGroup,
    updateAsyncStorage,
  } = useContext(CustomContext);
  const navigation = useNavigation();

  const Listitem = ({ item, idx }) => {
    // const [timeAgeStr, settimeAgeStr] = useState("");
    // useEffect(() => {
    //   setInterval(() => {
    //     settimeAgeStr(moment.utc(time).local().startOf("seconds").fromNow())
    //   }, 1000);
    // }, []);
    // console.log(item, idx);
    return (
      <>
        {item ? (
          <TouchableHighlight
            underlayColor={"#ffff"}
            activeOpacity={0.7}
            className="px-3 py-4"
            style={styles.hastagBar}
            onPress={async () => {
              navigation.navigate("createHashtag", {
                updatingIndex: idx,
              });
            }}
          >
            <View>
              <Text
                // className="ml-2 text-[16px] mb-1 font-semibold"
                style={{
                  color: "#393ec4",
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {item.groupName ? item.groupName : "Default name"}
              </Text>
              <View className="">
                <View
                  // className="flex flex-row flex-wrap ml-1"
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginLeft: 4,
                  }}
                >
                  {item.hashtags && item.hashtags.length
                    ? item.hashtags.map((tag, i) => (
                        <Text
                          // className="text-[15px] font-normal h-fit ml-1"
                          style={{
                            fontSize: 15,
                            fontWeight: "400",
                            marginLeft: 4,
                          }}
                          key={i}
                        >
                          {tag}
                        </Text>
                      ))
                    : null}
                </View>
                <Text
                  // className="text-[14px] mt-1 ml-2 text-gray-400"
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    marginLeft: 8,
                    marginTop: 4,
                    color: "#808080bd",
                  }}
                >
                  {moment.utc(item.Date).local().startOf("seconds").fromNow()}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        ) : null}
      </>
    );
  };

  const deletItem = async (index) => {
    // console.log(route.params);
    let tagsArray = [...hashtagGroup];
    if (tagsArray[index]) {
      tagsArray.splice(index, 1);
    }
    sethashtagGroup(tagsArray);
    updateAsyncStorage("hashTagsGroups", tagsArray);
  };

  const duplicateItem = async (index) => {
    // console.log(route.params);
    let tagsArray = [...hashtagGroup];
    if (tagsArray[index]) {
      tagsArray.splice(index, 0, { ...tagsArray[index], Date: new Date() });
    }
    sethashtagGroup(tagsArray);
    updateAsyncStorage("hashTagsGroups", tagsArray);
  };

  return (
    <>
      <BottomList
        showhastagBottomModal={showhastagBottomModal}
        setshowhastagBottomModal={setshowhastagBottomModal}
        navigation={navigation}
      />
      <BottomListExtractPost navigation={navigation} />
      <View className="bg-[#f5f5f5] pt-2">
        {hashtagGroup.length ? (
          <>
            <SwipeListView
              useFlatList={true}
              numColumns={1}
              // contentContainerStyle={{ marginTop: 0 }}
              data={hashtagGroup}
              renderItem={(data, rowMap) => (
                <Listitem
                  item={data.item}
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
            {/* <ScrollView style={{ marginBottom: 64, marginTop: 10 }}>
              {hashtagGroup.map((item, index) => (
                <Listitem item={item} idx={index} key={index} />
              ))}
            </ScrollView> */}
          </>
        ) : (
          <SafeAreaView>
            <Image
              source={{ uri: Image.resolveAssetSource(hashtagImg).uri }}
              width={"100%"}
              height={"55%"}
            />
            <View>
              <Text className="mt-8 text-center text-lg font-medium text-[#b0b0b0]">
                Create a hashtag group by collecting the tags you use together.
              </Text>
            </View>
            <Button
              label="New Hashtag Group"
              onPress={() => setshowhastagBottomModal(true)}
            />
          </SafeAreaView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  hastagBar: {
    // borderBottomColor: "#d1cfcf",
    // borderBottomWidth: 0.5,
    backgroundColor: "white",
    // marginBottom: 10,
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 10,
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

export default withExpoSnack(Hashtag);
