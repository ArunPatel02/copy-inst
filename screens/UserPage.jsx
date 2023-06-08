import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { styled, withExpoSnack } from "nativewind";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ icon, label, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress()}>
      <View
        // className="bg-white p-4 py-3 flex flex-row items-center justify-between mt-[1px]"
        style={{
          backgroundColor: "white",
          padding: 16,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <Text className="text-[17px]" style={{ fontSize: 17 }}>
          {label}
        </Text>
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
        style={{
          color: "#b0b0b0",
          fontSize: 16,
          fontWeight: "600",
          marginLeft: 16,
          marginVertical: 16,
        }}
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
        style={{
          color: "#b0b0b0",
          fontSize: 16,
          fontWeight: "600",
          marginLeft: 16,
          marginVertical: 16,
        }}
      >
        Love it!
      </Text>
      <ListItem
        label={"Share this app"}
        icon={<FontAwesome name="thumbs-o-up" size={28} color="#b0b0b0" />}
        onPress={() => {
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=net.tonysoft.inst_enter"
          );
        }}
      />
      <ListItem
        label={"copy-inst Instagram"}
        icon={<FontAwesome name="instagram" size={28} color="#b0b0b0" />}
        onPress={() => {
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=net.tonysoft.inst_enter"
          );
        }}
      />
      <ListItem
        label={"Rate & Review"}
        icon={<FontAwesome name="star-o" size={28} color="#b0b0b0" />}
        onPress={() => {
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=net.tonysoft.inst_enter"
          );
        }}
      />
      <Text
        style={{
          color: "#b0b0b0",
          fontSize: 16,
          fontWeight: "600",
          marginLeft: 16,
          marginVertical: 16,
        }}
      >
        Application Info
      </Text>
      <ListItem
        label={"How to use"}
        icon={<FontAwesome name="angle-right" size={28} color="#b0b0b0" />}
        onPress={() => navigation.navigate("howToUse")}
      />
      <ListItem
        label={"Terms of use"}
        icon={<FontAwesome name="angle-right" size={28} color="#b0b0b0" />}
        onPress={() => navigation.navigate("tarmOfUse")}
      />
      <ListItem
        label={"Privacy policy"}
        icon={<FontAwesome name="angle-right" size={28} color="#b0b0b0" />}
        onPress={() => navigation.navigate("privacyPolicy")}
      />
      <ListItem
        label={"Version"}
        icon={
          <Text className="text-[17px]" style={{ color: "#b0b0b0" }}>
            1.0.0
          </Text>
        }
        onPress={() => {}}
      />
      <View className="h-28"></View>
    </ScrollView>
  );
};

export default withExpoSnack(UserPage);
