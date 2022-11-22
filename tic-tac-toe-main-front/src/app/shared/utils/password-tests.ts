import { maxPasswordLength, minimumPasswordLength } from '../../app.config';
import { PASSWORD_VALIDATION_RULES } from '../../core/models/authorization.models';

export function isNoLongerThan(password: string): boolean {
  return password.length <= maxPasswordLength;
}

export function isHaveNumber(password: string): boolean {
  const numberRegexp = /[0-9]/g;
  return numberRegexp.test(password);
}

export function isIncludeCapitalLetter(password: string): boolean {
  const capitalRegexp = /[A-Z, А-Я]/g;
  return capitalRegexp.test(password);
}

export function isIncludeLowerCaseLetter(password: string): boolean {
  const loverCaseRegexp = /[a-z, а-я]/g;
  return loverCaseRegexp.test(password);
}

export function isEnoughLength(password: string): boolean {
  return password.length >= minimumPasswordLength;
}

export function validatePassword(password: string): PASSWORD_VALIDATION_RULES {
  return {
    isLengthNoLongerThanMaxValue: isNoLongerThan(password),
    isIncludeCapitalLetterSymbol: isIncludeCapitalLetter(password),
    isIncludeNumber: isHaveNumber(password),
    isIncludeLowerCaseLetterSymbol: isIncludeLowerCaseLetter(password),
    isMinLengthEnough: isEnoughLength(password),
  }
}
