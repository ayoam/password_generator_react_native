import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity ,ToastAndroid } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Clipboard from "@react-native-clipboard/clipboard";


const App = () => {
  const [lengthInput, setLengthInput] = useState("");
  const [toggleUCLCheckBox, setToggleUCLCheckBox] = useState(false);
  const [toggleNUMCheckBox, setToggleNUMCheckBox] = useState(false);
  const [toggleSYMCheckBox, setToggleSYMCheckBox] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [passwordResult, setPasswordResult] = useState("");


  const handleGenerateBtn = () => {
    const length: number = parseInt(lengthInput);
    const lowerCaseList = "abcdefghijklmnopqrstuvwxyz".split("");
    const upperCaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const numbersList = "0123456789".split("");
    const symbolsList = "!@#$%^&".split("");
    const mainCharList: string[] = [];
    let generatedPassword = "";

    mainCharList.push(...lowerCaseList);
    if (toggleUCLCheckBox) {
      mainCharList.push(...upperCaseList);
    }
    if (toggleNUMCheckBox) {
      mainCharList.push(...numbersList);
    }
    if (toggleSYMCheckBox) {
      mainCharList.push(...symbolsList);
    }

    for (let i = 0; i < length; i++) {
      const n = Math.floor(Math.random() * mainCharList.length);
      generatedPassword += mainCharList[n];
    }

    console.log(generatedPassword);
    setPasswordResult(generatedPassword);
    setShowResult(true);
  };

  const handleResetBtn = () => {
    setPasswordResult("");
    setShowResult(false);
  };

  const handleCopyPassword=()=>{
    Clipboard.setString(passwordResult);
    ToastAndroid.show("copied!",200);
  }

  return (
    <View className={"p-4"}>
      <Text className="text-3xl my-4">Password generator</Text>
      <View className={"gap-5"}>
        <View className={"flex flex-row justify-between items-center"}>
          <Text>Password length</Text>
          <TextInput
            placeholder={"length"}
            className={"border-[1px] border-white rounded-md py-2 px-3 w-32"}
            value={lengthInput}
            onChangeText={(newValue) => setLengthInput(newValue)}
            keyboardType="numeric"
            maxLength={40}
          />
        </View>
        <View className={"flex flex-row justify-between items-center"}>
          <Text>Include Lowercase letters</Text>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-ignore*/}
          <CheckBox
            value={true}
          />
        </View>
        <View className={"flex flex-row justify-between items-center"}>
          <Text>Include Uppercase case letters</Text>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-ignore*/}
          <CheckBox
            value={toggleUCLCheckBox}
            onValueChange={(newValue: any) => setToggleUCLCheckBox(newValue)}
          />
        </View>
        <View className={"flex flex-row justify-between items-center"}>
          <Text>Include Numbers</Text>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-ignore*/}
          <CheckBox
            value={toggleNUMCheckBox}
            onValueChange={(newValue: any) => setToggleNUMCheckBox(newValue)}
          />
        </View>
        <View className={"flex flex-row justify-between items-center"}>
          <Text>Include Symbols</Text>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*@ts-ignore*/}
          <CheckBox
            value={toggleSYMCheckBox}
            onValueChange={(newValue: any) => setToggleSYMCheckBox(newValue)}
          />
        </View>
        <View className={"flex flex-row justify-center gap-2"}>
          <TouchableOpacity className={"bg-sky-400 py-2 px-4 rounded-lg"} onPress={handleGenerateBtn}>
            <Text className={"text-lg"}>Generate</Text>
          </TouchableOpacity>
          <TouchableOpacity className={"bg-gray-400 py-2 px-4 rounded-lg"} onPress={handleResetBtn}>
            <Text className={"text-lg"}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showResult && <View className={"mt-5 bg-sky-50 rounded-lg p-8"}>
        <Text>Long press to copy</Text>
        <TouchableOpacity onLongPress={handleCopyPassword}>
          <Text className={"text-2xl text-center mt-4"}>{passwordResult}</Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
};

export default App;
