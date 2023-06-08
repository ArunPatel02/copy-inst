import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AuthSession from "expo-auth-session";
import GDrive from "expo-google-drive-api-wrapper";

export const CustomContext = createContext();

WebBrowser.maybeCompleteAuthSession();

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

  const inputRef = useRef(null);

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
  const [isScreenLock, setisScreenLock] = useState(false);
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

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "468150064386-flrvupg5jusj8qf3oedoljo9r0fotb74.apps.googleusercontent.com",
    expoClientId:
      "468150064386-flrvupg5jusj8qf3oedoljo9r0fotb74.apps.googleusercontent.com",
    androidClientId:
      "468150064386-4hq112vv05mcqjh7gvkt4oikvq8krpfv.apps.googleusercontent.com",
    iosClientId:
      "468150064386-4hq112vv05mcqjh7gvkt4oikvq8krpfv.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/drive"],
    // responseType: "code",
    // shouldAutoExchangeCode: false,
    extraParams: {
      // access_type: "offline",
      expires_in: 3600 * 24 * 30 * 12,
    },
    // prompt : "consent"
  });

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [storage, setstorage] = useState({});
  const [loading, setloading] = useState(false);
  const [folder, setfolder] = useState("");
  const [isLoginOut, setisLoginOut] = useState(false);
  const [clickedBackupId, setclickedBackupId] = useState("");
  const [loaderVisible, setloaderVisible] = useState(false);

  const getFileDetails = async (id, savedToken) => {
    try {
      // console.log("start file fetching");
      const fileData = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?fields=id,name,size,modifiedTime`,
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      );
      const fileDataParse = await fileData.json();
      // console.log("this is file details", fileDataParse);
      setbackUpfiles((pre) => [fileDataParse, ...pre]);
    } catch (error) {
      // console.log(error, "error while fetching the file");
    }
  };

  const getFileList = async (folder, savedToken) => {
    // https://www.googleapis.com/drive/v3/files?q=%27arun%27&fields=*
    try {
      // console.log("start file fetching");
      const fileData = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=%27${folder}%27%20in%20parents&fields=*`,
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      );
      const fileDataParse = await fileData.json();
      const data = fileDataParse.files.map(
        ({ id, name, size, modifiedTime }) => ({ id, name, size, modifiedTime })
      );
      // console.log("this is filelist details", data);
      setbackUpfiles(data);
    } catch (error) {
      // console.log(error, "error while fetching the file");
    }
  };

  const gdInit = async (token) => {
    GDrive.setAccessToken(token);
    GDrive.init();
    // const aboutData = await GDrive.about;
    // // console.log("this is about data", aboutData);
  };

  useEffect(() => {
    // console.log("fetching the token started");
    AsyncStorage.getItem("token").then((tokenSaved) => {
      if (JSON.parse(tokenSaved)) {
        setloading(true);
        setToken(JSON.parse(tokenSaved));
      } else {
        setloading(false);
      }
    });
  }, []);

  useEffect(() => {
    console.log("started seting the data", response);
    if (isLoginOut) return;
    if (response?.type === "success") {
      console.log("token", response.authentication.accessToken);
      setToken(response.authentication.accessToken);
      gdInit(response.authentication.accessToken);
      getUserInfo(response.authentication.accessToken);
      AsyncStorage.setItem(
        "token",
        JSON.stringify(response.authentication.accessToken)
      ).then(() => {
        // console.log("token saved");
      });
    }
    if (!response && token) {
      gdInit(token);
      getUserInfo(token);
    }
  }, [response, token]);

  const getUserInfo = async (savedToken) => {
    if (!savedToken) return;
    // console.log(savedToken, "start fetching");
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      );

      const user = await response.json();

      const FetchSrorage = await fetch(
        "https://www.googleapis.com/drive/v3/about?fields=storageQuota",
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      );
      const restStorage = await FetchSrorage.json();
      // console.log("this is user", user, restStorage);
      if (user && restStorage) {
        setstorage(restStorage.storageQuota);
        setUserInfo(user);
      }
      const createFolder = await GDrive.files.safeCreateFolder({
        name: "copyInst",
        parents: ["root"],
      });
      // const folderParse = await folder.json();
      // console.log(createFolder, "folder");
      getFileList(createFolder, savedToken);
      setfolder(createFolder);
      setloading(false);
    } catch (error) {
      // console.log(error, "this is error");
      setloading(false);
      // Add your own error handler here
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
        promptAsync,
        token,
        setToken,
        userInfo,
        setUserInfo,
        loading,
        setloading,
        folder,
        setfolder,
        isLoginOut,
        setisLoginOut,
        clickedBackupId,
        setclickedBackupId,
        storage,
        setstorage,
        inputRef,
        loaderVisible,
        setloaderVisible,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

export default Appcontext;
