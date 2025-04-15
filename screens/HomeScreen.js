import { View } from "react-native";
import FloatingButton from "../shared/FloatingButton";
import AddExpenseModal from "./AddExpenseModal";
import { useState } from "react";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <FloatingButton onPress={() => setModalVisible(true)} />
      <AddExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default HomeScreen;
