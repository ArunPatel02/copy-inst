import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const Alert = ({ visible, setvisible }) => {
  return (
    <>
      {visible.show ? (
        <View
          style={{
            // backgroundColor: "#b3b3b370",
            backgroundColor: "black",
            opacity : 0.5,
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        ></View>
      ) : null}
      <Modal visible={visible.show} animationType="slide" transparent={true}>
        {/* <View style={{ flex: 1, backgroundColor: "#b3b3b370" }}> */}
        <View
          tint="dark"
          intensity={60}
          style={[{ justifyContent: "center", alignItems: "center", flex: 1 }]}
        >
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 30,
            paddingVertical: 20,
            paddingBottom: 70,
            overflow: "hidden",
            borderRadius: 30,
            width: "90%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "#4f4f4f",
              fontWeight: "bold",
            }}
          >
            Select a hashtag group
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 18,
              textAlign: "center",
              color: "#4f4f4f",
              fontWeight: "normal",
            }}
          >
            No hashtag groups.
          </Text>
          <Text
            style={{
            //   marginTop: 15,
              fontSize: 18,
              textAlign: "center",
              color: "#4f4f4f",
              fontWeight: "normal",
            }}
          >
            Please use it after registering more than
            one hashtag groups.
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingTop: 15,
              paddingBottom: 30,
              paddingRight: 80,
              paddingLeft: 50,
              backgroundColor: "#0d14ab",
              display: "flex",
              position: "absolute",
              bottom: -20,
              right: -30,
              borderRadius: 32,
            }}
            onPress={() => {
              setvisible({ ...visible, show: false });
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontWeight: "600",
              }}
            >
              Ok
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        {/* </View> */}
      </Modal>
    </>
  );
};

export default Alert;
