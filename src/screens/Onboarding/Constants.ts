import {ImageProps} from 'react-native';

export const ONBOARDING_BACKGROUND = '#F1F1F1';

export interface OnboardingPageProps extends Pick<ImageProps, 'source'> {
  title: string;
  description: string;
}

export const PAGES: OnboardingPageProps[] = [
  {
    title: 'Fund and monitor project growth',
    description:
      'With the power of blockchain, you can fund your favorite project and monitor how your money is spent',
    source: require('../../assets/images/image1.png'),
  },
  {
    title: "Create and fund Africa's future",
    description:
      "Want to contribute to the made in Africa campaign? Don't worry, we got you covered.",
    source: require('../../assets/images/image2.png'),
  },
  {
    title: 'Live demos with co-founders themselves',
    description:
      "Have a doubt about the product? Don't worry, we will provide you with a live demovideo",
    source: require('../../assets/images/image3.png'),
  },
  {
    title: 'Fund now and get rewarded later',
    description:
      'Even the smallest contribution will be appreciated with a customized token from the company',
    source: require('../../assets/images/image3.png'),
  },
];
