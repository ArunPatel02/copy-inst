import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext } from "react";
import { CustomContext } from "../Appcontext";

const BottomListPost = ({ navigation, sortList, typeOfDate }) => {
  const { showhastagBottomModal7, setshowhastagBottomModal7 } =
    useContext(CustomContext);
  return (
    <>
      <Modal
        visible={showhastagBottomModal7}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setshowhastagBottomModal7(false);
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
          onPress={() => setshowhastagBottomModal7(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              //   paddingHorizontal: 15,
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
                sortList(2);
                setshowhastagBottomModal7(false);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  //   borderBottomColor: "#00000061",
                  //   borderBottomWidth: 0.2,
                  justifyContent: "center",
                  backgroundColor: typeOfDate !== 1 ? "#393ec52b" : "white",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#4f4f4f",
                    paddingVertical: 18,
                  }}
                >
                  Sort by creation time
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                sortList(1);
                setshowhastagBottomModal7(false);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  borderBottomColor: "#00000061",
                  borderBottomWidth: 0.2,
                  justifyContent: "center",
                  backgroundColor: typeOfDate === 1 ? "#393ec52b" : "white",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#4f4f4f",
                    paddingVertical: 18,
                  }}
                >
                  Sort by updated time
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

export default BottomListPost;
