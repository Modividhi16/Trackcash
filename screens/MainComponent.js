import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import TransactionScreen from "./TransactionScreen";
import ReportsScreen from "./ReportsScreen";
import { Icon } from "react-native-elements";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import logo from "../assets/images/logo.png";
import Constants from "expo-constants";

const screenOptions = {
  headerTintColor: "#fff",
  drawerActiveTintColor: "#3877BE",
  drawerInactiveTintColor: "#888",
  drawerLabelStyle: {
    fontSize: 20, // Applies to all drawer items
  },
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

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <Image source={logo} style={styles.drawerImage} />
    </View>
    <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
  </DrawerContentScrollView>
);

const MainComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        screenOptions={screenOptions}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: "Home",
            drawerIcon: ({ color }) => (
              <Icon
                name="home"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Transaction"
          component={TransactionNavigator}
          options={{
            title: "Transaction",
            drawerIcon: ({ color }) => (
              <Icon
                name="list-alt"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Report"
          component={ReportNavigator}
          options={{
            title: "Report",
            drawerIcon: ({ color }) => (
              <Icon
                name="pie-chart"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default MainComponent;

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#3877BE",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 150,
  },
});
