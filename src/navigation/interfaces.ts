export type IOnboardingStackParamList = {
  Onboarding: undefined;
  Landing: undefined;
  AuthScreen: {isSignup: boolean};
  OnboardingQuestions: undefined;
  AppStack: undefined;
  EnterMobileNumber: undefined;
  EnterEmailScreen: {isEmailError: string} | undefined;
  EnterPasswordScreen: {email: string};
  EnterNameScreen: {email: string; password: string};
};

export type IUserStackParamList = {
  UserLevelScreen: undefined;
  HomeBottomTab: undefined;
};

export type IAppStackParamList = {
  Home: undefined;
  BottomTabs: undefined;
};

export type HomeBottomTabParamList = {
  Home: undefined;
  Explore: undefined;
  Project: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type AddProjectParamList = {
  AddProject: undefined;
  Step2: undefined;
  ProjectLaunch: undefined;
  PreviewProject: undefined;
  ProjectInfo: undefined;
  EditProject: undefined;
  UpdateProject: undefined;
};
