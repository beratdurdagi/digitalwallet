import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Platform,
  StyleSheet,
  FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import { icons, images, theme, COLORS, SIZES, FONTS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [areas, setAreas] = React.useState([]);
  const [selectedArea, setSelectedArea] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isVisible, setİsVisible] = useState(false);
  const navigation = useNavigation();
  React.useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        let areaData = data.map((item) => {
          return {
            code: item.alpha2Code,
            name: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://www.countryflagicons.com/FLAT/64/${item.alpha2Code}.png`,
          };
        });
        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter((a) => a.code == "TR");
          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlerFunction = () => {
    setİsVisible(!isVisible);
  };

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding * 6,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => console.warn("Sign Up")}
      >
        <Image
          source={icons.back}
          style={{ height: 25, width: 25, tintColor: COLORS.white }}
          resizeMode="contain"
        />

        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            ...FONTS.h4,
            color: COLORS.white,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  }

  function renderLogo(logo) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: SIZES.padding * 5,
          height: 100,
        }}
      >
        <Image source={logo} resizeMode="contain" style={{ width: "70%" }} />
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        <View style={{ marginTop: SIZES.padding * 3 }}>
          <Text style={styles.inputStyle}>FULL NAME</Text>
          <TextInput
            placeholder="Enter Full Name"
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>

        {/*phone*/}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={styles.inputStyle}>Phone Number</Text>
          <View style={{ flexDirection: "row" }}>
            {/* Country Code */}
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                flexDirection: "row",
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
              }}
              onPress={() => setModalVisible(true)}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={icons.down}
                  style={{ height: 10, width: 10, tintColor: COLORS.white }}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={{ uri: selectedArea?.flag }}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  marginLeft: 5,
                  alignItems: "center",
                }}
              >
                <Text style={styles.inputStyle}>
                  {selectedArea?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>

            <TextInput
              placeholder="Enter phone number"
              style={{ flex: 1, ...styles.inputContainer }}
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View
          style={{ marginTop: SIZES.padding * 3, justifyContent: "center" }}
        >
          <Text style={styles.inputStyle}>Password</Text>
          <TextInput
            placeholder="Enter Password"
            style={styles.inputContainer}
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={isVisible}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            onPress={() => handlerFunction()}
          >
            <Image
              source={isVisible ? icons.eye : icons.disable_eye}
              style={{ width: 20, height: 20, tintColor: COLORS.white }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{ margin: SIZES.padding * 3 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.radius * 1.5,
            backgroundColor: COLORS.black,
            height: 60,
          }}
          onPress={()=>navigation.navigate('Home')}
        >
          <Text style={styles.inputStyle}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderAreaCodesModal() {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ padding: SIZES.padding, flexDirection: 'row' }}
                onPress={() => {
                    setSelectedArea(item)
                    setModalVisible(false)
                }}
            >
                <Image
                    source={{ uri: item.flag }}
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 10
                    }}
                />
                <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <TouchableWithoutFeedback
                onPress={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            height: 400,
                            width: SIZES.width * 0.8,
                            backgroundColor: COLORS.lightGreen,
                            borderRadius: SIZES.radius
                        }}
                    >
                        <FlatList
                            data={areas}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.code}
                            showsVerticalScrollIndicator={false}
                            style={{
                                padding: SIZES.padding * 2,
                                marginBottom: SIZES.padding * 2
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={{ flex: 1 }}
      >
        <ScrollView>
          {renderHeader()}
          {renderLogo(images.wallieLogo)}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaCodesModal()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  inputStyle: { color: COLORS.lightGreen, ...FONTS.body3 },
  inputContainer: {
    marginVertical: SIZES.padding,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    height: 40,
    color: COLORS.white,
    ...FONTS.body3,
  },
});
