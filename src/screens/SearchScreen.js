import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { useState , useEffect,useRef } from 'react';
import { TextInput,Animated,Dimensions,View, Text, FlatList, Image, ActivityIndicator,StyleSheet,TouchableOpacity,Pressable , ScrollView} from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
const SearchScreen = () => {
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

  return (
    <View style={{ flex: 1, padding: 20}}>
      <View style={{ height: 60 , borderWidth:3, flexDirection:"row", alignItems: 'center',marginTop:20, borderRadius: 30, borderColor:"#f27e35"}}>
       <FontAwesome name="search" size={30} color="black" marginLeft={10}/>
      <TextInput
        style={{ height: 60, borderColor: 'gray', paddingHorizontal: 10 , width:"60%", fontSize: 20}}
      />
      </View>
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
};
const styles = StyleSheet.create({
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
});
const TaskBarcomponent=({currentButton,setCurrentButton,buttonWidth,setButtonWidth,translateValue ,setTranslateValue, translateXRef,selectedButtons,setSelectedButtons,selectButton,onButtonLayout})=>{
  return(
    <View>
      <View style={styles.taskBar}>
         <TouchableOpacity style={[styles.button, selectedButtons[0] ? styles.activeButton : null]}
           onLayout={onButtonLayout}
           onPress={() => selectButton(0)}
           >
         <Text style={[styles.text, { fontWeight: selectedButtons[0] ? 'bold' : 'normal', fontSize: selectedButtons[0] ? 18 : 16 }]} >All</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={[styles.button, selectedButtons[1] ? styles.activeButton : null]}
           onLayout={onButtonLayout}
          onPress={() => selectButton(1)}
         >
         <Text style={[styles.text, { fontWeight: selectedButtons[1] ? 'bold' : 'normal', fontSize: selectedButtons[1] ? 18 : 16 }]} >Post</Text>
        </TouchableOpacity>

    <TouchableOpacity
      style={[styles.button, selectedButtons[2] ? styles.activeButton : null]}
      onLayout={onButtonLayout}
      onPress={() => selectButton(2)}
    >
      <Text style={[styles.text, { fontWeight: selectedButtons[2] ? 'bold' : 'normal', fontSize: selectedButtons[2] ? 18 : 16 }]} >User</Text>
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
    <View>
    {selectButton === 0 && <View style={{ backgroundColor: "red", width: 100, height: 100 }} />}
    {selectButton === 1 && <View style={{ backgroundColor: "blue", width: 100, height: 100 }} />}
    {selectButton === 2 && <View style={{ backgroundColor: "yellow", width: 100, height: 100 }} />}
    </View>
  </View>
  <View>
    <Text>xin chàoádasdasdas</Text>
  </View>
    </View>
  );
}
export default SearchScreen;
