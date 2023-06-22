import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { useState , useEffect,useRef, } from 'react';
import { Button, TextInput,Animated,Dimensions,View, Text, FlatList, Image, ActivityIndicator,StyleSheet,TouchableOpacity,Pressable , ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { FontAwesome ,Ionicons,Fontisto,Feather,MaterialIcons,AntDesign} from 'react-native-vector-icons';

const PostScreen = () => {
  const [textInputsA, setTextInputsA] = useState([]);
  const [textInputsB, setTextInputsB] = useState([]);

  const handleAddInputA = () => {
    setTextInputsA([...textInputsA, <TextInput key={textInputsA.length} />]);
  };

  const handleAddInputB = () => {
    setTextInputsB([...textInputsB, <TextInput key={textInputsB.length} />]);
  };

  const handleDeleteInputA = index => {
    const updatedInputs = [...textInputsA];
    updatedInputs.splice(index, 1);
    setTextInputsA(updatedInputs);
  };
  const handleDeleteInputB = index => {
    const updatedInputs = [...textInputsB];
    updatedInputs.splice(index, 1);
    setTextInputsB(updatedInputs);
  };

  return (
    <View>
       <View style={styles.hander}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} color="black" marginLeft={20}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:"20%", borderWidth:2, borderRadius:5, padding:5, borderColor:"#f27e35"}}>
          <Text style={{fontSize:18, fontWeight:600}}>  Lưu  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:"5%", borderWidth:2, borderRadius:5, padding:5, borderColor:"#f27e35"}}>
          <Text style={{fontSize:18, fontWeight:600}}>  Lên sóng  </Text>
        </TouchableOpacity>
        <TouchableOpacity >
        <Fontisto name="more-v-a" size={30} color="black" marginLeft={20}/>
        </TouchableOpacity>
       </View>
       <ScrollView>
       <View style={{alignItems: 'center',justifyContent:'center'}} >
        <TouchableOpacity style={{height:240, width:"100%", backgroundColor:"gray", alignItems: 'center',justifyContent:'center'}}>
        <Feather name="camera" size={120} color="black" marginLeft={20}/>
        <Text style={{fontSize:18, fontWeight:700}}>Đăng hình đại diện món ăn</Text>
        </TouchableOpacity>
        <TextInput style={{height: 80, width: "90%", borderWidth:1, borderRadius:15, fontSize:18,fontWeight: 'bold', marginTop: 20, padding:20}} placeholder="Nhập tên món ăn"> 
           
        </TextInput>
        <TextInput style={{height: 120, width: "90%", borderWidth:1, borderRadius:15, fontSize:18,fontWeight: 'bold', marginTop: 5, padding:20}} placeholder="Nhập mô tả, cảm nghĩ ..."> 
           
           </TextInput>
        <View style={{flexDirection:"row", marginTop: 20, }}>
          <Text style={{fontSize:18,fontWeight:'bold'}}>Khẩu phần</Text>
          <TextInput style={{height:40, width: "50%", borderWidth:1, borderRadius:10, marginLeft:"13%", padding:10, fontSize:17}} placeholder="2 người"></TextInput>
        </View>
        <View style={{flexDirection:"row", marginTop: 20}}>
          <Text style={{fontSize:18,fontWeight:'bold'}}>Thời gian nấu</Text>
          <TextInput style={{height:40, width: "50%", borderWidth:1, borderRadius:10, marginLeft:"6%",padding:10, fontSize:17}} placeholder="1 tiếng 30 phút"></TextInput>
        </View>
       </View>
       <View style={{backgroundColor: "gray", height: 10, marginTop:10}}>

       </View>
       <View>
        <Text style={{fontSize:20, fontWeight:'bold', marginTop:10}}>Nguyên Liệu</Text>
        {textInputsA.map((input, index) => (
          <View style={{flexDirection:"row"}} key={index}>
             <TextInput style={{ flex: 1 , borderWidth:1, borderRadius:10,fontSize:18, marginLeft:20, padding: 10, marginTop: 10,}} placeholder ="100ml nước"/>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
              }}
              onPress={() => handleDeleteInputA(index)}
            >
            <AntDesign name="delete" size={25} color="black"  />
            </TouchableOpacity>
          </View>
        ))}
      </View>
       <View>
       <TouchableOpacity style={{ marginLeft : "30%",borderWidth:1, borderRadius:10, flexDirection:"row", width:"45%",    justifyContent: 'space-between',alignItems: 'center',marginTop:10}} onPress={handleAddInputA} >
       <MaterialIcons name="add" size={30}/>
           <Text style={{ fontSize:18, fontWeight:"bold", padding:10}}>Nguyên Liệu</Text>
        </TouchableOpacity>
     </View>
     <View style={{backgroundColor: "gray", height: 10, marginTop:10}}>

</View>
     <View>
        <Text style={{fontSize:20, fontWeight:'bold', marginTop:10}}>Cách Làm</Text>
        {textInputsB.map((input, index) => (
          <View style={{flexDirection:"row"}} key={index}>
             <TextInput style={{ flex: 1 , borderWidth:1, borderRadius:10,fontSize:18, marginLeft:20, padding: 10, marginTop: 10,}}placeholder ="Hấp bánh trong 30 phút" />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
              }}
              onPress={() => handleDeleteInputB(index)}
            >
            <AntDesign name="delete" size={25} color="black"  />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        <TouchableOpacity style={{ marginLeft : "30%",borderWidth:1, borderRadius:10, flexDirection:"row", width:"45%",    justifyContent: 'space-between',alignItems: 'center',marginTop:10}} title="Show Text" onPress={handleAddInputB} >
        <MaterialIcons name="add" size={30}/>
           <Text style={{ fontSize:18, fontWeight:"bold", padding:10}}>Thêm bước</Text>
        </TouchableOpacity>
      </View>
       <View style={{height: 200}}></View>
       </ScrollView>

    </View>
  );
};
const styles = StyleSheet.create({
  hander: {
    height: 65, 
    flexDirection:"row",
    alignItems: 'center',
    backgroundColor:"white",
    marginTop: 20,
  },
  inputsContainer: {
    flexDirection: 'column',
    width: "100%",
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
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
  input: {
    marginLeft: 20,
    fontSize: 18,
    borderWidth:1 ,
    borderRadius: 10,
    width: "80%",
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  }
});
export default PostScreen;
