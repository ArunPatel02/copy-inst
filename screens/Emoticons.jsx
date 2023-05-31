import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import Chip from "../components/Chip";
import { emoticonsData } from "../components/emoticons";
import { CustomContext } from "../Appcontext";
import { useNavigation } from "@react-navigation/native";

const Emoticons = () => {
  const { setcreatePostInput, updateScreteInput } = useContext(CustomContext);
  const navigation = useNavigation();
  const [active, setactive] = useState("happy");
  const type = [
    "happy",
    "laugh",
    "love",
    "embarrassed",
    "sad",
    "angry",
    "exercise",
    "lay down",
    "animals",
    "guns",
    "decorations",
  ];
  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: "#dddada",
          height: 60,
          display: "flex",
          flexDirection: "row",
          maxHeight: 60,
          //   gap: 10,
        }}
      >
        {type.map((item, indx) => (
          <Chip
            label={item}
            active={active === item ? true : false}
            onPress={() => setactive(item)}
          />
        ))}
      </ScrollView>
      {/* <ScrollView
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 5,
          flexWrap: "wrap",
          columnGap: 10,
        }}
      >
        {emoticonsData.happy.map((item) => (
          <Text
            style={[styles.ChipStyle , { fontSize: 18, color: "gray" }]}
          >
            {item}
          </Text>
        ))}
      </ScrollView> */}
      <FlatList
        data={emoticonsData[active]}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              //   setcreatePostInput((pre) => `${pre}  ${item} `);
              updateScreteInput(item);
              navigation.goBack();
            }}
          >
            <Text style={[styles.ChipStyle]}>{item}</Text>
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={100}
        horizontal={false}
        keyExtractor={(item, index) => index}
        columnWrapperStyle={{ flexWrap: "wrap", marginBottom: 20 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  ChipStyle: {
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 8,
    fontSize: 16,
    color: "gray",
    marginLeft: 10,
  },
});

export default Emoticons;
