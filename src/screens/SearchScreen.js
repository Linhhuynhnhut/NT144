import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable ,Image, FlatList,ScrollView,TouchableWithoutFeedback } from "react-native";
import { TextInput ,} from "react-native-gesture-handler";
import React, { useState } from 'react';
import { Button } from "react-native-elements";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
const SearchScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
 
  const buttonsTaskbar = [
    { id: 0, title: 'All', color: "#f2ba35" ,boderTop: 0},
    { id: 1, title: 'User', color: "#f2ba35" ,boderTop: 0},
    { id: 2, title: 'Post', color: "#f2ba35" ,boderTop: 0},
    
  ];
  const [selectedButton, setSelectedButton] = useState(buttonsTaskbar[0]);
  const selectButton = (button) => {
    setSelectedButton(button);
  };
  const [followers, setFollowers] = useState([
    { id: 1, name: 'An', username: 'id.usernam1',follower: "333K",image: require("../../assets/image/avatar1.png"), },
  { id: 2, name: 'Bình', username: 'id.usernam2' ,follower: "332K",image: require("../../assets/image/avatar2.jpg"),},
  { id: 3, name: 'Cường', username: 'id.usernam3' ,follower: "1233K",image: require("../../assets/image/avatar3.jpg"),},
  { id: 4, name: 'Đạt', username: 'id.usernam4' ,follower: "332K",image: require("../../assets/image/avatar4.jpg"),},
  { id: 5, name: 'Evelyn', username: 'id.usernam5' ,follower: "33K",image: require("../../assets/image/avatar5.jpg"),},
  { id: 6, name: 'Phương', username: 'id.usernam6' ,follower: "633K",image: require("../../assets/image/avatar6.jpg"),},
  { id: 7, name: 'Linh', username: 'id.usernam8' ,follower: "32K",image: require("../../assets/image/avatar7.jpg"),},
  { id: 8, name: 'Huy', username: 'id.usernam9' ,follower: "34K",image: require("../../assets/image/avatar8.jpg"),},
  { id: 10, name: 'Đức', username: 'id.usernam123' ,follower: "933K",image: require("../../assets/image/avatar10.jpg"),},
  ]);

  const renderItem = ({ item }) => (
    <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
      <View style={{flex:1, backgroundColor:'black',}}>
      <Image source={item.image}
            style={{ width: 100, height: 100 , borderRadius:50, borderWidth: 5, borderColor: 'black',marginLeft:10,}}/>
      </View>
    <View style={{ flex:1,padding: 10, backgroundColor:'black' }}>
      <Text style={{ fontSize: 14, color:'white' }}>{item.username}</Text>
      <Text style={{ fontSize: 18 , fontWeight: 'bold', color:'white'}}>{item.name}</Text>
      <Text style={{ fontSize: 18 , fontWeight: 'bold', color:'white'}}>{item.follower}</Text>
    </View>
    <View style={{ flex:1,padding: 20, backgroundColor:'black', height:"100%" }}>
         <Pressable style={{backgroundColor: "#f27e35",padding: 10,borderRadius:10,justifyContent: 'center', alignItems: 'center' }}>
          <Text>Follow</Text>
         </Pressable>
    </View>
    </View>
  );
  const dataPost = [
    {
      id: '1',
      name: "Huy",
      idname: "username1.qq",
      avatar: require("../../assets/image/avatar1.png"),
      post: 'Bạn là “fan cuồng” của món ốc hương? Hãy cùng tham khảo ngay cách làm ốc hương...',
      image: require("../../assets/image/food1.png"),
      like: '1465',
      cmt: '1231',
    },
    {
      id: '2',
      name: "Trang",
      idname: "username4123.qq",
      avatar: require("../../assets/image/avatar2.jpg"),
      post: 'Mực xào dứa là món ăn quen thuộc của nhiều gia đình Việt. Nếu chưa hài lòng với...',
      image: require("../../assets/image/food0.png"),
      like : '653',
      cmt: '432',
    },
    {
      id: '3',
      name: "Bình",
      idname: "username21.qq",
      avatar: require("../../assets/image/avatar3.jpg"),
      post: 'Với 4 cách làm cải thảo xào vừa nhanh vừa lạ miệng sau đây, người nội trợ sẽ...',
      image: require("../../assets/image/food2.png"),
      like : '342',
      cmt: '123',
    },
  ];
  const Post = ({ post }) => {
    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' , backgroundColor: "black"}}>
        <View style={{flexDirection:'row', flex:1}}>
          <View style={{flex:1, marginTop:20}}>
               <Image source={post.avatar} style={{ width: 70, height:70 ,borderRadius:35  ,justifyContent: 'center',alignItems: 'center',}} resizeMode='cover' />
          </View >
           <View style={{flex:3, marginTop: 20}}>
               <Text style={{fontSize:18, fontWeight:800, color:"white"}}>{post.name}</Text>
               <Text style={{fontSize:15, color:"white"}}>{post.idname}</Text>
           </View>
        </View>
        <Text style={{ marginBottom: 10 , fontSize:15, color:"white", marginTop:10}}>{post.post}</Text>
        <View style={{borderWidth: 1, borderColor: "white", borderRadius:10,justifyContent: 'center',alignItems: 'center',marginTop: 10}}>
        <Image source={post.image} style={{ width: 300, height: 300,}} resizeMode='cover' />
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
  const twoFollowers = followers.slice(0, 2);
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
          <View style={{ flexDirection: 'row',}}>
         
        <TextInput
          style={styles.input}
          placeholder="Enter your text here"
          onChangeText={setText}
          value={text}
        />
        <View style={{borderTopWidth:1, borderBottomWidth:1}}>
         <Image source={ require("../../assets/image/micro.png") } style={{height:40, width:40, borderWidth:1}} />
         </View> 
         <View style={{ borderWidth: 1, borderRadius: 5,borderTopRightRadius: 50,borderBottomRightRadius: 50,paddingHorizontal: 10,}}>
         <Image source={ require("../../assets/image/search.png") } style={{height:40, width:40, borderWidth:1}} />
         </View> 
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
  <ScrollView style={{ flex: 1 }}>
    <Text style={{backgroundColor:"#f2ba35", height:40, padding:10, fontSize: 16, fontWeight:800}}>User</Text>
  {followers.slice(0, 2).map((follower) => renderItem({ item: follower }))} 
  <Text style={{backgroundColor:"#f2ba35", height:40, padding:10, fontSize: 16, fontWeight:800}}>Post</Text>
    {posts.map((post) => renderItemPost({ item: post }))} 
  </ScrollView>
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
      data={posts}
      renderItem={renderItemPost}
      keyExtractor={({ id }) => id}
      style={{ flex: 1 }}
    />
  </View>
  )}
  
  </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#f2ba35",
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
  },
  input: {
    height: 42,
    width: '60%',
    borderWidth: 1,
    borderRadius: 5,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingHorizontal: 10,
    borderRightWidth:0,
  },
});
export default SearchScreen;
