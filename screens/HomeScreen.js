import { View } from "react-native";
import FloatingButton from "../shared/FloatingButton";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FloatingButton onPress={() => console.log("Pressed FAB on Home")} />
    </View>
  );
};

export default HomeScreen;
