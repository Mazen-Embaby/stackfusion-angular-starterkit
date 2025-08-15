import { environment } from '../environments/environment';

export const AUTH_API = {
  GOOGLE_LOGIN_PROVIDER_ID: '.apps.googleusercontent.com',

  GOOGLE_SIGN_IN_END_POINT: `${environment.backendAPIUrl}auth/google/callback`,
  SIGN_IN_END_POINT: `${environment.backendAPIUrl}auth/local`,
  REGISTER_END_POINT: `${environment.backendAPIUrl}auth/local/register`,
  FORGET_PASS_END_POINT: `${environment.backendAPIUrl}auth/forgot-password`,
  RESET_PASS_END_POINT: `${environment.backendAPIUrl}auth/reset-password`,
  CHANGE_PASS_END_POINT: `${environment.backendAPIUrl}auth/change-password`,
  EMAIL_CONFIRM_END_POINT: `${environment.backendAPIUrl}auth/email-confirmation`,
  SEND_EMAIL_CONFIRM_END_POINT: `${environment.backendAPIUrl}auth/send-email-confirmation`,
  ME_END_POINT: `${environment.backendAPIUrl}users/me`,
};
