import * as SecureStore from 'expo-secure-store';

export const saveAuthData = async ({ data }) => {
  await SecureStore.setItemAsync('authToken', data.token);
};

export const getAuthData = async () => {
  const result = await SecureStore.getItemAsync('authToken');
  return result ? result : null;
};

export const clearAuthData = async () => {
  await SecureStore.deleteItemAsync('authToken');
};