import { MenuTemplate } from "grammy-inline-menu";
import { MainContext } from "./context";
import menuPresensi from "./presensi";

const menu = new MenuTemplate<MainContext>(ctx => ctx.t('main-greetings', {
  name: ctx.from!.first_name,
}));

menu.submenu(() => '✅ Presensi', 'presensi', menuPresensi);
menu.submenu(() => '📝 Riwayat Kehadiran', 'riwayat', menuPresensi);
menu.submenu(() => '🙎‍♂️ Informasi Diri', 'informasi', menuPresensi);
menu.submenu(() => '⚙️ Pengaturan', 'pengaturan', menuPresensi);

export default menu;