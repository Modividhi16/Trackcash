import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import TransactionScreen from "./TransactionScreen";
import ReportsScreen from "./ReportsScreen";

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#3877BE",
  },
  headerTitleAlign: "start",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TransactionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ReportNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reports"
        component={ReportsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Transaction" component={TransactionNavigator} />
      <Drawer.Screen name="Report" component={ReportNavigator} />
    </Drawer.Navigator>
  );
};

const MainComponent = () => {
  return <DrawerNavigator />;
};

export default MainComponent;
