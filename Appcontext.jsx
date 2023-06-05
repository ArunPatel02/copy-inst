import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export const CustomContext = createContext();

const Appcontext = ({ children, setAppIsReady }) => {
  const [createPostInput, setcreatePostInput] = useState("");
  const [hashtagSearch, sethashtagSearch] = useState("");
  const [postList, setpostList] = useState([]);
  const [visible, setvisible] = useState({
    show: false,
    topHeading: "",
    heading: "",
    text: "",
    button: "",
    extaText: "",
    callback: null,
  });
  const [fontSearch, setfontSearch] = useState("");
  const [isUpdating, setisUpdating] = useState({ state: false, index: null });
  const [cursor, setcursor] = useState({ start: 0, end: 0 });
  const ref = useRef();

  const updateScreteInput = async (data) => {
    let strArr = [...createPostInput];
    strArr.splice(cursor.start, 0, ` ${data} `);
    setcreatePostInput(strArr.join(""));
    setTimeout(() => {
      ref.current.focus({
        start: cursor.start + String(data).length,
        end: cursor.end + String(data).length,
      });
    }, 200);
  };

  const [showhastagBottomModal, setshowhastagBottomModal] = useState(false);
  const [showhastagBottomModal2, setshowhastagBottomModal2] = useState(false);
  const [showhastagBottomModal3, setshowhastagBottomModal3] = useState(false);
  const [showhastagBottomModal4, setshowhastagBottomModal4] = useState(false);
  const [showhastagBottomModal5, setshowhastagBottomModal5] = useState(false);
  const [showhastagBottomModal6, setshowhastagBottomModal6] = useState(false);
  const [showhastagBottomModal7, setshowhastagBottomModal7] = useState(false);

  const [hashtagGroup, sethashtagGroup] = useState([]);

  const [currentHashtagGroupIndex, setcurrentHashtagGroupIndex] = useState(0);

  const updateAsyncStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const [totalHastagCount, settotalHastagCount] = useState(30);
  const [postLength, setpostLength] = useState(2200);

  useEffect(() => {
    settotalHastagCount(30);
    setpostLength(2200);
    createPostInput.split("\n").map((_) => {
      if (_.includes("#")) {
        let hashtagArray = _.split(" ").filter((tag) => tag.includes("#"));
        settotalHastagCount(30 - parseInt(hashtagArray.length));
      }
    });
    setpostLength(2200 - createPostInput.length);
  }, [createPostInput]);

  const [lockactive, setlockactive] = useState(false);
  const [lockPin, setlockPin] = useState([]);
  const [lockFirstTime, setlockFirstTime] = useState(true);
  const [isScreenLock, setisScreenLock] = useState(true);
  useEffect(() => {
    try {
      AsyncStorage.getItem("hashTagsGroups").then((res) => {
        console.log(res, "this is hash array");
        console.log(JSON.parse(res));
        sethashtagGroup([...JSON.parse(res)]);
      });
      AsyncStorage.getItem("allPosts").then((res) => {
        const value = JSON.parse(res);
        console.log("post values", value);
        if (value) {
          value.sort((a, b) => (a.Date < b.Date ? 1 : -1));
          setpostList(value);
        }
      });
      AsyncStorage.getItem("password").then((res) => {
        const value = JSON.parse(res);
        console.log("Password", value);
        if (value) {
          setlockactive(value.isPassword);
          setlockPin(value.pin);
          setisScreenLock(value.isPassword);
          setlockFirstTime(false);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAppIsReady(true);
    }
  }, []);
  const [backUpfiles, setbackUpfiles] = useState([]);

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    console.log("App State: " + nextAppState);
    if (appState != nextAppState) {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("App State: " + "App has come to the foreground!");
        // alert("App State: " + "App has come to the foreground!");
      }
      console.log("App State: " + nextAppState);
      if (nextAppState === "inactive" || nextAppState === "background") {
        console.log("reset the screen lock", lockactive);
        AsyncStorage.getItem("password").then((res) => {
          const value = JSON.parse(res);
          console.log("Password", value);
          if (value) {
            setlockactive(value.isPassword);
            setlockPin(value.pin);
            setisScreenLock(value.isPassword);
          }
        });
      }
      setAppState(nextAppState);
    }
  };

  return (
    <CustomContext.Provider
      value={{
        createPostInput,
        setcreatePostInput,
        hashtagSearch,
        sethashtagSearch,
        postList,
        setpostList,
        fontSearch,
        setfontSearch,
        isUpdating,
        setisUpdating,
        setcursor,
        cursor,
        updateScreteInput,
        ref,
        visible,
        setvisible,
        showhastagBottomModal,
        setshowhastagBottomModal,
        hashtagGroup,
        sethashtagGroup,
        currentHashtagGroupIndex,
        setcurrentHashtagGroupIndex,
        updateAsyncStorage,
        showhastagBottomModal2,
        setshowhastagBottomModal2,
        totalHastagCount,
        postLength,
        showhastagBottomModal3,
        setshowhastagBottomModal3,
        showhastagBottomModal4,
        setshowhastagBottomModal4,
        showhastagBottomModal5,
        setshowhastagBottomModal5,
        showhastagBottomModal6,
        setshowhastagBottomModal6,
        showhastagBottomModal7,
        setshowhastagBottomModal7,
        backUpfiles,
        setbackUpfiles,
        lockactive,
        setlockactive,
        lockPin,
        setlockPin,
        lockFirstTime,
        setlockFirstTime,
        isScreenLock,
        setisScreenLock,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

export default Appcontext;
