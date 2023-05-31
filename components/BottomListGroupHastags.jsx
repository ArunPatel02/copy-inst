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

const BottomListGroupHastags = ({ navigation }) => {
  const {
    hashtagGroup,
    showhastagBottomModal3,
    setshowhastagBottomModal3,
    updateScreteInput,
  } = useContext(CustomContext);

  const Listitem = ({ item, idx }) => {
    // console.log(item, idx);
    return (
      <>
        {item ? (
          <TouchableOpacity
            underlayColor={"#ffff"}
            style={styles.hastagBar}
            onPress={async () => {
              updateScreteInput(item.hashtags.join(" "));
              setshowhastagBottomModal3(false)
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
                  22hr ago.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
        visible={showhastagBottomModal3}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setshowhastagBottomModal3(false);
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
          onPress={() => setshowhastagBottomModal3(false)}
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
                Select a hashtag group.
              </Text>
            </TouchableWithoutFeedback>
            <ScrollView showsVerticalScrollIndicator={false}>
              {hashtagGroup.length
                ? hashtagGroup.map((_, idx) => (
                    <Listitem item={_} idx={idx} key={idx.toString()} />
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
    marginHorizontal: 0,
    // marginVertical: 16,
    // flex: 1,
    // paddingBottom: 10,
    paddingVertical: 15,
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

export default BottomListGroupHastags;
