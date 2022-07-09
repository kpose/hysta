import {Pressable, StyleSheet, View, Alert} from 'react-native';
import Text from '../../components/Text/Text';
import React, {useCallback, useState} from 'react';
import {ISelectCategoriesProps} from './interfaces';
import {ProjectCategories} from '../../configs/categories.config';
import {useUserContext} from '../../providers/UserProvider';
import Screen from '../../components/Screen/Screen';
import {colors} from '../../utils/colors';
import {Surface} from 'react-native-paper';
import Button from '../../components/Button/Button';
import firestore from '@react-native-firebase/firestore';

const SelectCategories: ISelectCategoriesProps = ({navigation}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const {userData} = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryPress = useCallback(
    (x: string) => {
      if (selectedCategories.includes(x)) {
        let categories = selectedCategories;
        let updatedList = categories.filter(item => item !== x);
        setSelectedCategories(updatedList);
        return;
      }
      setSelectedCategories(oldValues => {
        return [x, ...oldValues];
      });
    },
    [selectedCategories],
  );

  const isButtonDisabled = useCallback(() => {
    if (selectedCategories.length < 3) {
      return true;
    }
    if (isLoading) {
      return true;
    }
    return false;
  }, [isLoading, selectedCategories.length]);

  const onContinuePress = useCallback(() => {
    if (!userData?.id) {
      Alert.alert('Error saving information');
      return;
    }
    try {
      setIsLoading(true);
      firestore()
        .collection('Users')
        .doc(userData.id)
        .update({
          projectCategories: selectedCategories,
        })
        .then(() => {
          setIsLoading(false);
          navigation.navigate('HomeBottomTab');
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [navigation, selectedCategories, userData?.id]);

  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>
        Select at least 3 categories to personalize your homepage
      </Text>

      {/* render categories */}
      <View style={styles.innerContainer}>
        {ProjectCategories.map(category => {
          return (
            <Pressable
              onPress={() => handleCategoryPress(category)}
              key={category}>
              <Surface
                key={category}
                style={[
                  styles.categoryContainer,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    backgroundColor: selectedCategories.includes(category)
                      ? colors.primary
                      : colors.light,
                  },
                ]}>
                <Text>{category}</Text>
              </Surface>
            </Pressable>
          );
        })}
      </View>
      <Button
        style={styles.continueButton}
        title="Continue"
        disabled={isButtonDisabled()}
        loading={isLoading}
        onPress={onContinuePress}
      />
    </Screen>
  );
};

export default SelectCategories;

const styles = StyleSheet.create({
  header: {
    color: colors.light_grey,
    marginTop: 10,
  },
  categoryContainer: {
    padding: 12,
    borderRadius: 5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginRight: 10,
    marginBottom: 15,
    borderColor: colors.primary,
    borderWidth: 0.5,
  },
  innerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  continueButton: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
  },
});
