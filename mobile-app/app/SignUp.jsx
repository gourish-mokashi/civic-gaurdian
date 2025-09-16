import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Dimensions, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import authClient from '../lib/auth-client'

const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { width } = Dimensions.get('window')
  const isTablet = width >= 768

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    return phone.length === 10 && /^\d+$/.test(phone)
  }

  const validatePincode = (pincode) => {
    return pincode.length === 6 && /^\d+$/.test(pincode)
  }

  const handleLogin = async () => {
    // Validation logic
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name')
      return
    }
    
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }
    
    if (!validatePhone(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number')
      return
    }
    
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address')
      return
    }
    
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter your city')
      return
    }
    
    if (!state.trim()) {
      Alert.alert('Error', 'Please enter your state')
      return
    }
    
    if (!validatePincode(pincode)) {
      Alert.alert('Error', 'Please enter a valid 6-digit PIN code')
      return
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long')
      return
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    // If validation passes, attempt sign up
    console.log('Sign up validation passed')
    console.log('Attempting to sign up user with email:', email)
    
    try {
      await authClient.signUp.email({
        email,
        password,
        name: fullName,
        phoneNumber: phone,
        address,
        city,
        state,
        pincode,
      }, {
        onSuccess: (user) => {
          Alert.alert('Success', 'Account created successfully! Please verify your email before logging in.')
          router.push('/SignIn')
        },
        onError: (error) => {
          Alert.alert('Error', error.message || 'An error occurred during sign up. Please try again.')
          console.error('Sign up error:', error)
        }
      })
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your connection and try again.')
      console.error('Network error:', error)
    }
  }

  const goToSignIn = () => {
    router.push('/SignIn')
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
            
            <TouchableOpacity 
              className={`absolute ${isTablet ? 'top-16 left-8' : 'top-12 left-6'} z-10`}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="white" />
            </TouchableOpacity>

            <View className={`items-center ${isTablet ? 'mb-10' : 'mb-8'}`}>
              <View className={`bg-white bg-opacity-20 rounded-full ${isTablet ? 'p-4' : 'p-3'}`}>
                <Ionicons name="shield-outline" size={isTablet ? 40 : 32} color="white" />
              </View>
            </View>

            <View className={`items-center ${isTablet ? 'mb-8' : 'mb-6'}`}>
              <Text className={`text-white font-bold text-center ${isTablet ? 'text-4xl' : 'text-3xl'}`}>
                Sign Up
              </Text>
              <Text className={`text-white mt-3 opacity-90 ${isTablet ? 'text-lg' : 'text-base'}`}>
                Already have an account? <Text className="font-semibold underline" onPress={goToSignIn}>Log In</Text>
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

                <View className={`flex-row ${isTablet ? 'mb-6' : 'mb-4'} ${isTablet ? 'space-x-4' : 'space-x-3'}`}>
                  <View className="flex-1">
                    <TextInput
                      className={`bg-gray-50 border border-gray-200 rounded-xl px-4 ${isTablet ? 'py-5 text-lg' : 'py-4 text-base'}`}
                      placeholder="Full Name"
                      placeholderTextColor="#9CA3AF"
                      value={fullName}
                      onChangeText={setFullName}
                      autoCapitalize="words"
                    />
                  </View>
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
                  <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl">
                    <View className={`flex-row items-center px-3 ${isTablet ? 'py-5' : 'py-4'}`}>
                      <Text className="mr-2 text-lg">🇮🇳</Text>
                      <Text className={`text-gray-700 ${isTablet ? 'text-lg' : 'text-base'}`}>+91</Text>
                    </View>
                    <View className="w-px h-6 bg-gray-200" />
                    <TextInput
                      className={`flex-1 px-3 ${isTablet ? 'py-5 text-lg' : 'py-4 text-base'}`}
                      placeholder="Phone Number"
                      placeholderTextColor="#9CA3AF"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                </View>

                <View className={isTablet ? "mb-6" : "mb-4"}>
                  <TextInput
                    className={`bg-gray-50 border border-gray-200 rounded-xl px-4 ${isTablet ? 'py-5 text-lg' : 'py-4 text-base'}`}
                    placeholder="Address Line"
                    placeholderTextColor="#9CA3AF"
                    value={address}
                    onChangeText={setAddress}
                    autoCapitalize="words"
                  />
                </View>

                <View className={`flex-row ${isTablet ? 'mb-6' : 'mb-4'} ${isTablet ? 'space-x-4' : 'space-x-3'}`}>
                  <View className="flex-1">
                    <TextInput
                      className={`bg-gray-50 border border-gray-200 rounded-xl px-4 ${isTablet ? 'py-5 text-lg' : 'py-4 text-base'}`}
                      placeholder="City"
                      placeholderTextColor="#9CA3AF"
                      value={city}
                      onChangeText={setCity}
                      autoCapitalize="words"
                    />
                  </View>
                  <View className="flex-1">
                    <TextInput
                      className={`bg-gray-50 border border-gray-200 rounded-xl px-4 ${isTablet ? 'py-5 text-lg' : 'py-4 text-base'}`}
                      placeholder="State"
                      placeholderTextColor="#9CA3AF"
                      value={state}
                      onChangeText={setState}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View className={isTablet ? "mb-6" : "mb-4"}>
                  <TextInput
                    className={`bg-gray-50 border border-gray-200 rounded-xl px-4 ${isTablet ? 'py-5 text-lg' : 'py-4 text-base'}`}
                    placeholder="PIN Code"
                    placeholderTextColor="#9CA3AF"
                    value={pincode}
                    onChangeText={setPincode}
                    keyboardType="numeric"
                    maxLength={6}
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

                <View className={isTablet ? "mb-6" : "mb-4"}>
                  <View className="relative">
                    <TextInput
                      className={`bg-gray-50 border border-gray-200 rounded-xl px-4 pr-12 ${isTablet ? 'py-5 text-lg' : 'py-4 text-base'}`}
                      placeholder="Confirm Password"
                      placeholderTextColor="#9CA3AF"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity 
                      className={`absolute right-4 ${isTablet ? 'top-5' : 'top-4'}`}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Ionicons 
                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                        size={isTablet ? 24 : 20} 
                        color="#9CA3AF" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity 
                  className={`rounded-xl px-6 mb-6 ${isTablet ? 'py-5' : 'py-4'}`}
                  style={{ backgroundColor: '#4285F4' }}
                  onPress={handleLogin}
                >
                  <Text className={`text-white text-center font-semibold ${isTablet ? 'text-lg' : 'text-base'}`}>
                    Sign Up
                  </Text>
                </TouchableOpacity>

                <View className={`flex-row justify-center ${isTablet ? 'mb-12' : 'mb-8'}`}>
                  <Text className={`text-gray-600 ${isTablet ? 'text-base' : 'text-sm'}`}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={goToSignIn}>
                    <Text className={`text-blue-500 underline font-medium ${isTablet ? 'text-base' : 'text-sm'}`}>
                      Log In
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

export default SignUp