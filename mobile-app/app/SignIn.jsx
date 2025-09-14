import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Dimensions, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import GoogleIcon from '../components/GoogleIcon'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const { width } = Dimensions.get('window')
  const isTablet = width >= 768

  const goToSignUp = () => {
    router.push('/SignUp')
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />
      <View className="flex-1 bg-white">
        <View className={`flex-1 ${isTablet ? 'items-center' : ''}`}>
          <View className={`flex-1 w-full ${isTablet ? 'max-w-md' : ''}`}>
            
            <ImageBackground 
              source={require('../assets/app-images/signin-head.png')}
              className={`w-full ${isTablet ? 'px-8 pt-16 pb-12' : 'px-6 pt-12 pb-8'}`}
              style={{ 
                backgroundColor: '#4285F4',
                width: '100%',
                minHeight: isTablet ? 300 : 250
              }}
              resizeMode="cover"
            >
              <View className={isTablet ? "h-8" : "h-6"} />
              
              <View className={`items-center ${isTablet ? 'mb-10' : 'mb-8'}`}>
                <View className={`bg-white bg-opacity-20 rounded-full ${isTablet ? 'p-4' : 'p-3'}`}>
                  <Ionicons name="shield-outline" size={isTablet ? 40 : 32} color="white" />
                </View>
              </View>

              <View className={`items-center ${isTablet ? 'mb-8' : 'mb-6'}`}>
                <Text className={`text-white font-bold text-center ${isTablet ? 'text-4xl' : 'text-3xl'}`}>
                  Sign in to your{'\n'}Account
                </Text>
                <Text className={`text-white mt-3 opacity-90 ${isTablet ? 'text-lg' : 'text-base'}`}>
                  Enter your email and password to log in
                </Text>
              </View>
            </ImageBackground>

            <ScrollView 
              className={`flex-1 bg-white ${isTablet ? 'px-8 -mt-6' : 'px-6 -mt-4'}`} 
              style={{ borderTopLeftRadius: isTablet ? 32 : 24, borderTopRightRadius: isTablet ? 32 : 24 }}
              showsVerticalScrollIndicator={false}
            >
              <View className={isTablet ? "pt-10" : "pt-8"}>
                
                <TouchableOpacity 
                  className={`bg-white border border-gray-200 rounded-xl flex-row items-center justify-center mb-6 ${isTablet ? 'py-5 px-8' : 'py-4 px-6'}`}
                  style={{ 
                    shadowColor: '#000', 
                    shadowOffset: { width: 0, height: 2 }, 
                    shadowOpacity: 0.1, 
                    shadowRadius: 4, 
                    elevation: 3 
                  }}
                >
                  <View className="mr-3">
                    <GoogleIcon size={isTablet ? 24 : 20} />
                  </View>
                  <Text className={`text-gray-700 font-medium ${isTablet ? 'text-lg' : 'text-base'}`}>
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                <View className={`flex-row items-center ${isTablet ? 'mb-8' : 'mb-6'}`}>
                  <View className="flex-1 h-px bg-gray-200" />
                  <Text className={`mx-4 text-gray-500 ${isTablet ? 'text-base' : 'text-sm'}`}>
                    Or login with
                  </Text>
                  <View className="flex-1 h-px bg-gray-200" />
                </View>

                <View className={isTablet ? "mb-6" : "mb-4"}>
                  <TextInput
                    className={`bg-gray-50 border border-gray-200 rounded-xl px-4 ${isTablet ? 'py-5 text-lg' : 'py-4 text-base'}`}
                    placeholder="Email"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>

                <View className={isTablet ? "mb-6" : "mb-4"}>
                  <View className="relative">
                    <TextInput
                      className={`bg-gray-50 border border-gray-200 rounded-xl px-4 pr-12 ${isTablet ? 'py-5 text-lg' : 'py-4 text-base'}`}
                      placeholder="Password"
                      placeholderTextColor="#9CA3AF"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoComplete="password"
                    />
                    <TouchableOpacity 
                      className={`absolute right-4 ${isTablet ? 'top-5' : 'top-4'}`}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons 
                        name={showPassword ? "eye-outline" : "eye-off-outline"} 
                        size={isTablet ? 24 : 20} 
                        color="#9CA3AF" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className={`flex-row justify-between items-center ${isTablet ? 'mb-10' : 'mb-8'}`}>
                  <TouchableOpacity 
                    className="flex-row items-center"
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <View className={`${isTablet ? 'w-6 h-6' : 'w-5 h-5'} border-2 rounded mr-3 ${rememberMe ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                      {rememberMe && (
                        <Ionicons 
                          name="checkmark" 
                          size={isTablet ? 16 : 12} 
                          color="white" 
                          style={{ marginLeft: isTablet ? 2 : 1 }} 
                        />
                      )}
                    </View>
                    <Text className={`text-gray-600 ${isTablet ? 'text-base' : 'text-sm'}`}>
                      Remember me
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity>
                    <Text className={`text-blue-500 font-medium ${isTablet ? 'text-base' : 'text-sm'}`}>
                      Forgot Password ?
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  className={`bg-blue-500 rounded-xl px-6 mb-6 ${isTablet ? 'py-5' : 'py-4'}`}
                  style={{ backgroundColor: '#4285F4' }}
                >
                  <Text className={`text-white text-center font-semibold ${isTablet ? 'text-lg' : 'text-base'}`}>
                    Log In
                  </Text>
                </TouchableOpacity>

                <View className={`flex-row justify-center ${isTablet ? 'mb-12' : 'mb-8'}`}>
                  <Text className={`text-gray-600 ${isTablet ? 'text-base' : 'text-sm'}`}>
                    Don't have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={goToSignUp}>
                    <Text className={`text-blue-500 underline font-medium ${isTablet ? 'text-base' : 'text-sm'}`}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>

                {isTablet && <View className="h-8" />}

              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  )
}

export default SignIn