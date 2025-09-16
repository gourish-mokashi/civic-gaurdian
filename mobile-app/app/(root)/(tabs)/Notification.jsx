import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const notifications = [
  {
    id: 1,
    type: 'acknowledged',
    title: 'Your report on Main Street has been acknowledged',
    time: '2h ago',
    description: 'Local authorities have received and reviewed your pothole report.',
    statusColor: 'bg-blue-500',
    statusText: 'Acknowledged'
  },
  {
    id: 2,
    type: 'upvoted',
    title: 'Community upvoted your report on Elm Street',
    time: '3h ago',
    description: '15 community members have upvoted your street lighting issue.',
    statusColor: 'bg-green-500',
    statusText: 'Community Support'
  },
  {
    id: 3,
    type: 'action_taken',
    title: 'Admin action taken on report at Oak Avenue',
    time: '4h ago',
    description: 'The broken traffic light issue has been resolved by city maintenance.',
    statusColor: 'bg-purple-500',
    statusText: 'Resolved'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Alert: Road closure on Pine Street',
    time: '5h ago',
    description: 'Emergency road closure due to water main break. Avoid area until further notice.',
    statusColor: 'bg-red-500',
    statusText: 'Alert'
  },
  {
    id: 5,
    type: 'acknowledged',
    title: 'Your report on Maple Drive has been acknowledged',
    time: '6h ago',
    description: 'Your sidewalk repair request is under review by the public works department.',
    statusColor: 'bg-blue-500',
    statusText: 'Acknowledged'
  },
  {
    id: 6,
    type: 'upvoted',
    title: 'Community upvoted your report on Cedar Lane',
    time: '7h ago',
    description: '8 residents have supported your request for additional street signs.',
    statusColor: 'bg-green-500',
    statusText: 'Community Support'
  },
  {
    id: 7,
    type: 'action_taken',
    title: 'Admin action taken on report at Birch Court',
    time: '8h ago',
    description: 'Graffiti removal has been completed as requested.',
    statusColor: 'bg-purple-500',
    statusText: 'Resolved'
  },
  {
    id: 8,
    type: 'alert',
    title: 'Alert: Road closure on Willow Place',
    time: '9h ago',
    description: 'Scheduled maintenance work from 9 AM - 4 PM. Use alternate routes.',
    statusColor: 'bg-red-500',
    statusText: 'Alert'
  }
];

const NotificationItem = ({ notification }) => {
  return (
    
    <TouchableOpacity 
      className="bg-white mx-4 mb-4 rounded-xl p-4 shadow-sm"
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text className="text-base font-medium text-gray-900 mb-1">
            {notification.title}
          </Text>
          <View className="flex-row items-center">
            <View className={`${notification.statusColor} px-2 py-1 rounded-full mr-2`}>
              <Text className="text-white text-xs font-medium">
                {notification.statusText}
              </Text>
            </View>
            <Text className="text-gray-500 text-sm">
              {notification.time}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-gray-600 text-sm leading-5">
        {notification.description}
      </Text>
    </TouchableOpacity>
  );
};

const Notification = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Notifications</Text>
      </View>

      {/* Notifications List */}
      <ScrollView className="flex-1 pt-4" showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
        
        {/* Empty state message at bottom */}
        <View className="p-6 items-center">
          <Text className="text-gray-400 text-center">
            You&apos;re all caught up! No more notifications to show.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
