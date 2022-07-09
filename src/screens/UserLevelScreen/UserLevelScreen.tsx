import {StyleSheet, View, FlatList, Pressable, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
import {IUserLevelScreenProps} from './interfaces';
import Screen from '../../components/Screen/Screen';
import Text, {ScreenTitle} from '../../components/Text/Text';
import {colors} from '../../utils/colors';
import Button from '../../components/Button/Button';
import {useUserContext} from '../../providers/UserProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import {Surface} from 'react-native-paper';
import {iconSize} from '../../utils/sizes';
import {IUserFundingLevel} from '../../types/user';
import firestore from '@react-native-firebase/firestore';

const UserLevelScreen: IUserLevelScreenProps = ({navigation}) => {
  const {userData} = useUserContext();
  const [fundingLevel, setFundingLevel] = useState<IUserFundingLevel>();
  const [isLoading, setIsLoading] = useState(false);

  console.log(userData);

  interface IListItemProps {
    item: {
      level: string;
      description: string;
      status: IUserFundingLevel;
    };
  }

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
          fundingLevel: fundingLevel,
        })
        .then(() => {
          setIsLoading(false);
          console.log('User updated!');
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [fundingLevel, userData?.id]);

  if (!userData) {
    return null;
  }

  const ListItem = ({item: {level, description, status}}: IListItemProps) => {
    const onLevelPress = useCallback(() => {
      setFundingLevel(status);
    }, [status]);
    return (
      <Pressable onPress={onLevelPress}>
        <Surface style={styles.listItemContainer}>
          {fundingLevel === status ? (
            <Icon
              name="radio-button-on"
              size={iconSize}
              style={styles.radioButton}
              color={colors.primary}
            />
          ) : (
            <Icon
              name="radio-button-off"
              size={iconSize}
              style={styles.radioButton}
            />
          )}
          <View style={styles.levelContainer}>
            <Text weight="bold">{level}</Text>
            <Text style={styles.leveldescription}>{description}</Text>
          </View>
        </Surface>
      </Pressable>
    );
  };

  const renderLevel = ({item}: IListItemProps) => {
    return <ListItem item={item} />;
  };

  return (
    <Screen style={styles.container}>
      <ScreenTitle style={styles.title}>Hello {userData.fullname},</ScreenTitle>
      <Text style={styles.description}>
        Which option describes you the best?
      </Text>

      <FlatList
        data={USERLEVELS}
        renderItem={renderLevel}
        keyExtractor={item => item.level}
      />

      <Button
        style={styles.continueButton}
        title="Continue"
        disabled={!fundingLevel || isLoading}
        loading={isLoading}
        onPress={onContinuePress}
      />
    </Screen>
  );
};

export default UserLevelScreen;

const USERLEVELS: {
  level: string;
  description: string;
  status: IUserFundingLevel;
}[] = [
  {
    level: 'I am new to the market.',
    description: "Don't worry, we got your back.",
    status: 'beginner',
  },
  {
    level: 'I have some basic knowledge about funding.',
    description: 'We would just provide you with some tips.',
    status: 'intermediate',
  },
  {
    level: 'I am an experienced personnel.',
    description: "It's a free world.",
    status: 'professional',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 20,
    borderRadius: 5,
  },
  levelContainer: {
    marginLeft: 7,
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  leveldescription: {
    color: colors.light_grey,
    marginTop: 5,
  },
  radioButton: {
    marginLeft: 10,
  },

  phoneTextContainer: {
    borderRadius: 5,
  },
  continueButton: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  phoneInput: {
    width: '100%',
    marginTop: 30,
    borderRadius: 5,
  },
  title: {
    marginTop: 20,
  },
  description: {
    color: colors.light_grey,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.primary,
    alignSelf: 'center',
  },
});
