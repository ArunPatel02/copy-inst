import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post from "./screens/Post";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext, useEffect, useState } from "react";
import Hashtag from "./screens/Hashtag";

import UserPage from "./screens/UserPage";
import CreatePost from "./screens/CreatePost";
import SearchHastag from "./screens/SearchHastag";
import AddStyleText from "./screens/AddStyleText";
import { CustomContext } from "./Appcontext";
import { NativeWindStyleSheet } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Emoticons from "./screens/Emoticons";
import Alert from "./components/Alert";
import CreateHashtags from "./screens/CreateHashtags";
import LockSetting from "./screens/LockSetting";
import BackUp from "./screens/BackUp";
import BackUpDummy from "./screens/dummy";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});

const screen_width = Dimensions.get("screen").width;

// console.log(screen_width)

const Tab_width = screen_width;

const Each_tab_width = Tab_width / 3;

const MyTabBar = ({ state, descriptors, navigation, ...rest }) => {
  const [translateX] = useState(new Animated.Value(0));
  const [startingIndex, setStartingIndex] = useState(0);
  // console.log(translateX)
  const startAnimation = () => {
    Animated.timing(translateX, {
      toValue: state.index * Each_tab_width,
      useNativeDriver: true,
      duration: 300,
    }).start();
  };
  // console.log(state)
  // console.log(startingIndex, state.index);
  useEffect(() => {
    startAnimation();
    setTimeout(() => {
      setStartingIndex(state.index);
    }, 200);
  }, [state.index]);
  return (
    <View
      // className="w-full h-[50px] items-center justify-center"
      style={{
        width: screen_width,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: -30,
        zIndex: 100,
      }}
    >
      <View
        // className="h-full rounded-full bg-white w-full flex flex-row items-center justify-between"
        style={[
          styles.boxShadow,
          {
            height: 80,
            borderRadius: 100,
            backgroundColor: "white",
            width: screen_width,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 30,
          },
        ]}
      >
        <Animated.View
          // className="w-1/3 flex flex-row items-center justify-center absolute"
          style={[
            styles.boxShift,
            {
              transform: [{ translateX: translateX }],
              width: Each_tab_width,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              paddingBottom: 30,
            },
          ]}
        >
          <View
            // className="w-[65] h-[65] rounded-full bg-[#393ec5]"
            style={{
              width: 65,
              height: 65,
              borderRadius: 100,
              backgroundColor: "#393ec5",
            }}
          ></View>
        </Animated.View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const isFocusedSelected = index === startingIndex;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            state.history = [];

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const TabStyleView = ({ children }) => {
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                activeOpacity={1}
                onLongPress={onLongPress}
                // className="w-1/3 h-full flex flex-row items-center justify-center"
                style={{
                  width: Each_tab_width,
                  // height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {children}
              </TouchableOpacity>
            );
          };

          return (
            <>
              {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text> */}
              {index === 0 ? (
                <TabStyleView kay={index}>
                  <Feather
                    name="menu"
                    size={isFocusedSelected ? 36 : 28}
                    color={isFocusedSelected ? "white" : "gray"}
                  />
                </TabStyleView>
              ) : index === 1 ? (
                <TabStyleView kay={index}>
                  <Fontisto
                    name="hashtag"
                    size={isFocusedSelected ? 28 : 24}
                    color={isFocusedSelected ? "white" : "gray"}
                  />
                </TabStyleView>
              ) : (
                <TabStyleView kay={index}>
                  <MaterialIcons
                    name="person-outline"
                    size={isFocusedSelected ? 38 : 32}
                    color={isFocusedSelected ? "white" : "gray"}
                  />
                </TabStyleView>
              )}
            </>
          );
        })}
      </View>
    </View>
  );
};

const Home = (props) => {
  const { setshowhastagBottomModal } = useContext(CustomContext);
  return (
    <Tab.Navigator
      sceneContainerStyle={{ marginBottom: 10 }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Posts"
        component={Post}
        options={({ navigation, route }) => ({
          headerTitle: (props) => (
            <Text className="text-xl font-semibold">Posts</Text>
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("createPost")}
            >
              <FontAwesome5
                name="edit"
                size={24}
                color="#393ec5"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Hastags"
        component={Hashtag}
        options={({ navigation, route }) => ({
          headerTitle: (props) => (
            <Text className="text-xl font-semibold">Hastags Group</Text>
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setshowhastagBottomModal(true)}
            >
              <MaterialIcons
                name="add-box"
                size={30}
                color="#393ec5"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={UserPage}
        options={({ navigation, route }) => ({
          headerTitle: (props) => (
            <Text className="text-xl font-semibold">User Page</Text>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const {
    sethashtagSearch,
    hashtagSearch,
    fontSearch,
    setfontSearch,
    isUpdating,
    setpostList,
    postList,
    visible,
    setvisible,
    showhastagBottomModal,
    setshowhastagBottomModal,
    hashtagGroup,
    sethashtagGroup,
    currentHashtagGroupIndex,
    updateAsyncStorage,
    showhastagBottomModal2,
    showhastagBottomModal3,
    createPostInput,
    postLength,
    totalHastagCount,
  } = useContext(CustomContext);

  return (
    <>
      <Alert visible={visible} setvisible={setvisible} />
      {showhastagBottomModal ||
      showhastagBottomModal2 ||
      showhastagBottomModal3 ? (
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
      ) : null}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="createPost"
            component={CreatePost}
            options={({ navigation, route }) => ({
              headerTitle: (props) => (
                <Text className="text-xl font-semibold"></Text>
              ),

              headerRight: () => (
                <>
                  <Text className="text-xl text-[#393ec4] font-light">
                    {totalHastagCount}
                  </Text>
                  <Fontisto
                    name="hashtag"
                    size={14}
                    color="#393ec4"
                    style={{ marginRight: 10, opacity: 0.5 }}
                  />
                  <Text className="text-xl text-[#393ec4] font-light">
                    {postLength}
                  </Text>
                  <MaterialIcons
                    name="text-fields"
                    size={20}
                    color="#393ec4"
                    style={{ marginRight: 10, opacity: 0.5 }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={async () => {
                      // console.log(route.params);
                      if (isUpdating.state) {
                        let allposts = [...postList];
                        allposts.splice(isUpdating.index, 1);
                        AsyncStorage.setItem(
                          "allPosts",
                          JSON.stringify(allposts)
                        );
                        setpostList(allposts);
                      }
                      navigation.goBack();
                    }}
                  >
                    <MaterialIcons name="delete" size={26} color="black" />
                  </TouchableOpacity>
                </>
              ),
            })}
          />
          <Stack.Screen
            name="createHashtag"
            component={CreateHashtags}
            options={({ navigation, route }) => ({
              headerTitle: (props) => (
                <Text className="text-xl font-semibold"></Text>
              ),

              headerRight: () => (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={async () => {
                      // console.log(route.params);
                      let tagsArray = [...hashtagGroup];
                      if (tagsArray[currentHashtagGroupIndex]) {
                        tagsArray.splice(currentHashtagGroupIndex, 1);
                      }
                      sethashtagGroup(tagsArray);
                      updateAsyncStorage("hashTagsGroups", tagsArray);
                      navigation.goBack();
                    }}
                  >
                    <MaterialIcons name="delete" size={26} color="black" />
                  </TouchableOpacity>
                </>
              ),
            })}
          />
          <Stack.Screen
            name="addHastag"
            component={SearchHastag}
            options={({ navigation, route }) => ({
              headerTitle: (props) => (
                <Text className="text-xl font-semibold"></Text>
              ),

              headerRight: () => (
                <>
                  <TextInput
                    placeholder="Please enter a hash tag"
                    autoFocus={true}
                    cursorColor="#393ec4"
                    className="flex w-[88%] text-base"
                    collapsable
                    // value={hashtagSearch}
                    onChangeText={(text) => {
                      sethashtagSearch(text);
                    }}
                  />
                </>
              ),
            })}
          />
          <Stack.Screen
            name="addStyleText"
            component={AddStyleText}
            options={({ navigation, route }) => ({
              headerTitle: (props) => (
                <Text className="text-xl font-semibold"></Text>
              ),

              headerRight: () => (
                <>
                  <TextInput
                    placeholder="English Letter or numbers"
                    autoFocus={true}
                    cursorColor="#393ec4"
                    className="flex w-[88%] text-base"
                    collapsable
                    onSubmitEditing={(e) => {
                      // console.log("buttom is clicked", e.nativeEvent.text);
                      if (e.nativeEvent.text) {
                        setfontSearch(e.nativeEvent.text);
                      }
                    }}
                  />
                </>
              ),
            })}
          />
          <Stack.Screen
            name="emoticons"
            component={Emoticons}
            options={({ navigation, route }) => ({
              headerTitle: (props) => (
                <Text className="text-xl font-semibold">Emoticons</Text>
              ),
            })}
          />
          <Stack.Screen
            name="passwordSetting"
            // component={LockSetting}
            component={BackUpDummy}
            options={({ navigation, route }) => ({
              headerTitle: (props) => (
                <Text className="text-xl font-semibold">Lock Setting</Text>
              ),
            })}
          />
          <Stack.Screen
            name="backUp"
            component={BackUp}
            options={({ navigation, route }) => ({
              headerTitle: (props) => (
                <Text className="text-xl font-semibold">Backup & Restore</Text>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: -12,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,

    elevation: 4,
    // borderTopColor: "black",
    // borderWidth: 0.3,
  },
  boxShift: {
    // transform: [{ translateX: 0 }]
  },
});
