export type IUserFundingLevel = 'beginner' | 'intermediate' | 'professional';

export interface IUserData {
  email: string;
  fullname: string;
  fundingLevel?: IUserFundingLevel;
  id?: string;
  projectCategories: string[];
}
