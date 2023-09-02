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

  if ((data.history_presensi || []).length < 1) {
    return 'Anda belum pernah absen sebelumnya';
  }

  const range = 7;
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - range,
  );
  const filteredData = data.history_presensi.filter(
    (item) => new Date(item.tanggal) >= lastWeek,
  );

  if (filteredData.length > 0) {
    filteredData.forEach((presensi, index) => {
      joinedString += `${index + 1}. ${moment(presensi.tanggal).format(
        'dddd, D MMMM YYYY',
      )}\n➡️${formatTime(presensi.jam_datang)}\n⬅️${formatTime(
        presensi.jam_pulang,
      )}\n\n`;
    });
  } else {
    joinedString = `Anda belum pernah absen dalam ${range} hari terakhir`;
  }

  return `
Riwayat presensi anda dalam 7 hari terakhir:\n\n${joinedString}\n⚠️ Untuk melihat silakan hubungi personalia`;
});

menu.manualRow(menuBack);

export default menu;
