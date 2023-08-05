import type { Context as BaseContext, SessionFlavor } from 'grammy';

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

export type MainContext = BaseContext & SessionFlavor<SessionData>;
