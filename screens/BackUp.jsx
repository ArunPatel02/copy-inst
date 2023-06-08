import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleLogo from "../assets/google.png";
import BackupImage from "../assets/backup.png";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GDrive from "expo-google-drive-api-wrapper";
import moment from "moment";
import BottomBackupList from "../components/BottomBackupList";
import { CustomContext } from "../Appcontext";
import BottomListChangeName from "../components/BottomListChangeName";
import BottomListDeleteBackup from "../components/BottomListDeleteBackup";
import { useNavigation } from "@react-navigation/native";

//andriod : 468150064386-4hq112vv05mcqjh7gvkt4oikvq8krpfv.apps.googleusercontent.com
//clent web : 468150064386-flrvupg5jusj8qf3oedoljo9r0fotb74.apps.googleusercontent.com
// WebBrowser.maybeCompleteAuthSession();

const BackUp = () => {
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   webClientId:
  //     "468150064386-flrvupg5jusj8qf3oedoljo9r0fotb74.apps.googleusercontent.com",
  //   expoClientId:
  //     "468150064386-flrvupg5jusj8qf3oedoljo9r0fotb74.apps.googleusercontent.com",
  //   androidClientId:
  //     "468150064386-4hq112vv05mcqjh7gvkt4oikvq8krpfv.apps.googleusercontent.com",
  //   iosClientId:
  //     "468150064386-4hq112vv05mcqjh7gvkt4oikvq8krpfv.apps.googleusercontent.com",
  //   scopes: ["https://www.googleapis.com/auth/drive"],
  // });

  const {
    showhastagBottomModal4,
    setshowhastagBottomModal4,
    backUpfiles,
    setbackUpfiles,
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
    setloaderVisible,
  } = useContext(CustomContext);

  // const [token, setToken] = useState("");
  // const [userInfo, setUserInfo] = useState({});
  // const [storage, setstorage] = useState({});
  // const [loading, setloading] = useState(false);
  // const [folder, setfolder] = useState("");
  // const [isLoginOut, setisLoginOut] = useState(false);
  // const [clickedBackupId, setclickedBackupId] = useState("");

  const navigation = useNavigation();

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
      if (fileDataParse) {
        setloaderVisible(false);
      }
    } catch (error) {
      setloaderVisible(false);
      // console.log(error, "error while fetching the file");
    }
  };

  // const getFileContent = async (id, savedToken) => {
  //   try {
  //     // console.log("start file fetching");
  //     const fileData = await fetch(
  //       `https://www.googleapis.com/drive/v3/files/${id}?alt=media&fields=*`,
  //       {
  //         headers: { Authorization: `Bearer ${savedToken}` },
  //       }
  //     );
  //     const fileDataParse = await fileData.json();
  //     // console.log("this is file details", fileDataParse);
  //     // setbackUpfiles((pre) => [fileDataParse, ...pre]);
  //   } catch (error) {
  //     // console.log(error, "error while fetching the file");
  //   }
  // };

  // const getFileList = async (folder, savedToken) => {
  //   // https://www.googleapis.com/drive/v3/files?q=%27arun%27&fields=*
  //   try {
  //     // console.log("start file fetching");
  //     const fileData = await fetch(
  //       `https://www.googleapis.com/drive/v3/files?q=%27${folder}%27%20in%20parents&fields=*`,
  //       {
  //         headers: { Authorization: `Bearer ${savedToken}` },
  //       }
  //     );
  //     const fileDataParse = await fileData.json();
  //     const data = fileDataParse.files.map(
  //       ({ id, name, size, modifiedTime }) => ({ id, name, size, modifiedTime })
  //     );
  //     // console.log("this is filelist details", data);
  //     setbackUpfiles(data);
  //   } catch (error) {
  //     // console.log(error, "error while fetching the file");
  //   }
  // };

  // const gdInit = async (token) => {
  //   GDrive.setAccessToken(token);
  //   GDrive.init();
  //   // const aboutData = await GDrive.about;
  //   // // console.log("this is about data", aboutData);
  // };

  // useEffect(() => {
  //   // console.log("fetching the token started");
  //   AsyncStorage.getItem("token").then((tokenSaved) => {
  //     if (JSON.parse(tokenSaved)) {
  //       setloading(true);
  //       setToken(JSON.parse(tokenSaved));
  //     } else {
  //       setloading(false);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   // console.log("started seting the data", response);
  //   if (isLoginOut) return;
  //   if (response?.type === "success") {
  //     // console.log("token", response.authentication.accessToken);
  //     setToken(response.authentication.accessToken);
  //     gdInit(response.authentication.accessToken);
  //     getUserInfo(response.authentication.accessToken);
  //     AsyncStorage.setItem(
  //       "token",
  //       JSON.stringify(response.authentication.accessToken)
  //     ).then(() => {
  //       // console.log("token saved");
  //     });
  //   }
  //   if (!response && token) {
  //     gdInit(token);
  //     getUserInfo(token);
  //   }
  // }, [response, token]);

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    let i = Math.floor(Math.log(bytes) / Math.log(k));
    if (i === 0) {
      i = 1;
    }
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  // const getUserInfo = async (savedToken) => {
  //   if (!savedToken) return;
  //   // console.log(savedToken, "start fetching");
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${savedToken}` },
  //       }
  //     );

  //     const user = await response.json();

  //     const FetchSrorage = await fetch(
  //       "https://www.googleapis.com/drive/v3/about?fields=storageQuota",
  //       {
  //         headers: { Authorization: `Bearer ${savedToken}` },
  //       }
  //     );
  //     const restStorage = await FetchSrorage.json();
  //     // console.log("this is user", user, restStorage);
  //     if (user && restStorage) {
  //       setstorage(restStorage.storageQuota);
  //       setUserInfo(user);
  //     }
  //     const createFolder = await GDrive.files.safeCreateFolder({
  //       name: "copyInst",
  //       parents: ["root"],
  //     });
  //     // const folderParse = await folder.json();
  //     // console.log(createFolder, "folder");
  //     getFileList(createFolder, savedToken);
  //     setfolder(createFolder);
  //     setloading(false);
  //   } catch (error) {
  //     // console.log(error, "this is error");
  //     setloading(false);
  //     // Add your own error handler here
  //   }
  // };

  GDrive.isInitialized()
    ? console.log("drive connected")
    : console.log("drive is not connected");

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Restoring the data</Text>
        </View>
      ) : !loading &&
        userInfo &&
        storage &&
        Object.keys(userInfo).length &&
        Object.keys(storage).length ? (
        <ScrollView>
          <BottomBackupList
            id={clickedBackupId}
            token={token}
            navigation={navigation}
          />
          <BottomListChangeName id={clickedBackupId} token={token} />
          <BottomListDeleteBackup id={clickedBackupId} token={token} />
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "500", color: "gray" }}>
                {userInfo.email}
              </Text>
              <Pressable
                onPress={async () => {
                  // console.log("login out");
                  setisLoginOut(true);
                  if (token) {
                    try {
                      await AsyncStorage.removeItem("token");
                      // setisLoginOut(false);
                    } catch (error) {
                      // console.log("ERROR XXX", error);
                    }
                  }
                  setUserInfo({});
                  setstorage({});
                  setbackUpfiles([]);
                  setToken("");
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "300",
                    marginTop: 2,
                    textDecorationLine: "underline",
                    color: "gray",
                  }}
                >
                  Log out
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 10,
                elevation: 10,
              }}
            >
              <Image
                source={{ uri: userInfo.picture }}
                height={75}
                width={75}
                resizeMode="contain"
              />
            </View>
          </View>
          <View
            style={{
              width: "90%",
              marginHorizontal: "5%",
              marginTop: 20,
              backgroundColor: "white",
              height: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                width: `${((storage?.usage * 100) / storage?.limit).toFixed(
                  1
                )}%`,
                backgroundColor: "blue",
                height: 10,
                borderRadius: 10,
              }}
            ></View>
          </View>
          <View
            style={{
              width: "90%",
              marginHorizontal: "5%",
              marginTop: 2,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "gray",
              }}
            >
              {formatBytes(storage.usage)} of {formatBytes(storage.limit)} used
            </Text>
          </View>
          <Pressable
            style={{
              width: "90%",
              backgroundColor: "blue",
              marginHorizontal: "5%",
              borderRadius: 10,
              marginTop: 40,
              marginBottom: 20,
            }}
            onPress={async () => {
              let jsonData = {};
              setloaderVisible(true);
              const allKeys = await AsyncStorage.getAllKeys();
              // console.log("allkeys", allKeys);
              Promise.all(
                allKeys.map(async (key) => {
                  if (key !== "token" || key !== "password") {
                    const data = await AsyncStorage.getItem(key);
                    // console.log(data);
                    jsonData[key] = JSON.parse(data);
                  }
                })
              ).then(async (_) => {
                try {
                  // console.log(jsonData);

                  const data = await GDrive.files.createFileMultipart(
                    JSON.stringify(jsonData),
                    "application/json",
                    {
                      parents: [folder],
                      name: "backup.json",
                      description: "arunPatel backup file",
                    }
                  );
                  const dataParse = await data.json();
                  // console.log("this is file saved", dataParse);
                  getFileDetails(dataParse.id, token);
                  // const getFile = await GDrive.files.get(dataParse.id);
                  // const parsegetFile = await getFile.json();
                } catch (error) {
                  setloaderVisible(false);
                  // console.log("error", error);
                }
              });
            }}
          >
            {/* <ImageBackground
              source={{ uri: Image.resolveAssetSource(BackupImage).uri }}
              resizeMode="cover"
            > */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}
            >
              <View
                style={{
                  // height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Make a backup
                </Text>
              </View>
            </View>
            {/* </ImageBackground> */}
          </Pressable>
          {backUpfiles.length
            ? backUpfiles.map((_, index) => (
                <Pressable
                  android_ripple={{
                    color: "#0000080",
                    borderless: false,
                    radius: 165,
                  }}
                  style={{
                    width: "90%",
                    backgroundColor: "white",
                    marginHorizontal: "5%",
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderRadius: 8,
                    marginBottom: 20,
                    overflow: "hidden",
                  }}
                  elevation={10}
                  key={index.toString()}
                  onPress={async () => {
                    // getFileContent(_.id, token);
                    setshowhastagBottomModal4(true);
                    setclickedBackupId(_.id);
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      {_.name}
                    </Text>
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "300",
                          color: "black",
                        }}
                      >
                        {moment
                          .utc(_.modifiedTime)
                          .local()
                          .startOf("seconds")
                          .fromNow()}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "300",
                          color: "black",
                        }}
                      >
                        {formatBytes(_.size)}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))
            : null}
        </ScrollView>
      ) : (
        <View>
          <Image
            source={{ uri: Image.resolveAssetSource(BackupImage).uri }}
            width={"100%"}
            height={"50%"}
            resizeMode="contain"
          />
          <Text
            style={{
              marginTop: 0,
              fontSize: 16,
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Securely back up to the cloud.
          </Text>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 16,
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            All you need is a Google account!
          </Text>
          <Pressable
            style={{
              width: "90%",
              backgroundColor: "white",
              marginHorizontal: "5%",
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            elevation={10}
            onPress={() => {
              promptAsync({
                presentationStyle:
                  WebBrowser.WebBrowserPresentationStyle.POPOVER,
              });
              setisLoginOut(false);
              setloading(true);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: Image.resolveAssetSource(GoogleLogo).uri }}
                height={40}
                width={40}
              />
              <View
                style={{
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, marginLeft: 10, fontWeight: "bold" }}
                >
                  Sign in with google
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default BackUp;
