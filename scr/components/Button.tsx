import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles";

interface ButtonProps {
    onPress: () => void;
    title: string;
    isBlack?: boolean;
    isRed?: boolean;
}

export default function Button({ title, onPress, isBlack, isRed }: ButtonProps) {
    const theme = useContext(ThemeContext);
    return (
        <TouchableOpacity
            style={
                isBlack
                    ? Styles.btnBlack
                    : isRed
                        ? Styles.btnRed
                        : theme === "light"
                            ? Styles.btnLight
                            : Styles.btnDark
            }
            onPress={onPress}>
            <Text
                style={
                    isBlack || isRed
                        ? Styles.smallTextLight
                        : theme === "dark"
                            ? Styles.smallTextLight
                            : Styles.smallTextDark
                }
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
