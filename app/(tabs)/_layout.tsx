import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Servicios',
          headerTitle: 'Mis Servicios',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="list" size={24} color={focused ? '#2196F3' : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name="filed"
        options={{
          title: 'Firmados',
          headerTitle: 'Firmados',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="file-tray" size={24} color={focused ? '#2196F3' : 'gray'} />
          ),
        }}
      />
    </Tabs>
  );
}
