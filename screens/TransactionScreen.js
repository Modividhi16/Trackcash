import FloatingButton from "../shared/FloatingButton";
import AddExpenseModal from "./AddExpenseModal";
import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const TransactionScreen = ({ searchQuery, isSearching }) => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const [modalVisible, setModalVisible] = useState(false);

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filteredExpenses = sortedExpenses.filter(
    (expense) =>
      expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.amount.toString().includes(searchQuery)
  );

  const dataToShow =
    isSearching && searchQuery.length > 0 ? filteredExpenses : sortedExpenses;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.transItems}>
        <Text style={{ fontSize: 20 }}>{item.category}</Text>
        <Text style={{ fontSize: 20 }}>${item.amount.toFixed(2)}</Text>
      </View>
      <Text>{new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataToShow}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses yet</Text>
        }
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
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  transItems: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});

export default TransactionScreen;
