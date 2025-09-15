import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';


const tabBarStyle = {
  backgroundColor: '#ffffff',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 60,
  borderTopWidth: 1,
  borderTopColor: '#e5e7eb',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Notification') {
            return <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={size} color={color} />;
          }
          if (route.name === 'Home') {
            return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
          }
          if (route.name === 'Profile') {
            return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#3b82f6', 
        tabBarInactiveTintColor: '#9ca3af', 
      })}
      initialRouteName="Home"
    >
      <Tabs.Screen name="Notification" options={{ title: 'Notifications', tabBarLabel: 'Notifications' }} />
      <Tabs.Screen name="Home" options={{ title: 'Home', tabBarLabel: 'Home' }} />
      <Tabs.Screen name="Profile" options={{ title: 'Profile', tabBarLabel: 'Profile' }} />
    </Tabs>
  );
}
