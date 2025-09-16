import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import authClient, { fetchWithAuth } from '../lib/auth-client';

// Civic Guardian categories - matching backend requirements
const categories = [
  { id: 'POTHOLE', name: 'Pothole', icon: 'construct-outline', color: '#EF4444' },
  { id: 'GARBAGE_OVERFLOW', name: 'Garbage Overflow', icon: 'trash-outline', color: '#F59E0B' },
  { id: 'STREETLIGHT_OUTAGE', name: 'Streetlight Outage', icon: 'bulb-outline', color: '#EAB308' },
  { id: 'POWER_OUTAGE', name: 'Power Outage', icon: 'flash-off-outline', color: '#DC2626' },
  { id: 'TRAFIC_SIGNAL_MALFUNCTION', name: 'Traffic Signal Issue', icon: 'traffic-cone-outline', color: '#F97316' },
  { id: 'STRAY_ANIMALS', name: 'Stray Animals', icon: 'paw-outline', color: '#7C2D12' },
  { id: 'TREE_FALLEN', name: 'Tree Fallen', icon: 'leaf-outline', color: '#16A34A' },
  { id: 'SEWER_BLOCKAGE', name: 'Sewer Blockage', icon: 'water-outline', color: '#0369A1' },
  { id: 'WATER_LEAKAGE', name: 'Water Leakage', icon: 'rainy-outline', color: '#0EA5E9' },
  { id: 'NOISE_COMPLAINT', name: 'Noise Complaint', icon: 'volume-high-outline', color: '#EC4899' },
  { id: 'THEFT', name: 'Theft', icon: 'shield-outline', color: '#7C3AED' },
  { id: 'ASSAULT', name: 'Assault', icon: 'alert-circle-outline', color: '#BE123C' },
  { id: 'OTHERS', name: 'Others', icon: 'ellipsis-horizontal-outline', color: '#6B7280' },
];

const InputField = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSubmit = async () => {
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category for your report');
      return;
    }
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your report');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description');
      return;
    }

    setIsSubmitting(true);

    const issueData = {
      title: title.trim(),
      description: description.trim(),
      category: selectedCategory.id,
      priority: Math.floor(Math.random() * 5) + 4, // Random priority from 4 to 10 `
      lat: '12.9716', // Placeholder latitude (bangalore)
      long: '77.2090', // Placeholder longitude (bangalore)

    };

try {
  console.log("Submitting report:", issueData);

  const result = await authClient.$fetch(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000/api/issues/`, {
    method: "POST",
    body: issueData, // auto JSON-encoded
  });

  console.log("Report submitted successfully:", result);

  Alert.alert("Success", "Your report has been submitted successfully!", [
    {
      text: "OK",
      onPress: () => {
        setTitle("");
        setDescription("");
        setSelectedCategory(null);
        router.back();
      },
    },
  ]);
} catch (error) {
  console.error("Error submitting report:", error);

  let errorMessage = "Failed to submit report. Please try again.";
  if (error.message.includes("401")) {
    errorMessage = "Authentication required. Please sign in again.";
  } else if (error.message.includes("400")) {
    errorMessage = "Invalid report data. Please check all fields.";
  } else if (error.message.includes("500")) {
    errorMessage = "Server error. Please try again later.";
  } else if (error.message.includes("Network")) {
    errorMessage = "Network error. Please check your connection.";
  }

  Alert.alert("Error", errorMessage);
} finally {
  setIsSubmitting(false);
}
  };


  const handleCancel = () => {
    if (title.trim() || description.trim() || selectedCategory) {
      Alert.alert('Discard Report?', 'You have unsaved changes. Discard?', [
        { text: 'Keep Editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => router.back() },
      ]);
    } else {
      router.back();
    }
  };

  const renderCategoryItem = ({ category }) => {
    const isSelected = selectedCategory?.id === category.id;
    return (
      <TouchableOpacity
        key={category.id}
        onPress={() => setSelectedCategory(category)}
        className={`flex-row items-center p-3 m-1 rounded-xl border-2 ${
          isSelected
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-200 bg-white'
        }`}
        style={{ minWidth: '45%' }}
      >
        <View
          className="w-8 h-8 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: category.color + '20' }}
        >
          <Ionicons name={category.icon} size={16} color={category.color} />
        </View>
        <Text
          className={`font-medium ${
            isSelected ? 'text-orange-700' : 'text-gray-700'
          }`}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-4 py-3">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={handleCancel} className="flex-row items-center">
              <Ionicons name="close" size={24} color="#666" />
              <Text className="ml-2 text-base text-gray-600">Cancel</Text>
            </TouchableOpacity>

            <Text className="text-lg font-semibold text-gray-800">
              Create Report
            </Text>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={
                isSubmitting ||
                !selectedCategory ||
                !title.trim() ||
                !description.trim()
              }
              className={`px-4 py-2 rounded-full ${
                !selectedCategory ||
                !title.trim() ||
                !description.trim() ||
                isSubmitting
                  ? 'bg-gray-300'
                  : 'bg-orange-500'
              }`}
            >
              <Text
                className={`font-medium ${
                  !selectedCategory ||
                  !title.trim() ||
                  !description.trim() ||
                  isSubmitting
                    ? 'text-gray-500'
                    : 'text-white'
                }`}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 px-4 py-6">
          {/* Category Selection */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-3">
              Select Category *
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {categories.map((category) =>
                renderCategoryItem({ category })
              )}
            </View>
            {selectedCategory && (
              <View className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                <Text className="text-sm text-green-700">
                  ✓ Selected: {selectedCategory.name}
                </Text>
              </View>
            )}
          </View>

          {/* Title Input */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-2">
              Title *
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="What's the issue?"
              placeholderTextColor="#9CA3AF"
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800"
              style={{ fontSize: 16, lineHeight: 20 }}
              maxLength={100}
            />
            <Text className="text-xs text-gray-500 mt-1 text-right">
              {title.length}/100
            </Text>
          </View>

          {/* Description Input */}
          <View className="mb-6">
            <Text className="text-base font-medium text-gray-800 mb-2">
              Description *
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Provide more details about the issue..."
              placeholderTextColor="#9CA3AF"
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              style={{ fontSize: 16, lineHeight: 22, minHeight: 120 }}
              maxLength={500}
            />
            <Text className="text-xs text-gray-500 mt-1 text-right">
              {description.length}/500
            </Text>
          </View>

          {/* Media (Coming Soon) */}
          <View className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <View className="flex-row items-center">
              <Ionicons name="camera-outline" size={20} color="#9CA3AF" />
              <Text className="ml-2 text-gray-500">
                Add photos or videos (Coming soon)
              </Text>
            </View>
          </View>

          {/* Submission Guidelines */}
          <View className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <View className="flex-row items-start">
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#3B82F6"
              />
              <View className="ml-2 flex-1">
                <Text className="text-sm font-medium text-blue-800 mb-1">
                  Submission Guidelines
                </Text>
                <Text className="text-xs text-blue-700 leading-4">
                  • Select appropriate category for faster processing{'\n'}
                  • Be specific and factual in your description{'\n'}
                  • Include location details if relevant{'\n'}
                  • Avoid duplicate reports{'\n'}
                  • Reports are reviewed before publication
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputField;
