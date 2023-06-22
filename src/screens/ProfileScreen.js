import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { useState , useEffect,useRef} from 'react';
import { Animated,Dimensions,View, Text, FlatList, Image, ActivityIndicator,StyleSheet,TouchableOpacity,Pressable , ScrollView} from 'react-native';
import {Entypo ,FontAwesome5, Octicons} from '@expo/vector-icons';
  //Dữ liệu user
  const user = {
  iduser:'nguyenvanluan_1006',
  username: 'Luân Nguyễn',
  follower: 501,
  following: 300,
  post: 100,
  bio: 'Xin chào! Mình là Luân, một người yêu thích du lịch và ẩm thực. Mình sống và làm việc tại TP.HCM, Việt Nam. ',
  avatar: "../../assets/image/avatar.png"
};
export default ProfileScreen = ({ navigation }) => {
  // Nút Follow
 const [isPressed, setIsPressed] = useState(false); 
  // taskbar
  const [currentButton, setCurrentButton] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [translateValue, setTranslateValue] = useState(new Animated.Value(0));
  const translateXRef = useRef(null);
  const [selectedButtons, setSelectedButtons] = useState([]);
   const selectButton = (index) => {
    setCurrentButton(index);
    const newSelectedButtons = new Array(3).fill(false);
    newSelectedButtons[index] = true;
    setSelectedButtons(newSelectedButtons);
    Animated.timing(translateValue, {
      toValue: ((index) * (buttonWidth + 20)),
      duration: 150,
      useNativeDriver: true,
    }).start();
  }
  const onButtonLayout = (event) => {
    const width = event.nativeEvent.layout.width;
    setButtonWidth(width);
  }
  let viewToShow = null;

  if (selectButton === 0) {
    viewToShow = <View style={styles.view1}><Text>View 1</Text></View>;
  } else if (selectButton === 1) {
    viewToShow = <View style={styles.view2}><Text>View 2</Text></View>;
  } else if (selectButton === 2) {
    viewToShow = <View style={styles.view3}><Text>View 3</Text></View>;
  }
  return (
    <View style={{marginTop:20}}>
       <Profilecomponent isPressed= {isPressed} setIsPressed={setIsPressed} />
       <TaskBarcomponent 
            currentButton ={currentButton}
            setCurrentButton ={setCurrentButton}
            buttonWidth={buttonWidth}
            setButtonWidth={setButtonWidth}
            translateValue ={translateValue }
            setTranslateValue={setTranslateValue}
            translateXRef={translateXRef}
            selectedButtons={selectedButtons}
            setSelectedButtons={setSelectedButtons}
            selectButton={selectButton}
            onButtonLayout={onButtonLayout}
       />

  </View>
  );
}

const Profilecomponent=({ isPressed, setIsPressed})=>{
  return(
    <View style={{}}>
        <View style={styles.hander}>
            <Text style={{  justifyContent: 'center',alignItems: 'center', color:'black', flex:2, marginLeft: 20, fontSize: 20, fontWeight:800}}>{user.iduser}</Text>
            <TouchableOpacity style={{padding: 10,borderRadius: 5,flex:0.2,  alignItems: 'center'}}>
            <Octicons name="diff-added" size={30} color="black" fontWeight={900} />
           </TouchableOpacity>
           <TouchableOpacity style={{padding: 10,borderRadius: 5,flex:0.2,alignItems: 'center'}}>
           <Entypo name="menu" size={30} color="black" fontWeight={900} />
           </TouchableOpacity>
        </View>
        <View style={styles.profile}>
        <View style={{flex :1.5} }>
          <Image
            style={{ width: 80, height: 80 , borderRadius:50, borderWidth: 2, borderColor: "#f27e35",marginLeft:10,marginTop:5}}
            source={user.avatar}
          />
          <Text style={{marginLeft: 5, marginTop: 5, fontSize: 15, fontWeight:900}}>{user.username}</Text>
        </View>
          <View style={{flex:3}}>
          <View style={{ flexDirection: 'row',justifyContent: 'space-around',alignItems: 'flex-end',}}>
            <View style={{ alignItems: 'center' }}>
                    <Text style={{fontStyle: "Bold",fontSize: 18,fontWeight:900,}}>{user.post}</Text>
                    <Text style={{ fontSize: 12, color: 'black',fontWeight:900 }}>Posts</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                        <Text style={{fontStyle: "Bold",fontSize: 18,fontWeight:900,}}>{user.follower}</Text>
                        <Text style={{ fontSize: 12, color: 'black',fontWeight:900 }}>Followers</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                        <Text style={{fontStyle: "Bold",fontSize: 18,fontWeight:900,}}>{user.following}</Text>
                        <Text style={{ fontSize: 12, color: 'black',fontWeight:900 }}>Following</Text>
            </View> 
            
          </View>
          <View style={{flexDirection:'row',alignItems: 'center' ,justifyContent: 'center', marginTop:20}}>
          <Pressable 
             onPress={() => setIsPressed(!isPressed)} // Khi nhấn vào, thay đổi giá trị state hiện tại.
               style={({ pressed }) => [
             { opacity: pressed ? 0.5 : 1 } // Điều chỉnh opacity của Pressable khi người dùng nhấn vào.
             ]}>
              {       ({ pressed }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius:10, height:50, width:180,justifyContent: 'center', backgroundColor: isPressed ? '#DCDCDC' : '#f27e35'}}>
                <FontAwesome5 name={isPressed ? 'user-check' : 'user-plus'} size={25} color={isPressed ? 'red' : 'black'} />
                  <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{isPressed ? 'UnFollow' : 'Follow'}</Text>
               </View>
           )}
           </Pressable>
          </View>
          </View>    
        </View>
        <View style={{ }}>
           <Text style={{ fontSize: 12, color: 'black', fontWeight: 700, padding: 5, flexWrap: 'wrap', textAlignVertical: 'top' }}>{user.bio}</Text>
          </View>
    </View>
  );
}
const TaskBarcomponent=({currentButton,setCurrentButton,buttonWidth,setButtonWidth,translateValue ,setTranslateValue, translateXRef,selectedButtons,setSelectedButtons,selectButton,onButtonLayout})=>{
  return(
    <View>
      <View style={styles.taskBar}>
         <TouchableOpacity style={[styles.button, selectedButtons[0] ? styles.activeButton : null]}
           onLayout={onButtonLayout}
           onPress={() => selectButton(0)}
           >
         <Text style={[styles.text, { fontWeight: selectedButtons[0] ? 'bold' : 'normal', fontSize: selectedButtons[0] ? 18 : 16 }]} >Post</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={[styles.button, selectedButtons[1] ? styles.activeButton : null]}
           onLayout={onButtonLayout}
          onPress={() => selectButton(1)}
         >
         <Text style={[styles.text, { fontWeight: selectedButtons[1] ? 'bold' : 'normal', fontSize: selectedButtons[1] ? 18 : 16 }]} >Follower</Text>
        </TouchableOpacity>

    <TouchableOpacity
      style={[styles.button, selectedButtons[2] ? styles.activeButton : null]}
      onLayout={onButtonLayout}
      onPress={() => selectButton(2)}
    >
      <Text style={[styles.text, { fontWeight: selectedButtons[2] ? 'bold' : 'normal', fontSize: selectedButtons[2] ? 18 : 16 }]} >Following</Text>
    </TouchableOpacity>
    
    <View style={styles.lineContainer}>
      <Animated.View
        ref={translateXRef}
        style={[
          styles.line, 
          { 
            width: buttonWidth,
            transform: [{ translateX: translateValue }]
          }
        ]}
      />
    </View>
  </View>
    </View>
  );
}
const styles = StyleSheet.create({
  hander:{
    flexDirection: 'row',
    alignItems: 'center',
   height:'20%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeText: {
    fontWeight: 'bold',
    color: '#000',
  },
  lineContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
  },
  line: {
    height: 3,
    backgroundColor: "#f27e35",    
  },
  profile: {
    flexDirection: 'row',
    height: 120,
  },
  taskBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#d9d9d9',
    paddingHorizontal: 20,
  },

});
