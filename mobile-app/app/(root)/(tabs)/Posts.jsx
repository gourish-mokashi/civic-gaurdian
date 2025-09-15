import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Posts = () => {
  return (
    <SafeAreaView className = "flex-1 justify-center items-center">
      <Text className = "text-4xl">Posts</Text>
    </SafeAreaView>
  )
}

export default Posts

const styles = StyleSheet.create({})