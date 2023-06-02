import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext } from "react";
import { CustomContext } from "../Appcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomBackupList = ({ id, token, navigation }) => {
  const {
    showhastagBottomModal4,
    setshowhastagBottomModal4,
    setshowhastagBottomModal5,
    setshowhastagBottomModal6,
    setvisible,
    sethashtagSearch,
    setpostList,
    setfontSearch,
    sethashtagGroup,
  } = useContext(CustomContext);
  const getFileContent = async () => {
    try {
      // console.log("start file fetching");
      const fileData = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?alt=media&fields=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const fileDataParse = await fileData.json();
      console.log("this is file details", fileDataParse);
      if (fileDataParse.hashTagsGroups) {
        setpostList(fileDataParse.allPosts);
      }
      if (fileDataParse.hashTagsGroups) {
        sethashtagGroup(fileDataParse.hashTagsGroups);
      }
      navigation.navigate("Home");
      if (Object.keys(fileDataParse).length) {
        Promise.all(
          Object.keys(fileDataParse)
            .map(async (key) => {
              await AsyncStorage.setItem(
                key,
                JSON.stringify(fileDataParse[key])
              );
            })
            .then((all) => {})
        );
      }
    } catch (error) {
      // console.log(error, "error while fetching the file");
    }
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
        visible={showhastagBottomModal4}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setshowhastagBottomModal4(false);
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
          onPress={() => setshowhastagBottomModal4(false)}
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
                Please Select a task.
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setvisible((pre) => ({
                  topHeading: "Hey!",
                  heading: "",
                  text: "Do you want to restore the selected file?",
                  button: "Restore",
                  extaText: "No, I'll think about it again...",
                  show: true,
                  callback: getFileContent,
                }));
                setshowhastagBottomModal4(false);
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#4f4f4f",
                  borderBottomColor: "#00000061",
                  borderBottomWidth: 0.2,
                  paddingVertical: 18,
                }}
              >
                Restore
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setshowhastagBottomModal4(false);
                setshowhastagBottomModal5(true);
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#4f4f4f",
                  paddingVertical: 18,
                  borderBottomColor: "#00000061",
                  borderBottomWidth: 0.2,
                }}
              >
                Change File Name
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setshowhastagBottomModal4(false);
                setshowhastagBottomModal6(true);
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#4f4f4f",
                  paddingVertical: 18,
                  borderBottomColor: "#00000061",
                  borderBottomWidth: 0.2,
                }}
              >
                Delete Backup
              </Text>
            </TouchableWithoutFeedback>
          </View>
          {/* </View> */}
        </TouchableOpacity>
        {/* </View> */}
      </Modal>
    </>
  );
};

export default BottomBackupList;
