import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Dimensions, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import authClient from '../lib/auth-client'; // Add this import
import { getAuthData, saveAuthData } from '../lib/saved-token';

const SignIn = async () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const { width } = Dimensions.get('window')
  const isTablet = width >= 768
  
  const token = await getAuthData()
  if (token) {
      router.replace('/Home') 
  }
  const goToSignUp = () => {
    router.push('/SignUp')
  }

  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email')
      return
    }
    
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password')
      return
    }

    await authClient.signIn.email({
        email,
        password,
      }, {
        onSuccess: async (data) => {
          console.log('Sign-in successful:', data)
          await saveAuthData(data)
          router.replace('/Home')
          console.log(await getAuthData())
        },
        onError: (error) => {
          Alert.alert('Error', error.message)
        }
      })
    }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />
      <View className="flex-1 bg-white">
        
        <ImageBackground 
          source={require('../assets/app-images/signin-head.png')}
          style={{ 
            backgroundColor: '#4285F4',
            width: width,
            height: isTablet ? 350 : 280
          }}
          resizeMode="cover"
        >
          <View className={`flex-1 ${isTablet ? 'px-8 pt-16 pb-12' : 'px-6 pt-12 pb-8'}`}>
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
          </View>
        </ImageBackground>

        <View className={`flex-1 ${isTablet ? 'items-center' : ''}`}>
          <View className={`flex-1 w-full ${isTablet ? 'max-w-md' : ''}`}>
            <ScrollView 
              className={`flex-1 bg-white ${isTablet ? 'px-8 -mt-6' : 'px-6 -mt-4'}`} 
              style={{ borderTopLeftRadius: isTablet ? 32 : 24, borderTopRightRadius: isTablet ? 32 : 24 }}
              showsVerticalScrollIndicator={false}
            >
              <View className={isTablet ? "pt-10" : "pt-8"}>

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
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  className={`rounded-xl px-6 mb-6 ${isTablet ? 'py-5' : 'py-4'}`}
                  style={{ backgroundColor: '#4285F4' }}
                  onPress={handleSignIn}
                >
                  <Text className={`text-white text-center font-semibold ${isTablet ? 'text-lg' : 'text-base'}`}>
                    Log In
                  </Text>
                </TouchableOpacity>

                <View className={`flex-row justify-center ${isTablet ? 'mb-12' : 'mb-8'}`}>
                  <Text className={`text-gray-600 ${isTablet ? 'text-base' : 'text-sm'}`}>
                    Don&apos;t have an account?{' '}
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