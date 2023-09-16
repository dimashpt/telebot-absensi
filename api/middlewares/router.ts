import { Bot } from 'grammy';
import { MainContext } from '../context';
import { Router } from '@grammyjs/router';

export default function initRouter(bot: Bot<MainContext>): void {
  const router = new Router<MainContext>((ctx) => ctx.session.step);

  bot.use(router);
}
