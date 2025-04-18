import { View, Text, StyleSheet, FlatList } from "react-native";
import FloatingButton from "../shared/FloatingButton";
import AddExpenseModal from "./AddExpenseModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";

const categoryIcons = {
  Food: <Icon name="restaurant" type="ionicon" color="#4CAF50" size={24} />,
  Shopping: <Icon name="cart" type="ionicon" color="#FF5722" size={24} />,
  Transport: <Icon name="car-sport" type="ionicon" color="#2196F3" size={24} />,
  Rent: <Icon name="home" type="material" color="#9C27B0" size={24} />,
  Internet: <Icon name="wifi" type="ionicon" color="#00BCD4" size={24} />,
  HealthCare: <Icon name="medkit" type="ionicon" color="#F44336" size={24} />,
  Membership: (
    <Icon name="card-outline" type="ionicon" color="#795548" size={24} />
  ),
};

const HomeScreen = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const [modalVisible, setModalVisible] = useState(false);

  const totals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const totalArray = Object.entries(totals).map(([category, total]) => ({
    category,
    total,
  }));

  return (
    <View style={styles.screen}>
      <FlatList
        data={totalArray}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                {categoryIcons[item.category] || (
                  <Ionicons name="wallet" size={24} color="black" />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.categoryText}>{item.category}</Text>
                <Text style={styles.amountText}>${item.total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses yet</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <FloatingButton onPress={() => setModalVisible(true)} />
      <AddExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});

export default HomeScreen;
