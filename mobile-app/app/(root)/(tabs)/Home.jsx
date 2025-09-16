
import { Text, View, ScrollView, Image, SafeAreaView } from 'react-native';

// Mock complaints data (replace with API fetch in production)
const complaints = [
  {
    id: 'C-101',
    category: 'Pothole',
    location: 'Ward 5',
    status: 'New',
    reportedDate: '2025-09-10',
    reporter: { name: 'Amit Sharma', credibilityScore: 82 },
    description: 'Large pothole near the main road causing traffic.',
    mediaType: 'image',
    media: require('../../../assets/images/react-logo.png'),
  },
  {
    id: 'C-004',
    category: 'Pothole',
    location: 'Ward 5',
    status: 'New',
    reportedDate: '2025-09-10',
    reporter: { name: 'Amit Sharma', credibilityScore: 82 },
    description: 'Large pothole near the main road causing traffic.',
    mediaType: 'image',
    media: require('../../../assets/images/react-logo.png'),
  },
  {
    id: 'C-005',
    category: 'Pothole',
    location: 'Ward 5',
    status: 'New',
    reportedDate: '2025-09-10',
    reporter: { name: 'Amit Sharma', credibilityScore: 82 },
    description: 'Large pothole near the main road causing traffic.',
    mediaType: 'image',
    media: require('../../../assets/images/react-logo.png'),
  },
  {
    id: 'C-001',
    category: 'Pothole',
    location: 'Ward 5',
    status: 'New',
    reportedDate: '2025-09-10',
    reporter: { name: 'Amit Sharma', credibilityScore: 82 },
    description: 'Large pothole near the main road causing traffic.',
    mediaType: 'image',
    media: require('../../../assets/images/react-logo.png'),
  },
  {
    id: 'C-002',
    category: 'Garbage Overflow',
    location: 'Ward 2',
    status: 'In Progress',
    reportedDate: '2025-09-09',
    reporter: { name: 'Priya Verma', credibilityScore: 91 },
    description: 'Garbage bins overflowing, needs urgent cleaning.',
    mediaType: 'image',
    media: require('../../../assets/images/react-logo.png'),
  },
];

const ComplaintCard = ({ complaint }) => {
  return (
    <View className="bg-white rounded-xl shadow-md mb-5">
      {/* Media */}
      {complaint.mediaType === 'image' ? (
        <Image
          source={complaint.media}
          className="w-full h-48 rounded-t-xl"
          resizeMode="cover"
        />
      ) : null}
      {/* For future: add video support here */}

      {/* Content */}
      <View className="p-4">
        <Text className="text-xl font-semibold text-gray-800 mb-1">
          {complaint.category}
        </Text>
        <Text className="text-sm text-gray-500 mb-2">
          {complaint.location} • {complaint.status} • {complaint.reportedDate}
        </Text>
        <Text className="text-base text-gray-700 mb-3">
          {complaint.description}
        </Text>

        {/* Reporter Info */}
        <Text className="text-xs text-gray-500">
          Reported by <Text className="font-medium">{complaint.reporter.name}</Text>  
          {' '} (Credibility: {complaint.reporter.credibilityScore})
        </Text>
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="text-3xl font-bold text-center mt-6 mb-4 text-blue-600">
        Complaints Feed
      </Text>
      <ScrollView className="px-4">
        {complaints.map((c) => (
          <ComplaintCard key={c.id} complaint={c} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
