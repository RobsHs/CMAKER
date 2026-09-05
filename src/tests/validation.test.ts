import { isValidEmail, isValidHexColor, isValidUrl } from '../utils/validation.ts';

export function testValidationUtils(): boolean {
  if (!isValidEmail('recipient@example.com')) throw new Error('Email validation failed for valid email');
  if (isValidEmail('invalid-email')) throw new Error('Email validation failed for invalid email');

  if (!isValidHexColor('#4f46e5')) throw new Error('Hex validation failed for #4f46e5');
  if (isValidHexColor('blue')) throw new Error('Hex validation failed for named color');

  if (!isValidUrl('https://cmaker.app')) throw new Error('Url validation failed');
  return true;
}

testValidationUtils();
