import type { Context, SessionFlavor } from 'grammy';
import { I18nFlavor } from "@grammyjs/i18n";

export type SessionData = {
  page?: number;
  bodyparts?: string;
};

export function intialData(): SessionData {
  return {
    page: 0,
    bodyparts: '',
  }
};

export type MainContext = Context & SessionFlavor<SessionData> & I18nFlavor;
