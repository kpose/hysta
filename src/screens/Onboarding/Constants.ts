import {ImageProps} from 'react-native';

export const ONBOARDING_BACKGROUND = '#F1F1F1';

export interface OnboardingPageProps extends Pick<ImageProps, 'source'> {
  title: string;
  description: string;
}

export const PAGES: OnboardingPageProps[] = [
  {
    title: 'Samurai',
    description: 'Create and see the change in your community!',
    source: require('../../assets/images/image1.png'),
  },
  {
    title: 'Samurai',
    description: "Follow along a project's journey from start to finish",
    source: require('../../assets/images/image2.png'),
  },
  {
    title: 'Samurai',
    description: 'Share and explore a variety of projects',
    source: require('../../assets/images/image3.png'),
  },
];
