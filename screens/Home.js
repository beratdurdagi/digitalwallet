import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, icons, images, FONTS,specialPromoData,featuresData } from "../constants";


const Home = () => {
 
 
  const [features, setFeatures] = React.useState(featuresData);
  const [special, setSpecial] = React.useState(specialPromoData);

  function renderHeader(){
    return(
      <View style={{flexDirection:'row',marginVertical:SIZES.padding*2}}>
        <View style={{flex:1}}>
          <Text style={{...FONTS.h1}}>Hello!</Text>
          <Text style={{...FONTS.body2,color:COLORS.gray}}>Karalakrep</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{height:40,justifyContent:'center',alignItems:'center',width:40,backgroundColor:COLORS.lightGray}}>
            <Image source={icons.bell} style={{height:20,width:20,tintColor:COLORS.secondary}}/>
            <View  style={{top:-5,right:-5,height:10,width:10,backgroundColor:COLORS.red,borderRadius:5,position:'absolute'}}/>

          </TouchableOpacity>
        </View>
      </View>
    )
    
  }

  function renderBanner(){
    return(
      <View style={{height:120,borderRadius:20}}>
        <Image source={images.banner} resizeMode='cover' style={{width:'100%',height:'100%',borderRadius:20}}/>
      </View>
    )
  }
  function renderFeatures(){
    const renderItem=({item})=>(
      <TouchableOpacity style={{alignItems:'center',width:60,marginBottom:SIZES.padding*2}} onPress={()=>alert('Basıldı')}>
        <View style={{marginBottom:5,height:50,width:50,borderRadius:20,alignItems:'center',backgroundColor:item.backgroundColor,justifyContent:'center'}}>
        <Image source={item.icon} style={{width:20,height:20,tintColor:item.color}} resizeMode='contain'/>
        </View>
        <Text style={{textAlign:'center',flexWrap:'wrap',...FONTS.body4}}>{item.description}</Text>

      </TouchableOpacity>

    )
    const Header=()=>{
      <View style={{marginBottom:SIZES.padding*2}}>
        <Text style={{...FONTS.h3}}>Features</Text>
      </View>
    }
    return(
     <FlatList
     ListHeaderComponent={Header}
     data={features}
     renderItem={renderItem}
     numColumns={4}
    
     columnWrapperStyle={{ justifyContent: "space-between" }}
     keyExtractor={(item) => `${item.id}`}
     style={{marginTop:SIZES.padding*2}}/>
    
    )
  }
  function renderPromoHeader(){
    return(
    <View style={{marginHorizontal:SIZES.padding,flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <Text style={{...FONTS.h3}}>Special Promo</Text>
      <TouchableOpacity onPress={()=>alert('Viev All')}>
      <Text style={{...FONTS.body4,color:COLORS.gray}}>View All</Text></TouchableOpacity>
      
      
    </View>)

  }
  function renderPromos() {
    const HeaderComponent=()=>(
      <View>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
        {renderPromoHeader()}
      </View>
    )
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginVertical: SIZES.padding, width: SIZES.width / 2.4}}
        onPress={() => console.warn("Pressed")}
      >
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}
        >
          <Image
            source={item.img}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>

       <View style={{padding:SIZES.base,backgroundColor:COLORS.lightGray,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
        <Text style={{...FONTS.h4}}>{item.title}</Text>
        <Text style={{...FONTS.body4}}>{item.description}</Text>
        </View>   

      </TouchableOpacity>
    );
    return(

    <FlatList
    ListHeaderComponent={HeaderComponent}
      data={special}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: SIZES.padding * 2.5 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      keyExtractor={(item) => `${item.id}`}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        <View style={{marginBottom:75}}/>
      }
    />
    )
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white,}}
    >
      {renderPromos()}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
