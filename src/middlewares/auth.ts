import { Bot, NextFunction } from 'grammy';
import { MainContext } from '../context';
import { getEmployee } from '../services/pegawai';
import axios from 'axios';

async function axiosMiddleware(ctx: MainContext, next: NextFunction) {
  axios.defaults.params = {};
  axios.defaults.params.username = ctx.from!.username;

  await next();
}

async function isAuthorized(
  ctx: MainContext,
  next: NextFunction,
): Promise<void> {
  try {
    const data = await getEmployee();

    if (!data.aktif) {
      throw new Error();
    }

    ctx.session.user = data;

    await next();
  } catch (error) {
    console.error(error);
    ctx.reply('Anda tidak memiliki akses ke bot ini');
  }
}

export default function initAccess(bot: Bot<MainContext>): void {
  bot.use(axiosMiddleware);

  // bot.use(isAuthorized);
}
