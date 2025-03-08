import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Імпортуємо бібліотеку іконок
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import CardsScreen from './src/screens/CardsScreen';
import ProvisioningScreen from './src/screens/ProvisioningScreen';

// Вмикаємо оптимізацію екранів
enableScreens();

// Опис маршрутів
type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined; // Додаємо новий маршрут для вкладок
};

type BottomTabParamList = {
  Cards: undefined;
  Provisioning: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

// 📌 Функція для створення вкладок (Bottom Tabs)
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          // ✅ Явно задаємо дефолтне значення, щоб уникнути `undefined`
          let iconName: string = 'help-outline';

          if (route.name === 'Cards') {
            iconName = 'card-outline';
          } else if (route.name === 'Provisioning') {
            iconName = 'wallet-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="Provisioning" component={ProvisioningScreen} />
    </Tab.Navigator>
  );
}

// 📌 Головний компонент App
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainTabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
