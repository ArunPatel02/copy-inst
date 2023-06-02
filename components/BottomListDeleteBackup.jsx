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

const BottomListDeleteBackup = ({ id, token, navigation }) => {
  const {
    showhastagBottomModal6,
    setshowhastagBottomModal6,
    setvisible,
    backUpfiles,
    setbackUpfiles,
  } = useContext(CustomContext);
  const [randomInt, setrandomInt] = useState(0);
  const [error, seterror] = useState(false);
  const [inputValue, setinputValue] = useState("");
  useEffect(() => {
    setrandomInt(Math.floor(Math.random() * 999999 + 100000));
  }, []);
  const deleteFile = async () => {
    try {
      console.log("start deleting the file", id);
      const fileData = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?fields=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "DELETE",
        }
      );
    //   const fileDataParse = await fileData.json();
    //   console.log("this is file delete", fileData);
      setbackUpfiles((pre) => pre.filter((item) => item.id !== id));
      setshowhastagBottomModal6(false);
    } catch (error) {
      console.log(error, "error while deleting the file");
    }
  };
  return (
    <>
      <Modal
        visible={showhastagBottomModal6}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setshowhastagBottomModal6(false);
        }}
      >
        <TouchableOpacity
          style={[
            {
              justifyContent: "flex-end",
              alignItems: "center",
              flex: 1,
            },
          ]}
          activeOpacity={1}
          onPress={() => setshowhastagBottomModal6(false)}
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
                  paddingVertical: 18,
                }}
              >
                Delete Backup
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "gray",
                    textAlign: "center",
                  }}
                >
                  Do you rally want to delete it?
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "gray",
                    textAlign: "center",
                  }}
                >
                  Delete files cannot be restored.
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "blue",
                    textAlign: "center",
                    marginVertical: 8,
                  }}
                >
                  {randomInt}
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
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                      setinputValue(text);
                    }}
                    value={inputValue}
                  />
                  <View style={{ position: "absolute", right: 0 }}>
                    <Entypo name="cross" size={35} color="gray" />
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
                    You enter incorrectely!
                  </Text>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                try {
                  console.log(parseInt(inputValue), randomInt);
                  if (parseInt(inputValue) === randomInt) {
                    deleteFile();
                  } else {
                    seterror(true);
                  }
                } catch (error) {
                  seterror(true);
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
                <Text
                  style={{ fontSize: 18, color: "white", fontWeight: "500" }}
                >
                  Delete it.
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/* </View> */}
        </TouchableOpacity>
        {/* </View> */}
      </Modal>
    </>
  );
};

export default BottomListDeleteBackup;
