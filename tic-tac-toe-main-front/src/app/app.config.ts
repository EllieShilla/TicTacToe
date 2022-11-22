import { GameField, GameResult } from './core/models/game.models';
import { PASSWORD_VALIDATION_RULES } from './core/models/authorization.models';

export enum RouterLinks {
  termsAndConditions = 'terms_and_conditions',
  start = 'start',
  signUp = 'sign_up',
  signIn = 'sign_in',
  authorization = 'authorization',
  resetPass = 'reset_password',
  createNewPassword = 'create_new_password',
  confirmReset = 'confirm-reset',
  confirmRegistration = 'confirm_registration',
  gameRoom = 'game_room',
  leaderBoard = 'leader_board',
  botConfrontation = 'bot_confrontation'
}

export enum PasswordInputTitle {
  createPassword = 'Create a password',
  enterPassword = 'Enter password',
  createNewPassword = 'Create a new password',
  password = 'Password'
}

export enum Request_Url {
  signUp = 'api/SignUp',
  signIn = 'api/SignIn',
  sentEmailForResetPassword = 'api/InitResetPassword',
  resetPassword = 'api/ResetPassword',
  refreshToken = 'api/RefreshToken'
}

export const minimumPasswordLength = 6;

export const maxPasswordLength = 8;

export const passwordPattern = '^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).{6,8}$';

export enum ButtonName {
  toGame = 'To Game',
  backToHome = 'Back to Home'
}

export enum Player {
  player1 = 'player1',
  player2 = 'player2'
}

export const GameFieldStartState: GameField = [
  {
    id: 0,
    sign: ''
  },
  {
    id: 1,
    sign: ''
  },
  {
    id: 2,
    sign: ''
  },
  {
    id: 3,
    sign: ''
  },
  {
    id: 4,
    sign: ''
  },
  {
    id: 5,
    sign: ''
  },
  {
    id: 6,
    sign: ''
  },
  {
    id: 7,
    sign: ''
  },
  {
    id: 8,
    sign: ''
  }
]

export const GameResultInitValue: GameResult = {
  isP1Win: false,
  isP2Win: false,
  isDraw: false,
};

export const TOKEN_OBJECT = 'tokenObject'

export const PasswordRulesStartValue: PASSWORD_VALIDATION_RULES = {
  isLengthNoLongerThanMaxValue: false,
  isIncludeCapitalLetterSymbol: false,
  isIncludeNumber: false,
  isIncludeLowerCaseLetterSymbol: false,
  isMinLengthEnough: false,
}
