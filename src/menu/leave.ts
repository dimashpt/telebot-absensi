import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';
import { serviceCuti } from '../services';
import moment from 'moment';

const menu = new MenuTemplate<MainContext>(async (ctx) => {
  const data = await serviceCuti.getCuti();
  let joinedString = '';

  if ((data.history_cuti || []).length < 1) {
    return 'Anda belum pernah mengajukan cuti sebelumnya';
  }

  ctx.session.cuti = data;
  ctx.session.user!.sisa_cuti = data.sisa_cuti;

  if ((data.history_cuti || []).length > 0) {
    data.history_cuti.forEach((cuti, index) => {
      joinedString += `${index + 1}. ${moment(cuti.tanggal_cuti).format(
        'dddd, D MMMM YYYY',
      )} - ${cuti.alasan_cuti}\n (${
        cuti.status === 'approved'
          ? '✅ Disetujui'
          : cuti.status === 'rejected'
          ? '❌ Ditolak'
          : '⏳ Menunggu Persetujuan'
      })\n`;
    });
  }

  return `
Sisa cuti: ${data.sisa_cuti} hari
Riwayat cuti anda:\n\n${joinedString}`;
});

menu.interact('✉️ Ajukan Cuti', 'pengajuan-cuti', {
  do: async (ctx) => {
    const filterPending = (ctx.session.cuti?.history_cuti || []).filter(
      (cuti) => {
        return cuti.status === 'pending';
      },
    );

    if (ctx.session.cuti!.sisa_cuti! < 1) {
      const msg = 'Sisa cuti anda sudah habis untuk tahun ini';

      ctx.answerCallbackQuery(msg);
      ctx.reply(msg);
      return false;
    }

    if (filterPending.length > 0) {
      const msg =
        'Anda masih memiliki pengajuan cuti yang belum diproses, silahkan tunggu hingga pengajuan cuti sebelumnya disetujui atau ditolak';

      ctx.answerCallbackQuery(msg);
      ctx.reply(msg);
      return false;
    }

    ctx.conversation.enter('info-pribadi');

    return true;
  },
});

menu.manualRow(menuBack);

export default menu;
