import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { styled, withExpoSnack } from "nativewind";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress()}>
      <View className="bg-white p-4 py-3 flex flex-row items-center justify-between mt-[1px]">
        <Text className="text-[17px]">{label}</Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

const UserPage = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Text
        className="text-base font-semibold ml-4 my-4"
        style={{ color: "#b0b0b0" }}
      >
        Data Protection
      </Text>
      <ListItem
        label={"Backup & Restore"}
        onPress={() => navigation.navigate("backUp")}
        icon={<MaterialIcons name="backup" size={28} color="#b0b0b0" />}
      />
      <ListItem
        label={"Password Setting"}
        onPress={() => navigation.navigate("passwordSetting")}
        icon={<FontAwesome name="lock" size={28} color="#b0b0b0" />}
      />
      <Text
        className="text-base font-semibold ml-4 my-4"
        style={{ color: "#b0b0b0" }}
      >
        Love it!
      </Text>
      <ListItem
        label={"Share this app"}
        icon={<FontAwesome name="thumbs-o-up" size={28} color="#b0b0b0" />}
      />
      <ListItem
        label={"copy-inst Instagram"}
        icon={<FontAwesome name="instagram" size={28} color="#b0b0b0" />}
      />
      <ListItem
        label={"Rate & Review"}
        icon={<FontAwesome name="star-o" size={28} color="#b0b0b0" />}
      />
      <Text
        className="text-base font-semibold ml-4 my-4"
        style={{ color: "#b0b0b0" }}
      >
        Application Info
      </Text>
      <ListItem
        label={"How to use"}
        icon={<FontAwesome name="angle-right" size={28} color="#b0b0b0" />}
      />
      <ListItem
        label={"Terms of use"}
        icon={<FontAwesome name="angle-right" size={28} color="#b0b0b0" />}
      />
      <ListItem
        label={"Privacy policy"}
        icon={<FontAwesome name="angle-right" size={28} color="#b0b0b0" />}
      />
      <ListItem
        label={"Version"}
        icon={
          <Text className="text-[17px]" style={{ color: "#b0b0b0" }}>
            1.0.0
          </Text>
        }
      />
      {/* <View className="h-28"></View> */}
    </ScrollView>
  );
};

export default withExpoSnack(UserPage);
