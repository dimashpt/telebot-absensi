import { Bot } from 'grammy';
import { MainContext } from '../context';
import { I18n } from '@grammyjs/i18n';

export default function initI18n(bot: Bot<MainContext>): void {
  // Buat sebuah instance `I18n`.
  // Lanjutkan membaca untuk mengetahui bagaimana cara mengatur instance ini.
  const i18n = new I18n<MainContext>({
    defaultLocale: 'id', // Lihat di bawah untuk informasi lebih lanjut.
    directory: 'locales', // Muat semua file terjemahan dari locales/.
  });

  bot.use(i18n);
}
