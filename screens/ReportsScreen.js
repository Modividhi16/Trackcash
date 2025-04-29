import { StyleSheet, ScrollView, Text, View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux"; // to get expenses
import { useMemo } from "react";

const screenWidth = Dimensions.get("window").width;

const ReportsScreen = () => {
  const expenses = useSelector((state) => state.expenses.expenses);

  // Calculate total amount for each category
  const categoryData = useMemo(() => {
    const totals = {};

    expenses.forEach((expense) => {
      if (totals[expense.category]) {
        totals[expense.category] += expense.amount;
      } else {
        totals[expense.category] = expense.amount;
      }
    });

    const colors = [
      "#12B3EB",
      "#48D2F3",
      "#2363C0",
      "#3664cf",
      "#1e4ab0",
      "#5b96e3",
    ];
    let colorIndex = 0;

    return Object.keys(totals).map((category) => {
      const dataItem = {
        name: category,
        population: totals[category],
        color: colors[colorIndex % colors.length],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
      colorIndex++;
      return dataItem;
    });
  }, [expenses]);

  return (
    <ScrollView style={styles.container}>
      {categoryData.length > 0 ? (
        <>
          <PieChart
            data={categoryData}
            width={screenWidth * 0.8}
            height={screenWidth * 0.8}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"10"}
            center={[100, 0]}
            hasLegend={false}
          />
          <View style={styles.legendRow}>
            <View style={styles.legendColumn}>
              {categoryData.slice(0, 5).map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[styles.colorBox, { backgroundColor: item.color }]}
                  />
                  <Text style={styles.legendText}>{item.name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.legendColumn}>
              {categoryData.slice(5, 10).map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[styles.colorBox, { backgroundColor: item.color }]}
                  />
                  <Text style={styles.legendText}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>No expenses to show</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 16,
    color: "#333",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingLeft: 50,
  },
  legendColumn: {
    flex: 1,
  },
});

export default ReportsScreen;
