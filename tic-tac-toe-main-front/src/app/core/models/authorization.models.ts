export interface SIGN_UP_REQUEST_BODY {
  nickName: string;
  email: string;
  password: string;
}

export interface SIGN_IN_REQUEST_BODY {
  email: string;
  password: string;
}

export interface TOKEN_OBJ {
  accessToken: string;
  refreshToken: string;
  securityToken: string;
  createdTime?: string;
}

export interface PASSWORD_VALIDATION_RULES {
  isLengthNoLongerThanMaxValue: boolean;
  isIncludeCapitalLetterSymbol: boolean;
  isIncludeNumber: boolean;
  isIncludeLowerCaseLetterSymbol: boolean;
  isMinLengthEnough: boolean;
}

export interface CREATE_NEW_PASSWORD_FORM_VALUE {
  email: string;
  password: string;
  verificationCode: string
}
