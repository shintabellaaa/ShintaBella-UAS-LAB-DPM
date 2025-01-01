import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { PaperProvider } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from "./src/screens/SplashScreen";
import BookListScreen from './src/screens/BookListScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = 'home';
					} else if (route.name === 'Profile') {
						iconName = 'person';
					} else if (route.name === 'Books') {
						iconName = 'book';
					}

					// @ts-ignore
					return <Icon name={iconName} size={size} color={color} />;
				},
				tabBarLabel: route.name,
			})}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ tabBarLabel: "Home" }}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ tabBarLabel: "Profile" }}
			/>
			<Tab.Screen
				name="Books"
				component={BookListScreen}
				options={{ tabBarLabel: "Books" }}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Splash">
					<Stack.Screen
						name="Splash"
						component={SplashScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Register"
						component={RegisterScreen}
						options={{ headerShown: true}}
					/>
					<Stack.Screen
						name="MainTabs"
						component={TabNavigator}
						options={{ headerShown: false }}
					 />
					<Stack.Screen
						name="BookDetail"
						component={BookDetailScreen}
						options={{ headerShown: true }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
