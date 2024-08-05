import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<Number | null>(null);

  const handleNumberPress = (buttonValue: string) => {

    if (result !== null) {
      setFirstNumber(result.toString() + buttonValue);
      setResult(null); 
    } else {
      if (firstNumber.length < 10) {
        setFirstNumber(firstNumber + buttonValue);
      }
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    if (result !== null) {
      setSecondNumber(result.toString());
      setFirstNumber("");
      setResult(null);
    } else {
      setSecondNumber(firstNumber);
      setFirstNumber("");
    }
    setOperation(buttonValue);
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, { color: myColors.result }]
              : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]
          }
        >
          {result.toString()}
        </Text>
      );
    }
    if (firstNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{""}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      );
    }
    return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
  };

  const getResult = () => {
    let computedResult: number | null = null;

    switch (operation) {
      case "+":
        computedResult = parseFloat(secondNumber) + parseFloat(firstNumber);
        break;
      case "-":
        computedResult = parseFloat(secondNumber) - parseFloat(firstNumber);
        break;
      case "*":
        computedResult = parseFloat(secondNumber) * parseFloat(firstNumber);
        break;
      case "/":
        computedResult = parseFloat(secondNumber) / parseFloat(firstNumber);
        break;
      case "％":
        computedResult = parseFloat(secondNumber) % parseFloat(firstNumber);
        break;
      default:
        computedResult = null;
        break;
    }

    if (computedResult !== null) {
      setResult(computedResult);
      setFirstNumber(""); 
      setSecondNumber(""); 
      setOperation(""); 
    } else {
      setResult(0); 
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{ color: "red", fontSize: 50, fontWeight: '500' }}>
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={Styles.row}>
        <Button title="AC" isBlack onPress={clear} />
        <Button title="％" isBlack onPress={() => handleOperationPress("％")} />
        <Button title="⌫" isBlack onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
        <Button title="÷" isBlack onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isBlack onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlack onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlack onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="00" onPress={() => handleNumberPress("00")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="=" isRed onPress={() => getResult()} />
      </View>
    </View>
  );
}
