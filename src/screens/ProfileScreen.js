import { height, width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Pressable ,Image, FlatList,ScrollView,TouchableWithoutFeedback} from "react-native";
import Button from "react-native-button";
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
const ProfileScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
 
  const buttonsTaskbar = [
    { id: 0, title: 'Post', color: "white" ,boderTop: 0},
    { id: 1, title: 'Follower', color: "white" ,boderTop: 0},
    { id: 2, title: 'Following', color: "white" ,boderTop: 0},
    
  ];
  const [selectedButton, setSelectedButton] = useState(buttonsTaskbar[0]);
  const selectButton = (button) => {
    setSelectedButton(button);
  };
  const [followers, setFollowers] = useState([
  { id: 1, name: 'An', username: 'id.usernam1',post: "23", follower: '123K',image: require("../../assets/image/avatar1.png"), },
  { id: 2, name: 'Bình', username: 'id.usernam2' ,post: "223", follower: '223K',image: require("../../assets/image/avatar2.jpg"),},
  { id: 3, name: 'Cường', username: 'id.usernam3' ,post: "33", follower: '15K',image: require("../../assets/image/avatar3.jpg"),},
  { id: 4, name: 'Đạt', username: 'id.usernam4' ,post: "63", follower: '163K',image: require("../../assets/image/avatar4.jpg"),},
  { id: 5, name: 'Evelyn', username: 'id.usernam5' ,post: "73", follower: '93K',image: require("../../assets/image/avatar5.jpg"),},
  { id: 6, name: 'Phương', username: 'id.usernam6' ,post: "43", follower: '13K',image: require("../../assets/image/avatar6.jpg"),},
  { id: 7, name: 'Linh', username: 'id.usernam8' ,post: "73", follower: '623K',image: require("../../assets/image/avatar7.jpg"),},
  { id: 8, name: 'Huy', username: 'id.usernam9' ,post: "25", follower: '23K',image: require("../../assets/image/avatar8.jpg"),},
  { id: 10, name: 'Đức', username: 'id.usernam123' ,post: "8", follower: '12K',image: require("../../assets/image/avatar10.jpg"),},
  ]);
  const [isPressed, setIsPressed] = useState(false); 
  const renderItem = ({ item }) => (
    <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
      <View style={{flex:1, backgroundColor:'white',margin:5}}>
      <Image source={item.image}
            style={{ width: 80, height: 80 , borderRadius:40, borderWidth: 1, borderColor: 'black',marginLeft:10,}}/>
      </View>
    <View style={{ flex:3,padding: 10, backgroundColor:'white' }}>
       <Text style={{ fontSize: 18 , fontWeight: 'bold', color:'black'}}>{item.name}</Text> 
       <Text style={{ fontSize: 14, color:'black' }}>{item.username}</Text>
    </View>
    </View>
  );
  const dataPost = [
    {
      id: '1',
      name:"Tôm hấp",
      image: require("../../assets/image/food1.png"),
      like: '1465',
      cmt: '1231',
    },
    {
      id: '2',
      name:"Mực xào",
      image: require("../../assets/image/food0.png"),
      like : '653',
      cmt: '432',
    },
    {
      id: '3',
      name:"Thạch dừa",
      image: require("../../assets/image/food2.png"),
      like : '342',
      cmt: '123',
    },
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const Post = ({ post }) => {
    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' , backgroundColor: "white",}}>
        <View style={{alignItems: 'flex-end'}}><Fontisto name="more-v-a" size={20}  marginRight={20} /></View>
        <Text style={{fontSize:20, fontWeight:800}}>{post.name}</Text>
        <View style={{borderWidth: 1, borderColor: "black", borderRadius:10,justifyContent: 'center',alignItems: 'center',marginTop: 10}}>
        <Image source={post.image} style={{ width: 300, height: 300 ,justifyContent: 'center',alignItems: 'center', padding:10}} resizeMode='cover' />
        </View>
        <View style={{flexDirection:"row", backgroundColor:"white", borderRadius:10, height:40}}>
        <TouchableWithoutFeedback >
          <View style={{flexDirection:'row'}}>
            <AntDesign name="hearto" size={25} marginTop={5} marginLeft={10}  />
            <Text style={{marginBottom: 10 , fontSize:15, color:"black" , marginTop: 5}}>{post.like}</Text>
            </View>
    </TouchableWithoutFeedback>
    
    <TouchableWithoutFeedback >
      <View style={{flexDirection:'row',}}>
        <Icon name="comment-text-outline" size={25} marginTop={5} marginLeft={30}  /> 
        <Text style={{marginBottom: 10 , fontSize:15, color:"black" , marginTop: 5}}>{post.cmt}</Text>
        </View>
    </TouchableWithoutFeedback>
      </View>
      </View>
    );
  };
  const [posts, setPosts] = useState(dataPost);

  const renderItemPost = ({ item }) => <Post post={item} />;
  return (
    <>
      <View style={{height:25,backgroundColor:"white"}}></View>
      <View style={styles.header}>
          <Pressable
            style={styles.buttonLeft}
            onPress={() => navigation.navigate("Home", {})}>
             <Image
            style={{ width: 40, height: 30 ,opacity: 0.8}}
            source={require("../../assets/image/back.png")}
          />
          </Pressable>
          <Text style={styles.title}>ID_Username </Text>
          <Pressable
            style={styles.buttonRight}
            onPress={() => navigation.navigate("Home", {})}>
             <Image
            style={{ width: 60, height: 45 ,opacity: 0.8,   shadowColor: "#000",shadowOffset: {
              width: 5,
              height: 5,
            },shadowOpacity: 0.8,shadowRadius: 4,elevation: 10,}}
            source={require("../../assets/image/more.png")}
          />
          </Pressable>
      </View>
    <ScrollView stickyHeaderIndices={[3]}>
    <View style={{height:10, backgroundColor:"white"}}></View>
    <View style={styles.profileview}>
        <View style={{flex :1} }>
          <Image
            style={{ width: 100, height: 100 , borderRadius:50, borderWidth: 5, borderColor: 'black',marginLeft:10,}}
            source={require("../../assets/image/avatar.jpg")}
          />
        </View>
          
        <View style={{flex:3}} >
          <View style={{ flexDirection: 'row',justifyContent: 'space-around',alignItems: 'flex-end',}}>
            <View style={{ alignItems: 'center' }}>
                    <Text style={{fontStyle: "Bold",fontSize: 18,fontWeight:900,}}>20</Text>
                    <Text style={{ fontSize: 12, color: 'grey' }}>Posts</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                        <Text style={{fontStyle: "Bold",fontSize: 18,fontWeight:900,}}>205</Text>
                        <Text style={{ fontSize: 12, color: 'grey' }}>Followers</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                        <Text style={{fontStyle: "Bold",fontSize: 18,fontWeight:900,}}>167</Text>
                        <Text style={{ fontSize: 12, color: 'grey' }}>Following</Text>
            </View> 
          </View>
          <View style={{height:10}}></View>
          <View style={{flexDirection:'row',alignItems: 'center' ,justifyContent: 'center', }}>
          <Pressable 
             onPress={() => setIsPressed(!isPressed)} // Khi nhấn vào, thay đổi giá trị state hiện tại.
               style={({ pressed }) => [
             { opacity: pressed ? 0.5 : 1 } // Điều chỉnh opacity của Pressable khi người dùng nhấn vào.
             ]}>
              {       ({ pressed }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius:10, height:50, width:180,justifyContent: 'center', backgroundColor: isPressed ? '#DCDCDC' : '#f27e35'}}>
                <FontAwesome5 name={isPressed ? 'user-check' : 'user-plus'} size={30} color={pressed ? 'red' : 'black'} />
                  <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{isPressed ? 'UnFollow' : 'Follow'}</Text>

               </View>
           )}
           </Pressable>
          </View>
        </View>
          
      </View>
        <View style={{ paddingBottom: 10 , backgroundColor:"white"}}>
          <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Van Luan</Text>
                                <Text>Lark | Computer Jock | Commercial Pilot</Text>
                                <Text>www.nguyenvanluan.com</Text>
          </View>
        </View>
   <View>
   <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "white", height: 45 }}>
    {buttonsTaskbar.map((button) => (
      <Pressable
        key={button.id}
        style={({ pressed }) => [
          {
            padding: 10,
            borderBottomWidth: activeIndex === button.id ? 1 : 0,
            backgroundColor: activeIndex === button.id ? "#F5F5F5" : "white",
            flex: 1, // Chiếm hết toàn bộ chiều rộng của View
          },
          pressed && { opacity: 0.5 },
        ]}
        onPress={() => setActiveIndex(button.id)}
      >
        <Text style={{ textAlign: 'center', fontWeight: activeIndex === button.id ? 'bold' : 'normal' }}>
          {button.title}
        </Text>
      </Pressable>
    ))}
  </View>
   </View>
  <View style={{backgroundColor: "white", height: "100%"}}>
  {activeIndex === 0 && (
    <View style={{ flex: 1 }}>
    <FlatList
      data={posts}
      renderItem={renderItemPost}
      keyExtractor={({ id }) => id}
      style={{ flex: 1 }}
    />
  </View>
  )}
  {activeIndex === 1  && (
    <View style={{ flex: 1 }}>
    <FlatList
      data={followers}
      renderItem={renderItem}
      keyExtractor={({ id }) => id.toString()}
    />
  </View>
  )}
  {activeIndex === 2 && (
     <View style={{ flex: 1 }}>
     <FlatList
       data={followers}
       renderItem={renderItem}
       keyExtractor={({ id }) => id.toString()}
     />
   </View>
  )}
  
  </View>
  </ScrollView>
  
    </>
  );
};

const styles = StyleSheet.create({
  introView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
    width: "100%",
    height: 250,
    margin: 0,
  },
  profileview: {
    backgroundColor: "white",
    width: "100%",
    height: 120,
    margin: 0,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: "#fff",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    
  },
  header: {
    backgroundColor: "white",
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,

},
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  buttonLeft: {
    alignSelf: 'flex-start',
    height:40,
    backgroundColor:"white",
    width:60,
    justifyContent: 'center',
    
  },
  buttonRight: {
    alignSelf: 'flex-end',
    height:40,
    backgroundColor:"white",
    width:60,
    ustifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight:900,
    color:"black",

  },
  taskbar: {
    backgroundColor: '#f2ba35',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,

  },
  buttonFollow :{
    flexDirection: 'row',
    flex:3,
    backgroundColor: "#f27e35",
     marginLeft:25,
     marginRight:25,
    padding: 5,
    justifyContent: 'center',
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
});
export default ProfileScreen;