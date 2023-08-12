import { Bot } from 'grammy';
import { MainContext } from '../context';
import { conversations, createConversation } from '@grammyjs/conversations';
import infoCuti from '../conversations/informasi-cuti';
import infoPribadi from '../conversations/informasi-pribadi';

export default function initConversation(bot: Bot<MainContext>): void {
  // Middleware untuk mengelola sesi pada bot
  bot.use(conversations());
  bot.use(createConversation(infoCuti, 'info-cuti'));
  bot.use(createConversation(infoPribadi, 'info-pribadi'));
}
