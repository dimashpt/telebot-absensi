import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from './context';
import menuPresensi from './presensi';
import { Router } from '@grammyjs/router';
import { Composer, Keyboard } from 'grammy';

export const mainComposer = new Composer<MainContext>();

const menu = new MenuTemplate<MainContext>((ctx) => {
  return ctx.t('main-greetings', {
    name: ctx.from!.first_name,
  });
});

menu.submenu(() => '✅ Presensi', 'presensi', menuPresensi);
menu.submenu(() => '📝 Riwayat Kehadiran', 'riwayat', menuPresensi);
menu.submenu(() => '🙎‍♂️ Informasi Diri', 'informasi', menuPresensi);
menu.submenu(() => '⚙️ Pengaturan', 'pengaturan', menuPresensi);

// Tentukan aksi yang akan dilakukan ketika berada di tahap form "day".
// const day = router.route('/');

// day.on('message:text', async (ctx) => {
//   const day = parseInt(ctx.msg.text, 10);

//   if (isNaN(day) || day < 1 || 31 < day) {
//     await ctx.reply('Ups, itu bukan tanggal yang valid. Silahkan coba lagi!');
//     return;
//   }
//   ctx.session.step = day.toString();
//   // Form lanjutan untuk step "month"
//   ctx.session.step = 'month';
//   await ctx.reply('Baik! Sekarang, kirim bulannya!', {
//     reply_markup: {
//       one_time_keyboard: true,
//       keyboard: new Keyboard()
//         .text('Jan')
//         .text('Feb')
//         .text('Mar')
//         .row()
//         .text('Apr')
//         .text('May')
//         .text('Jun')
//         .row()
//         .text('Jul')
//         .text('Aug')
//         .text('Sep')
//         .row()
//         .text('Oct')
//         .text('Nov')
//         .text('Dec')
//         .build(),
//     },
//   });
// });

// day.use((ctx) =>
//   ctx.reply('Kirim tanggal ulang tahunmu dalam bentuk pesan teks!'),
// );

export default menu;
