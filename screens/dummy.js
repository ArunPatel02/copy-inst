import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleLogo from "../assets/google.png";
import BackupImage from "../assets/backup.png";
import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

//andriod : 468150064386-4hq112vv05mcqjh7gvkt4oikvq8krpfv.apps.googleusercontent.com
//clent web : 468150064386-flrvupg5jusj8qf3oedoljo9r0fotb74.apps.googleusercontent.com
WebBrowser.maybeCompleteAuthSession();

const BackUpDummy = () => {

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (response?.type === "success") {
      console.log("token", response.authentication.accessToken);
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      console.log("this is user", user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId:
      "468150064386-flrvupg5jusj8qf3oedoljo9r0fotb74.apps.googleusercontent.com",
    iosClientId:
      "468150064386-flrvupg5jusj8qf3oedoljo9r0fotb74.apps.googleusercontent.com",
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setState({ userInfo });
    } catch (error) {
      // if (error.code === statusCodes?.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes?.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes?.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      // setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  return (
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
          // promptAsync();
          signIn();
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
            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: "bold" }}>
              Sign in with google
            </Text>
          </View>
        </View>
      </Pressable>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress}
      /> */}
      ;
    </View>
  );
};

export default BackUpDummy;
