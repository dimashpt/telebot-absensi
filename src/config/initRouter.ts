import { Bot } from 'grammy';
import { MainContext } from '../context';
import { Router } from '@grammyjs/router';

export default function initRouter(bot: Bot<MainContext>): Router<MainContext> {
  const router = new Router<MainContext>((ctx) => ctx.session.step);

  router
    .route('/presensi', async (ctx) => {})
    .on('message:text', async (ctx) => {
      ctx.reply('Halo');
    });

  bot.use(router);

  return router;
}
