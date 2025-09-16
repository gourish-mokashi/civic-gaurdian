
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import authClient from '../../../lib/auth-client';




const ComplaintCard = ({ complaint }) => {
  return (
    <View className="bg-white rounded-xl shadow-md mb-5">
      {/* Image */}
      {complaint.image_url ? (
        <Image
          source={{ uri: complaint.image_url }}
          className="w-full h-48 rounded-t-xl"
        />
      ) : null}
      {/* Content */}
      <View className="p-4">
        <Text className="text-xl font-semibold text-gray-800 mb-1">
          {complaint.category}
        </Text>
        <Text className="text-sm text-gray-500 mb-2">
          {complaint.lat} : {complaint.long} • {complaint.status} • {complaint.reportedDate}
        </Text>
        <Text className="text-base text-gray-700 mb-3">
          {complaint.description}
        </Text>
      </View>
    </View>
  );
};

const Home = () => {
  const insets = useSafeAreaInsets();
  const [complaints, setComplaints] = useState([]);

useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await authClient.$fetch(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/api/issues/`);
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        Alert.alert('Error', 'Failed to fetch complaints. Please try again later.');
      }
    };
    fetchComplaints();
  }, []);

  return (
    <View className="flex-1 bg-gray-100" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />
      <Text className="text-3xl font-bold text-center mt-6 mb-4 text-blue-600">
        Complaints Feed
      </Text>
      <ScrollView className="px-4">
        {complaints.map((c) => (
          <ComplaintCard key={c.id} complaint={c} />
        ))}
      </ScrollView>
      
      {/* Reddit-style floating action button */}
      <TouchableOpacity 
        className="absolute bottom-20 right-6 bg-orange-500 w-14 h-14 rounded-full shadow-lg justify-center items-center"
        onPress={() => router.push('/InputField')}
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        }}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
