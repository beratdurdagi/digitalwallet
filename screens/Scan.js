import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState,useEffect } from "react";

import { COLORS, FONTS, SIZES, icons, images } from "./../constants";
import { Camera, CameraType } from "expo-camera";
import { BarCodeScanner } from 'expo-barcode-scanner';


const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function renderHeader() {
    
    return (
      <View style={{ flexDirection: "row", marginTop: SIZES.padding * 4 }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 45,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={icons.close}
            style={{ height: 20, width: 20, tintColor: COLORS.white }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ ...FONTS.b3, color: COLORS.white }}>
            Scan for payment
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.green,
            borderRadius: 10,
          }}
        >
          <Image
            source={icons.info}
            style={{ height: 20, width: 20, tintColor: COLORS.white }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderScanFocus(){
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Image source={images.focus} style={{height:250,width:200,marginTop:'-50%'}} resizeMode='stretch' />

      </View>
    )
  }

  function renderPayment() {
    return (
      <View
        style={{
          position: "absolute",
          backgroundColor: COLORS.white,
          left: 0,
          bottom: 0,
          right: 0,
          height: 220,
          padding: SIZES.padding * 3,
          borderRadius: SIZES.radius,
        }}
      >
        <Text style={{ ...FONTS.h4 }}>Another payments methods</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: SIZES.padding * 2,
          }}
        >
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
            <View
              style={{
                height: 45,
                width: 45,
                backgroundColor: COLORS.lightpurple,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                source={icons.phone}
                style={{ height: 25, width: 25, tintColor: COLORS.purple }}
              />
            </View>
            <Text style={{marginLeft:SIZES.padding,...FONTS.body4}}>Phone Number</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginLeft:SIZES.padding*2}}>
            <View
              style={{
                height: 45,
                width: 45,
                backgroundColor: COLORS.lightGreen,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                source={icons.barcode}
                style={{ height: 25, width: 25, tintColor: COLORS.green }}
              />
            </View>
            <Text style={{marginLeft:SIZES.padding,...FONTS.body4}}>Barcode</Text>
          </TouchableOpacity>
          

         
        </View>
        
      </View>
    );
  }
 
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
     <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned()}
        style={StyleSheet.absoluteFillObject}
      >
         {renderHeader()}
        {renderScanFocus()}
        {renderPayment()}
      
        </BarCodeScanner>
   
    </View>
      
     
    
  );
};

export default Scan;

const styles = StyleSheet.create({});
