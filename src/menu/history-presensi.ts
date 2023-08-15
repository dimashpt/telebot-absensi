import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';
import { servicePresensi } from '../services';
import moment from 'moment';

function formatTime(datetime: string) {
  if (!datetime) return '-';

  return moment(datetime).format('HH:mm');
}

const menu = new MenuTemplate<MainContext>(async (ctx) => {
  const data = await servicePresensi.getHistoryPresensi();
  let joinedString = '';

  // console.log(data);

  if ((data.history_presensi || []).length < 1) {
    return 'Anda belum pernah absen sebelumnya';
  }

  if ((data.history_presensi || []).length > 0) {
    data.history_presensi.forEach((presensi, index) => {
      joinedString += `${index + 1}. ${moment(presensi.tanggal).format(
        'dddd, D MMMM YYYY',
      )}\n➡️${formatTime(presensi.jam_datang)}\n⬅️${formatTime(
        presensi.jam_pulang,
      )}\n\n`;
    });
  }

  return `
Riwayat presensi anda:\n\n${joinedString}`;
});

menu.manualRow(menuBack);

export default menu;
