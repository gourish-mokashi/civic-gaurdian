import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Profile = () => {
  const insets = useSafeAreaInsets();
  
  const handleLogout = () => {
    console.log('Logging out...')
    router.replace('/SignIn')
  }

  return (
    <View className="flex-1 bg-gray-100" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />


      {/* Header */}
      <View className="bg-white px-6 py-4 flex-row justify-between items-center border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Profile</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-6 items-center shadow-sm">
          {/* Profile Image */}
          <View className="w-24 h-24 rounded-full bg-blue-500 items-center justify-center mb-4">
            <Ionicons name="person" size={40} color="white" />
          </View>
          
          {/* User Info */}
          <Text className="text-xl font-bold text-gray-900 mb-1">Vishu Kumar</Text>
          <Text className="text-gray-500 mb-4">Credibility Score: 85</Text>
          
          {/* Stats */}
          <View className="flex-row justify-around w-full">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">23</Text>
              <Text className="text-sm text-gray-500">Reports</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">150</Text>
              <Text className="text-sm text-gray-500">Upvotes</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">21</Text>
              <Text className="text-sm text-gray-500">Resolved</Text>
            </View>
          </View>
        </View>
        {/* Settings Section */}
        <View className="bg-white mx-4 mt-4 mb-6 rounded-xl shadow-sm">
          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <Text className="text-red-500 font-medium" onPress={handleLogout}>Log Out</Text>
            <Ionicons name="chevron-forward" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile