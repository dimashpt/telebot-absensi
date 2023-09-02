import { type Conversation } from '@grammyjs/conversations';
import { MainContext } from '../context';
import moment from 'moment';
import { serviceCuti } from '../services';

type InfoCutiConversation = Conversation<MainContext>;

async function infoPribadi(
  conversation: InfoCutiConversation,
  ctx: MainContext,
) {
  let done = false;
  let hasil: any = {};

  try {
    do {
      await ctx.reply(ctx.t('kapan-cuti'));

      const leaveDay = await conversation.form.text();
      const leaveDayDate = moment(leaveDay, 'DD-MM-YYYY');

      await ctx.reply(
        `Berapa hari anda akan cuti? (maksimal ${ctx.session.cuti?.sisa_cuti})`,
      );

      const leaveCount = await conversation.form.number((_ctx) => {
        _ctx.reply('Masukan angka yang valid');
      });
      const leaveUntil = moment(leaveDayDate)
        .add(leaveCount - 1, 'days')
        .format('DD-MM-YYYY');

      await ctx.reply('Apa alasan anda mengajukan cuti?');

      const leaveReason = await conversation.form.text();

      await ctx.reply(
        ctx.t('summary-cuti', {
          tanggal_mulai: leaveDayDate.format('DD-MM-YYYY'),
          tanggal_akhir: leaveUntil,
          jumlah_hari: leaveCount,
          alasan: leaveReason,
        }),
      );

      await ctx.reply('Apakah data diatas sudah benar? (y/n/c)');

      const confirmation = await conversation.form.select(['y', 'n', 'c']);

      done = confirmation === 'y';

      if (confirmation === 'c') return;

      hasil = {
        tanggal_mulai: leaveDayDate.format('DD-MM-YYYY'),
        tanggal_akhir: leaveUntil,
        jumlah_hari: leaveCount,
        alasan: leaveReason,
      };
    } while (!done);

    await conversation.external(
      async () => await serviceCuti.ajukanCuti(hasil),
    );

    await ctx.reply(
      'Cuti berhasil diajukan! silakan cek di menu cuti secara berkala',
    );
  } catch (error) {
    console.log(error);
  }

  return;
}

export default infoPribadi;
