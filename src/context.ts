import type { Context, SessionFlavor } from 'grammy';
import { I18nFlavor } from '@grammyjs/i18n';

export type SessionData = {
  page?: number;
  step?: string;
};

export function initialData(): SessionData {
  return {
    page: 0,
    step: '/',
  };
}

export type MainContext = Context & SessionFlavor<SessionData> & I18nFlavor;
