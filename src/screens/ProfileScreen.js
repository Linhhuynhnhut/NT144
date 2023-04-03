import { height, width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Pressable ,Image, FlatList,ScrollView,TouchableWithoutFeedback} from "react-native";
import Button from "react-native-button";
import React, { useState } from 'react';
const ProfileScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
 
  const buttonsTaskbar = [
    { id: 0, title: 'Post', color: "#f2ba35" ,boderTop: 0},
    { id: 1, title: 'Follower', color: "#f2ba35" ,boderTop: 0},
    { id: 2, title: 'Following', color: "#f2ba35" ,boderTop: 0},
    
  ];
  const [selectedButton, setSelectedButton] = useState(buttonsTaskbar[0]);
  const selectButton = (button) => {
    setSelectedButton(button);
  };
  const [followers, setFollowers] = useState([
    { id: 1, name: 'An', username: 'id.usernam1',image: require("../../assets/image/avatar1.png"), },
  { id: 2, name: 'Bình', username: 'id.usernam2' ,image: require("../../assets/image/avatar2.jpg"),},
  { id: 3, name: 'Cường', username: 'id.usernam3' ,image: require("../../assets/image/avatar3.jpg"),},
  { id: 4, name: 'Đạt', username: 'id.usernam4' ,image: require("../../assets/image/avatar4.jpg"),},
  { id: 5, name: 'Evelyn', username: 'id.usernam5' ,image: require("../../assets/image/avatar5.jpg"),},
  { id: 6, name: 'Phương', username: 'id.usernam6' ,image: require("../../assets/image/avatar6.jpg"),},
  { id: 7, name: 'Linh', username: 'id.usernam8' ,image: require("../../assets/image/avatar7.jpg"),},
  { id: 8, name: 'Huy', username: 'id.usernam9' ,image: require("../../assets/image/avatar8.jpg"),},
  { id: 10, name: 'Đức', username: 'id.usernam123' ,image: require("../../assets/image/avatar10.jpg"),},
  ]);

  const renderItem = ({ item }) => (
    <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
      <View style={{flex:1, backgroundColor:'black',}}>
      <Image source={item.image}
            style={{ width: 100, height: 100 , borderRadius:50, borderWidth: 5, borderColor: 'black',marginLeft:10,}}/>
      </View>
    <View style={{ flex:2,padding: 10, backgroundColor:'black' }}>
      <Text style={{ fontSize: 14, color:'white' }}>{item.username}</Text>
      <Text style={{ fontSize: 18 , fontWeight: 'bold', color:'white'}}>{item.name}</Text>
    </View>
    </View>
  );
  const dataPost = [
    {
      id: '1',
      post: 'Bạn là “fan cuồng” của món ốc hương? Hãy cùng tham khảo ngay cách làm ốc hương...',
      image: require("../../assets/image/food1.png"),
      like: '1465',
      cmt: '1231',
    },
    {
      id: '2',
      post: 'Mực xào dứa là món ăn quen thuộc của nhiều gia đình Việt. Nếu chưa hài lòng với...',
      image: require("../../assets/image/food0.png"),
      like : '653',
      cmt: '432',
    },
    {
      id: '3',
      post: 'Với 4 cách làm cải thảo xào vừa nhanh vừa lạ miệng sau đây, người nội trợ sẽ...',
      image: require("../../assets/image/food2.png"),
      like : '342',
      cmt: '123',
    },
  ];
  const Post = ({ post }) => {
    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' , backgroundColor: "black"}}>
        <Text style={{ marginBottom: 10 , fontSize:15, color:"white", marginTop:10}}>{post.post}</Text>
        <View style={{borderWidth: 1, borderColor: "white", borderRadius:10,justifyContent: 'center',alignItems: 'center',marginTop: 10}}>
        <Image source={post.image} style={{ width: 300, height: 300 ,justifyContent: 'center',alignItems: 'center',}} resizeMode='cover' />
        </View>
        <View style={{flexDirection:"row"}}>
        <TouchableWithoutFeedback >
      <Image source={require("../../assets/image/like.png")} style={{ width: 40, height: 40, marginTop: 10, marginLeft: 10}} resizeMode='cover'/>
    </TouchableWithoutFeedback>
    <Text style={{marginBottom: 10 , fontSize:15, color:"white" , marginTop: 20}}>{post.like}</Text>
    <TouchableWithoutFeedback >
      <Image source={require("../../assets/image/cmt.png")} style={{ width: 40, height: 40, marginTop: 10, marginLeft: 50}} resizeMode='cover'/>
    </TouchableWithoutFeedback>
    <Text style={{marginBottom: 10 , fontSize:15, color:"white" , marginTop: 20}}>{post.cmt}</Text>
      </View>
      </View>
    );
  };
  const [posts, setPosts] = useState(dataPost);

  const renderItemPost = ({ item }) => <Post post={item} />;
  return (
    <>
      <View style={{height:25,backgroundColor:"#f2ba35"}}></View>
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
    <ScrollView>
    <View style={{height:10, backgroundColor:'#f2ba35'}}></View>
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
          <View style={{flexDirection:'row'}}>
                <Pressable style={styles.buttonFollow} >
                <Image source={require("../../assets/image/follow.jpg")} style={{width: 30,height: 30,marginRight: 10,}} />
                    <Text style={{fontStyle: "Bold",fontSize: 20,fontWeight:900,}}>Follow</Text>
                </Pressable>
          </View>
        </View>
          
      </View>
        <View style={{ paddingBottom: 10 , backgroundColor:'#f2ba35'}}>
          <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Van Luan</Text>
                                <Text>Lark | Computer Jock | Commercial Pilot</Text>
                                <Text>www.nguyenvanluan.com</Text>
          </View>
        </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#f2ba35', height: 45 }}>
    {buttonsTaskbar.map((button) => (
      <Pressable
        key={button.id}
        style={({ pressed }) => [
          {
            padding: 10,
            borderTopWidth: activeIndex === button.id ? 1 : 0,
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
    backgroundColor: "#f2ba35",
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
    backgroundColor: "#f2ba35",
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
    backgroundColor:"#f2ba35",
    width:60,
    justifyContent: 'center',
    
  },
  buttonRight: {
    alignSelf: 'flex-end',
    height:40,
    backgroundColor:"#f2ba35",
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