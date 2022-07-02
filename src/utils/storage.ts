import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageProps = 'onboarding';

export const saveItem = async (key: StorageProps, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error: any) {
    console.log('AsyncStorage error', +error.message);
  }
};

export const getItem = async (key: StorageProps) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error: any) {
    console.log('AsyncStorage error', +error.message);
  }
};
