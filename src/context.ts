import type { Context as BaseContext, SessionFlavor } from 'grammy';

export type SessionData = {
  page?: number;
};

export type MainContext = BaseContext & SessionFlavor<SessionData>;
