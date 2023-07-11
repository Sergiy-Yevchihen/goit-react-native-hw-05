import React from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const trashImg = require("../../Source/trash.png");

const CreatePost = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [inputRegion, setInputRegion] = useState("");
  const [title, setTitle] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status !== "granted") {
        console.log("Permission to access location was denied");
      }

      Location.getCurrentPositionAsync({})
        .then((locationPos) => {
          const coords = {
            latitude: locationPos.coords.latitude,
            longitude: locationPos.coords.longitude,
          };
          setLocation(coords);
          return coords;
        })
        .then((coords) => {
          return Location.reverseGeocodeAsync(coords);
        })
        .then((regionName) => setRegion(regionName))
        .catch();
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const activer = !!title && !!region;

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    setInputRegion(region[0]["country"] + ", " + region[0]["city"]);
    // if (camera && isCameraReady) {
    //   try {
    //     const photo = await camera.takePictureAsync();
    //     setPhoto(photo.uri);
    //     setInputRegion(region[0]["country"] + ", " + region[0]["city"]);
    //   } catch (error) {
    //     console.log("Error taking photo:", error);
    //   }
    // } else {
    //   console.log("Camera is not ready yet.");
    // }
  };

  const inputTitle = (text) => {
    setTitle(text);
  };

  const handleCreate = () => {
    if (!title || !location) {
      alert("Enter all data pleace!!!");
      return;
    }
    navigation.navigate("PostList", { photo, location, inputRegion, title });
  };

  return (
    <View style={styles.postContainer}>
      <Camera
        style={styles.camera}
        type={type}
        ref={setCamera}

        // ref={(ref) => setCameraRef(ref)}
        // onCameraReady={() => setIsCameraReady(true)}
      >
        <Image
          source={{ uri: photo }}
          style={{ height: 220, width: 220, marginTop: -80 }}
        />
        <View style={styles.postImgAdd}>
          {/* styles.photoView */}
          <TouchableOpacity
            style={styles.flipContainer}
            activeOpacity={0.5}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={takePhoto}
            // onPress={async () => {
            //   if (cameraRef) {
            //     const { uri } = await cameraRef.takePictureAsync();
            //     await MediaLibrary.createAssetAsync(uri);
            //   }
            // }}
          >
            <View style={styles.takePhotoOut}>
              <FontAwesome name="camera" size={24} color="white" />
              {/* <View style={styles.takePhotoInner}></View> */}
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.postForm}>
        <TextInput
          style={styles.postName}
          placeholder="Title..."
          inputMode="text"
          onChangeText={inputTitle}
        />
        <TextInput
          style={styles.postName}
          placeholder="Location"
          inputMode="text"
          value={inputRegion}
        />
        <TouchableOpacity
          style={activer ? styles.postButtonActive : styles.postButton}
          activeOpacity={0.5}
          onPress={handleCreate}
        >
          <Text style={styles.postButtonText}>Publicate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
  },
  camera: {
    height: 200,
    width: 300,

    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  photoView: {
    flex: 1,

    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },
  button: {
    alignSelf: "center",
  },
  postForm: {
    flex: 3,
  },
  postButton: {
    backgroundColor: "#E8E8E8",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonActive: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  postName: {
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

export default CreatePost;
