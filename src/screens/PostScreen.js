import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  TextInput,
  Animated,
  Dimensions,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import {
  FontAwesome,
  Ionicons,
  Fontisto,
  Feather,
  MaterialIcons,
  AntDesign,
} from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
const PostScreen = ({ navigation }) => {
  const [textInputs1, setTextInputs1] = useState([]);
  const [textInputs2, setTextInputs2] = useState([]);

  const handleAddInput1 = () => {
    setTextInputs1([...textInputs1, { id: textInputs1.length }]);
  };

  const handleAddInput2 = () => {
    setTextInputs2([...textInputs2, { id: textInputs2.length }]);
  };
  const handleDeleteInput = (viewIndex, inputId) => {
    if (viewIndex === 1) {
      const updatedInputs = textInputs1.filter((input) => input.id !== inputId);
      setTextInputs1(updatedInputs);
    } else if (viewIndex === 2) {
      const updatedInputs = textInputs2.filter((input) => input.id !== inputId);
      setTextInputs2(updatedInputs);
    }
  };

  const renderTextInputs = (viewIndex, inputs) => {
    return inputs.map((input) => (
      <View key={input.id} style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 20,
            padding: 10,
            marginTop: 10,
          }}
        />
        <TouchableOpacity
          onPress={() => handleDeleteInput(viewIndex, input.id)}
        >
          <AntDesign
            name="delete"
            size={25}
            color="black"
            marginLeft={10}
            marginTop={20}
            mar
          />
        </TouchableOpacity>
      </View>
    ));
  };
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setImages((prevImages) => [...prevImages, result.uri]);
    }
  };

  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setImages((prevImages) => [...prevImages, result.uri]);
    }
  };

  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handlePress = () => {
    Alert.alert(
      "Choose an option",
      "How would you like to pick an image?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Take a Photo", onPress: pickImage },
        { text: "Choose from Library", onPress: pickImageFromLibrary },
      ],
      { cancelable: false }
    );
  };
  return (
    <View>
      <View style={styles.hander}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              myUserId: "6492620f3379bee002a3345b",
            })
          }
        >
          <Ionicons name="arrow-back" size={30} color="black" marginLeft={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: "20%",
            borderWidth: 2,
            borderRadius: 5,
            padding: 5,
            borderColor: "#f27e35",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 600 }}> Lưu </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: "5%",
            borderWidth: 2,
            borderRadius: 5,
            padding: 5,
            borderColor: "#f27e35",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 600 }}> Lên sóng </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto name="more-v-a" size={30} color="black" marginLeft={20} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              height: 240,
              width: "100%",
              backgroundColor: "gray",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handlePress}
          >
            <Feather name="camera" size={120} color="black" marginLeft={20} />
            <Text style={{ fontSize: 18, fontWeight: 700 }}>
              Đăng hình đại diện món ăn
            </Text>
          </TouchableOpacity>
          <TextInput
            style={{
              height: 80,
              width: "90%",
              borderWidth: 1,
              borderRadius: 15,
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 20,
              padding: 20,
            }}
            placeholder="Nhập tên món ăn"
          ></TextInput>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Khẩu phần</Text>
            <TextInput
              style={{
                height: 40,
                width: "50%",
                borderWidth: 1,
                borderRadius: 10,
                marginLeft: "13%",
                padding: 10,
                fontSize: 17,
              }}
              placeholder="2 người"
            ></TextInput>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Thời gian nấu
            </Text>
            <TextInput
              style={{
                height: 40,
                width: "50%",
                borderWidth: 1,
                borderRadius: 10,
                marginLeft: "6%",
                padding: 10,
                fontSize: 17,
              }}
              placeholder="1 tiếng 30 phút"
            ></TextInput>
          </View>
        </View>
        <View
          style={{ backgroundColor: "gray", height: 10, marginTop: 10 }}
        ></View>
        <View style={{}}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Nguyên Liệu
          </Text>
          {renderTextInputs(1, textInputs1)}
        </View>
        <View>
          <TouchableOpacity
            style={{
              marginLeft: "30%",
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              width: "45%",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={handleAddInput1}
          >
            <MaterialIcons name="add" size={30} />
            <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
              Nguyên Liệu
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{ backgroundColor: "gray", height: 10, marginTop: 10 }}
          ></View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Cách làm
          </Text>
          {renderTextInputs(2, textInputs2)}
          <TouchableOpacity
            style={{
              marginLeft: "30%",
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              width: "45%",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
            title="Show Text"
            onPress={handleAddInput2}
          >
            <MaterialIcons name="add" size={30} />
            <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
              Thêm bước
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <TextInput
            style={{
              height: 120,
              width: "90%",
              borderWidth: 1,
              borderRadius: 15,
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 5,
              padding: 20,
            }}
            placeholder="Nhập mô tả, cảm nghĩ ..."
          ></TextInput>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  hander: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
  },
  inputsContainer: {
    flexDirection: "column",
    width: "100%",
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  taskBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 2,
    borderBottomColor: "#d9d9d9",
    paddingHorizontal: 20,
  },
  lineContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 3,
  },
  line: {
    height: 3,
    backgroundColor: "#f27e35",
  },
  input: {
    marginLeft: 20,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
});
export default PostScreen;
