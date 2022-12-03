import { dasherize, underscore } from '@angular-devkit/core/src/utils/strings';
import { capitalize, replaceAll, upperCase } from 'voca';

export function symbolify(name: string): string {
  return upperCase(underscore(name));
}

export function createDescriptionFromName(name: string) {
  return replaceAll(capitalize(dasherize(name)), '-', ' ');
}
