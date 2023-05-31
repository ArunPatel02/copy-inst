import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext } from "react";
import { CustomContext } from "../Appcontext";

const BottomList = ({
  showhastagBottomModal,
  setshowhastagBottomModal,
  navigation,
}) => {
  const { showhastagBottomModal2, setshowhastagBottomModal2 } =
    useContext(CustomContext);
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
        visible={showhastagBottomModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setshowhastagBottomModal(false);
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
          onPress={() => setshowhastagBottomModal(false)}
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
                setshowhastagBottomModal(false);
                navigation.navigate("createHashtag");
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
                Input Yourself
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setshowhastagBottomModal(false);
                setshowhastagBottomModal2(true);
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#4f4f4f",
                  paddingVertical: 18,
                }}
              >
                Extract from posts
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

export default BottomList;
