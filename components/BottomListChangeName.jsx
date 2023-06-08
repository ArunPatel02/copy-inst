import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CustomContext } from "../Appcontext";
import { TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";

const BottomListChangeName = ({ id, token, navigation }) => {
  const {
    showhastagBottomModal5,
    setshowhastagBottomModal5,
    setvisible,
    backUpfiles,
    setbackUpfiles,
    setloaderVisible,
  } = useContext(CustomContext);
  const [fileName, setfileName] = useState("");
  const [error, seterror] = useState(false);

  useEffect(() => {
    console.log(backUpfiles, "these are backupfiles");
    if (backUpfiles.length) {
      backUpfiles.map((item) => {
        if (item.id === id) {
          console.log(item.name.split(".json")[0], "filename");
          setfileName(item.name.split(".json")[0]);
        }
      });
    }
  }, [id, backUpfiles]);

  const changeFileName = async () => {
    setshowhastagBottomModal5(false);
    setloaderVisible(true);

    try {
      console.log("start file updation", id, token, fileName);
      //   const fileData = await fetch(
      //     `https://www.googleapis.com/drive/v3/files/${id}?fields=*`,
      //     {
      //       headers: { Authorization: `Bearer ${token}` },
      //       method: "PATCH",
      //       body: JSON.stringify({ name: `${fileName}.json` }),
      //     }
      //   );
      //   const fileDataParse = await fileData.json();
      //   console.log("this is file details", fileDataParse);
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        name: `${fileName}.json`,
      });

      let response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?fields=*`,
        {
          method: "PATCH",
          body: bodyContent,
          headers: headersList,
        }
      );

      let data = await response.json();
      console.log(data);
      if (data) {
        setloaderVisible(false);
      }
      setbackUpfiles((pre) =>
        pre.map((item) =>
          item.id === id ? { ...item, name: `${fileName}.json` } : item
        )
      );

      //   alert("filename update successfully")
    } catch (error) {
      console.log(error.message, "error while fetching the file");
      setloaderVisible(false);
    }
  };
  return (
    <>
      <Modal
        visible={showhastagBottomModal5}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setshowhastagBottomModal5(false);
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
          onPress={() => setshowhastagBottomModal5(false)}
        >
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
                  // borderBottomColor: "#00000061",
                  // borderBottomWidth: 0.2,
                  paddingVertical: 18,
                }}
              >
                Change file name.
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "blue",
                  }}
                >
                  Please enter the file name to be changed.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10,
                    borderBottomColor: "#00000030",
                    borderBottomWidth: 10,
                    width: "100%",
                  }}
                >
                  <TextInput
                    style={{
                      fontSize: 25,
                      borderColor: "white",
                      fontWeight: "600",
                      color: "gray",
                      width: "90%",
                    }}
                    autoFocus
                    cursorColor={"blue"}
                    value={fileName}
                    onChangeText={(text) => {
                      setfileName(text);
                      seterror(false);
                    }}
                  />
                  <View style={{ position: "absolute", right: 0 }}>
                    <TouchableWithoutFeedback onPress={() => setfileName("")}>
                      <Entypo name="cross" size={35} color="gray" />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                {error ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "red",
                      marginTop: -8,
                    }}
                  >
                    Enter file name
                  </Text>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                if (fileName === "") {
                  seterror(true);
                } else {
                  changeFileName();
                }
              }}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "blue",
                  borderRadius: 8,
                  marginVertical: 15,
                }}
              >
                <Entypo name="check" size={35} color="white" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default BottomListChangeName;
