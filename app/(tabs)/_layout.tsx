import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <AntDesign name="home" size={24} color={focused ? 'black' : 'gray'} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Listado',
          tabBarIcon: ({ color, focused }) => <Entypo name="list" size={24} color={focused ? 'black' : 'gray'} />,
        }}
      />
      <Tabs.Screen
        name="filed"
        options={{
          title: 'Archivado',
          tabBarIcon: ({ color, focused }) => <Ionicons name="file-tray" size={24} color={focused ? 'black' : 'gray'} />,
        }}
      />
    </Tabs>
  );
}
