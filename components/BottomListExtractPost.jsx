import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CustomContext } from "../Appcontext";

const BottomListExtractPost = ({ navigation }) => {
  const {
    postList,
    showhastagBottomModal2,
    setshowhastagBottomModal2,
    updateAsyncStorage,
    sethashtagGroup,
    hashtagGroup,
  } = useContext(CustomContext);

  const Listitem = ({ itemText, idx }) => {
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
    }, []);

    // console.log(avatar, "this is avatar");

    return (
      <>
        {itemText !== "" ? (
          <TouchableWithoutFeedback
            activeOpacity={0.7}
            // className="mx-3 py-4"
            style={styles.hastagBar}
            onPress={async () => {
              let tagsArray = [...hashtagGroup];

              let hashtagArray = [];

              //   console.log("this is tag" , itemText.split('\n'))
              if (itemText.includes("#")) {
                itemText.split("\n").map((_) => {
                  if (_.includes("#")) {
                    hashtagArray = _.split(" ").filter((tag) =>
                      tag.includes("#")
                    );
                  }
                });
              }

              console.log("final tag array", hashtagArray);
              tagsArray[hashtagGroup.length] = {
                groupName: "",
                hashtags: [...hashtagArray],
              };
              updateAsyncStorage("hashTagsGroups", tagsArray);
              navigation.navigate("createHashtag", {
                updatingIndex: hashtagGroup.length,
              });
              sethashtagGroup(tagsArray);
              setshowhastagBottomModal2(false);
            }}
          >
            <View
              //   className="flex flex-row items-center"
              //   style={{ flexDirection: "row", alignItems: "center" }}
              style={styles.hastagBar}
            >
              <View
                // className="w-[52px] h-[52px] bg-white flex justify-center items-center rounded-full"
                style={styles.boxShadow}
              >
                <Text
                  //   className="text-2xl text-[#393ec4] font-bold"
                  style={{ fontSize: 24, color: "#393ec4", fontWeight: "bold" }}
                >
                  {avatar}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 16,
                  paddingVertical: 10,
                  //   borderBottomColor: "#0000060",
                  //   borderBottomWidth: 0.3,
                }}
              >
                <Text
                  //   className="text-[17px] font-normal max-h-16 h-fit overflow-hidden"
                  style={{
                    maxHeight: 100,
                    fontSize: 17,
                    fontWeight: "400",
                    overflow: "hidden",
                  }}
                >
                  {itemText}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    marginLeft: 8,
                    marginTop: 4,
                    color: "#808080bd",
                  }}
                >
                  22hr ago.
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </>
    );
  };

  return (
    <>
      {/* {showhastagBottomModal ? (
          <View
            style={{
              // backgroundColor: "#b3b3b370",
              backgroundColor: "black",
              opacity: 0.5,
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              zIndex: 10000,
            }}
          ></View>
        ) : null} */}
      <Modal
        visible={showhastagBottomModal2}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setshowhastagBottomModal2(false);
        }}
      >
        <TouchableOpacity
          style={[
            {
              justifyContent: "flex-end",
              alignItems: "center",
              flex: 1,
              // backgroundColor: "#00000080",
            },
          ]}
          activeOpacity={1}
          onPress={() => setshowhastagBottomModal2(false)}
        >
          {/* <View
            tint="dark"
            intensity={60}
            style={[
              {
                justifyContent: "flex-end",
                alignItems: "center",
                flex: 1,
                backgroundColor: "#00000080",
              },
            ]}
          > */}
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              //   paddingBottom: 30,
              overflow: "hidden",
              //   borderRadius: 30,
              width: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "70%",
            }}
          >
            <TouchableWithoutFeedback>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: "#4f4f4f",
                  fontWeight: "bold",
                  borderBottomColor: "#00000061",
                  borderBottomWidth: 0.2,
                  paddingVertical: 18,
                }}
              >
                Select a Post.
              </Text>
            </TouchableWithoutFeedback>
            <ScrollView showsVerticalScrollIndicator={false}>
              {postList.length
                ? postList.map((_, idx) => (
                    <Listitem
                      itemText={_.postText}
                      idx={idx}
                      key={idx.toString()}
                    />
                  ))
                : null}
            </ScrollView>
          </View>
          {/* </View> */}
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  hastagBar: {
    borderBottomColor: "#d1cfcf",
    borderBottomWidth: 0.5,
    marginHorizontal: 12,
    // marginVertical: 16,
    // flex: 1,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  boxShadow: {
    // shadowColor: "#393ec4",
    // shadowOffset: {
    //   width: 52,
    //   height: 52,
    // },
    // shadowOpacity: 0.12,
    // shadowRadius: 30,
    // elevation: 0.01,
    // w-[52px] h-[52px] bg-white flex justify-center items-center rounded-full
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "gray",
    borderWidth: 0.1,
  },
});

export default BottomListExtractPost;
