import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch } from "react-redux";
import { addExpense } from "../features/expensesSlice";

const categories = [
  { label: "Food", value: "Food" },
  { label: "Shopping", value: "Shopping" },
  { label: "Transport", value: "Transport" },
  { label: "Rent", value: "Rent" },
  { label: "Internet", value: "Internet" },
  { label: "HealthCare", value: "HealthCare" },
  { label: "Membership", value: "Membership" },
];

const AddExpenseModal = ({ visible, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [category, setCategory] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowCalendar(false);
  };

  const formatDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = () => {
    if (!amount || amount <= 0 || !category) {
      alert("Please fill out all fields.");
      return;
    }
    const newExpense = {
      category,
      amount: parseFloat(amount),
      date,
      note,
    };

    dispatch(addExpense(newExpense)); // Dispatch action to add expense
    resetModal();
    Alert.alert("Success!", "Expense has been added.");
    onClose();
  };

  const handleCancel = () => {
    resetModal();
    onClose();
  };

  const resetModal = () => {
    setAmount(0);
    setDate(new Date());
    setCategory("");
    setNote("");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 45,
            }}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Add Expense</Text>
            </View>
            <ScrollView style={styles.content}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  placeholder="$0.00"
                  keyboardType="numeric"
                  style={styles.input}
                  placeholderTextColor="#000"
                  value={amount}
                  onChangeText={(value) => setAmount(value)}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowCalendar(true);
                  }}
                >
                  <Text style={styles.input}>{formatDate(date)}</Text>
                </TouchableOpacity>

                {showCalendar && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={onChangeDate}
                  />
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <Dropdown
                  style={styles.input}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={categories}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select item" : "..."}
                  searchPlaceholder="Search..."
                  value={category}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setCategory(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Note</Text>
                <TextInput
                  placeholder="Add note"
                  style={[styles.input, styles.noteInput]}
                  placeholderTextColor="#000"
                  multiline
                  numberOfLines={4}
                  value={note}
                  onChangeText={setNote}
                />
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.button}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.button}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3877BE",
    height: 60,
    alignItems: "center",
    paddingVertical: 15,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  noteInput: {
    height: 100,
    textAlignVertical: "top",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#3877BE",
    width: 150,
    textAlign: "center",
  },
});
export default AddExpenseModal;
